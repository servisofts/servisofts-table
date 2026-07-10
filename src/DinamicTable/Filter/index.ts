import { DataType } from "..";

type DataTypeOperators = typeof OPERATORS[keyof typeof OPERATORS];

// "time" filters compare only the hour/minute of day, ignoring the date part
// and whatever dateFormat the column displays (eg. "yyyy-MM-dd hh:mm:ss").
// Accepts a Date, a plain "HH:mm"/"HH:mm:ss" string (typed in the filter input),
// or a full date/ISO string (picked from the filter's value checklist).
const minutesOfDay = (value: Date | string) => {
    if (value instanceof Date) return value.getHours() * 60 + value.getMinutes();
    const plainTime = String(value).match(/^(\d{1,2}):(\d{2})/);
    if (plainTime) return Number(plainTime[1]) * 60 + Number(plainTime[2]);
    const asDate = new Date(value);
    if (!isNaN(asDate.getTime())) return asDate.getHours() * 60 + asDate.getMinutes();
    return 0;
}

// "date" filters compare only the calendar day, ignoring whatever time of day
// the underlying value carries (a column can hold a full timestamp and still
// display it via dateFormat="yyyy-MM-dd hh:mm:ss" while filtering by day only).
const startOfDay = (value: Date | string) => {
    const d = value instanceof Date ? value : new Date(value);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

// "datetime" filters compare the exact timestamp (day + time together),
// unlike "date" (day only) and "time" (time of day only).
const toTimestamp = (value: Date | string) => (value instanceof Date ? value : new Date(value)).getTime();

export type FilterType = {
    col: string,
    value: any,
    type: DataType,
    operator: DataTypeOperators,
    dateFormat?: string,
}

export const OPERATORS = {
    EQUAL: "=",
    NOT_EQUAL: "!=",
    GREATER_THAN: ">",
    LESS_THAN: "<",
    GREATER_THAN_OR_EQUAL: ">=",
    LESS_THAN_OR_EQUAL: "<=",
    CONTAINS: "contains",
    NO_CONTAINS: "nocontains",
    STARTS_WITH: "startsWith",
    ENDS_WITH: "endsWith",
    IS_NULL: "isnull",
    IS_NOT_NULL: "isnotnull",
    IS_TRUE: "istrue",
    IS_FALSE: "isfalse",
    BETWEEN: "between",
}

const OPERATORS_FUNCTIONS: { [key: string]: (data: any, value: any, filtro: FilterType) => boolean } = {
    [OPERATORS.EQUAL]: (data, value, filtro) => {
        if (!data) return false;
        if (filtro.type == "date") {
            const dataDay = startOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataDay == startOfDay(v));
            }
            return dataDay == startOfDay(value)
        }
        if (filtro.type == "time") {
            const dataMinutes = minutesOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataMinutes == minutesOfDay(v));
            }
            return dataMinutes == minutesOfDay(value)
        }
        if (filtro.type == "datetime") {
            const dataTime = toTimestamp(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataTime == toTimestamp(v));
            }
            return dataTime == toTimestamp(value)
        }
        if (Array.isArray(filtro.value)) {

            return filtro.value.some((value) => data == value);
        }
        return data == value
    },
    [OPERATORS.NOT_EQUAL]: (data, value, filtro) => {
        if (!data) return false;
        if (filtro.type == "date") {
            const dataDay = startOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataDay != startOfDay(v));
            }
            return dataDay != startOfDay(value)
        }
        if (filtro.type == "time") {
            const dataMinutes = minutesOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataMinutes != minutesOfDay(v));
            }
            return dataMinutes != minutesOfDay(value)
        }
        if (filtro.type == "datetime") {
            const dataTime = toTimestamp(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataTime != toTimestamp(v));
            }
            return dataTime != toTimestamp(value)
        }
        if (Array.isArray(filtro.value)) {
            return filtro.value.some((value) => data != value);
        }
        return data != value
    },
    [OPERATORS.GREATER_THAN]: (data, value, filtro) => {
        if (!data) return false;
        if (filtro.type == "date") {
            const dataDay = startOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataDay > startOfDay(v));
            }
            return dataDay > startOfDay(value)
        }
        if (filtro.type == "time") {
            const dataMinutes = minutesOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataMinutes > minutesOfDay(v));
            }
            return dataMinutes > minutesOfDay(value)
        }
        if (filtro.type == "datetime") {
            const dataTime = toTimestamp(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataTime > toTimestamp(v));
            }
            return dataTime > toTimestamp(value)
        }
        return data > value
    },
    [OPERATORS.LESS_THAN]: (data, value, filtro) => {
        if (!data) return false;
        if (filtro.type == "date") {
            const dataDay = startOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataDay < startOfDay(v));
            }
            return dataDay < startOfDay(value)
        }
        if (filtro.type == "time") {
            const dataMinutes = minutesOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataMinutes < minutesOfDay(v));
            }
            return dataMinutes < minutesOfDay(value)
        }
        if (filtro.type == "datetime") {
            const dataTime = toTimestamp(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataTime < toTimestamp(v));
            }
            return dataTime < toTimestamp(value)
        }
        return data < value
    },
    [OPERATORS.GREATER_THAN_OR_EQUAL]: (data, value, filtro) => {
        if (!data) return false;
        if (filtro.type == "date") {
            const dataDay = startOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataDay >= startOfDay(v));
            }
            return dataDay >= startOfDay(value)
        }
        if (filtro.type == "time") {
            const dataMinutes = minutesOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataMinutes >= minutesOfDay(v));
            }
            return dataMinutes >= minutesOfDay(value)
        }
        if (filtro.type == "datetime") {
            const dataTime = toTimestamp(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataTime >= toTimestamp(v));
            }
            return dataTime >= toTimestamp(value)
        }
        return data >= value
    },
    [OPERATORS.LESS_THAN_OR_EQUAL]: (data, value, filtro) => {
        if (!data) return false;
        if (filtro.type == "date") {
            const dataDay = startOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataDay <= startOfDay(v));
            }
            return dataDay <= startOfDay(value)
        }
        if (filtro.type == "time") {
            const dataMinutes = minutesOfDay(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataMinutes <= minutesOfDay(v));
            }
            return dataMinutes <= minutesOfDay(value)
        }
        if (filtro.type == "datetime") {
            const dataTime = toTimestamp(data);
            if (Array.isArray(value)) {
                return value.some((v) => dataTime <= toTimestamp(v));
            }
            return dataTime <= toTimestamp(value)
        }
        return data <= value
    },
    [OPERATORS.CONTAINS]: (data, value, filtro) => {
        if (!data) return false;
        const str = (Array.isArray(data) ? data.join(",") : data.toString()).toUpperCase();
        if (Array.isArray(filtro.value)) {
            return filtro.value.some((value) => str.includes(value.toUpperCase()));
        }
        return str.includes(value.toUpperCase())
    },
    [OPERATORS.NO_CONTAINS]: (data, value, filtro) => {
        if (!data) return false;
        const str = (Array.isArray(data) ? data.join(",") : data.toString()).toUpperCase();
        if (Array.isArray(filtro.value)) {
            return filtro.value.some((value) => !str.includes(value.toUpperCase()));
        }
        return !str.includes(value.toUpperCase())
    },
    
    [OPERATORS.STARTS_WITH]: (data, value) => {
        if (!data) return false;
        return data.startsWith(value)
    },
    [OPERATORS.ENDS_WITH]: (data, value) => {
        if (!data) return false;
        return data.endsWith(value)
    },
    [OPERATORS.IS_NULL]: (data) => {
        return !data
    },
    [OPERATORS.IS_NOT_NULL]: (data) => {
        return data != null
    },
    [OPERATORS.IS_TRUE]: (data) => {
        return data == true
    },
    [OPERATORS.IS_FALSE]: (data) => {
        return data == false
    },
    [OPERATORS.BETWEEN]: (data, value, filtro) => {
        if (!data) return false;
        if (!Array.isArray(value) || value.length !== 2) return false;

        const [start, end] = value;

        if (filtro.type === "date") {
            const dataDay = startOfDay(data);
            return dataDay >= startOfDay(start) && dataDay <= startOfDay(end);
        }

        if (filtro.type === "time") {
            const dataMinutes = minutesOfDay(data);
            return dataMinutes >= minutesOfDay(start) && dataMinutes <= minutesOfDay(end);
        }

        if (filtro.type === "datetime") {
            const dataTime = toTimestamp(data);
            return dataTime >= toTimestamp(start) && dataTime <= toTimestamp(end);
        }

        return data >= start && data <= end;
    },

}

export default class Filter {
    static async filterData(data: any[], filters: FilterType[]) {
        console.log("Iniciando filtrado", filters)
        return data.filter((item) => {
            for (let i = 0; i < filters.length; i++) {
                const filtro = filters[i];
                const opf = OPERATORS_FUNCTIONS[filtro.operator]
                if (!opf) {
                    console.error(`Invalid operator ${filtro.operator}`, filtro);
                    continue;
                }
                if (!opf(item[filtro.col], filtro.value, filtro)) {
                    return false;
                }
            }
            return true;
        })
    }
}