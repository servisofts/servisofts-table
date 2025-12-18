import DinamicTable from "./DinamicTable";

export type DataType = "number" | "string" | "boolean" | "date";



type Filtro = {
    col: string,
    value: string,
    operator: string,
}



export {
    DinamicTable,
}