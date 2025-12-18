import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View, ViewProps, ViewStyle } from "react-native";
import { Colors } from "../../DinamicTable/DinamicTable";
import Assets from "../../Assets";
type BtnProps = {
    colors: Colors,
    color?: string,
    onPress?: TouchableOpacityProps["onPress"],
    children?: any,
    style?: ViewStyle,
    icon?: keyof typeof Assets,
    size?: number,
}
export default class Btn extends React.Component<BtnProps> {


    render() {
        const size = this.props.size ?? 18;
        // this.props.icon
        let CONTENT = this.props.children;
        if (typeof this.props.children == "string") {
            CONTENT = <Text style={{
                color: this.props.color ?? this.props.colors.text,
                fontSize: 12
            }}>{this.props.children}</Text>
        }
        const AsetComp = Assets[this?.props?.icon];
        return <TouchableOpacity onPress={this.props.onPress} style={{
            padding: 4,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            ...(this.props.style ?? {})
        }} >
            {AsetComp ? <>
                <AsetComp width={size} height={size} fill={this.props.colors.text} stroke={this.props.colors.text} />
                {CONTENT ? <View style={{ width: 6 }} /> : null}
            </> : null}
            {CONTENT}
        </TouchableOpacity>
    }
}