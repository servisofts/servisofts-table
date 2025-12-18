import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DinamicTable from "./DinamicTableSQL";
// import Excel from "./Excel";
import Assets from "../Assets";
import Btn from "../Components/Btn";
import Excel from "./Excel";
import ColumConfig from "./Components/ColumConfig";
// import ColumConfig from "./Components/ColumConfig";
// import Sql from "./Sql"

export default class TopMenuOptions extends React.Component<{ dinamicTableInstance: DinamicTable<any> }> {
    render() {

        const colors = this.props.dinamicTableInstance.colors;
        const textStyle = { color: this.props.dinamicTableInstance.colors.text, padding: 8, fontSize: 12 }
        const size = this.props?.dinamicTableInstance?.props?.iconSize ?? 18;
        return <View style={{ flexDirection: "row", }}>
            <Btn colors={colors} size={size} onPress={() => {
                this.props.dinamicTableInstance.loadData();
            }} icon="Reload">{""}</Btn>
            <View style={{ width: 4 }} />
            <Btn colors={colors} size={size} icon="List" onPress={(e) => {
                this.props.dinamicTableInstance.popup.show({
                    key: "columnas",
                    parent: this.props.dinamicTableInstance.containerRef,
                    onPressEvent: e,
                    height: 300,
                    width: 180,
                    render: () => {
                        return <ColumConfig dinamicTableInstance={this.props.dinamicTableInstance} />
                    }
                })
            }}>{""}</Btn>
            {/* <View style={{ width: 4 }} />
            <Btn icon="Check" colors={colors} onPress={() => {
                const dinamicTableInstance = this.props.dinamicTableInstance;
                console.log(dinamicTableInstance.getExportState())
            }}>{"Save"}</Btn> */}
            <View style={{ width: 4 }} />
            <Btn icon={"DownloadTable"} size={size} colors={colors} onPress={() => {
                const dinamicTableInstance = this.props.dinamicTableInstance;
                Excel.build({ dinamicTableInstance: dinamicTableInstance })
            }}>{""}</Btn>


        </View>
    }
}