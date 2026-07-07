var _a, _b;
import { OPERATORS } from "../Filter";
var IS_NOW = "isnow";
var FormatDate = function (filtro) {
    var date = new Date(filtro.value);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
};
var formatValue = function (value, type) {
    if (type === "number" || type === "boolean")
        return value;
    if (type === "date") {
        var date = new Date(value);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return "'".concat(year, "-").concat(month, "-").concat(day, "'");
    }
    return "'".concat(value, "'"); // string or default
};
var buildMultiCondition = function (filtro, comparator) {
    if (Array.isArray(filtro.value)) {
        var conditions = filtro.value.map(function (val) {
            return comparator(filtro.col, formatValue(val, filtro.type));
        });
        return "(".concat(conditions.join(" OR "), ")");
    }
    else {
        return comparator(filtro.col, formatValue(filtro.value, filtro.type));
    }
};
var makeOperatorHandler = function (comparator) {
    return function (filtro) {
        return buildMultiCondition(filtro, comparator);
    };
};
export var wheresPostgres = (_a = {},
    _a[OPERATORS.EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " = ").concat(val); }),
    _a[OPERATORS.NOT_EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " <> ").concat(val); }),
    _a[OPERATORS.GREATER_THAN] = makeOperatorHandler(function (col, val) { return "".concat(col, " > ").concat(val); }),
    _a[OPERATORS.LESS_THAN] = makeOperatorHandler(function (col, val) { return "".concat(col, " < ").concat(val); }),
    _a[OPERATORS.GREATER_THAN_OR_EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " >= ").concat(val); }),
    _a[OPERATORS.LESS_THAN_OR_EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " <= ").concat(val); }),
    _a[OPERATORS.CONTAINS] = function (filtro) {
        if (Array.isArray(filtro.value)) {
            var conditions = filtro.value.map(function (val) {
                return "".concat(filtro.col, " ILIKE '%").concat(val, "%'");
            });
            return "(".concat(conditions.join(" OR "), ")");
        }
        return "".concat(filtro.col, " ILIKE '%").concat(filtro.value, "%'");
    },
    _a[OPERATORS.STARTS_WITH] = function (filtro) {
        if (Array.isArray(filtro.value)) {
            var conditions = filtro.value.map(function (val) {
                return "".concat(filtro.col, " ILIKE '").concat(val, "%'");
            });
            return "(".concat(conditions.join(" OR "), ")");
        }
        return "".concat(filtro.col, " ILIKE '").concat(filtro.value, "%'");
    },
    _a[OPERATORS.ENDS_WITH] = function (filtro) {
        if (Array.isArray(filtro.value)) {
            var conditions = filtro.value.map(function (val) {
                return "".concat(filtro.col, " ILIKE '%").concat(val, "'");
            });
            return "(".concat(conditions.join(" OR "), ")");
        }
        return "".concat(filtro.col, " ILIKE '%").concat(filtro.value, "'");
    },
    _a[OPERATORS.IS_NULL] = function (filtro) { return "".concat(filtro.col, " IS NULL"); },
    _a[OPERATORS.IS_NOT_NULL] = function (filtro) { return "".concat(filtro.col, " IS NOT NULL"); },
    _a[OPERATORS.IS_TRUE] = function (filtro) { return "".concat(filtro.col, " IS TRUE"); },
    _a[OPERATORS.IS_FALSE] = function (filtro) { return "".concat(filtro.col, " IS FALSE"); },
    _a[IS_NOW] = function (filtro) { return "".concat(filtro.col, " = NOW()"); },
    _a);
export var wheresMySQL = (_b = {},
    _b[OPERATORS.EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " = ").concat(val); }),
    _b[OPERATORS.NOT_EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " <> ").concat(val); }),
    _b[OPERATORS.GREATER_THAN] = makeOperatorHandler(function (col, val) { return "".concat(col, " > ").concat(val); }),
    _b[OPERATORS.LESS_THAN] = makeOperatorHandler(function (col, val) { return "".concat(col, " < ").concat(val); }),
    _b[OPERATORS.GREATER_THAN_OR_EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " >= ").concat(val); }),
    _b[OPERATORS.LESS_THAN_OR_EQUAL] = makeOperatorHandler(function (col, val) { return "".concat(col, " <= ").concat(val); }),
    _b[OPERATORS.CONTAINS] = function (filtro) {
        if (Array.isArray(filtro.value)) {
            var conditions = filtro.value.map(function (val) {
                return "".concat(filtro.col, " LIKE '%").concat(val, "%'");
            });
            return "(".concat(conditions.join(" OR "), ")");
        }
        return "".concat(filtro.col, " LIKE '%").concat(filtro.value, "%'");
    },
    _b[OPERATORS.STARTS_WITH] = function (filtro) {
        if (Array.isArray(filtro.value)) {
            var conditions = filtro.value.map(function (val) {
                return "".concat(filtro.col, " LIKE '").concat(val, "%'");
            });
            return "(".concat(conditions.join(" OR "), ")");
        }
        return "".concat(filtro.col, " LIKE '").concat(filtro.value, "%'");
    },
    _b[OPERATORS.ENDS_WITH] = function (filtro) {
        if (Array.isArray(filtro.value)) {
            var conditions = filtro.value.map(function (val) {
                return "".concat(filtro.col, " LIKE '%").concat(val, "'");
            });
            return "(".concat(conditions.join(" OR "), ")");
        }
        return "".concat(filtro.col, " LIKE '%").concat(filtro.value, "'");
    },
    _b[OPERATORS.IS_NULL] = function (filtro) { return "".concat(filtro.col, " IS NULL"); },
    _b[OPERATORS.IS_NOT_NULL] = function (filtro) { return "".concat(filtro.col, " IS NOT NULL"); },
    _b[OPERATORS.IS_TRUE] = function (filtro) { return "".concat(filtro.col, " = TRUE"); },
    _b[OPERATORS.IS_FALSE] = function (filtro) { return "".concat(filtro.col, " = FALSE"); },
    _b[IS_NOW] = function (filtro) { return "".concat(filtro.col, " = NOW()"); },
    _b);
export default {
    wheresPostgres: wheresPostgres,
    wheresMySQL: wheresMySQL
};
