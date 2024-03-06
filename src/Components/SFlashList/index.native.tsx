import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SFlashListProps } from './types'
import { FlashList } from '@shopify/flash-list'

export default class SFlashList extends Component<SFlashListProps> {
    ref;
    scrollToOffset(e) {
        this.ref.scrollToOffset(e);
    }
    render() {
        return <FlashList
            ref={ref=>this.ref=ref}
            scrollEnabled={this.props.scrollEnabled}
            scrollEventThrottle={16}
            data={this.props.data}
            keyExtractor={this.props.keyExtractor}
            estimatedItemSize={this.props.estimatedItemSize}
            renderItem={this.props.renderItem} />
    }
}