import React from 'react';
import { Animated } from 'react-native';
type DraggableListProps = {
    data: any[];
    renderItem: (p: {
        item: any;
        index: number;
    }) => React.ReactNode;
    itemHeight?: number;
    onChange?: (items: any[]) => void;
};
export default class DraggableList extends React.Component<DraggableListProps> {
    state: {
        key: string;
        items: any[];
        draggingIndex: number;
        dragY: Animated.Value;
        itemHeight: number;
    };
    handleReorder: (fromIndex: any, finalY: any) => void;
    render(): JSX.Element;
}
export {};
