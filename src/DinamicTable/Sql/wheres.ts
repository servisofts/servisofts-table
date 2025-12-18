import { FilterType, OPERATORS } from "../Filter";

const FormatDate = (filtro: FilterType) => {
    const date = new Date(filtro.value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatValue = (value: any, type: string) => {
    if (type === "number" || type === "boolean") return value;
    if (type === "date") {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `'${year}-${month}-${day}'`;
    }
    return `'${value}'`; // string or default
};

const buildMultiCondition = (
    filtro: FilterType,
    comparator: (col: string, val: string) => string
) => {
    if (Array.isArray(filtro.value)) {
        const conditions = filtro.value.map(val =>
            comparator(filtro.col, formatValue(val, filtro.type))
        );
        return `(${conditions.join(" OR ")})`;
    } else {
        return comparator(filtro.col, formatValue(filtro.value, filtro.type));
    }
};

const makeOperatorHandler = (
    comparator: (col: string, val: string) => string,
) => {
    return (filtro: FilterType) => {
        return buildMultiCondition(filtro, comparator);
    };
};

export const wheresPostgres: { [key: string]: (filtro: FilterType) => string } = {
    [OPERATORS.EQUAL]: makeOperatorHandler((col, val) => `${col} = ${val}`),
    [OPERATORS.NOT_EQUAL]: makeOperatorHandler((col, val) => `${col} <> ${val}`),
    [OPERATORS.GREATER_THAN]: makeOperatorHandler((col, val) => `${col} > ${val}`),
    [OPERATORS.LESS_THAN]: makeOperatorHandler((col, val) => `${col} < ${val}`),
    [OPERATORS.GREATER_THAN_OR_EQUAL]: makeOperatorHandler((col, val) => `${col} >= ${val}`),
    [OPERATORS.LESS_THAN_OR_EQUAL]: makeOperatorHandler((col, val) => `${col} <= ${val}`),
    [OPERATORS.CONTAINS]: (filtro: FilterType) => {
        if (Array.isArray(filtro.value)) {
            const conditions = filtro.value.map(val =>
                `${filtro.col} ILIKE '%${val}%'`
            );
            return `(${conditions.join(" OR ")})`;
        }
        return `${filtro.col} ILIKE '%${filtro.value}%'`;
    },
    [OPERATORS.STARTS_WITH]: (filtro: FilterType) => {
        if (Array.isArray(filtro.value)) {
            const conditions = filtro.value.map(val =>
                `${filtro.col} ILIKE '${val}%'`
            );
            return `(${conditions.join(" OR ")})`;
        }
        return `${filtro.col} ILIKE '${filtro.value}%'`;
    },
    [OPERATORS.ENDS_WITH]: (filtro: FilterType) => {
        if (Array.isArray(filtro.value)) {
            const conditions = filtro.value.map(val =>
                `${filtro.col} ILIKE '%${val}'`
            );
            return `(${conditions.join(" OR ")})`;
        }
        return `${filtro.col} ILIKE '%${filtro.value}'`;
    },
    [OPERATORS.IS_NULL]: (filtro: FilterType) => `${filtro.col} IS NULL`,
    [OPERATORS.IS_NOT_NULL]: (filtro: FilterType) => `${filtro.col} IS NOT NULL`,
    [OPERATORS.IS_TRUE]: (filtro: FilterType) => `${filtro.col} IS TRUE`,
    [OPERATORS.IS_FALSE]: (filtro: FilterType) => `${filtro.col} IS FALSE`,
};

export const wheresMySQL: { [key: string]: (filtro: FilterType) => string } = {
    [OPERATORS.EQUAL]: makeOperatorHandler((col, val) => `${col} = ${val}`),
    [OPERATORS.NOT_EQUAL]: makeOperatorHandler((col, val) => `${col} <> ${val}`),
    [OPERATORS.GREATER_THAN]: makeOperatorHandler((col, val) => `${col} > ${val}`),
    [OPERATORS.LESS_THAN]: makeOperatorHandler((col, val) => `${col} < ${val}`),
    [OPERATORS.GREATER_THAN_OR_EQUAL]: makeOperatorHandler((col, val) => `${col} >= ${val}`),
    [OPERATORS.LESS_THAN_OR_EQUAL]: makeOperatorHandler((col, val) => `${col} <= ${val}`),
    [OPERATORS.CONTAINS]: (filtro: FilterType) => {
        if (Array.isArray(filtro.value)) {
            const conditions = filtro.value.map(val =>
                `${filtro.col} LIKE '%${val}%'`
            );
            return `(${conditions.join(" OR ")})`;
        }
        return `${filtro.col} LIKE '%${filtro.value}%'`;
    },
    [OPERATORS.STARTS_WITH]: (filtro: FilterType) => {
        if (Array.isArray(filtro.value)) {
            const conditions = filtro.value.map(val =>
                `${filtro.col} LIKE '${val}%'`
            );
            return `(${conditions.join(" OR ")})`;
        }
        return `${filtro.col} LIKE '${filtro.value}%'`;
    },
    [OPERATORS.ENDS_WITH]: (filtro: FilterType) => {
        if (Array.isArray(filtro.value)) {
            const conditions = filtro.value.map(val =>
                `${filtro.col} LIKE '%${val}'`
            );
            return `(${conditions.join(" OR ")})`;
        }
        return `${filtro.col} LIKE '%${filtro.value}'`;
    },
    [OPERATORS.IS_NULL]: (filtro: FilterType) => `${filtro.col} IS NULL`,
    [OPERATORS.IS_NOT_NULL]: (filtro: FilterType) => `${filtro.col} IS NOT NULL`,
    [OPERATORS.IS_TRUE]: (filtro: FilterType) => `${filtro.col} = TRUE`,
    [OPERATORS.IS_FALSE]: (filtro: FilterType) => `${filtro.col} = FALSE`,
};

export default {
    wheresPostgres,
    wheresMySQL
};
