import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DinamicTable from "../DinamicTable";
import Assets from "../../Assets";

export type MenuGrouperPropsType = {
    dinamicTableInstance: DinamicTable<any>,
}

export default class MenuGrouper extends React.Component<MenuGrouperPropsType> {
    render() {
        const groupers = this.props.dinamicTableInstance.groupers;
        const colors = this.props.dinamicTableInstance.colors;

        return groupers.map((item, index) => {
            const col: any = this.props.dinamicTableInstance.cols.find(a => a.key == item.key);
            return (
                <TouchableOpacity
                    key={`grouper-${item.key}`}
                    style={{
                        padding: 4,
                        paddingRight: 4,
                        paddingLeft: 4,
                        borderWidth: 0.5,
                        borderColor: colors.accent + "99",
                        backgroundColor: colors.card,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        maxWidth: 140,
                        marginTop: 2,
                    }}
                    onPress={() => {
                        this.props.dinamicTableInstance.groupers.splice(index, 1);
                        this.props.dinamicTableInstance.applyGroup();
                    }}
                >
                    <View style={{ width: 10 }}>
                        {React.createElement(Assets.List as any, { stroke: colors.text, width: 10, height: 10 })}
                    </View>
                    <View style={{ width: 2 }} />
                    <Text style={{ color: colors.text, fontSize: 9, fontWeight: "bold" }} numberOfLines={1}>
                        {col?.props?.label ?? item.key}
                    </Text>
                </TouchableOpacity>
            );
        });
    }
}
