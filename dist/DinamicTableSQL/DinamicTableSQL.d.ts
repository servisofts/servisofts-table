import React, { ReactElement } from "react";
import { ColData, Colors, DinamicTableSQLPropsType, ExporterStateType, FilterType, SorterType } from ".";
import { FlatList, GestureResponderEvent, TextStyle, View } from "react-native";
import Popup from "./Popup";
import Col from "./Col";
export type AllowedChild<T> = ReactElement<ReactElement<typeof Col<T>>>;
type rowEventListenersType = {
    type: "onSelect";
    key: string;
    value: boolean;
} | {
    type: "onRemove";
    key: string;
};
export default class DinamicTableSQL<T> extends React.Component<DinamicTableSQLPropsType<T>> {
    static Col: typeof Col;
    colData: {
        [key: string]: ColData;
    };
    colRef: {
        [key: string]: Col<any>;
    };
    colors: Colors;
    textStyle: TextStyle;
    inputStyle: TextStyle;
    showScrollToTop: boolean;
    rowSelecteds: {
        [key: string]: boolean;
    };
    cols: ReactElement<typeof Col<T>>[];
    filtros: FilterType[];
    size: number;
    sorter: SorterType[];
    containerRef: View | null;
    popup: Popup | null;
    buscador: string;
    dataFiltrada: any[];
    counter: CounterData | null;
    flatList: FlatList<any> | null;
    limit: number;
    offset: number;
    componentDidMount(): void;
    init: () => Promise<void>;
    loadInitialState(): Promise<void>;
    rowEventListeners: {
        [key: string]: (evt: rowEventListenersType) => void;
    };
    addRowEventListener(key: string, listener: (evt: rowEventListenersType) => void): void;
    removeRowEventListener(key: string): void;
    dispatchRowEvent(evt: rowEventListenersType): Promise<void>;
    setSelect(key: string, value: boolean, e?: GestureResponderEvent): void;
    buildChildrenTypes(): void;
    loadData: (reset?: boolean) => Promise<void>;
    loadSize: () => Promise<any>;
    applyFilter: () => void;
    applySort: () => void;
    applyHeaderSize: () => void;
    getExportState(): ExporterStateType;
    render(): JSX.Element;
}
declare class CounterData extends React.Component<{
    dinamicTableInstance: DinamicTableSQL<any>;
}> {
    state: {
        count: number;
        loading: boolean;
    };
    render(): JSX.Element;
}
export {};
