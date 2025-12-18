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
var _a;
import SDate from "../../Components/SDate";
export var OPERATORS = {
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
    BETWEEN: "between"
};
var OPERATORS_FUNCTIONS = (_a = {},
    _a[OPERATORS.EQUAL] = function (data, value, filtro) {
        if (!data)
            return false;
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some(function (v) {
                    var dateValue = new Date(v);
                    return data.getTime() == dateValue.getTime();
                });
            }
            else {
                var dateValue = new Date(value);
                return data.getTime() == dateValue.getTime();
            }
        }
        if (Array.isArray(filtro.value)) {
            return filtro.value.some(function (value) { return data == value; });
        }
        return data == value;
    },
    _a[OPERATORS.NOT_EQUAL] = function (data, value, filtro) {
        if (!data)
            return false;
        if (Array.isArray(filtro.value)) {
            return filtro.value.some(function (value) { return data != value; });
        }
        return data != value;
    },
    _a[OPERATORS.GREATER_THAN] = function (data, value, filtro) {
        if (!data)
            return false;
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some(function (v) {
                    var dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() > dateValue.getTime();
                });
            }
            else {
                var dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() > dateValue.getTime();
            }
        }
        return data > value;
    },
    _a[OPERATORS.LESS_THAN] = function (data, value, filtro) {
        if (!data)
            return false;
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some(function (v) {
                    var dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() < dateValue.getTime();
                });
            }
            else {
                var dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() < dateValue.getTime();
            }
        }
        return data < value;
    },
    _a[OPERATORS.GREATER_THAN_OR_EQUAL] = function (data, value, filtro) {
        if (!data)
            return false;
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some(function (v) {
                    var dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() >= dateValue.getTime();
                });
            }
            else {
                var dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() >= dateValue.getTime();
            }
        }
        return data >= value;
    },
    _a[OPERATORS.LESS_THAN_OR_EQUAL] = function (data, value, filtro) {
        if (!data)
            return false;
        if (filtro.type == "date") {
            if (Array.isArray(value)) {
                return value.some(function (v) {
                    var dateValue = new SDate(v, "yyyy-MM-dd");
                    return data.getTime() <= dateValue.getTime();
                });
            }
            else {
                var dateValue = new SDate(value, "yyyy-MM-dd");
                return data.getTime() <= dateValue.getTime();
            }
        }
        return data <= value;
    },
    _a[OPERATORS.CONTAINS] = function (data, value, filtro) {
        if (!data)
            return false;
        if (!data)
            return false;
        if (Array.isArray(filtro.value)) {
            return filtro.value.some(function (value) { return (data).toUpperCase().includes(value.toUpperCase()); });
        }
        return data.toString().toUpperCase().includes(value.toUpperCase());
    },
    _a[OPERATORS.NO_CONTAINS] = function (data, value, filtro) {
        if (!data)
            return false;
        if (Array.isArray(filtro.value)) {
            return filtro.value.some(function (value) { return !(data).toUpperCase().includes(value.toUpperCase()); });
        }
        return !data.toString().toUpperCase().includes(value.toUpperCase());
    },
    _a[OPERATORS.STARTS_WITH] = function (data, value) {
        if (!data)
            return false;
        return data.startsWith(value);
    },
    _a[OPERATORS.ENDS_WITH] = function (data, value) {
        if (!data)
            return false;
        return data.endsWith(value);
    },
    _a[OPERATORS.IS_NULL] = function (data) {
        return !data;
    },
    _a[OPERATORS.IS_NOT_NULL] = function (data) {
        return data != null;
    },
    _a[OPERATORS.IS_TRUE] = function (data) {
        return data == true;
    },
    _a[OPERATORS.IS_FALSE] = function (data) {
        return data == false;
    },
    _a[OPERATORS.BETWEEN] = function (data, value, filtro) {
        if (!data)
            return false;
        if (!Array.isArray(value) || value.length !== 2)
            return false;
        var start = value[0], end = value[1];
        if (filtro.type === "date") {
            var startDate = new SDate(start, "yyyy-MM-dd");
            var endDate = new SDate(end, "yyyy-MM-dd");
            return data.getTime() >= startDate.getTime() && data.getTime() <= endDate.getTime();
        }
        return data >= start && data <= end;
    },
    _a);
var Filter = /** @class */ (function () {
    function Filter() {
    }
    Filter.filterData = function (data, filters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("Iniciando filtrado", filters);
                return [2 /*return*/, data.filter(function (item) {
                        for (var i = 0; i < filters.length; i++) {
                            var filtro = filters[i];
                            var opf = OPERATORS_FUNCTIONS[filtro.operator];
                            if (!opf) {
                                console.error("Invalid operator ".concat(filtro.operator), filtro);
                                continue;
                            }
                            if (!opf(item[filtro.col], filtro.value, filtro)) {
                                return false;
                            }
                        }
                        return true;
                    })];
            });
        });
    };
    return Filter;
}());
export default Filter;
