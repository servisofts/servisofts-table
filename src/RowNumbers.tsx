import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { TableProps } from './types';
import styles from './style';
import SFlashList from './Components/SFlashList';

export default class RowNumbers extends Component<TableProps> {
    state = {}
    scroll;
    scrollTo(evt) {
        this.scroll.scrollToOffset({ offset: evt.y, animated: false })
    }

    headerLetter = ({ width, val }) => {
        return
    }
    getItemLayout(data, index) {
        return { length: 24, offset: 24 * index, index }
    }
    keyExtractor(item, index) {
        return "nr" + index;
    }

    render() {
        const ItemRow = ({ val }: any) => {
            return <View style={[styles.cellNumber, { ...this.props.cellStyle }]} >
                <Text style={{
                    fontSize: 11,
                    color: "#ffffff",
                }} >{val}</Text>
            </View>
        }
        
        return <SFlashList data={this.props.rows}
            ref={ref => this.scroll = ref}
            scrollEnabled={false}
            estimatedItemSize={24}
            keyExtractor={this.keyExtractor}
            // getItemLayout={this.getItemLayout.bind(this)}
            renderItem={(col) => <ItemRow val={col.index + 1} />}
        />
    }
}