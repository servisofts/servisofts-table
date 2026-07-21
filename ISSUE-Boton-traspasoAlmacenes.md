# Bug: `listFooterComponent` no aparece en web tras la primera carga de datos

## Síntoma

En `traspaso_inventario.js` (app), la tabla de destino define un `listFooterComponent`
con el botón "ENVIAR" para confirmar el traspaso. Al seleccionar almacén origen,
almacén destino y un producto, la tabla mostraba correctamente la fila del producto,
pero el botón "ENVIAR" nunca aparecía.

## Diagnóstico

Se agregó un log temporal en `DinamicTable.tsx` (`renderWebLayout`) y se confirmó:

```
{ state: "ready", hasData: true, hasListFooter: true, webDataLen: 1 }
```

`webDataLen` debía ser `2` (fila + marcador de footer), pero quedaba en `1`.

## Causa raíz

En `DinamicTable.tsx`, `loadData()` ejecuta:

```ts
await this.applyFilter();       // -> applySort() -> applyGroup()
this.setState({ state: "ready" })
```

`applyGroup()` asigna `this.dataGrouped` y llama a `this.forceUpdate()` **antes**
de que `loadData()` alcance el `setState({ state: "ready" })`. Eso dispara un
render intermedio donde:

- `paginatedData` ya es el array final (1 item, nueva referencia).
- `hasData` es `false` porque `this.state.state` todavía no es `"ready"`.

En ese render, `webData` se calcula sin el footer (por `hasData` falso) y se
guarda en la caché `_webDataCache`, cuya clave de invalidación era:

```ts
this._webDataCache.paginatedData === paginatedData
  && this._webDataCache.hasListFooter === hasListFooter
```

`hasData` **no** formaba parte de la clave. Cuando el estado pasa a `"ready"`
inmediatamente después (misma referencia de `paginatedData`), la caché "acierta"
y reutiliza el resultado viejo (sin el botón), aunque `hasData` ahora sea `true`.

## Fix

Se agregó `hasData` a la clave de comparación/almacenamiento de la caché:

`src/DinamicTable/DinamicTable.tsx`:

```ts
_webDataCache: { paginatedData: any[] | null, hasListFooter: boolean, hasData: boolean, result: any[] }
  = { paginatedData: null, hasListFooter: false, hasData: false, result: [] };
```

```ts
if (this._webDataCache.paginatedData === paginatedData
    && this._webDataCache.hasListFooter === hasListFooter
    && this._webDataCache.hasData === hasData) {
    webData = this._webDataCache.result;
} else {
    webData = (hasData && hasListFooter)
        ? [...paginatedData, { __type: "list-footer", __key: "__list-footer__" }]
        : paginatedData;
    this._webDataCache = { paginatedData, hasListFooter, hasData, result: webData };
}
```

## Archivos afectados

- `src/DinamicTable/DinamicTable.tsx` (líneas ~183, ~759-765)
- `dist/DinamicTable/DinamicTable.js` (regenerado con `npm run build`)

## Estado

Corregido y verificado en `app` (`traspaso_inventario.js`): el botón "ENVIAR"
aparece correctamente tras seleccionar origen, destino y al menos un producto.

Pendiente: commitear el fix en el repo `servisofts-table`.
