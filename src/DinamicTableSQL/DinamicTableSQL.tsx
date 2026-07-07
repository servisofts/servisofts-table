import React, { ReactElement } from "react";
import { ColData, Colors, DinamicTableSQLPropsType, ExporterStateType, FilterType, SorterType } from ".";
import { FlatList, GestureResponderEvent, ScrollView, Text, TextInput, TextStyle, View, ActivityIndicator, TouchableOpacity } from "react-native";
import Popup from "./Popup";
import Col from "./Col";
import MenuFilter from "./Filter/MenuFilter";
import MenuSorter from "./Sorter/MenuSorter";
import Row from "./Row";
import TopMenuOptions from "./TopMenuOptions";
import Assets from "../Assets";
import SLanguage from "../Components/SLanguage";


export type AllowedChild<T> = ReactElement<ReactElement<typeof Col<T>>>;

type rowEventListenersType = { type: "onSelect", key: string, value: boolean } | { type: "onRemove", key: string };


export default class DinamicTableSQL<T> extends React.Component<DinamicTableSQLPropsType<T>> {
    static Col = Col
    colData: { [key: string]: ColData } = {}
    colRef: { [key: string]: Col<any> } = {}
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
        // @ts-ignore
        outlineWidth: 0,
        // flex: 1,
        width: "100%"
    }

    showScrollToTop = false;
    rowSelecteds: { [key: string]: boolean } = {}
    cols: ReactElement<typeof Col<T>>[] = []
    filtros: FilterType[] = [];
    size = 0;
    sorter: SorterType[] = []
    containerRef: View | null = null
    popup: Popup | null = null

    buscador = "";
    dataFiltrada: any[] = []
    counter: CounterData | null = null
    flatList: FlatList<any> | null = null
    limit = 100;
    offset = 0;
    componentDidMount() {
        this.init();
    }
    init = async () => {
        this.buildChildrenTypes();
        await this.loadInitialState();
        await this.loadData();
    }

    async loadInitialState() {
        if (!this.props.loadInitialState) return;
        const state = await this.props.loadInitialState()
        this.filtros = state.filters ?? [];
        this.sorter = state.sorters ?? [];
        this.limit = state.limit ?? 100;
        this.offset = state.offset ?? 0;
        this.colData = {
            ...this.colData,
            ...(state.cols ?? {})
        }
        this.forceUpdate();
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
            this.props.onSelect({ evt: e, key: key, row: row })
        }
        if (!this.props.selectType) return;
        if (this.props.selectType === "single") {
            this.rowSelecteds = {}
        }
        this.rowSelecteds[key] = value;
        this.dispatchRowEvent({ type: "onSelect", key: key, value: value })

    }

    buildChildrenTypes() {
        let children: AllowedChild<T>[];
        if (!Array.isArray(this.props.children)) {
            children = [this.props.children as AllowedChild<T>]
        } else {
            children = this.props.children as AllowedChild<T>[]
        }

        this.cols = [];
        this.cols.push(<DinamicTableSQL.Col
            key='index'
            id="index"
            textStyle={{ fontSize: 10, color: this.colors.text }}
            format={e => e.index + 1}
            width={40} >
            <CounterData dinamicTableInstance={this} ref={ref => this.counter = ref} />
        </DinamicTableSQL.Col>)
        this.colData["index"] = {
            width: 40,
            wrap: false
        }
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            // if (child.type === Header) {
            //     this.headers.push(child as ReactElement<typeof Header>)
            // }
            if (child.type === Col) {
                const c: any = child as any
                this.cols.push(c)
                this.colData[c.key] = {
                    width: c.props.width,
                    wrap: c.props.wrap
                }
            }
        }

        this.forceUpdate();
        // this.cols.sort((a, b) => a.key > b.key ? 1 : -1)
    }


    loadData = async (reset = true) => {
        try {
            if (!this.props.loadData) throw "DinamicTableSQL: Function loadData is required";
            if (reset) {
                this.offset = 0;
            }
            const data = await this.props.loadData(this);
            if (reset) {
                this.dataFiltrada = data;
            } else {
                this.dataFiltrada = [...this.dataFiltrada, ...data];
            }
            // this.dataFiltrada = data;
            this.dataFiltrada.forEach((a, index) => {
                a.__key = a["__key"] ?? index.toString();
                return a;
            })



            this.loadSize();
            this.forceUpdate();
            console.log("DinamicTableSQL", data);
        } catch (error) {
            console.error("Error loading data:", error);
            throw error;
        }
    }

    loadSize = async () => {
        if (!this.props.loadSize) return null;
        if (this.counter) {
            this.counter.setState({ loading: true });
        }
        try {
            const size = await this.props.loadSize(this);
            this.size = size as number;
            this.counter.setState({ count: size, loading: false });

        } catch (error) {
            this.counter.setState({ loading: false });

        }
    }
    applyFilter = () => {
        this.forceUpdate();
        this.loadData();
    }
    applySort = () => {
        this.forceUpdate();
        this.loadData();
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
    getExportState(): ExporterStateType {
        return {
            limit: this.limit,
            offset: this.offset,
            filters: this.filtros,
            sorters: this.sorter,
            cols: this.colData
        }
    }
    render() {
        if (this.props.onEvent) {
            this.props.onEvent({ evt: "render" })
        }
        return <View style={{ flex: 1, width: "100%", }} ref={ref => this.containerRef = ref}>
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                <TopMenuOptions dinamicTableInstance={this} />
                {/* <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", }}>
                    <TextInput
                        placeholderTextColor={this.colors.card}
                        style={[this.inputStyle, { paddingStart: 26 }]}
                        placeholder="Search..."
                        onChangeText={e => {
                            // this.buscador = e
                            // this.applyFilter();
                        }} />
                    <View style={{ width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8, top: 6 }}>
                        <Assets.Search fill={this.colors.accent} />
                    </View>
                </View> */}


                <MenuSorter dinamicTableInstance={this} />
                <MenuFilter dinamicTableInstance={this} />
            </View>

            <View style={{ height: 4 }} />
            <ScrollView
                horizontal style={{ flex: 1, width: "100%" }}
                contentContainerStyle={{ flexDirection: "column", minWidth: "100%", }}
            >
                <View style={{ flexDirection: "row", }}>
                    {...this.cols.filter(a => !this.colData[a.key].hidden).map((c, index) => React.cloneElement(c, {
                        key: c.key, id: c.key,
                        ref: (ref: any) => this.colRef[c.key] = ref,
                        dinamicTableInstance: this,
                    } as any))}
                </View>
                <FlatList
                    ref={ref => this.flatList = ref}
                    data={this.dataFiltrada.filter(row => {
                        if (this.props.filter) {
                            return this.props.filter({ row });
                        }
                        return true;
                    })}
                    contentContainerStyle={{ minWidth: "100%", alignItems: "flex-start", paddingRight: 70 }}
                    keyExtractor={(item, index) => item.__key}
                    renderItem={({ item, index }) => <Row item={item} index={index} dinamicTableInstance={this} />}
                    onEndReachedThreshold={0.4}
                    onEndReached={() => {
                        if (this.size <= this.dataFiltrada.length) return null;
                        this.offset += this.limit;
                        this.loadData(false);
                        console.log("onEndReached");
                    }}

                    ListFooterComponent={() => {
                        if (this.size <= this.dataFiltrada.length) return null;
                        return <View style={{ height: 50, width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator />
                        </View>
                    }}

                    onScroll={e => {
                        const bol = e.nativeEvent.contentOffset.y > 100;
                        if (this.showScrollToTop != bol) {
                            this.showScrollToTop = bol;
                            this.forceUpdate();
                        }

                    }}
                />
            </ScrollView>

            {this.showScrollToTop && <TouchableOpacity style={{
                width: 30, height: 30, borderRadius: 100, backgroundColor: this.colors.accent,
                position: "absolute", bottom: 8, right: 8,
                justifyContent: "center", alignItems: "center",
            }} onPress={() => {
                this.flatList?.scrollToOffset({ offset: 0, animated: true })
            }}>
                <Assets.Arrow stroke={this.colors.background} />
            </TouchableOpacity>}
            <Popup ref={ref => this.popup = ref} dinamicTableInstance={this} />
        </View>
    }
}

function separarPorMiles(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
class CounterData extends React.Component<{ dinamicTableInstance: DinamicTableSQL<any> }> {
    state = {
        count: 0,
        loading: false
    }
    render() {
        return <View style={{
            padding: 2,
            flex: 1,
        }}>
            {this.state.loading ? <ActivityIndicator size={"small"} color={this.props.dinamicTableInstance.colors.text} /> :
                <Text numberOfLines={1} style={[this.props.dinamicTableInstance.textStyle, { fontWeight: "bold" }]}>{`${separarPorMiles(this.state.count)}`}</Text>
            }
        </View>
    }
}