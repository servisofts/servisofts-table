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
import { View } from 'react-native';
import React, { Component } from 'react';
import { VariableSizeList } from "react-window";
var SFlashList = /** @class */ (function (_super) {
    __extends(SFlashList, _super);
    function SFlashList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            layout: { width: 0, height: 0 }
        };
        _this.ref = null;
        // These are updated before each render so _RowItem always has fresh data
        // without being re-created (which would cause VariableSizeList to remount all items).
        _this._renderItem = function () { return null; };
        _this._data = [];
        _this._RowItem = function (_a) {
            var index = _a.index, style = _a.style;
            return (React.createElement("div", { style: __assign(__assign({}, style), { overflow: 'hidden' }) }, _this._renderItem({ item: _this._data[index], index: index })));
        };
        return _this;
    }
    SFlashList.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.data !== this.props.data && this.ref) {
            this.ref.resetAfterIndex(0, false);
        }
    };
    SFlashList.prototype.resetAfterIndex = function (index, shouldForceUpdate) {
        var _a;
        if (shouldForceUpdate === void 0) { shouldForceUpdate = false; }
        (_a = this.ref) === null || _a === void 0 ? void 0 : _a.resetAfterIndex(index, shouldForceUpdate);
    };
    SFlashList.prototype.scrollToOffset = function (e) {
        try {
            if (this.ref)
                this.ref.scrollTo(e.offset);
        }
        catch (err) {
            console.error(err);
        }
    };
    SFlashList.prototype.render = function () {
        var _this = this;
        this._renderItem = this.props.renderItem;
        this._data = this.props.data;
        var getItemSize = function (index) {
            var _a;
            if (_this.props.getItemSize)
                return _this.props.getItemSize(index);
            return (_a = _this.props.estimatedItemSize) !== null && _a !== void 0 ? _a : 28;
        };
        return (React.createElement(View, { style: { flex: 1 }, onLayout: function (e) {
                _this.state.layout = e.nativeEvent.layout;
                _this.setState(__assign({}, _this.state));
            } },
            React.createElement(VariableSizeList, { style: {
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }, ref: function (ref) { return _this.ref = ref; }, height: this.state.layout.height, width: this.state.layout.width, itemCount: this.props.data.length, itemSize: getItemSize }, this._RowItem)));
    };
    return SFlashList;
}(Component));
export default SFlashList;
