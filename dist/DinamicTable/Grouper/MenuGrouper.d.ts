import React from "react";
import DinamicTable from "../DinamicTable";
export type MenuGrouperPropsType = {
    dinamicTableInstance: DinamicTable<any>;
};
export default class MenuGrouper extends React.Component<MenuGrouperPropsType> {
    render(): JSX.Element[];
}
