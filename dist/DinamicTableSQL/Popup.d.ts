import React from "react";
import DinamicTable from "./DinamicTableSQL";
export default class Popup extends React.Component<{
    dinamicTableInstance: DinamicTable<any>;
}> {
    static defaultProps: {};
    state: {
        popups: {
            [key: string]: any;
        };
    };
    close(key: string): void;
    show(props: {
        onPressEvent: any;
        parent: any;
        render: () => any;
        width?: number;
        height?: number;
        key?: string;
        left?: number;
    }): string;
    render(): any[] | JSX.Element;
}
