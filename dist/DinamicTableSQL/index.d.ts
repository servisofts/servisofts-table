import { GestureResponderEvent, TextStyle, ViewStyle } from "react-native";
import { Language } from "../Components/SLanguage";
import DinamicTableSQL, { AllowedChild } from "./DinamicTableSQL";
export declare const OPERATORS: {
    EQUAL: string;
    NOT_EQUAL: string;
    GREATER_THAN: string;
    LESS_THAN: string;
    GREATER_THAN_OR_EQUAL: string;
    LESS_THAN_OR_EQUAL: string;
    CONTAINS: string;
    STARTS_WITH: string;
    ENDS_WITH: string;
    IS_NULL: string;
    IS_NOT_NULL: string;
    IS_TRUE: string;
    IS_FALSE: string;
    BETWEEN: string;
};
export declare const OPERADORES: {
    string: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    number: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    boolean: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    date: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
};
export type Colors = {
    text?: string;
    background?: string;
    card?: string;
    border?: string;
    accent?: string;
    header?: string;
};
export type CellStyle = {} & ViewStyle;
export type stateType = {
    state: "loading" | "ready" | "error";
};
export type ColData = {
    width?: number;
    wrap?: boolean;
    hidden?: boolean;
};
export type DataType = "number" | "string" | "boolean" | "date";
export type SorterType = {
    key: string;
    order: "asc" | "desc";
    type: DataType;
    dateFormat?: string;
};
type DataTypeOperators = typeof OPERATORS[keyof typeof OPERATORS];
export type FilterType = {
    col: string;
    value: any;
    type: DataType;
    operator: DataTypeOperators;
    dateFormat?: string;
};
export type ExporterStateType = {
    limit: number;
    offset: number;
    filters?: FilterType[];
    sorters?: SorterType[];
    cols?: {
        [key: string]: ColData;
    };
};
export type DinamicTableSQLPropsType<T> = {
    loadData: (p: DinamicTableSQL<T>) => Promise<T[]>;
    loadSize?: (p: DinamicTableSQL<T>) => Promise<T>;
    loadInitialState?: () => Promise<ExporterStateType>;
    cellStyle?: CellStyle;
    textStyle?: TextStyle;
    style?: any;
    children: AllowedChild<T> | AllowedChild<T>[];
    colors?: Colors;
    keyExtractor?: (item: T, index: number) => string;
    selectType?: "single" | "multiple";
    onSelect?: (p: {
        evt: GestureResponderEvent;
        key: string;
        row: T;
    }) => void;
    language?: Language;
    onEvent?: (p: {
        evt: "render";
    }) => void;
    iconSize?: number;
    filter?: (p: {
        row: T;
    }) => boolean;
};
export { DinamicTableSQL, };
