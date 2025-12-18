import { Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { Component } from 'react'

type PropsType = {
    // sheet: Sheet,
    height?: number,
    cellStyle: TextStyle
}
export default class ToolBar extends Component<PropsType> {

    static defaultProps = {
        height: 30,
    }
    render() {
        // const table = this.props.sheet.props.table;
        // const sheet = this.props.sheet;
        const style: ViewStyle = {
            height: "100%",
            borderWidth: 1,
            borderColor: this.props.cellStyle.borderColor
        }
        return <View style={{
            width: "100%",
            height: 36,
            flexDirection: "row",
            padding: 4
        }}>
            <View style={[{ width: 100, }, style]}></View>
            <View style={{ width: 8 }} />
            <View style={[{ width: 40, }, style]}></View>
            <View style={{ width: 8 }} />
            <View style={[{ flex: 1, }, style]}></View>
        </View>
    }
}