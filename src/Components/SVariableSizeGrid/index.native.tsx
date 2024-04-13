

import React, { useMemo, ReactElement, useState } from 'react';
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { TableProps, colProps, rowProps } from '../../types';
import styles from '../../style';
import { SVariableSizeGridType } from './type';

interface CellItemProps {
  row: rowProps;
  col: colProps;
  ri: number;
  ci: number;
  data: any[][],
  cellStyle: TextStyle

}

const CellItem: React.FC<CellItemProps> = ({ row, col, ri, ci, data, cellStyle }) => (
  (data[ri] ?? [])[ci] ? <View style={[{ width: col.wpx, }, cellStyle]} >
    <Text style={{ color: cellStyle.color, fontSize: cellStyle.fontSize }} >{(data[ri] ?? [])[ci]}</Text>
  </View> : <View style={[{ width: col.wpx }, cellStyle]} />
);
interface RowItemProps {
  row: rowProps;
  index: number;
  data: any[][]
  cols: colProps[],
  cellStyle: TextStyle
}

const RowItem: React.FC<RowItemProps> = ({ row, index, cols, data, cellStyle }) => {
  const ty:any = styles.row;
  return <View style={ty}>{cols.map((col, ci) => <CellItem key={ci} row={row} col={col} ri={index} ci={ci} data={data} cellStyle={cellStyle} />)}</View>;
}

const SVariableSizeGrid: React.FC<SVariableSizeGridType> = ({ rows, cols, width, data, handleScroll, keyInstance, cellStyle }) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const keyExtractor = (item: rowProps, index: number) => `r${index}`;

  const onScrollHandle = (e) => {
    if (handleScroll) handleScroll(e)
  }
  const onScrollHandleVertical = (e) => {
    scrollPosition.y = e.nativeEvent.contentOffset.y;
    onScrollHandle(scrollPosition);
  }
  const onScrollHandleHorizontal = (e) => {
    scrollPosition.x = e.nativeEvent.contentOffset.x;
    onScrollHandle(scrollPosition);

  }
  return (
    <ScrollView
      showsHorizontalScrollIndicator={true}
      horizontal
      onScroll={onScrollHandleHorizontal}
      scrollEventThrottle={16}
      contentContainerStyle={{ width: width }}>
      <FlashList
        // key={keyInstance}
        data={rows}
        estimatedItemSize={24}
        onScroll={onScrollHandleVertical}
        keyExtractor={keyExtractor}
        renderItem={row => <RowItem row={row.item} index={row.index} cols={cols} data={data} cellStyle={cellStyle} />}

      />
    </ScrollView>
  );
}

export default SVariableSizeGrid;

