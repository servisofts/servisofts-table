var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var EQ = "="; // Igual a
var NEQ = "!="; // No igual a
var LT = "<"; // Menor que
var GT = ">"; // Mayor que
var LTE = "<="; // Menor o igual que
var GTE = ">="; // Mayor o igual que
var CONTAINS = "contains"; // Contiene una subcadena
var STARTS_WITH = "startsWith"; // Comienza con
var ENDS_WITH = "endsWith"; // Termina con
var TRUE = "true"; // Valor verdadero
var FALSE = "false"; // Valor falso
var IS_NULL = "isnull";
var IS_NOT_NULL = "isnotnull";
export var OPERADORES = {
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
    ]
};
var Filter = /** @class */ (function () {
    function Filter() {
    }
    Filter.filterData = function (data, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, data.filter(function (item) {
                        var _loop_1 = function (i) {
                            var valid = true;
                            var filtro = filters[i];
                            if (Array.isArray(filtro.value)) {
                                if (filtro.type === "date") {
                                    valid = filtro.value.some(function (elem) {
                                        if (!elem) {
                                            return false;
                                        }
                                        var value;
                                        if (filtro.dateFormat) {
                                            value = new SDate(elem, filtro.dateFormat);
                                        }
                                        else {
                                            value = new SDate(elem);
                                        }
                                        if (isNaN(value.getTime())) {
                                            return true;
                                        }
                                        var vData;
                                        if (filtro.dateFormat) {
                                            vData = new SDate((new SDate(item[filtro.col]).toString(filtro.dateFormat)), filtro.dateFormat);
                                        }
                                        else {
                                            vData = new SDate(item[filtro.col]);
                                        }
                                        return item[filtro.col] instanceof Date ? vData.getTime() == value.getTime() : false;
                                    });
                                }
                                else {
                                    valid = filtro.value.includes(item[filtro.col]);
                                }
                                if (!valid) {
                                    return { value: false };
                                }
                            }
                            else {
                                switch (filtro.type) {
                                    case "number":
                                        valid = _this.filterNumber(filtro, item);
                                        break;
                                    case "date":
                                        valid = _this.filterDate(filtro, item);
                                        break;
                                    case "boolean":
                                        valid = _this.filterBoolean(filtro, item);
                                        break;
                                    default:
                                        valid = _this.filterString(filtro, item);
                                        break;
                                }
                                if (!valid) {
                                    return { value: false };
                                }
                            }
                        };
                        for (var i = 0; i < filters.length; i++) {
                            var state_1 = _loop_1(i);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                        return true;
                    })];
            });
        });
    };
    Filter.filterString = function (filter, item) {
        var _a, _b, _c, _d;
        var operator = filter.operator;
        var col = filter.col;
        if (operator === IS_NULL) {
            return ((_a = item[col]) !== null && _a !== void 0 ? _a : null) === null;
        }
        if (operator === IS_NOT_NULL) {
            return ((_b = item[col]) !== null && _b !== void 0 ? _b : null) !== null;
        }
        var value = (((_c = filter.value) !== null && _c !== void 0 ? _c : "") + "").toLowerCase();
        ;
        if (value.length === 0) {
            return true;
        }
        // const value = (filter.value ?? "").toLowerCase();
        var data = ((_d = item[col]) !== null && _d !== void 0 ? _d : "").toLowerCase();
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
    };
    Filter.filterNumber = function (filter, item) {
        var operator = filter.operator;
        var col = filter.col;
        var data = item[col];
        if (operator === IS_NULL) {
            return (data !== null && data !== void 0 ? data : null) === null;
        }
        if (operator === IS_NOT_NULL) {
            return (data !== null && data !== void 0 ? data : null) !== null;
        }
        if (operator === CONTAINS) {
            return (data !== null && data !== void 0 ? data : null) !== null;
        }
        var value = filter.value;
        // validar que es un numero valido
        if ((value !== null && value !== void 0 ? value : null) === null) {
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
    };
    Filter.filterBoolean = function (filter, item) {
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
    };
    Filter.filterDate = function (filter, item) {
        // console.log(new SDate("16:00","hh").toString(""))
        var operator = filter.operator;
        var col = filter.col;
        var data = item[col];
        if (operator === IS_NULL) {
            return (data !== null && data !== void 0 ? data : null) === null;
        }
        if (operator === IS_NOT_NULL) {
            return (data !== null && data !== void 0 ? data : null) !== null;
        }
        if (!filter.value) {
            return true;
        }
        var value;
        if (filter.dateFormat) {
            value = new SDate(filter.value, filter.dateFormat);
        }
        else {
            value = new SDate(filter.value);
        }
        if (isNaN(value.getTime())) {
            return true;
        }
        var vData;
        if (filter.dateFormat) {
            vData = new SDate((new SDate(data).toString(filter.dateFormat)), filter.dateFormat);
        }
        else {
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
    };
    return Filter;
}());
export default Filter;
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
