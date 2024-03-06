var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { View } from 'react-native';
import React, { Component } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { StyleToCSS } from '../StyleUtils';
var SVariableSizeGrid = /** @class */ (function (_super) {
    __extends(SVariableSizeGrid, _super);
    function SVariableSizeGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            layout: {
                height: 0,
                width: 0
            },
            scroll: {
                x: 0,
                y: 0
            }
        };
        _this.onScrollHandle = function (e) {
            _this.state.scroll = { x: e.scrollLeft, y: e.scrollTop };
            if (_this.props.handleScroll)
                _this.props.handleScroll(_this.state.scroll);
        };
        return _this;
    }
    /**
          border-bottom: 1px solid #666;
            border-right: 1px solid #666;
            overflow: hidden;
            font-size:12px;
            color: #fff;
            box-sizing: border-box;
     */
    SVariableSizeGrid.prototype.componentDidMount = function () {
        var _a, _b;
        console.log(this.props.cellStyle);
        this.style = document.createElement('style');
        this.style.innerHTML = "\n        .listItemGrid {\n                flex-direction: column;\n                box-sizing: border-box;\n                display:flex;\n                text-wrap:nowrap;\n                ".concat(StyleToCSS(this.props.cellStyle), "\n        }\n        ::-webkit-scrollbar {\n            width: ").concat((_a = this.props.scrollWidth) !== null && _a !== void 0 ? _a : 10, "px;\n            height: ").concat((_b = this.props.scrollWidth) !== null && _b !== void 0 ? _b : 10, "px;\n        }\n\n        ::-webkit-scrollbar-thumb:hover {\n            background-color: #AAAAAA66;\n        }\n          \n        ");
        document.head.appendChild(this.style);
    };
    SVariableSizeGrid.prototype.componentWillUnmount = function () {
        document.head.removeChild(this.style);
    };
    SVariableSizeGrid.prototype.handleClick = function (e, p) {
        console.log(e, p);
    };
    SVariableSizeGrid.prototype.render = function () {
        var _this = this;
        var Cell = function (_a) {
            var _b;
            var columnIndex = _a.columnIndex, rowIndex = _a.rowIndex, style = _a.style;
            return (React.createElement("div", { className: 'listItemGrid', style: style }, ((_b = _this.props.data[rowIndex]) !== null && _b !== void 0 ? _b : [])[columnIndex]));
        };
        var _a = this.props, cols = _a.cols, rows = _a.rows;
        return React.createElement(View, { style: { width: "100%", flex: 1 }, onLayout: function (evt) { return _this.setState({ layout: evt.nativeEvent.layout }); } },
            React.createElement(Grid, { key: this.props.keyInstance, columnCount: cols.length, columnWidth: function (index) { return cols[index].wpx; }, rowHeight: function (index) { return rows[index].hpx; }, height: this.state.layout.height, width: this.state.layout.width, estimatedColumnWidth: cols[0].wpx, estimatedRowHeight: rows[0].hpx, initialScrollLeft: this.state.scroll.x, initialScrollTop: this.state.scroll.y, rowCount: rows.length, onScroll: this.onScrollHandle }, Cell));
    };
    return SVariableSizeGrid;
}(Component));
export default SVariableSizeGrid;
