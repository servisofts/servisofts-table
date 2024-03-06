import { FlatList, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SFlashListProps } from './types'
import { VariableSizeList } from "react-window"
export default class SFlashList extends Component<SFlashListProps> {
    state = {
        layout: {
            width: 0,
            height: 0
        }
    }
    ref;
    scrollToOffset(e) {
        try {
            if (this.ref) this.ref.scrollTo(e.offset)
        } catch (e) {
            console.error(e);
        }

    }
    render() {

        const getItemSize = index => this.props.estimatedItemSize;
        const Row = ({ index, style }) => (
            <div style={style}>{this.props.renderItem({ item: this.props.data[index], index: index })}</div>
        );
        return <View style={{ flex: 1 }} onLayout={(e) => {
            this.state.layout = e.nativeEvent.layout;
            this.setState({ ...this.state });
        }}>
            <VariableSizeList
                style={{
                    overflow: this.props.scrollEnabled ? "auto" : "hidden",
                }}
                ref={ref => this.ref = ref}
                height={this.state.layout.height}
                width={this.state.layout.width}
                itemCount={this.props.data.length}
                itemSize={getItemSize}
            >
                {Row}
            </VariableSizeList>
            <View style={{ height: 10 }} />
        </View>

        // const getItemLayout = (data: any[], index) => {
        //     return { length: this.props.estimatedItemSize, offset: this.props.estimatedItemSize * index, index }
        // }

        // return <FlatList
        //     data={this.props.data}
        //     contentContainerStyle={{ height: this.props.estimatedListSize.height }}
        //     getItemLayout={getItemLayout}
        //     keyExtractor={this.props.keyExtractor}
        //     removeClippedSubviews
        //     windowSize={31}
        //     maxToRenderPerBatch={10}
        //     renderItem={this.props.renderItem}
        // />
    }
}