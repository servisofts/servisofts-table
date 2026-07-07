import React, { Component } from 'react';
import { SFlashListProps } from './types';
import { VariableSizeList } from "react-window";
export default class SFlashList extends Component<SFlashListProps> {
    state: {
        layout: {
            width: number;
            height: number;
        };
    };
    ref: InstanceType<typeof VariableSizeList> | null;
    private _renderItem;
    private _data;
    _RowItem: ({ index, style }: {
        index: number;
        style: React.CSSProperties;
    }) => JSX.Element;
    componentDidUpdate(prevProps: SFlashListProps): void;
    resetAfterIndex(index: number, shouldForceUpdate?: boolean): void;
    scrollToOffset(e: {
        offset: number;
    }): void;
    render(): JSX.Element;
}
