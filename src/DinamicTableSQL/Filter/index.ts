import { DataType } from "..";
import SDate from "../../Components/SDate";

type DataTypeOperators = typeof OPERATORS[keyof typeof OPERATORS];

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
    STARTS_WITH: "startsWith",
    ENDS_WITH: "endsWith",
    IS_NULL: "isnull",
    IS_NOT_NULL: "isnotnull",
    IS_TRUE: "istrue",
    IS_FALSE: "isfalse",
    BETWEEN: "between",
    IS_NOW: "isnow",
}

const OPERATORS_FUNCTIONS: { [key: string]: (data: any, value: any, filtro: FilterType) => boolean } = {
    [OPERATORS.EQUAL]: (data, value, filtro) => {
        if (Array.isArray(filtro.value)) {
            return filtro.value.some((value) => data == value);
        }
        return data == value
    },
    [OPERATORS.NOT_EQUAL]: (data, value, filtro) => {
        if (Array.isArray(filtro.value)) {
            return filtro.value.some((value) => data != value);
        }
        return data != value
    },
    [OPERATORS.GREATER_THAN]: (data, value, filtro) => {
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some((v) => {
                    const dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() > dateValue.getTime()
                });
            } else {
                const dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() > dateValue.getTime()
            }
        }
        return data > value
    },
    [OPERATORS.LESS_THAN]: (data, value, filtro) => {
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some((v) => {
                    const dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() < dateValue.getTime()
                });
            } else {
                const dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() < dateValue.getTime()
            }
        }
        return data < value
    },
    [OPERATORS.GREATER_THAN_OR_EQUAL]: (data, value, filtro) => {
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some((v) => {
                    const dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() >= dateValue.getTime()
                });
            } else {
                const dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() >= dateValue.getTime()
            }
        }
        return data >= value
    },
    [OPERATORS.LESS_THAN_OR_EQUAL]: (data, value, filtro) => {
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some((v) => {
                    const dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() <= dateValue.getTime()
                });
            } else {
                const dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() <= dateValue.getTime()
            }
        }
        return data <= value
    },
    [OPERATORS.CONTAINS]: (data, value, filtro) => {
        if (!data) return false;
        if (Array.isArray(filtro.value)) {
            return filtro.value.some((value) => data.includes(value));
        }
        return data.toString().includes(value)
    },
    [OPERATORS.STARTS_WITH]: (data, value) => {
        return data.startsWith(value)
    },
    [OPERATORS.ENDS_WITH]: (data, value) => {
        return data.endsWith(value)
    },
    [OPERATORS.IS_NULL]: (data) => {
        return data == null
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
        if (!Array.isArray(value) || value.length !== 2) return false;

        const [start, end] = value;

        if (filtro.type === "date") {
            const startDate = new SDate(start, "yyyy-MM-dd");
            const endDate = new SDate(end, "yyyy-MM-dd");
            return data.getTime() >= startDate.getTime() && data.getTime() <= endDate.getTime();
        }

        return data >= start && data <= end;
    },
    [OPERATORS.IS_NOW]: (data) => {
        const now = new Date();
        return data.getFullYear() === now.getFullYear() &&
            data.getMonth() === now.getMonth() &&
            data.getDate() === now.getDate();
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