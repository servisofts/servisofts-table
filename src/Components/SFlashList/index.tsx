import { View } from 'react-native'
import React, { Component } from 'react'
import { SFlashListProps } from './types'
import { VariableSizeList } from "react-window"

export default class SFlashList extends Component<SFlashListProps> {
    state = {
        layout: { width: 0, height: 0 }
    }
    ref: InstanceType<typeof VariableSizeList> | null = null;

    // Updated before each render so _RowItem always has fresh data without
    // being re-created (which would cause VariableSizeList to remount all items).
    private _renderItem: SFlashListProps['renderItem'] = () => null;
    private _data: any[] = [];

    // Cache of actual measured item heights from onLayout.
    private _itemHeights: Map<number, number> = new Map();
    // Tracks the lowest index whose height changed in the current RAF batch.
    private _minChangedIndex: number | undefined;
    // Pending requestAnimationFrame id used to batch height-change re-renders.
    private _scheduledReset: number | null = null;

    _RowItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        // Apply the measured height directly so the div is always the right size
        // even before VariableSizeList recomputes its internal cache.
        const measuredHeight = this._itemHeights.get(index);
        const divStyle: React.CSSProperties = {
            position: style.position as any,
            left: style.left,
            top: style.top,
            width: style.width,
            height: measuredHeight ?? style.height,
            overflow: 'hidden',
        };
        return (
            <div style={divStyle}>
                <View onLayout={(e) => {
                    const h = Math.ceil(e.nativeEvent.layout.height);
                    if (h > 0 && this._itemHeights.get(index) !== h) {
                        this._itemHeights.set(index, h);
                        this._minChangedIndex = this._minChangedIndex === undefined
                            ? index
                            : Math.min(this._minChangedIndex, index);
                        if (this._scheduledReset === null) {
                            this._scheduledReset = requestAnimationFrame(() => {
                                this._scheduledReset = null;
                                const minIdx = this._minChangedIndex ?? 0;
                                this._minChangedIndex = undefined;
                                // shouldForceUpdate: true → VariableSizeList immediately
                                // re-renders with corrected positions for all items after minIdx.
                                this.ref?.resetAfterIndex(minIdx, true);
                            });
                        }
                    }
                }}>
                    {this._renderItem({ item: this._data[index], index })}
                </View>
            </div>
        );
    };

    componentDidUpdate(prevProps: SFlashListProps) {
        if (prevProps.data !== this.props.data) {
            this._itemHeights.clear();
            this._minChangedIndex = undefined;
            this.ref?.resetAfterIndex(0, false);
        }
    }

    componentWillUnmount() {
        if (this._scheduledReset !== null) cancelAnimationFrame(this._scheduledReset);
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
            const cached = this._itemHeights.get(index);
            if (cached !== undefined) return cached;
            if (this.props.getItemSize) return this.props.getItemSize(index);
            return this.props.estimatedItemSize ?? 30;
        };

        return (
            <View style={{ flex: 1, }} onLayout={(e) => {
                this.state.layout = e.nativeEvent.layout;
                this.setState({ ...this.state });
            }}>
                <VariableSizeList
                    style={{
                        overflowX: 'hidden' as any,
                        overflowY: 'auto' as any,
                    }}
                    ref={(ref: InstanceType<typeof VariableSizeList> | null) => this.ref = ref}
                    height={this.state.layout.height}
                    width={this.state.layout.width-2}
                    itemCount={this.props.data.length}
                    itemSize={getItemSize}
                >
                    {this._RowItem}
                </VariableSizeList>
            </View>
        );
    }
}
