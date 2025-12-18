import React from "react";
import { TouchableOpacityProps, ViewStyle } from "react-native";
import { Colors } from "../../DinamicTable/DinamicTable";
import Assets from "../../Assets";
type BtnProps = {
    colors: Colors;
    color?: string;
    onPress?: TouchableOpacityProps["onPress"];
    children?: any;
    style?: ViewStyle;
    icon?: keyof typeof Assets;
    size?: number;
};
export default class Btn extends React.Component<BtnProps> {
    render(): JSX.Element;
}
export {};
