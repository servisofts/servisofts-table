import { DataType } from "..";
export type SorterType = {
    key: string;
    order: "asc" | "desc";
    type: DataType;
    dateFormat?: string;
};
export default class Sorter {
    static sort(data: any[], sorterArray: SorterType[]): any[];
}
