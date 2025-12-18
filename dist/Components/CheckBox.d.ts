import React from "react";
import { ViewStyle } from "react-native";
export default class CheckBox extends React.Component<{
    value?: boolean;
    style?: ViewStyle;
    color?: string;
    colorActive?: string;
    colorIcon?: string;
}> {
    state: {
        value: boolean;
    };
    render(): JSX.Element;
}
