import { DataType } from "..";
import SDate from "../../Components/SDate";




// type Operator = {
//     key: string,
//     title: string,
//     op: (a: string, b: any) => boolean,
// }



// type Operators = { [key in DataType]: Operator[] }

// export const OPERADORES: Operators = {
//     string: [
//         { key: "contains", title: "contiene", op: (a, b) => a.toString().toLowerCase().includes(b.toLowerCase()) },
//         { key: "eq", title: "igual", op: (a, b) => a.toString().toLowerCase() === b.toLowerCase() },
//         { key: "neq", title: "diferente", op: (a, b) => a.toString().toLowerCase() !== b.toLowerCase() },
//     ],
//     number: [
//         { key: "gt", title: "mayor que", op: (a, b) => a > b },
//         { key: "lt", title: "menor que", op: (a, b) => a < b },
//         { key: "gte", title: "mayor o igual que", op: (a, b) => a >= b },
//         { key: "lte", title: "menor o igual que", op: (a, b) => a <= b },
//         { key: "eq", title: "igual", op: (a, b) => a === b },
//         { key: "neq", title: "diferente", op: (a, b) => a !== b },
//     ],
//     boolean: [
//         { key: "eq", title: "igual", op: (a, b) => a === b },
//         { key: "neq", title: "diferente", op: (a, b) => a !== b },
//     ],
//     date: [
//         { key: "gt", title: "mayor que", op: (a, b) => a > b },
//         { key: "lt", title: "menor que", op: (a, b) => a < b },
//         { key: "gte", title: "mayor o igual que", op: (a, b) => a >= b },
//         { key: "lte", title: "menor o igual que", op: (a, b) => a <= b },
//         { key: "eq", title: "igual", op: (a, b) => a === b },
//         { key: "neq", title: "diferente", op: (a, b) => a !== b },
//     ]

// }


const EQ = "=";       // Igual a
const NEQ = "!=";     // No igual a

const LT = "<";       // Menor que
const GT = ">";       // Mayor que
const LTE = "<=";     // Menor o igual que
const GTE = ">=";     // Mayor o igual que


const CONTAINS = "contains"; // Contiene una subcadena
const STARTS_WITH = "startsWith"; // Comienza con
const ENDS_WITH = "endsWith"; // Termina con

const TRUE = "true";  // Valor verdadero
const FALSE = "false"; // Valor falso

const IS_NULL = "isnull";
const IS_NOT_NULL = "isnotnull";


type DataTypeOperators =
    | typeof EQ
    | typeof NEQ
    | typeof LT
    | typeof GT
    | typeof LTE
    | typeof GTE
    | typeof TRUE
    | typeof FALSE
    | typeof CONTAINS
    | typeof STARTS_WITH
    | typeof ENDS_WITH
    | typeof IS_NULL
    | typeof IS_NOT_NULL
    ;

export const OPERADORES = {
    "string": [
        { value: EQ, label: "Igual a", params: 1 },
        { value: NEQ, label: "No igual a", params: 1 },
        { value: CONTAINS, label: "Contiene", params: 1 },
        { value: STARTS_WITH, label: "Empieza con", params: 1 },
        { value: ENDS_WITH, label: "Termina con", params: 1 },
        { value: IS_NULL, label: "Es nulo", params: 0 },
        { value: IS_NOT_NULL, label: "No es nulo", params: 0 }
    ],
    "number": [
        { value: EQ, label: "Igual a", params: 1 },
        { value: NEQ, label: "No igual a", params: 1 },
        { value: CONTAINS, label: "Contiene", params: 1 },
        { value: LT, label: "Menor que", params: 1 },
        { value: GT, label: "Mayor que", params: 1 },
        { value: LTE, label: "Menor o igual que", params: 1 },
        { value: GTE, label: "Mayor o igual que", params: 1 },
        { value: IS_NULL, label: "Es nulo", params: 0 },
        { value: IS_NOT_NULL, label: "No es nulo", params: 0 }
    ],
    "boolean": [
        { value: TRUE, label: "Es verdadero", params: 0 },
        { value: FALSE, label: "Es falso", params: 0 },
        { value: IS_NULL, label: "Es nulo", params: 0 },
        { value: IS_NOT_NULL, label: "No es nulo", params: 0 }
    ],
    "date": [
        { value: EQ, label: "Igual a", params: 1 },
        { value: NEQ, label: "No igual a", params: 1 },
        { value: LT, label: "Menor que", params: 1 },
        { value: GT, label: "Mayor que", params: 1 },
        { value: LTE, label: "Menor o igual que", params: 1 },
        { value: GTE, label: "Mayor o igual que", params: 1 },
        { value: IS_NULL, label: "Es nulo", params: 0 },
        { value: IS_NOT_NULL, label: "No es nulo", params: 0 }
    ],
}

