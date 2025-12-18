import { Component } from 'react';
import { TableProps } from './types';
type HeaderProps = {
    onChangeColSize: (e: {
        index: number;
        size: number;
    }) => void;
};
export default class Headers extends Component<TableProps & HeaderProps> {
    state: {};
    scroll: any;
    scrollTo(e: any): void;
    convertirNumeroALetra(numero: any): string;
    headerLetter: ({ width, val, index }: {
        width: any;
        val: any;
        index: any;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
