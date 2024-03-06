import { Component } from 'react';
import { SFlashListProps } from './types';
export default class SFlashList extends Component<SFlashListProps> {
    state: {
        layout: {
            width: number;
            height: number;
        };
    };
    ref: any;
    scrollToOffset(e: any): void;
    render(): JSX.Element;
}