// export const OPERATORS = {
//     "string": [
//         { value: EQ, label: "Equal to" },
//         { value: NEQ, label: "Not equal to" },
//         { value: CONTAINS, label: "Contains" },
//         { value: STARTS_WITH, label: "Starts with" },
//         { value: ENDS_WITH, label: "Ends with" },
//         { value: IS_NULL, label: "Is null" },
//         { value: IS_NOT_NULL, label: "Is not null" }
//     ],
//     "number": [
//         { value: EQ, label: "Equal to" },
//         { value: NEQ, label: "Not equal to" },
//         { value: LT, label: "Less than" },
//         { value: GT, label: "Greater than" },
//         { value: LTE, label: "Less than or equal to" },
//         { value: GTE, label: "Greater than or equal to" },
//         { value: IS_NULL, label: "Is null" },
//         { value: IS_NOT_NULL, label: "Is not null" }
//     ],
//     "boolean": [
//         { value: TRUE, label: "Is true" },
//         { value: FALSE, label: "Is false" },
//         { value: IS_NULL, label: "Is null" },
//         { value: IS_NOT_NULL, label: "Is not null" }
//     ],
//     "date": [
//         { value: EQ, label: "Equal to" },
//         { value: NEQ, label: "Not equal to" },
//         { value: LT, label: "Less than" },
//         { value: GT, label: "Greater than" },
//         { value: LTE, label: "Less than or equal to" },
//         { value: GTE, label: "Greater than or equal to" },
//         { value: IS_NULL, label: "Is null" },
//         { value: IS_NOT_NULL, label: "Is not null" }
//     ],
// }

export type FilterType = {
    col: string,
    value: any,
    type: DataType,
    operator: DataTypeOperators,
    dateFormat?: string,
}




export default class Filter {
    static async filterData(data: any[], filters: FilterType[]) {
        return data.filter((item) => {
            for (let i = 0; i < filters.length; i++) {
                let valid = true;
                const filtro = filters[i];
                if (Array.isArray(filtro.value)) {
                    if (filtro.type === "date") {
                        valid = filtro.value.some((elem) => {
                            if (!elem) {
                                return false;
                            }
                            let value: SDate;
                            if (filtro.dateFormat) {
                                value = new SDate(elem, filtro.dateFormat as any);
                            } else {
                                value = new SDate(elem);
                            }
                            if (isNaN(value.getTime())) {
                                return true;
                            }
                            let vData: SDate;
                            if (filtro.dateFormat) {
                                vData = new SDate((new SDate(item[filtro.col]).toString(filtro.dateFormat as any)), filtro.dateFormat as any);
                            } else {
                                vData = new SDate(item[filtro.col]);
                            }
                            return item[filtro.col] instanceof Date ? vData.getTime() == value.getTime() : false;
                        });
                    } else {
                        valid = filtro.value.includes(item[filtro.col]);
                    }

                    if (!valid) {
                        return false;
                    }
                } else {
                    switch (filtro.type) {
                        case "number":
                            valid = this.filterNumber(filtro, item);
                            break;
                        case "date":
                            valid = this.filterDate(filtro, item);
                            break;
                        case "boolean":
                            valid = this.filterBoolean(filtro, item);
                            break;
                        default:
                            valid = this.filterString(filtro, item);
                            break;
                    }
                    if (!valid) {
                        return false;
                    }
                }
            }
            return true;
        })
    }

