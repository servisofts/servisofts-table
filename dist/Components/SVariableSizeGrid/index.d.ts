import { Component } from 'react';
import { SVariableSizeGridType } from './type';
export default class SVariableSizeGrid extends Component<SVariableSizeGridType> {
    style: any;
    state: {
        layout: {
            height: number;
            width: number;
        };
        scroll: {
            x: number;
            y: number;
        };
    };
    /**
          border-bottom: 1px solid #666;
            border-right: 1px solid #666;
            overflow: hidden;
            font-size:12px;
            color: #fff;
            box-sizing: border-box;
     */
    componentDidMount(): void;
    componentWillUnmount(): void;
    onScrollHandle: (e: any) => void;
    handleClick(e: any, p: any): void;
    render(): JSX.Element;
}
