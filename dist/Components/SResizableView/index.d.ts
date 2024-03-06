import { Component } from 'react';
type PropsType = {
    direcction?: "top" | "bottom" | "left" | "right";
    size?: any;
    width: any;
    onContentSizeChange?: any;
};
export default class SResizableView extends Component<PropsType> {
    state: any;
    panResponder: any;
    startWidth: any;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
