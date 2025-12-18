import React from "react";
import { View, ViewStyle } from "react-native";
import Assets from "../Assets";

export default class CheckBox extends React.Component<{ value?: boolean, style?: ViewStyle, color?: string, colorActive?: string, colorIcon?: string }> {
    state = {
        value: this.props.value,
    }
    render() {
        let color = this.props.color ?? "#fff";
        let colorActive = this.props.colorActive ?? (this.props.color ?? "#fff");
        let colorIcon = this.props.colorIcon ?? "#3774C1";
        let styleContent: ViewStyle = {
            width: 16, height: 16, borderRadius: 4,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: color,
            // padding: 4,
            ...this.props.style,

        }
        let CONTENT = null;

        if (this.props.value) {
            styleContent.backgroundColor = colorActive;
            CONTENT = <Assets.Check stroke={colorIcon} />
        }
        return <View style={styleContent} >
            {CONTENT}
        </View>
    }
}