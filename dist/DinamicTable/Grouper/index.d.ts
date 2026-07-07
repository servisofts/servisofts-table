import { DataType } from "..";
export type GrouperType = {
    key: string;
    type: DataType;
    dateFormat?: string;
};
export default class Grouper {
    static group(data: any[], groupers: GrouperType[]): any[];
}
