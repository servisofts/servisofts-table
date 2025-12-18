import React from "react";
import { StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View } from "react-native";
import DinamicTable from "./DinamicTableSQL";
import { ColPropsType } from "./Col";
import SDate from "../Components/SDate";



export type RowPropsType<T> = {

    item: T,
    index: number,
    dinamicTableInstance: DinamicTable<T>,
}
export default class Row<T> extends React.Component<RowPropsType<T>> {
    state = { selected: false }
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
        return <TouchableWithoutFeedback onPress={(e) => {
            console.log(e);
            dinamicTableInstance.setSelect((this.props.item as any).__key, !selected, e);
            // dinamicTableInstance.forceUpdate();
            // this.setState({ selected: !selected });
        }} >
            <View style={[{
                flexDirection: "row",
                borderWidth: 0.5,
                borderColor: "transparent",
                backgroundColor: this.props.index % 2 === 1 ? colors.text + "10" : "transparent",
            },
            selected ? {
                backgroundColor: colors.accent + "40",
                borderColor: colors.accent,
                borderWidth: 0.5,

            } : {},
            ]} >
                {dinamicTableInstance.cols.filter(a => !dinamicTableInstance.colData[a.key].hidden).map((col) => {
                    const colProps = col.props as unknown as ColPropsType<T>;
                    const styleText = StyleSheet.flatten([{ color: colors.text }, dinamicTableInstance.props.textStyle, colProps.textStyle])
                    const colData = dinamicTableInstance.colData[col.key];
                    const data = this.props.item[col.key];
                    let dataFormat;
                    if (colProps.format) {
                        dataFormat = colProps.format({
                            data: data,
                            row: this.props.item,
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
                            row: this.props.item,
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

                    return <View key={`${col.key}-${this.props.index}`} style={[
                        { borderWidth: 0.5, borderColor: colors.border, justifyContent: "center", padding: 4, },
                        dinamicTableInstance.props.cellStyle,
                        colProps.cellStyle,
                        {
                            width: colData.width,

                        },

                    ]}>
                        {CONTENT}
                    </View>
                })}
            </View>
        </TouchableWithoutFeedback>
    }
}