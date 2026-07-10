import { DataType } from "..";
import SDate from "../../Components/SDate";

export type SorterType = {
    key: string,
    order: "asc" | "desc",
    type: DataType,
    dateFormat?: string,
}

export default class Sorter {

    static sort(data: any[], sorterArray: SorterType[]) {
        const ftdata = data.sort((a, b) => {
            for (const sorter of sorterArray) {
                const { key, order, type } = sorter;
                let valueA = a[key];
                let valueB = b[key];

                let compareResult = 0;

                if(valueA === null && valueB === null) return 0;
                if(valueA === null) return order === 'asc' ? -1 : 1;
                if(valueB === null) return order === 'asc' ? 1 : -1;

                switch (type) {
                    case 'number':
                        compareResult = valueA - valueB;
                        break;
                    case 'string':
                        compareResult = String(valueA).localeCompare(String(valueB));
                        break;
                    case 'boolean':
                        compareResult = Number(valueA) - Number(valueB);
                        break;
                    case 'date':
                    case 'datetime':
                        if(sorter.dateFormat) {
                            console.log("Asdasdas");
                            const a1= new SDate(valueA);
                            const a2 = a1.toString(sorter.dateFormat as any);
                            const a3 = new SDate(a2, sorter.dateFormat as any);

                            valueA = a3;
                            valueB = new SDate((new SDate(valueB).toString(sorter.dateFormat as any)), sorter.dateFormat as any);
                        }

                        compareResult = valueA.getTime() - valueB.getTime();
                        break;
                    case 'time':
                        // Only the hour/minute of day matter, the date part is irrelevant.
                        compareResult = (valueA.getHours() * 60 + valueA.getMinutes()) - (valueB.getHours() * 60 + valueB.getMinutes());
                        break;
                    default:
                        break;
                }

                if (compareResult !== 0) {
                    return order === 'asc' ? compareResult : -compareResult;
                }
                
            }
            // const valA = a[sorter.key] ?? null;
            // const valB = b[sorter.key] ?? null;
            // if (valA === null && valB === null) return 0;
            // if (valA === null) return sorter.order === "asc" ? 1 : -1;
            // if (valB === null) return sorter.order === "asc" ? -1 : 1;

            // if (valA > valB) return sorter.order === "asc" ? 1 : -1;
            // if (valA < valB) return sorter.order === "asc" ? -1 : 1;
            return 0;
        })
        return ftdata;
    }
}