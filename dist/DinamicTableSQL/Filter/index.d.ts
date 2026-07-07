import { DataType } from "..";
type DataTypeOperators = typeof OPERATORS[keyof typeof OPERATORS];
export type FilterType = {
    col: string;
    value: any;
    type: DataType;
    operator: DataTypeOperators;
    dateFormat?: string;
};
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
    IS_NOW: string;
};
export default class Filter {
    static filterData(data: any[], filters: FilterType[]): Promise<any[]>;
}
export {};
