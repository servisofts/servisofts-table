import { DataType } from "..";
import SDate from "../../Components/SDate";

export type GrouperType = {
    key: string,
    type: DataType,
    dateFormat?: string,
}

export default class Grouper {
    static group(data: any[], groupers: GrouperType[]): any[] {
        if (!groupers || groupers.length === 0) return data;

        const grouper = groupers[0];
        const groupMap: Map<string, any[]> = new Map();
        const groupOrder: string[] = [];

        data.forEach(item => {
            let value = item[grouper.key];
            let displayValue: string;

            if (value === null || value === undefined || value === "") {
                displayValue = "(empty)";
            } else if ((grouper.type === "date" || grouper.type === "datetime") && value instanceof Date) {
                displayValue = grouper.dateFormat
                    ? String(new SDate(value).toString(grouper.dateFormat as any))
                    : value.toISOString();
            } else if (grouper.type === "time" && value instanceof Date) {
                // Group by hour/minute of day only, ignoring the date part.
                displayValue = grouper.dateFormat
                    ? String(new SDate(value).toString(grouper.dateFormat as any))
                    : `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
            } else {
                displayValue = value.toString();
            }

            if (!groupMap.has(displayValue)) {
                groupMap.set(displayValue, []);
                groupOrder.push(displayValue);
            }
            groupMap.get(displayValue)!.push(item);
        });

        const result: any[] = [];
        groupOrder.forEach(groupValue => {
            const rows = groupMap.get(groupValue)!;
            result.push({
                __type: "group-header",
                __groupKey: grouper.key,
                __groupValue: groupValue,
                __groupRawValue: rows[0][grouper.key],
                __groupFirstRow: rows[0],
                __count: rows.length,
                __key: `__group-${grouper.key}-${groupValue}`,
            });
            rows.forEach(row => result.push(row));
        });

        return result;
    }
}
