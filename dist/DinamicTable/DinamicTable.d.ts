import React, { ReactElement } from "react";
import { GestureResponderEvent, TextStyle, View, ViewStyle } from "react-native";
import Header from "./Header";
import Col from "./Col";
import Popup from "./Popup";
import { FilterType } from "./Filter";
import { SorterType } from "./Sorter";
import { Language } from "../Components/SLanguage";
type AllowedChild<T> = ReactElement<typeof Header> | ReactElement<typeof Col<T>>;
export type Colors = {
    text?: string;
    background?: string;
    card?: string;
    border?: string;
    accent?: string;
    header?: string;
};
export type CellStyle = {} & ViewStyle;
type stateType = {
    error?: any;
    state: "loading" | "ready" | "error";
};
export type ColData = {
    width?: number;
    wrap?: boolean;
    hidden?: boolean;
};
export type ExporterStateType = {
    filters?: FilterType[];
    sorters?: SorterType[];
    cols?: {
        [key: string]: ColData;
    };
};
type DinamicTablePropsType<T> = {
    loadData: () => Promise<T[]>;
    loadInitialState?: () => Promise<ExporterStateType>;
    cellStyle?: CellStyle;
    textStyle?: TextStyle;
    textTitleStyle?: TextStyle;
    style?: any;
    children: AllowedChild<T> | AllowedChild<T>[];
    colors?: Colors;
    keyExtractor?: (item: T, index: number) => string;
    selectType?: "single" | "multiple";
    onSelect?: (p: {
        evt: GestureResponderEvent;
        key: string;
        row: T;
        dinamicTable: DinamicTable<T>;
    }) => void;
    language?: Language;
    onEvent?: (p: {
        evt: "render";
    }) => void;
    iconSize?: number;
    listFooterComponent?: () => ReactElement;
    hiddenMenu?: boolean;
};
type rowEventListenersType = {
    type: "onSelect";
    key: string;
    value: boolean;
} | {
    type: "onRemove";
    key: string;
};
export default class DinamicTable<T> extends React.Component<DinamicTablePropsType<T>> {
    static Header: typeof Header;
    static Col: typeof Col;
    colors: Colors;
    textStyle: TextStyle;
    inputStyle: TextStyle;
    containerRef: View | null;
    headers: ReactElement<typeof Header>[];
    cols: ReactElement<typeof Col<T>>[];
    data: T[];
    dataFiltrada: any[];
    dataFormat: any[];
    popup: Popup | null;
    rowSelecteds: {
        [key: string]: boolean;
    };
    filtros: FilterType[];
    sorter: SorterType[];
    state: stateType;
    buscador: string;
    colData: {
        [key: string]: ColData;
    };
    colRef: {
        [key: string]: Col<any>;
    };
    props: DinamicTablePropsType<T>;
    constructor(props: DinamicTablePropsType<T>);
    rowEventListeners: {
        [key: string]: (evt: rowEventListenersType) => void;
    };
    addRowEventListener(key: string, listener: (evt: rowEventListenersType) => void): void;
    removeRowEventListener(key: string): void;
    dispatchRowEvent(evt: rowEventListenersType): Promise<void>;
    setSelect(key: string, value: boolean, e?: GestureResponderEvent): void;
    clearSelect(): void;
    buildChildrenTypes(): void;
    componentDidMount(): void;
    _start(): Promise<void>;
    loadInitialState(): Promise<void>;
    loadData(): Promise<void>;
    applyFormatData(): Promise<void>;
    applyFilter(): Promise<void>;
    applySort(): Promise<void>;
    getExportState(): ExporterStateType;
    setExportState(state: ExporterStateType): void;
    applyHeaderSize: () => void;
    render(): JSX.Element;
}
export {};
