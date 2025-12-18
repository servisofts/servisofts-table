import React from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import DinamicTable from "../DinamicTable";
import Btn from "../../Components/Btn";
import CheckBox from "../../Components/CheckBox";
import DraggableList from "../../Components/DraggableList";
import Assets from "../../Assets";

type CheckBoxProps = {
    dinamicTableInstance: DinamicTable<any>
}
export default class ColumConfig extends React.Component<CheckBoxProps> {


    render() {
        const colors = this.props.dinamicTableInstance.colors;
        const columns = this.props.dinamicTableInstance.cols;
        return <View style={{
            backgroundColor: colors.background, height: "100%", borderRadius: 8, borderWidth: 1,
            borderColor: colors.border
        }}>
            <DraggableList
                data={columns}
                itemHeight={25}
                onChange={(items) => {
                    this.props.dinamicTableInstance.cols = items;
                    this.props.dinamicTableInstance.forceUpdate()
                }}
                renderItem={({ item, index }) => {
                    // @ts-ignore
                    const pitem: any = item.props;

                    return <View style={{ width: "100%", flexDirection: "row", alignItems: "center", height: 25, }}>
                        <View style={{ justifyContent: "center", alignItems: "center", width: 25, height: 25 }}>
                            <Assets.Sort width={12} stroke={this.props.dinamicTableInstance.colors.text} />
                            {/* <Text>{index+1}</Text> */}
                        </View>
                        <Text numberOfLines={1} style={[this.props.dinamicTableInstance.textStyle, { flex: 1 }]}>{pitem.label??item.key}</Text>
                        <TouchableOpacity onPress={() => {
                            // this.props.dinamicTableInstance.colData[item.key].wrap = !this.props.dinamicTableInstance.colData[item.key].wrap;
                            this.props.dinamicTableInstance.colData[item.key].hidden = !this.props.dinamicTableInstance.colData[item.key].hidden;
                            this.forceUpdate()
                            this.props.dinamicTableInstance.forceUpdate()
                        }} >
                            <CheckBox color={colors.accent} colorActive={colors.accent} value={!this.props.dinamicTableInstance.colData[item.key].hidden} colorIcon={colors.background} />
                        </TouchableOpacity>
                    </View>

                }}
            />
            {/* <FlatList
                data={columns}
                style={{ flex: 1, padding: 6, }}
                renderItem={({ item, index }) => {
                    // @ts-ignore
                    const pitem: any = item.props;

                    return <Btn colors={colors} icon="Sort" onPress={() => {
                        // this.props.dinamicTableInstance.colData[item.key].wrap = !this.props.dinamicTableInstance.colData[item.key].wrap;
                        this.props.dinamicTableInstance.colData[item.key].hidden = !this.props.dinamicTableInstance.colData[item.key].hidden;
                        this.forceUpdate()
                        this.props.dinamicTableInstance.forceUpdate()
                    }}>
                        <Text numberOfLines={1} style={[this.props.dinamicTableInstance.textStyle, { flex: 1 }]}>{pitem.label}</Text>
                        <CheckBox color={colors.accent} colorActive={colors.accent} value={!this.props.dinamicTableInstance.colData[item.key].hidden} />
                    </Btn>

                }}
            /> */}
        </View>
    }
}