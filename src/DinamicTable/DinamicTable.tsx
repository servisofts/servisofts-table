import React, { ReactElement } from "react";
import { FlatList, GestureResponderEvent, ScrollView, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Header from "./Header";
import Col, { ColPropsType } from "./Col";
import Row from "./Row";
import Popup from "./Popup";
import TopMenuOptions from "./TopMenuOptions";
import Filter, { FilterType } from "./Filter";
import MenuFilter from "./Filter/MenuFilter";
import SFlashList from "../Components/SFlashList";
import Assets from "../Assets";
import Sorter, { SorterType } from "./Sorter";
import MenuSorter from "./Sorter/MenuSorter";
import SLanguage, { Language } from "../Components/SLanguage";

type AllowedChild<T> = ReactElement<typeof Header> | ReactElement<typeof Col<T>>;

export type Colors = {
    text?: string,
    background?: string,
    card?: string,
    border?: string,
    accent?: string,
    header?: string,

}

export type CellStyle = {

} & ViewStyle

type stateType = {
    error?: any,
    state: "loading" | "ready" | "error",
}

export type ColData = {
    width?: number,
    wrap?: boolean,
    hidden?: boolean,
}
export type ExporterStateType = {
    filters?: FilterType[];
    sorters?: SorterType[],
    cols?: { [key: string]: ColData }
}
type DinamicTablePropsType<T> = {
    loadData: () => Promise<T[]>,
    loadInitialState?: () => Promise<ExporterStateType>,
    cellStyle?: CellStyle,
    textStyle?: TextStyle,
    textTitleStyle?: TextStyle,
    style?: any,
    children: AllowedChild<T> | AllowedChild<T>[],
    colors?: Colors,
    keyExtractor?: (item: T, index: number) => string,
    selectType?: "single" | "multiple",
    onSelect?: (p: { evt: GestureResponderEvent, key: string, row: T, dinamicTable: DinamicTable<T> }) => void,
    language?: Language,
    onEvent?: (p: { evt: "render" }) => void,
    iconSize?: number,
    listFooterComponent?: () => ReactElement,

    hiddenMenu?: boolean

}







type rowEventListenersType = { type: "onSelect", key: string, value: boolean } | { type: "onRemove", key: string };


export default class DinamicTable<T> extends React.Component<DinamicTablePropsType<T>> {
    static Header = Header
    static Col = Col

    colors: Colors = {
        text: "#ffffff",
        background: "#333",
        card: "#444",
        border: "#666",
        accent: "#4689CC",
        header: "#444",
        ...this.props.colors

    }
    textStyle: TextStyle = {
        color: this.colors.text,
        fontSize: 12,
        ...(this.props.textStyle ?? {})
    }
    inputStyle: TextStyle = {
        color: this.colors.text,
        borderWidth: 1,
        borderColor: this.colors.border,
        borderRadius: 4,
        fontSize: 12,
        height: 22,
        padding: 6,
        justifyContent: "center",
        // alignItems: "center",
        // @ts-ignore
        outlineWidth: 0,
        // flex: 1,
        width: "100%"
    }

    containerRef: View | null = null
    headers: ReactElement<typeof Header>[] = []
    cols: ReactElement<typeof Col<T>>[] = []
    data: T[] = []
    dataFiltrada: any[] = []
    dataFormat: any[] = []
    popup: Popup | null = null

    rowSelecteds: { [key: string]: boolean } = {}
    // filtros: any[] = [];
    filtros: FilterType[] = [];

    sorter: SorterType[] = []
    state: stateType = {
        state: "loading"
    }

    buscador = "";

    colData: { [key: string]: ColData } = {}
    colRef: { [key: string]: Col<any> } = {}
    props: DinamicTablePropsType<T>
    constructor(props: DinamicTablePropsType<T>) {
        super(props)
        SLanguage.change(this.props.language ?? "en")
        this.buildChildrenTypes();
    }


    rowEventListeners: { [key: string]: (evt: rowEventListenersType) => void } = {}
    addRowEventListener(key: string, listener: (evt: rowEventListenersType) => void) {
        this.rowEventListeners[key] = listener;
    }
    removeRowEventListener(key: string) {
        delete this.rowEventListeners[key]
    }

    async dispatchRowEvent(evt: rowEventListenersType) {
        Object.keys(this.rowEventListeners).forEach(key => {
            if (this.rowEventListeners[key]) this.rowEventListeners[key](evt)
        })
    }

    setSelect(key: string, value: boolean, e?: GestureResponderEvent) {
        if (this.props.onSelect) {
            const row = this.dataFiltrada.find(a => a.__key === key)
            this.props.onSelect({ evt: e, key: key, row: row.__original, dinamicTable: this })
        }
        if (!this.props.selectType) return;
        if (this.props.selectType === "single") {
            this.rowSelecteds = {}
        }
        this.rowSelecteds[key] = value;
        this.dispatchRowEvent({ type: "onSelect", key: key, value: value })

    }
    clearSelect() {
        Object.keys(this.rowSelecteds).forEach(key => {
            this.rowSelecteds[key] = false;
            this.dispatchRowEvent({ type: "onSelect", key: key, value: false })
        })
        this.rowSelecteds = {}

        // this.forceUpdate();
    }
    buildChildrenTypes() {
        let children: AllowedChild<T>[];
        if (!Array.isArray(this.props.children)) {
            children = [this.props.children as AllowedChild<T>]
        } else {
            children = this.props.children as AllowedChild<T>[]
        }

        this.headers = [];
        this.cols = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (child.type === Header) {
                this.headers.push(child as ReactElement<typeof Header>)
            }
            if (child.type === Col) {
                const c: any = child as ReactElement<typeof Col<T>>
                this.cols.push(c)
                this.colData[c.key] = {
                    width: c.props.width,
                    wrap: c.props.wrap
                }
            }
        }
        // this.cols.sort((a, b) => a.key > b.key ? 1 : -1)
    }

    componentDidMount(): void {

        this._start();
    }
    async _start() {
        await this.loadInitialState();
        this.loadData()
    }

    async loadInitialState() {
        if (this.props.loadInitialState) {
            const state = await this.props.loadInitialState()
            this.setExportState(state)
        }
        this.forceUpdate();
    }
    async loadData() {
        try {


            // this.setState({ state: "loading" })
            this.data = await this.props.loadData()
            await this.applyFormatData();
            await this.applyFilter();
            this.setState({ state: "ready" })
        } catch (error) {
            this.setState({ state: "error", error: error })
        }

    }
    async applyFormatData() {
        this.dataFormat = this.data.map((item, index) => {
            const key = this.props.keyExtractor ? this.props.keyExtractor(item, index) : index + ""
            let newItem = {
                __key: key,
                __original: item
            } as any;
            this.cols.forEach((col) => {
                const colProps = col.props as unknown as ColPropsType<T>;
                let data = colProps.data({ row: item, index: index });

                if (!data) {
                    data = ""
                }
                switch (colProps.dataType) {
                    case "number":
                        data = Number(data)
                        if (isNaN(data)) {
                            data = 0;
                        }
                        break;
                    case "string":
                        data = data + ""
                        break;
                    case "date":
                        if (!!data) {
                            if (data instanceof Date) {
                                data = data
                            } else {
                                data = new Date(data)
                                if (isNaN(data.getTime())) {
                                    data = "INVALID DATE"
                                }
                            }
                        }
                        break;
                    case "boolean":
                        if (typeof data === "string") {
                            data = Boolean(data)
                        }
                        if (typeof data === "number") {
                            data = Boolean(data)
                        }
                        if (typeof data === "boolean") {
                            data = data
                        }
                        break;
                    default:
                        data = "INVALID FORMAT"
                        break;
                }

                newItem[col.key] = data;

                // colProps.dataType
            })
            return newItem;
        })
    }


    async applyFilter() {
        this.dataFiltrada = await Filter.filterData(this.dataFormat, this.filtros)
        if (this.buscador) {
            this.dataFiltrada = this.dataFiltrada.filter((item: any) => {
                let found = false;
                Object.keys(item).forEach(key => {
                    if (typeof item[key] === "string") {
                        if (item[key].toLowerCase().includes(this.buscador.toLowerCase())) {
                            found = true;
                        }
                    }
                })
                return found;
            })
        }
        await this.applySort();
    }
    async applySort() {
        this.dataFiltrada = Sorter.sort(this.dataFiltrada, this.sorter);
        this.forceUpdate();
    }


    getExportState(): ExporterStateType {
        return {
            filters: this.filtros,
            sorters: this.sorter,
            cols: this.colData
        }
    }
    setExportState(state: ExporterStateType) {
        this.filtros = state.filters ?? [];
        this.sorter = state.sorters ?? [];

        Object.keys(this.colData).forEach(key => {
            if (state.cols && state.cols[key]) {
                this.colData[key] = {
                    ...this.colData[key],
                    ...state.cols[key]
                }
            }
        })
        // this.colData = {
        //     ...this.colData,
        //     ...(state.cols ?? {})
        // }
    }
    applyHeaderSize = () => {
        Object.keys(this.colRef).forEach(key => {
            const col = this.colRef[key];
            if (col) {
                col.currentWidth = this.colData[key].width;
                col.widthAnim.setValue(this.colData[key].width);
            }
        })
    }

    render() {
        if (this.props.onEvent) {
            this.props.onEvent({ evt: "render" })
        }
        const size = this.props.iconSize ?? 22;
        return <View style={{ flex: 1, width: "100%", }} ref={ref => this.containerRef = ref}>
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                {!this.props.hiddenMenu && <>
                    <TopMenuOptions dinamicTableInstance={this} />
                    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", }}>
                        <TextInput
                            placeholderTextColor={this.colors.card}
                            style={[this.inputStyle, { height: size, paddingStart: 26 }]}
                            placeholder="Search..."
                            onChangeText={e => {
                                this.buscador = e
                                this.applyFilter();
                            }} />
                        <View style={{ width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8 }}>
                            <Assets.Search fill={this.colors.accent} />
                        </View>
                    </View>
                </>}
                <MenuSorter dinamicTableInstance={this} />
                <MenuFilter dinamicTableInstance={this} />
            </View>

            <View style={{ height: 4 }} />
            <ScrollView
                horizontal style={{ flex: 1, width: "100%" }}
                contentContainerStyle={{ flexDirection: "column", minWidth: "100%", }}
            >
                <View style={{ flexDirection: "row", }}>
                    {this.cols.filter(a => !this.colData[a.key].hidden).map((c, index) => {
                        const a = React.cloneElement(c, {
                            key: c.key,
                            id: c.key,
                            dinamicTableInstance: this,
                            ref: (ref: any) => this.colRef[c.key] = ref,
                        } as any)
                        return a;
                    })}
                </View>

                {this.state.state === "loading" && <View style={{ width: "100%", padding: 8 }}>
                    <Text style={[this.textStyle]}>{SLanguage.select({
                        en: "Loading data... please wait.",
                        es: "Cargando datos... por favor espera.",
                    })}</Text>
                </View>
                }
                {this.state.state === "error" && <View style={{ width: "100%", padding: 8 }}>
                    <Text style={[this.textStyle]}>{SLanguage.select({
                        en: "An error occurred while loading data.",
                        es: "Ocurrió un error al cargar los datos.",
                    })}</Text>
                </View>
                }
                {this.state.state === "ready" && this.dataFiltrada.length <= 0 && <View style={{ width: "100%", padding: 8 }}>
                    <Text style={[this.textStyle]}>{SLanguage.select({
                        es: "No se encontraron resultados.",
                        en: "No results found.",
                    })}</Text>
                </View>}
                {this.state.state === "ready" && this.dataFiltrada.length > 0 &&
                    <FlatList
                        data={this.dataFiltrada}
                        contentContainerStyle={{ minWidth: "100%", alignItems: "flex-start", paddingRight: 70 }}
                        keyExtractor={(item, index) => item.__key}
                        ListFooterComponent={() => {
                            return <>
                                <View style={{ flexDirection: "row", }}>
                                    {this.cols.filter(a => !this.colData[a.key].hidden).map((c, index) => <View style={{
                                        width: this.colData[c.key].width,
                                        // backgroundColor: this.colors.header,
                                    }}>
                                        {(c.props as any).listFooterComponent ? (c.props as any).listFooterComponent({ textStyle: this.textStyle, dinamicTable: this }) : null}
                                    </View>)}
                                </View>
                                {this.props.listFooterComponent ? this.props.listFooterComponent() : null}
                            </>
                        }}

                        renderItem={({ item, index }) => <Row item={item} index={index} dinamicTableInstance={this} />}
                    />
                }

                <View style={{ flexDirection: "row", }}>
                    {this.cols.filter(a => !this.colData[a.key].hidden).map((c, index) => <View style={{
                        width: this.colData[c.key].width,
                        // backgroundColor: this.colors.header,
                    }}>
                        {(c.props as any).footerComponent ? (c.props as any).footerComponent({ textStyle: this.textStyle, dinamicTable: this }) : null}
                    </View>)}
                </View>
            </ScrollView>
            <Popup ref={ref => this.popup = ref} dinamicTableInstance={this} />
        </View>
    }
}

