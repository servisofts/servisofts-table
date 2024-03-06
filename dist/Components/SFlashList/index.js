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
            layout: {
                width: 0,
                height: 0
            }
        };
        return _this;
    }
    SFlashList.prototype.scrollToOffset = function (e) {
        try {
            if (this.ref)
                this.ref.scrollTo(e.offset);
        }
        catch (e) {
            console.error(e);
        }
    };
    SFlashList.prototype.render = function () {
        var _this = this;
        var getItemSize = function (index) { return _this.props.estimatedItemSize; };
        var Row = function (_a) {
            var index = _a.index, style = _a.style;
            return (React.createElement("div", { style: style }, _this.props.renderItem({ item: _this.props.data[index], index: index })));
        };
        return React.createElement(View, { style: { flex: 1 }, onLayout: function (e) {
                _this.state.layout = e.nativeEvent.layout;
                _this.setState(__assign({}, _this.state));
            } },
            React.createElement(VariableSizeList, { style: {
                    overflow: this.props.scrollEnabled ? "auto" : "hidden"
                }, ref: function (ref) { return _this.ref = ref; }, height: this.state.layout.height, width: this.state.layout.width, itemCount: this.props.data.length, itemSize: getItemSize }, Row),
            React.createElement(View, { style: { height: 10 } }));
        // const getItemLayout = (data: any[], index) => {
        //     return { length: this.props.estimatedItemSize, offset: this.props.estimatedItemSize * index, index }
        // }
        // return <FlatList
        //     data={this.props.data}
        //     contentContainerStyle={{ height: this.props.estimatedListSize.height }}
        //     getItemLayout={getItemLayout}
        //     keyExtractor={this.props.keyExtractor}
        //     removeClippedSubviews
        //     windowSize={31}
        //     maxToRenderPerBatch={10}
        //     renderItem={this.props.renderItem}
        // />
    };
    return SFlashList;
}(Component));
export default SFlashList;
