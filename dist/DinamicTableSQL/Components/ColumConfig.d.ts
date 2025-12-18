import React from "react";
import DinamicTable from "../DinamicTableSQL";
type CheckBoxProps = {
    dinamicTableInstance: DinamicTable<any>;
};
export default class ColumConfig extends React.Component<CheckBoxProps> {
    render(): JSX.Element;
}
export {};
