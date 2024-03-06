import { Component } from 'react';
import { TableProps } from './types';
export default class RowNumbers extends Component<TableProps> {
    state: {};
    scroll: any;
    scrollTo(evt: any): void;
    headerLetter: ({ width, val }: {
        width: any;
        val: any;
    }) => void;
    getItemLayout(data: any, index: any): {
        length: number;
        offset: number;
        index: any;
    };
    keyExtractor(item: any, index: any): string;
    render(): JSX.Element;
}
