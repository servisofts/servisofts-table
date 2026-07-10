/// <reference types="react" />
import Col from "../Col";
export declare const OPERADORES: {
    string: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    number: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    boolean: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    date: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    time: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
    datetime: {
        value: string;
        label: {
            en: string;
            es: string;
        };
        params: number;
    }[];
};
declare const ColMenu: (props: {
    col: Col<any>;
}) => JSX.Element;
export default ColMenu;
