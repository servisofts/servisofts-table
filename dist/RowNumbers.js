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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Text, View } from 'react-native';
import React, { Component } from 'react';
import styles from './style';
import SFlashList from './Components/SFlashList';
var RowNumbers = /** @class */ (function (_super) {
    __extends(RowNumbers, _super);
    function RowNumbers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.headerLetter = function (_a) {
            var width = _a.width, val = _a.val;
            return;
        };
        return _this;
    }
    RowNumbers.prototype.scrollTo = function (evt) {
        this.scroll.scrollToOffset({ offset: evt.y, animated: false });
    };
    RowNumbers.prototype.getItemLayout = function (data, index) {
        return { length: 24, offset: 24 * index, index: index };
    };
    RowNumbers.prototype.keyExtractor = function (item, index) {
        return "nr" + index;
    };
    RowNumbers.prototype.render = function () {
        var _this = this;
        var ItemRow = function (_a) {
            var val = _a.val;
            return React.createElement(View, { style: [styles.cellNumber, __assign({}, _this.props.cellStyle)] },
                React.createElement(Text, { style: {
                        fontSize: 11,
                        color: "#ffffff"
                    } }, val));
        };
        return React.createElement(SFlashList, { data: this.props.rows, ref: function (ref) { return _this.scroll = ref; }, scrollEnabled: false, estimatedItemSize: 24, keyExtractor: this.keyExtractor, 
            // getItemLayout={this.getItemLayout.bind(this)}
            renderItem: function (col) { return React.createElement(ItemRow, { val: col.index + 1 }); } });
    };
    return RowNumbers;
}(Component));
export default RowNumbers;
