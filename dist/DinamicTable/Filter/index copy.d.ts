import { DataType } from "..";
declare const EQ = "=";
declare const NEQ = "!=";
declare const LT = "<";
declare const GT = ">";
declare const LTE = "<=";
declare const GTE = ">=";
declare const CONTAINS = "contains";
declare const STARTS_WITH = "startsWith";
declare const ENDS_WITH = "endsWith";
declare const TRUE = "true";
declare const FALSE = "false";
declare const IS_NULL = "isnull";
declare const IS_NOT_NULL = "isnotnull";
type DataTypeOperators = typeof EQ | typeof NEQ | typeof LT | typeof GT | typeof LTE | typeof GTE | typeof TRUE | typeof FALSE | typeof CONTAINS | typeof STARTS_WITH | typeof ENDS_WITH | typeof IS_NULL | typeof IS_NOT_NULL;
export declare const OPERADORES: {
    string: {
        value: string;
        label: string;
        params: number;
    }[];
    number: {
        value: string;
        label: string;
        params: number;
    }[];
    boolean: {
        value: string;
        label: string;
        params: number;
    }[];
    date: {
        value: string;
        label: string;
        params: number;
    }[];
};
export type FilterType = {
    col: string;
    value: any;
    type: DataType;
    operator: DataTypeOperators;
    dateFormat?: string;
};
export default class Filter {
    static filterData(data: any[], filters: FilterType[]): Promise<any[]>;
    static filterString(filter: FilterType, item: any): boolean;
    static filterNumber(filter: FilterType, item: any): boolean;
    static filterBoolean(filter: FilterType, item: any): boolean;
    static filterDate(filter: FilterType, item: any): boolean;
}
export {};
