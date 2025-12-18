import React from "react";
import { DinamicTableSQL } from "../DinamicTableSQL";
import { DinamicTable } from "../DinamicTable";
import { LanguageSource } from "./SLanguage";
type Options = {
    label: LanguageSource;
    value: any;
};
export default class Select extends React.Component<{
    options: Options[];
    defaultValue?: any;
    placeholder?: string;
    icon?: any;
    onSelect: (value: any) => void;
    dinamicTableInstance: DinamicTable<any> | DinamicTableSQL<any>;
}> {
    static defaultProps: {
        placeholder: string;
    };
    state: {
        value: any;
    };
    render(): JSX.Element;
}
export {};
