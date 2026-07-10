import React, { useEffect } from "react";
import { Animated, FlatList, PanResponder, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import DinamicTable, { CellStyle, ColData } from "./DinamicTable";
import { DataType } from ".";
// import { FilterType,  } from "./Filter";
import ColMenu from "./Components/ColMenu";
import Assets from "../Assets";



export type ColPropsType<T> = {
    label?: string | React.ReactElement,
    labelIcon?: any,
    dataType: DataType,
    dateFormat?: string,
    width: number,
    data: (props: { row: T, index: number }) => any,
    format?: (props: { data: any, row: T, index: number, textStyle: TextStyle }) => any,
    // filterList is true when this renders a value inside the column's filter
    // popup checklist instead of an actual table cell: that list is narrower and
    // each row is height-clamped, so a customComponent (eg. an avatar + name) may
    // want to render a more compact version there (smaller avatar, tighter gaps).
    customComponent?: (props: { data: any, dataFormat: any, row: T, index: number, textStyle: TextStyle, dinamicTable: DinamicTable<T>, colData: ColData, filterList?: boolean }) => any,
    onPress?: (props: { data: any, dataFormat: any, row: T, index: number, textStyle: TextStyle, dinamicTable: DinamicTable<T>, colData: ColData }) => any,
    dinamicTableInstance?: DinamicTable<T>,
    children?: any,
    cellStyle?: CellStyle,
    textStyle?: TextStyle,
    textTitleStyle?: TextStyle,
    wrap?: boolean,
    id?: string,
    disableFilterGroup?: boolean,
    disableFilter?: boolean,
    disableSorter?: boolean,
    disableGrouper?: boolean,
    disableExport?: boolean,
    excelFormat?: string,
    sumExcel?: boolean,
    sumTotal?: boolean | [string, number] | ((rows: T[]) => string),
    usePermission?: (props: { data: any, row: T, index: number, textStyle: TextStyle, dinamicTable: DinamicTable<T>, colData: ColData }) => boolean,
    footerComponent?: (props: { textStyle: TextStyle, dinamicTable: DinamicTable<T> }) => any,
    listFooterComponent?: (props: { textStyle: TextStyle, dinamicTable: DinamicTable<T> }) => any,
    headerStyle?: ViewStyle,
    customHeaderComponent?: (props: { label?: string | React.ReactElement, sumTotal?: string, textStyle: TextStyle, colors: any, dinamicTable: DinamicTable<T> }) => any,
}

export default class Col<T> extends React.Component<ColPropsType<T>> {
    static defaultProps = {
        dataType: "string",
        width: 100,
        wrap: false,
    }
    state = {
        isResizing: false
    }
    widthAnim = new Animated.Value(this.props.dinamicTableInstance.colData[this.props.id].width);
    currentWidth = this.props.dinamicTableInstance.colData[this.props.id].width;
    startX = 0;

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
            this.setState({ isResizing: true });
            this.startX = evt.nativeEvent.pageX;
        },
        onPanResponderMove: (evt) => {
            const diffX = evt.nativeEvent.pageX - this.startX;
            this.startX = evt.nativeEvent.pageX; // Actualiza el punto de inicio

            // Calculamos el nuevo ancho
            this.currentWidth = Math.max(20, this.currentWidth + diffX);

            // Aplicamos el nuevo valor de ancho con `setValue()`
            this.widthAnim.setValue(this.currentWidth);
        },
        onPanResponderRelease: (evt) => {
            this.props.dinamicTableInstance.colData[this.props.id].width = this.currentWidth;
            this.props.dinamicTableInstance._colWidthVersion++;
            this.setState({ isResizing: false });
            this.props.dinamicTableInstance.forceUpdate();
            // this.setState({ width: this.currentWidth });
        }
    });

    componentDidUpdate() {
        // Sync animation value with adjusted width when not resizing
        if (!this.state.isResizing) {
            const adjustedWidth = this.props.dinamicTableInstance.getAdjustedColumnWidth(this.props.id);
            if (this.currentWidth !== adjustedWidth) {
                this.currentWidth = adjustedWidth;
                this.widthAnim.setValue(adjustedWidth);
            }
        }
    }

    showPopup(evt) {
        const dinamicTableInstance = this.props.dinamicTableInstance;
        dinamicTableInstance.popup.show({
            key: "colMenu",
            onPressEvent: evt,
            // "datetime"/"time" list a grouped tree (day or hour), which needs more room than a flat list.
            height: (this.props.dataType === "datetime" || this.props.dataType === "time") ? 460 : 308,
            // "date"/"time"/"datetime" values are short and fixed-format ("2026-07-08",
            // "08:30:00"), so the popup can stay narrow. Anything else (string, number,
            // boolean - names, labels, custom avatars, etc.) tends to run longer, so it
            // gets extra room. 210 is still enough to fit "Ascendente"/"Descendente" side by side.
            width: this.props.dataType === "date" ? 180 : (this.props.dataType === "time" || this.props.dataType === "datetime") ? 200 : 290,
            parent: dinamicTableInstance.containerRef, render: () => { return <ColMenu col={this} /> }
        })
    }

    renderFilter() {
        const dinamicTableInstance = this.props.dinamicTableInstance;
        const filter = dinamicTableInstance.filtros.find((f) => f.col == this.props.id);
        if (!filter) return null;
        return <View style={{ backgroundColor: dinamicTableInstance.colors.accent, borderRadius: 2, }}>
            <Assets.Filter width={10} height={10} fill={dinamicTableInstance.colors.background} stroke={dinamicTableInstance.colors.background} />
        </View>

    }
    renderSorter() {
        const dinamicTableInstance = this.props.dinamicTableInstance;
        const sorter = dinamicTableInstance.sorter.find((f) => f.key == this.props.id);
        if (!sorter) return null;
        return <View style={{ backgroundColor: dinamicTableInstance.colors.accent, borderRadius: 1, }}>
            <Assets.Arrow width={10} height={10} fill={dinamicTableInstance.colors.background} stroke={dinamicTableInstance.colors.background}
                transform={`rotate(${sorter.order == "asc" ? 0 : 180})`}
            />
        </View>

    }

    renderGrouper() {
        const grouped = this.props.dinamicTableInstance!.groupers.some((g) => g.key == this.props.id);
        if (!grouped) return null;
        const ListIcon = Assets.List as any;
        return <View style={{ backgroundColor: this.props.dinamicTableInstance!.colors.accent, borderRadius: 1, }}>
            <ListIcon width={10} height={10} fill={this.props.dinamicTableInstance!.colors.background} stroke={this.props.dinamicTableInstance!.colors.background} />
        </View>
    }
    render() {
        const colors = this.props.dinamicTableInstance.colors;
        const colData = this.props.dinamicTableInstance?.colData?.[this.props.id];
        // Use widthAnim for smooth resizing, but sync with adjusted width when not resizing
        const adjustedWidth = this.props.dinamicTableInstance.getAdjustedColumnWidth(this.props.id);

        // Determine if this is first or last visible column for border radius
        const visibleCols = this.props.dinamicTableInstance.cols.filter(a => !this.props.dinamicTableInstance.colData[a.key].hidden);
        const hasCheckCol = this.props.dinamicTableInstance?.props?.selectType === "check";
        const isFirstColumn = visibleCols.length > 0 && visibleCols[0].key === this.props.id && !hasCheckCol;
        const isLastColumn = visibleCols.length > 0 && visibleCols[visibleCols.length - 1].key === this.props.id;

        const borderRadius = 8; // You can make this configurable later

        let sumTotalText = "";
        if (this.props.sumTotal) {
            const rows = (this.props.dinamicTableInstance?.dataFiltrada ?? []).map((item: any) => item.__original);
            if (typeof this.props.sumTotal === "function") {
                sumTotalText = this.props.sumTotal(rows) ?? "";
            } else {
                const total = rows.reduce((s: number, row: any) => s + (Number(this.props.data({ row, index: 0 })) || 0), 0);
                if (Array.isArray(this.props.sumTotal)) {
                    const [prefix, decimals] = this.props.sumTotal;
                    sumTotalText = `${prefix ?? ""} ${total.toFixed(decimals ?? 0)}`.trim();
                } else {
                    sumTotalText = this.props.format
                        ? this.props.format({ data: total, row: null as any, index: -1, textStyle: { color: colors.text } })
                        : String(total);
                }
            }
        }

        return <View style={{ flexDirection: "row", alignItems: "center", }}>
            <Animated.View
                style={[
                    {
                        // borderWidth: 0.5,
                        borderColor: colors.border,
                        minHeight: 26,
                        height: "100%",
                        backgroundColor: colors.header,
                        justifyContent: "center",
                        alignItems: "center",
                        width: this.widthAnim,
                        borderBottomColor: colors.border,
                        borderBottomWidth: 0.5,
                        borderTopLeftRadius: isFirstColumn ? borderRadius : 0,
                        borderTopRightRadius: isLastColumn ? borderRadius : 0,
                    },
                    this.props?.dinamicTableInstance?.props?.cellStyle,
                    this.props.headerStyle,
                ]}
            >
                <TouchableOpacity onPress={this.showPopup.bind(this)} style={{
                    width: "100%", flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row",
                    overflow: "hidden",
                    paddingHorizontal: 4,
                    ...this.props.headerStyle ? {
                        justifyContent: this.props.headerStyle.justifyContent,
                        alignItems: this.props.headerStyle.alignItems,
                    } : {},
                    ...this.props.sumTotal ? { justifyContent: "space-between" } : {}
                }}>
                    {this.props.customHeaderComponent ? (
                        this.props.customHeaderComponent({
                            label: this.props.label,
                            sumTotal: this.props.sumTotal ? sumTotalText : undefined,
                            textStyle: StyleSheet.flatten([{ color: colors.text }, this.props?.dinamicTableInstance?.props?.textStyle, this.props.textStyle]),
                            colors,
                            dinamicTable: this.props.dinamicTableInstance,
                        })
                    ) : (
                        <>
                            {this.props.labelIcon}
                            {this.props.labelIcon && this.props.label ? <View style={{ width: 8 }} /> : null}
                            {typeof this.props.label === "string" || this.props.label === undefined ? (
                                <Text style={[{ color: colors.text, overflow: "hidden", flexWrap: "wrap", textAlign: "center", flexShrink: 1, minWidth: 0 }, this.props?.dinamicTableInstance?.props?.textStyle, this.props.textStyle, this.props?.dinamicTableInstance?.props?.textTitleStyle, this.props.textTitleStyle]}
                                    numberOfLines={colData.wrap ? 0 : 1}
                                >
                                    {this.props.label}
                                </Text>
                            ) : this.props.label}
                            {this.props.sumTotal ? (
                                <Text numberOfLines={1} style={[{ color: colors.text, fontWeight: "bold", flexShrink: 1, minWidth: 0 }, this.props?.dinamicTableInstance?.props?.textStyle, this.props.textStyle]}>
                                    {sumTotalText}
                                </Text>
                            ) : null}
                        </>
                    )}
                    {this.props.children}
                </TouchableOpacity>

                <View style={{
                    position: "absolute", right: 2, bottom: -2, flexDirection: "row"
                }}>
                    {this.renderFilter()}
                    <View style={{ width: 2 }} />
                    {this.renderSorter()}
                    <View style={{ width: 2 }} />
                    {this.renderGrouper()}
                </View>

            </Animated.View>
            <View
                {...this.panResponder.panHandlers}
                style={{
                    position: "absolute",
                    width: 8,
                    right: 0,
                    height: "100%",
                    backgroundColor: "transparent",
                    borderRightWidth: 1,
                    borderRightColor: colors.border,
                    // @ts-ignore
                    cursor: "ew-resize"
                }}
            />
        </View>
    }
}
