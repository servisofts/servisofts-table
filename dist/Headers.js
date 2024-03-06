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
import { ScrollView, Text, View, FlatList, Platform } from 'react-native';
import React, { Component } from 'react';
import SResizableView from './Components/SResizableView';
import styles from './style';
var Headers = /** @class */ (function (_super) {
    __extends(Headers, _super);
    function Headers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.headerLetter = function (_a) {
            var width = _a.width, val = _a.val, index = _a.index;
            return React.createElement(SResizableView, { width: width, onContentSizeChange: function (e) {
                    _this.props.onChangeColSize({ index: index, size: e });
                } },
                React.createElement(View, { style: [, __assign({ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }, _this.props.cellStyle)] },
                    React.createElement(Text, { style: styles.text }, val)));
        };
        return _this;
    }
    Headers.prototype.scrollTo = function (e) {
        this.scroll.scrollTo(__assign(__assign({}, e), { animated: false }));
    };
    Headers.prototype.convertirNumeroALetra = function (numero) {
        var res = String.fromCharCode(64 + ((numero - 1) % 26) + 1);
        if (numero > 26) {
            res = String.fromCharCode(64 + Math.floor((numero - 1) / 26)) + res;
        }
        "".length;
        return res;
    };
    Headers.prototype.render = function () {
        var _this = this;
        return (React.createElement(ScrollView, { ref: function (ref) { return _this.scroll = ref; }, horizontal: true, style: { flex: 1 }, showsHorizontalScrollIndicator: false, scrollEnabled: false, scrollEventThrottle: 16 },
            React.createElement(FlatList, { data: this.props.cols, horizontal: true, scrollEnabled: false, renderItem: function (col) { return _this.headerLetter({ val: _this.convertirNumeroALetra(col.index + 1), width: col.item.wpx, index: col.index }); } }),
            Platform.OS == "web" ? React.createElement(View, { style: { width: 50 } }) : null));
    };
    return Headers;
}(Component));
export default Headers;
