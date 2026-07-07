import React from "react";
import DinamicTable from "../DinamicTable";
type Props<T> = {
    dinamicTableInstance: DinamicTable<T>;
    width: number;
};
export default class CheckHeader<T> extends React.Component<Props<T>> {
    render(): JSX.Element;
}
export {};
