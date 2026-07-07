import { View } from 'react-native'
import React, { Component } from 'react'
import { SFlashListProps } from './types'
import { VariableSizeList } from "react-window"

export default class SFlashList extends Component<SFlashListProps> {
    state = {
        layout: { width: 0, height: 0 }
    }
    ref: InstanceType<typeof VariableSizeList> | null = null;

    // These are updated before each render so _RowItem always has fresh data
    // without being re-created (which would cause VariableSizeList to remount all items).
    private _renderItem: SFlashListProps['renderItem'] = () => null;
    private _data: any[] = [];

    _RowItem = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={{ ...style, overflow: 'hidden' }}>
            {this._renderItem({ item: this._data[index], index })}
        </div>
    );

    componentDidUpdate(prevProps: SFlashListProps) {
        if (prevProps.data !== this.props.data && this.ref) {
            this.ref.resetAfterIndex(0, false);
        }
    }

    resetAfterIndex(index: number, shouldForceUpdate: boolean = false) {
        this.ref?.resetAfterIndex(index, shouldForceUpdate);
    }

    scrollToOffset(e: { offset: number }) {
        try {
            if (this.ref) (this.ref as any).scrollTo(e.offset);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        this._renderItem = this.props.renderItem;
        this._data = this.props.data;

        const getItemSize = (index: number) => {
            if (this.props.getItemSize) return this.props.getItemSize(index);
            return this.props.estimatedItemSize ?? 28;
        };

        return (
            <View style={{ flex: 1 }} onLayout={(e) => {
                this.state.layout = e.nativeEvent.layout;
                this.setState({ ...this.state });
            }}>
                <VariableSizeList
                    style={{
                        overflowX: 'hidden' as any,
                        overflowY: 'auto' as any,
                    }}
                    ref={ref => this.ref = ref}
                    height={this.state.layout.height}
                    width={this.state.layout.width}
                    itemCount={this.props.data.length}
                    itemSize={getItemSize}
                >
                    {this._RowItem}
                </VariableSizeList>
            </View>
        );
    }
}
