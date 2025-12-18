import React from "react";
import DinamicTable from "../DinamicTableSQL";
export type MenuSorterPropsType = {
    dinamicTableInstance: DinamicTable<any>;
};
export default class MenuSorter<T> extends React.Component<MenuSorterPropsType> {
    static defaultProps: {};
    render(): JSX.Element[];
}
