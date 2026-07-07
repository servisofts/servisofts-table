import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DinamicTable, { CellStyle } from "./DinamicTable";
import { ColPropsType } from "./Col";
import SDate from "../Components/SDate";

const CHECK_COL_WIDTH = 36;



export type RowPropsType<T> = {
    item: T,
    index: number,
    dinamicTableInstance: DinamicTable<T>,
    colWidthVersion: number,
}
export default class Row<T> extends React.PureComponent<RowPropsType<T>> {
    state = { selected: false, hover: false }
    static defaultProps = {
    }

    componentDidMount(): void {
        this.props.dinamicTableInstance.addRowEventListener(this.props.item["__key"], (obj) => {
            if (obj.type == "onSelect") {
                const selected = this.props.dinamicTableInstance.rowSelecteds[(this.props.item as any).__key]
                if (this.state.selected != selected) {
                    this.setState({ selected: selected });
                }

                // this.setState({ selected:  });
            }
        })
    }
    componentWillUnmount(): void {
        this.props.dinamicTableInstance.removeRowEventListener(this.props.item["__key"]);
    }


    render() {
        const dinamicTableInstance = this.props.dinamicTableInstance;
        const colors = dinamicTableInstance.colors;
        // const selected = this.state.selected;
        const selected = this.props.dinamicTableInstance.rowSelecteds[(this.props.item as any).__key]
        this.state.selected = selected;
        var style = {};
        if (this.props.dinamicTableInstance.props.buildRowStyle) {
            const buildRowStyle = this.props.dinamicTableInstance.props.buildRowStyle({
                item: this.props.item,
                index: this.props.index,
                dinamicTable: dinamicTableInstance,
            })
            style = {
                ...style,
                ...buildRowStyle,
            }
        }
        return <TouchableWithoutFeedback onPress={(e) => {
            if (dinamicTableInstance.props.selectType === "check") return;
            dinamicTableInstance.setSelect((this.props.item as any).__key, !selected, e);
        }} >
            <View
                {...({
                    onMouseEnter: () => this.setState({ hover: true }),
                    onMouseLeave: () => this.setState({ hover: false })
                } as any)}
                style={[{
                    flexDirection: "row",
                    borderWidth: 0.5,
                    borderColor: "transparent",
                    backgroundColor: this.props.index % 2 === 1 ? colors.text + "10" : "transparent",
                },
                    style,



                ]} >
                {dinamicTableInstance.props.selectType === "check" && (
                    <TouchableOpacity
                        onPress={() => dinamicTableInstance.setSelect((this.props.item as any).__key, !selected)}
                        style={{
                            width: CHECK_COL_WIDTH,
                            borderWidth: 0.5,
                            borderColor: selected ? colors.accent : colors.border,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "stretch",
                            backgroundColor: selected ? colors.accent + "40" : "transparent",
                        }}
                    >
                        <View style={{
                            width: 14,
                            height: 14,
                            borderWidth: 1.5,
                            borderColor: selected ? colors.accent : colors.border,
                            borderRadius: 3,
                            backgroundColor: selected ? colors.accent : "transparent",
                        }} />
                    </TouchableOpacity>
                )}
                {dinamicTableInstance.cols.filter(a => !dinamicTableInstance.colData[a.key].hidden).map((col, colIndex, visibleCols) => {
                    const colProps = col.props as unknown as ColPropsType<T>;
                    const styleText = StyleSheet.flatten([{ color: colors.text }, dinamicTableInstance.props.textStyle, colProps.textStyle])
                    const colData = dinamicTableInstance.colData[col.key];
                    const data = this.props.item[col.key];

                    // Determine if this is first or last column for border radius
                    const isFirstColumn = colIndex === 0;
                    const isLastColumn = colIndex === visibleCols.length - 1;
                    const borderRadius = 8;

                    let dataFormat;
                    if (colProps.format) {
                        dataFormat = colProps.format({
                            data: data,
                            row: this.props.item["__original"],
                            index: this.props.index,
                            textStyle: styleText
                        })
                    } else {
                        dataFormat = !data ? "" : data.toString();
                        if (dataFormat) {
                            if (colProps.dataType === "date") {
                                if (colProps.dateFormat) {
                                    dataFormat = new SDate(data).toString(colProps.dateFormat);
                                }
                            }
                        }


                    }
                    let CONTENT = colProps.customComponent ?
                        colProps.customComponent({
                            data: data,
                            dataFormat: dataFormat,
                            row: this.props.item["__original"],
                            index: this.props.index,
                            textStyle: styleText,
                            dinamicTable: dinamicTableInstance,
                            colData: colData,
                        })
                        : <Text style={styleText} numberOfLines={!colData.wrap ? 1 : 0}>{dataFormat ?? ""}</Text>

                    if (colProps.usePermission) {
                        if (!colProps.usePermission({ data: data, row: this.props.item, index: this.props.index, textStyle: styleText, colData: colData, dinamicTable: dinamicTableInstance })) {
                            CONTENT = null;
                        }
                    }

                    let ComponentView: any = View;
                    let onPress = null;
                    if (colProps.onPress) {
                        ComponentView = TouchableOpacity
                        onPress = () => {
                            colProps.onPress({
                                data: data,
                                dataFormat: dataFormat,
                                row: this.props.item["__original"],
                                index: this.props.index,
                                textStyle: styleText,
                                dinamicTable: dinamicTableInstance,
                                colData: colData,
                            })
                            // colProps.onPress
                        }
                    }
                    return <ComponentView key={`${col.key}-${this.props.index}`}
                        onPress={onPress}
                        style={[
                            { borderWidth: 0.5, borderColor: colors.border, justifyContent: "center", padding: 4, },
                            dinamicTableInstance.props.cellStyle,
                            colProps.cellStyle,
                            {
                                width: dinamicTableInstance.getAdjustedColumnWidth(String(col.key)),
                            },
                            this.state.hover ? {
                                backgroundColor: colors.accent + "20",
                                ...(this.props.dinamicTableInstance.props.hoverStyle ?? {})
                            } : {},
                            selected ? {
                                backgroundColor: colors.accent + "40",
                                borderColor: colors.accent,
                                borderWidth: 0.5,
                                borderBottomColor: colors.accent,

                            } : {},

                        ]}>
                        {CONTENT}
                    </ComponentView>
                })}
            </View>
        </TouchableWithoutFeedback>
    }
}