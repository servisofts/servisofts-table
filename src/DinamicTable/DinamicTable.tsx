import React, { ReactElement } from "react";
import { FlatList, GestureResponderEvent, Platform, ScrollView, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import Header from "./Header";
import Col, { ColPropsType } from "./Col";
import Row from "./Row";
import Popup from "./Popup";
import TopMenuOptions from "./TopMenuOptions";
import Filter, { FilterType } from "./Filter";
import MenuFilter from "./Filter/MenuFilter";
import SFlashList from "../Components/SFlashList";
import Assets from "../Assets";
import Sorter, { SorterType } from "./Sorter";
import MenuSorter from "./Sorter/MenuSorter";
import Grouper, { GrouperType } from "./Grouper";
import MenuGrouper from "./Grouper/MenuGrouper";
import SLanguage, { Language } from "../Components/SLanguage";
import CheckHeader from "./Components/CheckHeader";
import Paginador from "./Components/Paginador";

const CHECK_COL_WIDTH = 36;

type AllowedChild<T> = ReactElement<typeof Header> | ReactElement<typeof Col<T>>;

export type Colors = {
    text?: string,
    background?: string,
    card?: string,
    border?: string,
    accent?: string,
    header?: string,

}

export type CellStyle = {

} & ViewStyle

type stateType = {
    error?: any,
    state: "loading" | "ready" | "error",
    currentPage: number,
}

export type ColData = {
    width?: number,
    wrap?: boolean,
    hidden?: boolean,
}
export type ExporterStateType = {
    filters?: FilterType[];
    sorters?: SorterType[],
    cols?: { [key: string]: ColData },
    groupers?: GrouperType[],
}
export type HeaderGroupType = {
    label: string,
    cols: string[],
    style?: ViewStyle,
    textStyle?: TextStyle,
}
type DinamicTablePropsType<T> = {
    loadData: () => Promise<T[]>,
    loadInitialState?: () => Promise<ExporterStateType>,
    cellStyle?: CellStyle,
    textStyle?: TextStyle,
    textTitleStyle?: TextStyle,
    style?: any,
    children: AllowedChild<T> | AllowedChild<T>[],
    colors?: Colors,
    keyExtractor?: (item: T, index: number) => string,
    selectType?: "single" | "multiple" | "check",
    onSelect?: (p: { evt: GestureResponderEvent, key: string, row: T, dinamicTable: DinamicTable<T> }) => void,
    language?: Language,
    onEvent?: (p: { evt: "render" }) => void,
    iconSize?: number,
    listFooterComponent?: () => ReactElement,
    buildRowStyle?: (p: { item: T, index: number, dinamicTable: DinamicTable<T> }) => ViewStyle,
    hiddenMenu?: boolean,
    hoverStyle?: ViewStyle,
    adjustColumnWidth?: boolean,
    headerStyle?: ViewStyle,
    headerTextStyle?: TextStyle,
    padding?: number,
    // Cantidad de filas por página. Al definirlo, además de cortar los datos, se muestra
    // automáticamente un paginador (‹ Anterior / Página X de Y / Siguiente ›) en la barra superior.
    pageLimit?: number,
    renderError?: (p: { error: any, dinamicTable: DinamicTable<T> }) => ReactElement,
    renderNoResults?: (p: { dinamicTable: DinamicTable<T> }) => ReactElement,
    renderLoading?: (p: { dinamicTable: DinamicTable<T> }) => ReactElement,
    renderHeaderActions?: (p: { dinamicTable: DinamicTable<T> }) => ReactElement | null,
    onSelectionChange?: (rows: T[]) => void,
    headerGroups?: HeaderGroupType[],
    // Si es true, antepone una columna "N°" con el correlativo de la fila (considera la página actual),
    // sin necesidad de declararla a mano como DinamicTable.Col.
    indexar?: boolean,

}

const INDEX_COL_KEY = "__index__";







type rowEventListenersType = { type: "onSelect", key: string, value: boolean } | { type: "onRemove", key: string };


export default class DinamicTable<T> extends React.Component<DinamicTablePropsType<T>> {
    static Header = Header
    static Col = Col

    colors: Colors = {
        text: "#ffffff",
        background: "#333",
        card: "#444",
        border: "#666",
        accent: "#4689CC",
        header: "#444",
        ...this.props.colors

    }
    textStyle: TextStyle = {
        color: this.colors.text,
        fontSize: 12,
        ...(this.props.textStyle ?? {})
    }
    inputStyle: TextStyle = {
        color: this.colors.text,
        borderWidth: 1,
        borderColor: this.colors.border,
        borderRadius: 4,
        fontSize: 12,
        height: 22,
        padding: 6,
        justifyContent: "center",
        // alignItems: "center",
        // @ts-ignore
        outlineWidth: 0,
        // flex: 1,
        width: "100%"
    }

    containerRef: View | null = null
    headers: ReactElement<typeof Header>[] = []
    cols: ReactElement<typeof Col<T>>[] = []
    data: T[] = []
    dataFiltrada: any[] = []
    dataFormat: any[] = []
    popup: Popup | null = null

    checkHeaderRef: CheckHeader<T> | null = null
    rowSelecteds: { [key: string]: boolean } = {}
    // filtros: any[] = [];
    filtros: FilterType[] = [];

    sorter: SorterType[] = []
    groupers: GrouperType[] = []
    dataGrouped: any[] = []
    collapsedGroups: Set<string> = new Set();
    state: stateType = {
        state: "loading",
        currentPage: 1
    }

    buscador = "";

    containerWidth: number = 0;
    _webBodyHeight: number = 0;
    _webHeaderHeight: number = 0;
    colData: { [key: string]: ColData } = {}
    colRef: { [key: string]: Col<any> } = {}
    _colWidthVersion: number = 0;
    _webFooterHeight: number = 0;
    _webListFooterHeight: number = 0;
    _sFlashRef: SFlashList | null = null;
    props: DinamicTablePropsType<T>
    constructor(props: DinamicTablePropsType<T>) {
        super(props)
        SLanguage.change(this.props.language ?? "en")
        this.buildChildrenTypes();
    }


    rowEventListeners: { [key: string]: (evt: rowEventListenersType) => void } = {}
    addRowEventListener(key: string, listener: (evt: rowEventListenersType) => void) {
        this.rowEventListeners[key] = listener;
    }
    removeRowEventListener(key: string) {
        delete this.rowEventListeners[key]
    }

    async dispatchRowEvent(evt: rowEventListenersType) {
        Object.keys(this.rowEventListeners).forEach(key => {
            if (this.rowEventListeners[key]) this.rowEventListeners[key](evt)
        })
        if (this.props.selectType === "check" && this.checkHeaderRef) {
            this.checkHeaderRef.forceUpdate();
        }
    }

    selectAll() {
        this.dataFiltrada.forEach(item => {
            this.rowSelecteds[item.__key] = true;
        });
        this.dispatchRowEvent({ type: "onSelect", key: "__selectAll__", value: true });
        if (this.props.onSelectionChange) this.props.onSelectionChange(this.getSelectedRows());
    }

    getSelectedRows(): T[] {
        return this.dataFiltrada
            .filter(item => this.rowSelecteds[item.__key])
            .map(item => item.__original);
    }

    setSelect(key: string, value: boolean, e?: GestureResponderEvent) {
        if (this.props.onSelect) {
            const row = this.dataFiltrada.find(a => a.__key === key)
            this.props.onSelect({ evt: e, key: key, row: row.__original, dinamicTable: this })
        }
        if (!this.props.selectType) return;
        if (this.props.selectType === "single") {
            this.rowSelecteds = {}
        }
        this.rowSelecteds[key] = value;
        this.dispatchRowEvent({ type: "onSelect", key: key, value: value })
        if (this.props.onSelectionChange) this.props.onSelectionChange(this.getSelectedRows());
    }
    clearSelect() {
        Object.keys(this.rowSelecteds).forEach(key => {
            this.rowSelecteds[key] = false;
            this.dispatchRowEvent({ type: "onSelect", key: key, value: false })
        })
        this.rowSelecteds = {}
        if (this.props.onSelectionChange) this.props.onSelectionChange([]);
    }

    changePage(page: number) {
        if (!this.props.pageLimit) return;
        const totalPages = this.getTotalPages();
        if (page < 1 || page > totalPages) return;
        this.setState({ currentPage: page });
    }

    getVisibleData(): any[] {
        if (this.collapsedGroups.size === 0) return this.dataGrouped;
        const result: any[] = [];
        let collapsed = false;
        for (const item of this.dataGrouped) {
            if (item.__type === "group-header") {
                collapsed = this.collapsedGroups.has(item.__key);
                result.push(item);
            } else if (!collapsed) {
                result.push(item);
            }
        }
        return result;
    }

    toggleGroup(groupKey: string) {
        if (this.collapsedGroups.has(groupKey)) {
            this.collapsedGroups.delete(groupKey);
        } else {
            this.collapsedGroups.add(groupKey);
        }
        this.forceUpdate();
    }

    getTotalPages(): number {
        if (!this.props.pageLimit) return 1;
        return Math.ceil(this.getVisibleData().length / this.props.pageLimit);
    }

    getPaginatedData(): any[] {
        const visibleData = this.getVisibleData();
        if (!this.props.pageLimit) return visibleData;
        const startIndex = (this.state.currentPage - 1) * this.props.pageLimit;
        const endIndex = startIndex + this.props.pageLimit;
        return visibleData.slice(startIndex, endIndex);
    }

    getAdjustedColumnWidth(colKey: string): number {
        // Only adjust column width if the feature is enabled
        if (!this.props.adjustColumnWidth) {
            return this.colData[colKey].width;
        }

        const visibleCols = this.cols.filter(a => !this.colData[a.key].hidden);
        const totalOriginalWidth = visibleCols.reduce((sum, col) => sum + this.colData[col.key].width, 0);

        // Calculate available width considering padding and check column
        const padding = this.props.padding || 0;
        const checkColOffset = this.props.selectType === "check" ? CHECK_COL_WIDTH : 0;
        const availableWidth = this.containerWidth - (padding * 2) - checkColOffset;

        if (totalOriginalWidth >= availableWidth || availableWidth <= 0) {
            // Use original width when total width exceeds available space or no space available
            return this.colData[colKey].width;
        }

        // Distribute extra space proportionally among visible columns.
        // Use fractional parts to distribute any leftover pixels so total sums to availableWidth.
        const extraSpace = availableWidth - totalOriginalWidth;

        const targets = visibleCols.map(col => {
            const original = this.colData[col.key].width || 0;
            const proportionalExtra = (original / totalOriginalWidth) * extraSpace;
            const exact = original + proportionalExtra;
            const floored = Math.floor(exact);
            const frac = exact - floored;
            return { key: String(col.key), original, exact, floored, frac };
        });

        let sumFloored = targets.reduce((s, t) => s + t.floored, 0);
        // remainder pixels to distribute
        let remainder = Math.round(availableWidth - sumFloored);
        if (remainder < 0) remainder = 0;

        // distribute remaining pixels to columns with largest fractional parts
        targets.sort((a, b) => b.frac - a.frac);
        let idx = 0;
        while (remainder > 0 && targets.length > 0) {
            targets[idx % targets.length].floored += 1;
            remainder -= 1;
            idx += 1;
        }

        const found = targets.find(t => t.key === String(colKey));
        return found ? found.floored : (this.colData[colKey].width || 0);
    }

    getTotalColumnsWidth(): number {
        const visibleCols = this.cols.filter(a => !this.colData[a.key].hidden);
        const colsWidth = visibleCols.reduce((sum, col) => sum + (this.colData[col.key as string]?.width ?? 0), 0);
        return colsWidth + (this.props.selectType === "check" ? CHECK_COL_WIDTH : 0);
    }

    onContainerLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        if (width !== this.containerWidth) {
            this.containerWidth = width;
            // Force re-render of columns to apply new widths
            this.forceUpdate();
        }
    }

    buildChildrenTypes() {
        let children: AllowedChild<T>[];
        if (!Array.isArray(this.props.children)) {
            children = [this.props.children as AllowedChild<T>]
        } else {
            children = this.props.children as AllowedChild<T>[]
        }

        this.headers = [];
        this.cols = [];

        if (this.props.indexar) {
            const indexCol: any = React.createElement(Col as any, {
                key: INDEX_COL_KEY,
                label: "N°",
                width: 50,
                dataType: "number",
                disableFilter: true,
                disableSorter: true,
                disableGrouper: true,
                disableExport: true,
                data: (p: { row: any, index: number }) => p.index + 1,
                // p.index es la posición dentro de la página actual (se reinicia en cada página),
                // así que se suma el offset de página para obtener el correlativo real: 1, 2, 3...
                customComponent: (p: any) => {
                    const pageLimit = p.dinamicTable.props.pageLimit || 0;
                    const offset = pageLimit ? (p.dinamicTable.state.currentPage - 1) * pageLimit : 0;
                    return <Text style={p.textStyle}>{offset + p.index + 1}</Text>;
                },
            })
            this.cols.push(indexCol)
            this.colData[INDEX_COL_KEY] = {
                width: indexCol.props.width,
                wrap: indexCol.props.wrap
            }
        }

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (child.type === Header) {
                this.headers.push(child as ReactElement<typeof Header>)
            }
            if (child.type === Col) {
                const c: any = child as ReactElement<typeof Col<T>>
                this.cols.push(c)
                this.colData[c.key] = {
                    width: c.props.width,
                    wrap: c.props.wrap
                }
            }
        }
        // this.cols.sort((a, b) => a.key > b.key ? 1 : -1)
    }

    componentDidMount(): void {

        this._start();
    }
    async _start() {
        await this.loadInitialState();
        this.loadData()
    }

    async loadInitialState() {
        if (this.props.loadInitialState) {
            const state = await this.props.loadInitialState()
            this.setExportState(state)
        }
        this.forceUpdate();
    }
    async loadData() {
        try {


            // this.setState({ state: "loading" })
            this.data = await this.props.loadData()
            await this.applyFormatData();
            await this.applyFilter();
            this.setState({ state: "ready" })
        } catch (error) {
            console.error(error);
            this.setState({ state: "error", error: error })
        }

    }
    async applyFormatData() {
        this.dataFormat = this.data.map((item, index) => {
            const key = this.props.keyExtractor ? this.props.keyExtractor(item, index) : index + ""
            let newItem = {
                __key: key,
                __original: item
            } as any;
            this.cols.forEach((col) => {
                const colProps = col.props as unknown as ColPropsType<T>;
                let data = colProps.data({ row: item, index: index });

                if (!data) {
                    data = ""
                }
                switch (colProps.dataType) {
                    case "number":
                        data = Number(data)
                        if (isNaN(data)) {
                            data = 0;
                        }
                        break;
                    case "string":
                        data = Array.isArray(data) ? data : data + ""
                        break;
                    case "date":
                    case "time":
                    case "datetime":
                        if (!!data) {
                            if (data instanceof Date) {
                                data = data
                            } else {
                                data = new Date(data)
                                if (isNaN(data.getTime())) {
                                    data = "INVALID DATE"
                                }
                            }
                        }
                        break;
                    case "boolean":
                        if (typeof data === "string") {
                            data = Boolean(data)
                        }
                        if (typeof data === "number") {
                            data = Boolean(data)
                        }
                        if (typeof data === "boolean") {
                            data = data
                        }
                        break;
                    default:
                        data = "INVALID FORMAT"
                        break;
                }

                newItem[col.key] = data;

                // colProps.dataType
            })
            return newItem;
        })
    }


    async applyFilter() {
        this.dataFiltrada = await Filter.filterData(this.dataFormat, this.filtros)
        if (this.buscador) {
            this.dataFiltrada = this.dataFiltrada.filter((item: any) => {
                let found = false;
                Object.keys(item).forEach(key => {
                    if (typeof item[key] === "string") {
                        if (item[key].toLowerCase().includes(this.buscador.toLowerCase())) {
                            found = true;
                        }
                    }
                })
                return found;
            })
        }
        await this.applySort();
    }
    async applySort() {
        this.dataFiltrada = Sorter.sort(this.dataFiltrada, this.sorter);
        await this.applyGroup();
    }

    async applyGroup() {
        this.dataGrouped = Grouper.group(this.dataFiltrada, this.groupers);
        this.forceUpdate();
    }


    getExportState(): ExporterStateType {
        return {
            filters: this.filtros,
            sorters: this.sorter,
            cols: this.colData,
            groupers: this.groupers,
        }
    }
    setExportState(state: ExporterStateType) {
        this.filtros = state.filters ?? [];
        this.sorter = state.sorters ?? [];
        this.groupers = state.groupers ?? [];

        Object.keys(this.colData).forEach(key => {
            if (state.cols && state.cols[key]) {
                this.colData[key] = {
                    ...this.colData[key],
                    ...state.cols[key]
                }
            }
        })
        // this.colData = {
        //     ...this.colData,
        //     ...(state.cols ?? {})
        // }
    }
    applyHeaderSize = () => {
        Object.keys(this.colRef).forEach(key => {
            const col = this.colRef[key];
            if (col) {
                col.currentWidth = this.colData[key].width;
                col.widthAnim.setValue(this.colData[key].width);
            }
        })
    }

    async addRow(data: any) {
        // this.data.push(data);
        this.data.splice(0, 0, data)
        await this.applyFormatData();
        await this.applyFilter();
    }

    renderCantidadResultados() {
        return <Text style={{ color: this.colors.text, fontSize: 12 }}>{"Resultados: " + this.dataFiltrada.length + " de " + this.dataFormat.length}</Text>
    }

    private renderHeaderGroups() {
        const groups = this.props.headerGroups;
        if (!groups || groups.length === 0) return null;

        const visibleCols = this.cols.filter(a => !this.colData[a.key as string].hidden);
        const keyToGroupIndex: { [key: string]: number } = {};
        groups.forEach((g, gi) => g.cols.forEach(k => { keyToGroupIndex[k] = gi; }));

        const runs: { refKey: string, label?: string, width: number, style?: ViewStyle, textStyle?: TextStyle }[] = [];
        let i = 0;
        while (i < visibleCols.length) {
            const colKey = String(visibleCols[i].key);
            const gi = keyToGroupIndex[colKey];
            if (gi === undefined) {
                runs.push({ refKey: colKey, width: this.getAdjustedColumnWidth(colKey) });
                i++;
                continue;
            }
            let width = 0;
            let j = i;
            while (j < visibleCols.length && keyToGroupIndex[String(visibleCols[j].key)] === gi) {
                width += this.getAdjustedColumnWidth(String(visibleCols[j].key));
                j++;
            }
            runs.push({ refKey: `group-${gi}-${colKey}`, label: groups[gi].label, width, style: groups[gi].style, textStyle: groups[gi].textStyle });
            i = j;
        }

        return (
            <View style={{ flexDirection: "row" }}>
                {this.props.selectType === "check" && <View style={{ width: CHECK_COL_WIDTH }} />}
                {runs.map(r => (
                    <View key={r.refKey} style={[{
                        width: r.width,
                        height: 28,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: r.label ? 0.5 : 0,
                        borderColor: this.colors.border,
                        backgroundColor: r.label ? this.colors.header : "transparent",
                    }, r.style]}>
                        {r.label ? (
                            <Text numberOfLines={1} style={[{ color: this.colors.text, fontWeight: "bold", fontSize: 11 }, this.props.textStyle, r.textStyle]}>
                                {r.label}
                            </Text>
                        ) : null}
                    </View>
                ))}
            </View>
        );
    }

    private renderColumnHeaders() {
        return (
            <View style={{ flexDirection: "row" }}>
                {this.props.selectType === "check" && (
                    <CheckHeader
                        ref={ref => this.checkHeaderRef = ref}
                        width={CHECK_COL_WIDTH}
                        dinamicTableInstance={this}
                    />
                )}
                {this.cols.filter(a => !this.colData[a.key as string].hidden).map((c) => {
                    const cKey = c.key as string;
                    return React.cloneElement(c, {
                        key: cKey,
                        id: cKey,
                        dinamicTableInstance: this,
                        headerStyle: this.props.headerStyle ? { ...this.props.headerStyle, ...((c.props as any).headerStyle ?? {}) } : {},
                        ...this.props.headerTextStyle ? { textStyle: this.props.headerTextStyle } : {},
                        ref: (ref: any) => this.colRef[cKey] = ref,
                    } as any);
                })}
            </View>
        );
    }

    private renderColumnFooters() {
        return (
            <View style={{ flexDirection: "row" }}>
                {this.props.selectType === "check" && <View style={{ width: CHECK_COL_WIDTH }} />}
                {this.cols.filter(a => !this.colData[a.key as string].hidden).map((c) => (
                    <View key={String(c.key)} style={{ width: this.getAdjustedColumnWidth(String(c.key)) }}>
                        {(c.props as any).footerComponent
                            ? (c.props as any).footerComponent({ textStyle: this.textStyle, dinamicTable: this })
                            : null}
                    </View>
                ))}
            </View>
        );
    }

    private renderListItem(item: any, index: number) {
        if (item.__type === "group-header") {
            const col: any = this.cols.find(a => a.key == item.__groupKey);
            const label = col?.props?.label ?? item.__groupKey;
            const colProps = col?.props as ColPropsType<any> | undefined;
            const colData = this.colData[item.__groupKey];
            const rawValue = item.__groupRawValue;
            const firstRow = item.__groupFirstRow;

            let valueNode: any;
            if (colProps?.customComponent) {
                valueNode = colProps.customComponent({
                    data: rawValue, dataFormat: rawValue,
                    row: firstRow?.__original, index: 0,
                    textStyle: { ...this.textStyle, fontWeight: "bold" as any, fontSize: 12 },
                    dinamicTable: this, colData,
                });
            } else if (colProps?.format) {
                const formatted = colProps.format({
                    data: rawValue, row: firstRow?.__original, index: 0,
                    textStyle: { ...this.textStyle, fontWeight: "bold" as any, fontSize: 12 },
                });
                valueNode = <Text style={[this.textStyle, { fontWeight: "bold", fontSize: 12, flex: 1 }]} numberOfLines={1}>{formatted}</Text>;
            } else {
                valueNode = <Text style={[this.textStyle, { fontWeight: "bold", fontSize: 12, flex: 1 }]} numberOfLines={1}>{item.__groupValue}</Text>;
            }

            const isCollapsed = this.collapsedGroups.has(item.__key);
            return (
                <TouchableOpacity
                    onPress={() => this.toggleGroup(item.__key)}
                    activeOpacity={0.7}
                    style={{ width: "100%", marginTop: 12 }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 4, paddingBottom: 4 }}>
                        <Text style={[this.textStyle, { fontSize: 10, opacity: 0.7, marginRight: 6, width: 10 }]}>
                            {isCollapsed ? "▶" : "▾"}
                        </Text>
                        <Text style={[this.textStyle, { fontSize: 10, opacity: 0.5, marginRight: 4 }]}>{label}</Text>
                        <View style={{ flex: 1 }} pointerEvents="none">{valueNode}</View>
                        <View style={{ backgroundColor: this.colors.accent + "30", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 1, marginLeft: 8, alignItems: "center" }}>
                            <Text style={[this.textStyle, { fontSize: 9, opacity: 0.8 }]}>{item.__count}</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: this.colors.accent + "40", marginBottom: 1 }} />
                </TouchableOpacity>
            );
        }
        return <Row key={"row" + index} item={item} index={index} dinamicTableInstance={this} colWidthVersion={this._colWidthVersion} />;
    }

    private renderStates() {
        if (this.state.state === "loading") {
            return this.props.renderLoading
                ? this.props.renderLoading({ dinamicTable: this })
                : <View style={{ width: "100%", padding: 8 }}>
                    <Text style={this.textStyle}>{SLanguage.select({ en: "Loading data... please wait.", es: "Cargando datos... por favor espera." })}</Text>
                </View>;
        }
        if (this.state.state === "error") {
            return this.props.renderError
                ? this.props.renderError({ error: this.state.error, dinamicTable: this })
                : <View style={{ width: "100%", padding: 8 }}>
                    <Text style={this.textStyle}>{SLanguage.select({ en: "An error occurred while loading data.", es: "Ocurrió un error al cargar los datos." })}</Text>
                    <Text style={this.textStyle}>{JSON.stringify(this.state.error)}</Text>
                </View>;
        }
        if (this.state.state === "ready" && this.dataFiltrada.length <= 0) {
            return this.props.renderNoResults
                ? this.props.renderNoResults({ dinamicTable: this })
                : <View style={{ width: "100%", padding: 8 }}>
                    <Text style={this.textStyle}>{SLanguage.select({ es: "No se encontraron resultados.", en: "No results found." })}</Text>
                </View>;
        }
        return null;
    }

    private renderWebLayout(contentMinWidth: number | string) {
        const ROW_HEIGHT = 30;
        const GROUP_HEADER_HEIGHT = 48;
        const paginatedData = this.getPaginatedData();
        const hasData = this.state.state === "ready" && paginatedData.length > 0;
        const hasColFooters = this.cols.some(c => !!(c.props as any).footerComponent);
        const hasListFooter = !!this.props.listFooterComponent;

        // listFooterComponent is appended as the last virtual item so it appears
        // immediately after the last data row (not anchored to the container bottom).
        const webData = (hasData && hasListFooter)
            ? [...paginatedData, { __type: "list-footer", __key: "__list-footer__" }]
            : paginatedData;

        if (!hasColFooters && this._webFooterHeight !== 0) this._webFooterHeight = 0;
        // listHeight is measured explicitly to avoid Yoga / CSS overflow interaction issues.
        // Only column footers (hasColFooters) are fixed outside the list; listFooterComponent
        // scrolls with the data as the last virtual item.
        const listHeight = Math.max(0, this._webBodyHeight - this._webHeaderHeight - this._webFooterHeight);

        return (
            <View
                style={{ flex: 1 }}
                onLayout={(e) => {
                    const h = e.nativeEvent.layout.height;
                    if (h !== this._webBodyHeight) { this._webBodyHeight = h; this.forceUpdate(); }
                }}
            >
                <View style={{ height: this._webBodyHeight, overflowX: "auto", overflowY: "hidden" } as any}>
                    {/* @ts-ignore */}
                    <View style={{ minWidth: contentMinWidth, height: this._webBodyHeight, flexDirection: "column" }}>
                        <View onLayout={(e) => {
                            const h = e.nativeEvent.layout.height;
                            if (h !== this._webHeaderHeight) { this._webHeaderHeight = h; this.forceUpdate(); }
                        }}>
                            {this.renderHeaderGroups()}
                            {this.renderColumnHeaders()}
                        </View>
                        {this.renderStates()}
                        {hasData && listHeight > 0 && (
                            <View style={{ height: listHeight }}>
                                <SFlashList
                                    ref={ref => { this._sFlashRef = ref; }}
                                    estimatedItemSize={ROW_HEIGHT}
                                    getItemSize={(index) => {
                                        const item = webData[index];
                                        if (item?.__type === "list-footer") return this._webListFooterHeight || 30;
                                        return item?.__type === "group-header" ? GROUP_HEADER_HEIGHT : ROW_HEIGHT;
                                    }}
                                    data={webData}
                                    renderItem={({ item, index }) => {
                                        if (item.__type === "list-footer") {
                                            return (
                                                <View onLayout={(e) => {
                                                    const h = e.nativeEvent.layout.height;
                                                    if (h !== this._webListFooterHeight) {
                                                        this._webListFooterHeight = h;
                                                        this._sFlashRef?.resetAfterIndex(index, false);
                                                    }
                                                }}>
                                                    {this.props.listFooterComponent!()}
                                                </View>
                                            );
                                        }
                                        return this.renderListItem(item, index);
                                    }}
                                />
                            </View>
                        )}
                        {hasColFooters && (
                            <View onLayout={(e) => {
                                const h = e.nativeEvent.layout.height;
                                if (h !== this._webFooterHeight) { this._webFooterHeight = h; this.forceUpdate(); }
                            }}>
                                {this.renderColumnFooters()}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    }

    private renderMobileLayout(contentMinWidth: number | string, columnsCanExpand: boolean) {
        return (
            <ScrollView
                horizontal
                scrollEnabled={!columnsCanExpand}
                showsHorizontalScrollIndicator={!columnsCanExpand}
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={{
                    flexDirection: "column",
                    minWidth: contentMinWidth,
                    padding: this.props.padding,
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
            >
                {this.renderHeaderGroups()}
                {this.renderColumnHeaders()}
                {this.renderStates()}
                {this.state.state === "ready" && this.dataFiltrada.length > 0 &&
                    <FlatList
                        data={this.getPaginatedData()}
                        contentContainerStyle={{ minWidth: "100%", alignItems: "flex-start", paddingRight: 70 }}
                        keyExtractor={(item) => item.__key}
                        ListFooterComponent={() => (
                            <>
                                <View style={{ flexDirection: "row" }}>
                                    {this.props.selectType === "check" && <View style={{ width: CHECK_COL_WIDTH }} />}
                                    {this.cols.filter(a => !this.colData[a.key as string].hidden).map((c) => (
                                        <View key={String(c.key)} style={{ width: this.getAdjustedColumnWidth(String(c.key)) }}>
                                            {(c.props as any).listFooterComponent
                                                ? (c.props as any).listFooterComponent({ textStyle: this.textStyle, dinamicTable: this })
                                                : null}
                                        </View>
                                    ))}
                                </View>
                                {this.props.listFooterComponent ? this.props.listFooterComponent() : null}
                            </>
                        )}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                }
                {this.renderColumnFooters()}
            </ScrollView>
        );
    }

    render() {
        if (this.props.onEvent) {
            this.props.onEvent({ evt: "render" })
        }
        const size = this.props.iconSize ?? 22;

        const padding = this.props.padding || 0;
        const availableWidth = this.containerWidth - (padding * 2);
        const totalOriginalWidth = this.getTotalColumnsWidth();
        const columnsCanExpand = !!(this.props.adjustColumnWidth &&
            totalOriginalWidth < availableWidth &&
            availableWidth > 0);
        const contentMinWidth = columnsCanExpand ? "100%" : totalOriginalWidth;

        return (
            <View style={{ flex: 1, width: "100%" }} ref={ref => this.containerRef = ref} onLayout={this.onContainerLayout}>
                <View style={{
                    flexDirection: "row", alignItems: "center", flexWrap: "wrap",
                    padding: this.props.padding ?? 0, paddingBottom: 0, paddingTop: 0,
                    // @ts-ignore
                    gap: 4,
                }}>
                    {!this.props.hiddenMenu && <>
                        <TopMenuOptions dinamicTableInstance={this} />
                        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                            <TextInput
                                placeholderTextColor={this.colors.card}
                                style={[this.inputStyle, { height: size, paddingStart: 26 }]}
                                placeholder="Search..."
                                onChangeText={e => { this.buscador = e; this.applyFilter(); }}
                            />
                            <View style={{ width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8 }}>
                                <Assets.Search fill={this.colors.accent} />
                            </View>
                        </View>
                        {this.renderCantidadResultados()}
                    </>}
                    <MenuSorter dinamicTableInstance={this} />
                    <MenuFilter dinamicTableInstance={this} />
                    <MenuGrouper dinamicTableInstance={this} />
                    {this.props.renderHeaderActions && this.props.renderHeaderActions({ dinamicTable: this })}
                    {this.props.pageLimit ? <Paginador dinamicTableInstance={this} /> : null}
                </View>

                <View style={{ height: 4 }} />

                {Platform.OS === "web"
                    ? this.renderWebLayout(contentMinWidth)
                    : this.renderMobileLayout(contentMinWidth, columnsCanExpand)
                }

                <Popup ref={ref => this.popup = ref} dinamicTableInstance={this} />
            </View>
        );
    }
}

