import { TextStyle } from 'react-native';
import { Component } from 'react';
type PropsType = {
    height?: number;
    cellStyle: TextStyle;
};
export default class ToolBar extends Component<PropsType> {
    static defaultProps: {
        height: number;
    };
    render(): JSX.Element;
}
export {};
