import React from "react";
import { Animated, TextStyle, ViewStyle } from "react-native";
import DinamicTable, { CellStyle, ColData } from "./DinamicTable";
import { DataType } from ".";
export type ColPropsType<T> = {
    label?: string;
    labelIcon?: any;
    dataType: DataType;
    dateFormat?: string;
    width: number;
    data: (props: {
        row: T;
        index: number;
    }) => any;
    format?: (props: {
        data: any;
        row: T;
        index: number;
        textStyle: TextStyle;
    }) => any;
    customComponent?: (props: {
        data: any;
        dataFormat: any;
        row: T;
        index: number;
        textStyle: TextStyle;
        dinamicTable: DinamicTable<T>;
        colData: ColData;
    }) => any;
    onPress?: (props: {
        data: any;
        dataFormat: any;
        row: T;
        index: number;
        textStyle: TextStyle;
        dinamicTable: DinamicTable<T>;
        colData: ColData;
    }) => any;
    dinamicTableInstance?: DinamicTable<T>;
    children?: any;
    cellStyle?: CellStyle;
    textStyle?: TextStyle;
    textTitleStyle?: TextStyle;
    wrap?: boolean;
    id?: string;
    disableFilterGroup?: boolean;
    disableFilter?: boolean;
    disableSorter?: boolean;
    disableExport?: boolean;
    excelFormat?: string;
    sumExcel?: boolean;
    usePermission?: (props: {
        data: any;
        row: T;
        index: number;
        textStyle: TextStyle;
        dinamicTable: DinamicTable<T>;
        colData: ColData;
    }) => boolean;
    footerComponent?: (props: {
        textStyle: TextStyle;
        dinamicTable: DinamicTable<T>;
    }) => any;
    listFooterComponent?: (props: {
        textStyle: TextStyle;
        dinamicTable: DinamicTable<T>;
    }) => any;
    headerStyle?: ViewStyle;
};
export default class Col<T> extends React.Component<ColPropsType<T>> {
    static defaultProps: {
        dataType: string;
        width: number;
        wrap: boolean;
    };
    state: {};
    widthAnim: Animated.Value;
    currentWidth: number;
    startX: number;
    panResponder: import("react-native").PanResponderInstance;
    showPopup(evt: any): void;
    renderFilter(): JSX.Element;
    renderSorter(): JSX.Element;
    render(): JSX.Element;
}
