import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import DinamicTable from "../DinamicTable";
import SDate from "../../Components/SDate";
import Assets from "../../Assets";


export type MenuFilterPropsType = {
    dinamicTableInstance: DinamicTable<any>,
}
export default class MenuFilter<T> extends React.Component<MenuFilterPropsType> {
    static defaultProps = {
    }
    render() {
        const filters = this.props.dinamicTableInstance.filtros;
        const colors = this.props.dinamicTableInstance.colors;

        const dinamicTable = this.props.dinamicTableInstance

        return filters.map((item: any, index: number) => {
            const header: any = this.props.dinamicTableInstance.cols.find(a => a.key == item.col);

            let text = item.value;
            if (item.type == "date") {
                if (Array.isArray(item.value)) {
                    text = "";
                    item.value.forEach((v: any, i: number) => {
                        if (v) {
                            let date = new Date(v);
                            if (header.props.dateFormat) {
                                text += new SDate(date).toString(header.props.dateFormat);
                                if (i < item.value.length - 1) {
                                    text += ", "
                                }
                            }
                        }
                    })
                }
            }
            return <><View style={{ width: 4 }} />
                <TouchableOpacity style={{
                    padding: 4,
                    paddingRight: 4,
                    paddingLeft: 4,
                    borderWidth: 0.5,
                    borderColor: colors.accent+"99",
                    backgroundColor: colors.accent + "30",
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    maxWidth: 180,
                    marginTop: 2,
                }} onPress={() => {
                    this.props.dinamicTableInstance.filtros.splice(index, 1);
                    this.props.dinamicTableInstance.applyFilter()
                }}>
                    <View style={{ width: 10 }}>
                        <Assets.Filter stroke={colors.text} width={10} height={10} />
                    </View>
                    <View style={{ width: 2 }} />
                    <Text numberOfLines={1} style={{ color: colors.text, fontSize: 9, fontWeight: "bold", maxWidth: 70 }}>{header?.props?.label ?? item.col}</Text>
                    <View style={{ width: 2 }} />
                    <Text style={{
                        color: colors.text,
                        fontSize: 9,
                    }} numberOfLines={1}>
                        <Text style={{ color: colors.text, }}>{` ${item.operator} `}</Text>
                        <Text style={{ color: colors.text, }}>{text}</Text>
                    </Text>
                </TouchableOpacity >
            </>
        })


    }
}