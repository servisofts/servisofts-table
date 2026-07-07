import { GestureResponderEvent, TextStyle, ViewStyle } from "react-native";
import { Language } from "../Components/SLanguage";
import DinamicTableSQL, { AllowedChild } from "./DinamicTableSQL";

export const OPERATORS = {
    EQUAL: "=",
    NOT_EQUAL: "!=",
    GREATER_THAN: ">",
    LESS_THAN: "<",
    GREATER_THAN_OR_EQUAL: ">=",
    LESS_THAN_OR_EQUAL: "<=",
    CONTAINS: "contains",
    STARTS_WITH: "startsWith",
    ENDS_WITH: "endsWith",
    IS_NULL: "isnull",
    IS_NOT_NULL: "isnotnull",
    IS_TRUE: "istrue",
    IS_FALSE: "isfalse",
    BETWEEN: "between",
    IS_NOW: "isnow",
}


export const OPERADORES = {
    string: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.STARTS_WITH, label: { en: "Starts with", es: "Empieza con" }, params: 1 },
        { value: OPERATORS.ENDS_WITH, label: { en: "Ends with", es: "Termina con" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    number: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    boolean: [
        { value: OPERATORS.IS_TRUE, label: { en: "Is true", es: "Es verdadero" }, params: 0 },
        { value: OPERATORS.IS_FALSE, label: { en: "Is false", es: "Es falso" }, params: 0 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    date: [
        { value: OPERATORS.BETWEEN, label: { en: "Between", es: "Entre" }, params: 2 },
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOW, label: { en: "= now()", es: "= ahora()" }, params: 0 },
    ],
}


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

export type stateType = {
    state: "loading" | "ready" | "error",
}



export type ColData = {
    width?: number,
    wrap?: boolean,
    hidden?: boolean,
}


export type DataType = "number" | "string" | "boolean" | "date";


export type SorterType = {
    key: string,
    order: "asc" | "desc",
    type: DataType,
    dateFormat?: string,
}



type DataTypeOperators = typeof OPERATORS[keyof typeof OPERATORS];

export type FilterType = {
    col: string,
    value: any,
    type: DataType,
    operator: DataTypeOperators,
    dateFormat?: string,
}



export type ExporterStateType = {
    limit: number,
    offset: number,
    filters?: FilterType[];
    sorters?: SorterType[],
    cols?: { [key: string]: ColData }
}

export type DinamicTableSQLPropsType<T> = {
    loadData: (p: DinamicTableSQL<T>) => Promise<T[]>,
    loadSize?: (p: DinamicTableSQL<T>) => Promise<T>,
    loadInitialState?: () => Promise<ExporterStateType>,
    cellStyle?: CellStyle,
    textStyle?: TextStyle,
    style?: any,
    children: AllowedChild<T> | AllowedChild<T>[],
    colors?: Colors,
    keyExtractor?: (item: T, index: number) => string,
    selectType?: "single" | "multiple",
    onSelect?: (p: { evt: GestureResponderEvent, key: string, row: T, }) => void,
    language?: Language,
    onEvent?: (p: { evt: "render" }) => void,
    iconSize?: number,
    filter?: (p: { row: T }) => boolean
}

export {
    DinamicTableSQL,
}