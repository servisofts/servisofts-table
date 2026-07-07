import React, { ReactElement } from "react";
import { GestureResponderEvent, TextStyle, View, ViewStyle } from "react-native";
import Header from "./Header";
import Col from "./Col";
import Popup from "./Popup";
import { FilterType } from "./Filter";
import SFlashList from "../Components/SFlashList";
import { SorterType } from "./Sorter";
import { GrouperType } from "./Grouper";
import { Language } from "../Components/SLanguage";
import CheckHeader from "./Components/CheckHeader";
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
    currentPage: number;
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
    groupers?: GrouperType[];
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
    selectType?: "single" | "multiple" | "check";
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
    buildRowStyle?: (p: {
        item: T;
        index: number;
        dinamicTable: DinamicTable<T>;
    }) => ViewStyle;
    hiddenMenu?: boolean;
    hoverStyle?: ViewStyle;
    adjustColumnWidth?: boolean;
    headerStyle?: ViewStyle;
    headerTextStyle?: TextStyle;
    padding?: number;
    pageLimit?: number;
    renderError?: (p: {
        error: any;
        dinamicTable: DinamicTable<T>;
    }) => ReactElement;
    renderNoResults?: (p: {
        dinamicTable: DinamicTable<T>;
    }) => ReactElement;
    renderLoading?: (p: {
        dinamicTable: DinamicTable<T>;
    }) => ReactElement;
    renderHeaderActions?: (p: {
        dinamicTable: DinamicTable<T>;
    }) => ReactElement | null;
    onSelectionChange?: (rows: T[]) => void;
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
    checkHeaderRef: CheckHeader<T> | null;
    rowSelecteds: {
        [key: string]: boolean;
    };
    filtros: FilterType[];
    sorter: SorterType[];
    groupers: GrouperType[];
    dataGrouped: any[];
    collapsedGroups: Set<string>;
    state: stateType;
    buscador: string;
    containerWidth: number;
    _webBodyHeight: number;
    _webHeaderHeight: number;
    colData: {
        [key: string]: ColData;
    };
    colRef: {
        [key: string]: Col<any>;
    };
    _colWidthVersion: number;
    _webFooterHeight: number;
    _webListFooterHeight: number;
    _sFlashRef: SFlashList | null;
    props: DinamicTablePropsType<T>;
    constructor(props: DinamicTablePropsType<T>);
    rowEventListeners: {
        [key: string]: (evt: rowEventListenersType) => void;
    };
    addRowEventListener(key: string, listener: (evt: rowEventListenersType) => void): void;
    removeRowEventListener(key: string): void;
    dispatchRowEvent(evt: rowEventListenersType): Promise<void>;
    selectAll(): void;
    getSelectedRows(): T[];
    setSelect(key: string, value: boolean, e?: GestureResponderEvent): void;
    clearSelect(): void;
    changePage(page: number): void;
    getVisibleData(): any[];
    toggleGroup(groupKey: string): void;
    getTotalPages(): number;
    getPaginatedData(): any[];
    getAdjustedColumnWidth(colKey: string): number;
    getTotalColumnsWidth(): number;
    onContainerLayout: (event: any) => void;
    buildChildrenTypes(): void;
    componentDidMount(): void;
    _start(): Promise<void>;
    loadInitialState(): Promise<void>;
    loadData(): Promise<void>;
    applyFormatData(): Promise<void>;
    applyFilter(): Promise<void>;
    applySort(): Promise<void>;
    applyGroup(): Promise<void>;
    getExportState(): ExporterStateType;
    setExportState(state: ExporterStateType): void;
    applyHeaderSize: () => void;
    addRow(data: any): Promise<void>;
    renderCantidadResultados(): JSX.Element;
    private renderColumnHeaders;
    private renderColumnFooters;
    private renderListItem;
    private renderStates;
    private renderWebLayout;
    private renderMobileLayout;
    render(): JSX.Element;
}
export {};