    static filterString(filter: FilterType, item: any): boolean {
        const operator = filter.operator;
        const col = filter.col;

        if (operator === IS_NULL) {
            return (item[col] ?? null) === null;
        }
        if (operator === IS_NOT_NULL) {
            return (item[col] ?? null) !== null;
        }

        const value = ((filter.value ?? "") + "").toLowerCase();;
        if (value.length === 0) {
            return true;
        }

        // const value = (filter.value ?? "").toLowerCase();
        const data = (item[col] ?? "").toLowerCase();
        switch (operator) {
            case EQ:
                return data == value;
            case NEQ:
                return data != value;
            case STARTS_WITH:
                return data.startsWith(value);
            case ENDS_WITH:
                return data.endsWith(value);
            default:
                return data.includes(value);
        }
    }


    static filterNumber(filter: FilterType, item: any): boolean {
        const operator = filter.operator;
        const col = filter.col;
        const data = item[col];
        if (operator === IS_NULL) {
            return (data ?? null) === null;
        }
        if (operator === IS_NOT_NULL) {
            return (data ?? null) !== null;
        }
        if (operator === CONTAINS) {
            return (data ?? null) !== null;
        }

        const value = filter.value;
        // validar que es un numero valido
        if ((value ?? null) === null) {
            return true;
        }

        switch (operator) {
            case NEQ:
                return data != value;
            case LT:
                return data < value;
            case GT:
                return data > value;
            case LTE:
                return data <= value;
            case GTE:
                return data >= value;
            default:
                return data == value;
        }
    }

    static filterBoolean(filter: FilterType, item: any): boolean {
        return true;
        // const col = filter.col;
        // const value = filter.value;
        // const operator = filter.operator;
        // switch (operator) {
        //     case EQ:
        //         return item[col] == value;
        //     case NEQ:       
        //         return item[col] != value;
        //     default:
        //         return item[col]?.includes?.(value);
        // }
    }

    static filterDate(filter: FilterType, item: any): boolean {

        // console.log(new SDate("16:00","hh").toString(""))
        const operator = filter.operator;
        const col = filter.col;
        const data = item[col];
        if (operator === IS_NULL) {
            return (data ?? null) === null;
        }
        if (operator === IS_NOT_NULL) {
            return (data ?? null) !== null;
        }

        if (!filter.value) {
            return true;
        }
        let value: SDate;
        if (filter.dateFormat) {
            value = new SDate(filter.value, filter.dateFormat as any);
        } else {
            value = new SDate(filter.value);
        }

        if (isNaN(value.getTime())) {
            return true;
        }

        let vData: SDate;
        if (filter.dateFormat) {
            vData = new SDate((new SDate(data).toString(filter.dateFormat as any)), filter.dateFormat as any);
        } else {
            vData = new SDate(data);
        }

        switch (operator) {
            case NEQ:
                return !(data instanceof Date ? vData.getTime() == value.getTime() : false);
            case LT:
                return data instanceof Date ? vData.getTime() < value.getTime() : false;
            case GT:
                return data instanceof Date ? vData.getTime() > value.getTime() : false;
            case LTE:
                return data instanceof Date ? vData.getTime() <= value.getTime() : false;
            case GTE:
                return data instanceof Date ? vData.getTime() >= value.getTime() : false;
            default:
                return data instanceof Date ? vData.getTime() == value.getTime() : false;
        }
    }
}

// export const filter = (data: any[], filters: Filter[]) => {
//     return data.filter((item) => {
//         return filters.every((filter) => {
//             if (filter.operator === "like") {
//                 return item[filter.col].toString().toLowerCase().includes(filter.value.toLowerCase())
//             }
//             if (filter.operator === "eq") {
//                 return item[filter.col].toString().toLowerCase() === filter.value.toLowerCase()
//             }
//             if (filter.operator === "neq") {
//                 return item[filter.col].toString().toLowerCase() !== filter.value.toLowerCase()
//             }
//             if (filter.operator === "gt") {
//                 return item[filter.col] > filter.value
//             }
//             if (filter.operator === "lt") {
//                 return item[filter.col] < filter.value
//             }
//             if (filter.operator === "gte") {
//                 return item[filter.col] >= filter.value
//             }
//             if (filter.operator === "lte") {
//                 return item[filter.col] <= filter.value
//             }
//             if (filter.operator === "in") {
//                 return filter.value.split(",").includes(item[filter.col])
//             }
//             if (filter.operator === "nin") {
//                 return !filter.value.split(",").includes(item[filter.col])
//             }
//             return true;
//         })
//     })
// }