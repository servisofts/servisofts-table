import DinamicTableSQL from "./DinamicTableSQL";
export var OPERATORS = {
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
    BETWEEN: "between"
};
export var OPERADORES = {
    string: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.STARTS_WITH, label: { en: "Starts with", es: "Empieza con" }, params: 1 },
        { value: OPERATORS.ENDS_WITH, label: { en: "Ends with", es: "Termina con" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    number: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    boolean: [
        { value: OPERATORS.IS_TRUE, label: { en: "Is true", es: "Es verdadero" }, params: 0 },
        { value: OPERATORS.IS_FALSE, label: { en: "Is false", es: "Es falso" }, params: 0 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    date: [
        { value: OPERATORS.BETWEEN, label: { en: "Between", es: "Entre" }, params: 2 },
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ]
};
export { DinamicTableSQL, };
