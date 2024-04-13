import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import styles from '../../style';
var CellItem = function (_a) {
    var _b, _c;
    var row = _a.row, col = _a.col, ri = _a.ri, ci = _a.ci, data = _a.data, cellStyle = _a.cellStyle;
    return (((_b = data[ri]) !== null && _b !== void 0 ? _b : [])[ci] ? React.createElement(View, { style: [{ width: col.wpx }, cellStyle] },
        React.createElement(Text, { style: { color: cellStyle.color, fontSize: cellStyle.fontSize } }, ((_c = data[ri]) !== null && _c !== void 0 ? _c : [])[ci])) : React.createElement(View, { style: [{ width: col.wpx }, cellStyle] }));
};
var RowItem = function (_a) {
    var row = _a.row, index = _a.index, cols = _a.cols, data = _a.data, cellStyle = _a.cellStyle;
    var ty = styles.row;
    return React.createElement(View, { style: ty }, cols.map(function (col, ci) { return React.createElement(CellItem, { key: ci, row: row, col: col, ri: index, ci: ci, data: data, cellStyle: cellStyle }); }));
};
var SVariableSizeGrid = function (_a) {
    var rows = _a.rows, cols = _a.cols, width = _a.width, data = _a.data, handleScroll = _a.handleScroll, keyInstance = _a.keyInstance, cellStyle = _a.cellStyle;
    var _b = useState({ x: 0, y: 0 }), scrollPosition = _b[0], setScrollPosition = _b[1];
    var keyExtractor = function (item, index) { return "r".concat(index); };
    var onScrollHandle = function (e) {
        if (handleScroll)
            handleScroll(e);
    };
    var onScrollHandleVertical = function (e) {
        scrollPosition.y = e.nativeEvent.contentOffset.y;
        onScrollHandle(scrollPosition);
    };
    var onScrollHandleHorizontal = function (e) {
        scrollPosition.x = e.nativeEvent.contentOffset.x;
        onScrollHandle(scrollPosition);
    };
    return (React.createElement(ScrollView, { showsHorizontalScrollIndicator: true, horizontal: true, onScroll: onScrollHandleHorizontal, scrollEventThrottle: 16, contentContainerStyle: { width: width } },
        React.createElement(FlashList
        // key={keyInstance}
        , { 
            // key={keyInstance}
            data: rows, estimatedItemSize: 24, onScroll: onScrollHandleVertical, keyExtractor: keyExtractor, renderItem: function (row) { return React.createElement(RowItem, { row: row.item, index: row.index, cols: cols, data: data, cellStyle: cellStyle }); } })));
};
export default SVariableSizeGrid;
