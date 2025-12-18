import React from "react";
import { Animated, TextStyle } from "react-native";
import { CellStyle, ColData, DinamicTableSQL } from ".";
import { DataType } from ".";
export type ColPropsType<T> = {
    label?: string;
    labelIcon?: any;
    dataType: DataType;
    dateFormat?: string;
    width: number;
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
        dinamicTable: DinamicTableSQL<T>;
        colData: ColData;
    }) => any;
    dinamicTableInstance?: DinamicTableSQL<T>;
    children?: any;
    cellStyle?: CellStyle;
    textStyle?: TextStyle;
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
        dinamicTable: DinamicTableSQL<T>;
        colData: ColData;
    }) => boolean;
    renderFooter?: (props: {
        textStyle: TextStyle;
        dinamicTable: DinamicTableSQL<T>;
    }) => any;
    loadListOptions?: (props: {
        dinamicTable: DinamicTableSQL<T>;
        colData: ColData;
    }) => Promise<any[]>;
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
