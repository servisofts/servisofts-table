import React from "react";
import DinamicTable from "./DinamicTable";
export type RowPropsType<T> = {
    item: T;
    index: number;
    dinamicTableInstance: DinamicTable<T>;
    colWidthVersion: number;
};
export default class Row<T> extends React.PureComponent<RowPropsType<T>> {
    state: {
        selected: boolean;
        hover: boolean;
    };
    static defaultProps: {};
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
