import { FlatList, ScrollView, Text, View } from 'react-native'
import React, { Component, useMemo } from 'react'
import { colProps, rowProps } from '../types'
import styles from '../style'
import { FlashList } from '@shopify/flash-list'
import SFlashList from './SFlashList'
interface TablePropsType {
    rows: rowProps[],
    cols: colProps[]
}
export default function Table({ cols, rows }: TablePropsType) {
    const width = useMemo(() => {
        console.log("Calculando el width")
        return cols.reduce((acc, item) => acc + item.wpx, 0)
    }, [cols])
    const height = useMemo(() => {
        console.log("Calculando el height")
        return rows.reduce((acc, item) => acc + item.hpx, 0)
    }, [rows])

    // const CellItem = React.memo(({ row, col, ri, ci }: { row: rowProps, col: colProps, ri: number, ci: number }) => {
    //     return <View style={[styles.cell, { width: col.wpx }]}>
    //         <Text style={styles.text}>{`${ri} ${ci}`}</Text>
    //     </View>
    // }, (prev, next) => prev.row.hpx == next.row.hpx && prev.col.wpx == next.col.wpx);
    const CellItem = ({ row, col, ri, ci }: { row: rowProps, col: colProps, ri: number, ci: number }) => {
        return <View style={[styles.cell, { width: col.wpx }]}>
            <Text style={styles.text}>{`${ri} ${ci}`}</Text>
        </View>
    }

    const RowItem = React.memo(({ row, index }: { row: rowProps, index: number }) => {
        return <View style={[styles.row]}>
            {cols.map((col, ci) => <CellItem row={row} col={col} ri={index} ci={ci} />)}
        </View>
    }, (prev, next) => prev.row.hpx == next.row.hpx);


    const keyExtractor = (item, index) => {
        return "r" + index
    }

    const renderItem = row => <RowItem row={row.item} index={row.index} />
    console.log("[Table] Render component")
    return <ScrollView
        showsHorizontalScrollIndicator={true}
        horizontal
        contentContainerStyle={{ width: "100%", }}>
        <SFlashList
            data={rows}
            keyExtractor={keyExtractor}
            estimatedItemSize={24}
            estimatedListSize={{
                height: height,
                width: width
            }}
            renderItem={renderItem}
        />
    </ScrollView>
}




{/* <FlatList
contentContainerStyle={{ height: height }}
data={rows}
keyExtractor={keyExtractor}
getItemLayout={getItemLayout}
removeClippedSubviews
windowSize={31}
maxToRenderPerBatch={10}
renderItem={row => RowItem}
/> */}

{/*
    <FlashList
        data={rows}
        estimatedItemSize={24}
        estimatedListSize={{
            height: height,
            width: width
        }}
        renderItem={row => RowItem}
    />
    */}