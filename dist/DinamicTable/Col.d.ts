import React from "react";
import { Animated, TextStyle, ViewStyle } from "react-native";
import DinamicTable, { CellStyle, ColData } from "./DinamicTable";
import { DataType } from ".";
export type ColPropsType<T> = {
    label?: string | React.ReactElement;
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
        filterList?: boolean;
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
    disableGrouper?: boolean;
    disableExport?: boolean;
    excelFormat?: string;
    sumExcel?: boolean;
    sumTotal?: boolean | [string, number] | ((rows: T[]) => string);
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
    customHeaderComponent?: (props: {
        label?: string | React.ReactElement;
        sumTotal?: string;
        textStyle: TextStyle;
        colors: any;
        dinamicTable: DinamicTable<T>;
    }) => any;
};
export default class Col<T> extends React.Component<ColPropsType<T>> {
    static defaultProps: {
        dataType: string;
        width: number;
        wrap: boolean;
    };
    state: {
        isResizing: boolean;
    };
    widthAnim: Animated.Value;
    currentWidth: number;
    startX: number;
    panResponder: import("react-native").PanResponderInstance;
    componentDidUpdate(): void;
    showPopup(evt: any): void;
    renderFilter(): JSX.Element;
    renderSorter(): JSX.Element;
    renderGrouper(): JSX.Element;
    render(): JSX.Element;
}
