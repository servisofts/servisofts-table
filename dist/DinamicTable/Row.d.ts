import React from "react";
import DinamicTable from "./DinamicTable";
export type RowPropsType<T> = {
    item: T;
    index: number;
    dinamicTableInstance: DinamicTable<T>;
};
export default class Row<T> extends React.Component<RowPropsType<T>> {
    state: {
        selected: boolean;
    };
    static defaultProps: {};
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
