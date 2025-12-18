import React from "react";
import DinamicTable from "../DinamicTable";
export type MenuFilterPropsType = {
    dinamicTableInstance: DinamicTable<any>;
};
export default class MenuFilter<T> extends React.Component<MenuFilterPropsType> {
    static defaultProps: {};
    render(): JSX.Element[];
}
