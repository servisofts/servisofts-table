import { ScrollView, Text, View, TouchableOpacity, FlatList, Platform } from 'react-native'
import React, { Component } from 'react'
import SResizableView from './Components/SResizableView';
import { TableProps } from './types';
import styles from './style';

type HeaderProps = {
    onChangeColSize: (e: { index: number, size: number }) => void
}
export default class Headers extends Component<TableProps & HeaderProps> {
    state = {}
    scroll;
    scrollTo(e) {
        this.scroll.scrollTo({ ...e, animated: false })
    }
    convertirNumeroALetra(numero) {
        let res = String.fromCharCode(64 + ((numero - 1) % 26) + 1);
        if (numero > 26) {
            res = String.fromCharCode(64 + Math.floor((numero - 1) / 26)) + res;
        }
        "".length
        return res;
    }
    headerLetter = ({ width, val, index }) => {
        return <SResizableView width={width} onContentSizeChange={(e) => {
            this.props.onChangeColSize({ index: index, size: e })
        }}>
            <View style={[, {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                ...this.props.cellStyle
            }]} >
                <Text style={styles.text}>{val}</Text>
            </View>
        </SResizableView>
    }
    render() {
        return (<ScrollView ref={ref => this.scroll = ref} horizontal style={{ flex: 1 }} showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            scrollEventThrottle={16}
        >
            <FlatList data={this.props.cols} horizontal
                scrollEnabled={false}
                renderItem={(col) => this.headerLetter({ val: this.convertirNumeroALetra(col.index + 1), width: col.item.wpx, index: col.index })}
            />
            {Platform.OS == "web" ? <View style={{ width: 50 }} /> : null}

        </ScrollView>
        )
    }
}