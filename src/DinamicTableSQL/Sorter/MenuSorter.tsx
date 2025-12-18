import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import DinamicTable from "../DinamicTableSQL";
import Assets from "../../Assets";


export type MenuSorterPropsType = {
    dinamicTableInstance: DinamicTable<any>,
}
export default class MenuSorter<T> extends React.Component<MenuSorterPropsType> {
    static defaultProps = {
    }
    render() {
        const sorters = this.props.dinamicTableInstance.sorter;
        const colors = this.props.dinamicTableInstance.colors;


        return sorters.map((item, index) => {
            const header: any = this.props.dinamicTableInstance.cols.find(a => a.key == item.key);
            return <>
                <View style={{ width: 4 }} />
                <TouchableOpacity style={{
                    // padding: 2,
                    padding: 4,
                    paddingRight: 4,
                    paddingLeft: 4,
                    borderWidth: 0.5,
                    borderColor: colors.accent + "99",
                    backgroundColor: colors.header,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    maxWidth: 140,
                    marginTop: 2,
                }} onPress={() => {
                    this.props.dinamicTableInstance.sorter.splice(index, 1);
                    this.props.dinamicTableInstance.applySort()
                }}>
                    <View style={{ width: 10 }}>
                        <Assets.Arrow stroke={colors.text} fill={colors.text} width={10} height={10}
                            transform={`rotate(${item.order === "asc" ? 0 : 180})`} />
                    </View>
                    <View style={{ width: 2 }} />
                    <Text style={{
                        color: colors.text,
                        fontSize: 9,
                    }} numberOfLines={1}>
                        <Text style={{ color: colors.text, fontWeight: "bold" }}>{header?.props?.label ?? item.key}</Text>
                    </Text>
                </TouchableOpacity>
            </>
        })
        // return <FlatList
        //     data={sorters}
        //     horizontal
        //     scrollEnabled={false}
        //     ListHeaderComponent={() => <View style={{ width: 4 }} />}
        //     ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
        //     contentContainerStyle={{
        //         flexWrap: "wrap",
        //     }}
        //     renderItem={({ item, index }) => {

        //     }}
        // />
    }
}