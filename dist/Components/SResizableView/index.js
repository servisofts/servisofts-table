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
import React, { Component } from 'react';
import { View, PanResponder } from 'react-native';
var preventDefault = function (e) { return e.preventDefault(); };
var SResizableView = /** @class */ (function (_super) {
    __extends(SResizableView, _super);
    function SResizableView(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.state = {
            width: (_a = _this.props.width) !== null && _a !== void 0 ? _a : 100
        };
        _this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: function (evt, gestureState) { return true; },
            // onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: function (evt, gestureState) {
                _this.startWidth = _this.state.width;
            },
            onPanResponderMove: function (evt, gestureState) {
                _this.state.width = _this.startWidth + gestureState.dx;
                _this.setState({ width: _this.startWidth + gestureState.dx });
                evt.stopPropagation();
                evt.preventDefault();
            },
            onPanResponderRelease: function (evt, gestureState) {
                if (_this.props.onContentSizeChange) {
                    _this.props.onContentSizeChange(_this.state.width);
                }
            }
        });
        return _this;
    }
    SResizableView.prototype.render = function () {
        return (React.createElement(View, { style: {
                height: "100%",
                width: this.state.width,
                flexDirection: "row"
            } },
            React.createElement(View, { style: {
                    flex: 1
                } }, this.props.children),
            React.createElement(View, __assign({ style: __assign({ height: "100%", width: 25, position: "absolute", right: 0, top: 0, backgroundColor: "#ffffff06" }, { cursor: "col-resize" }) }, this.panResponder.panHandlers))));
    };
    return SResizableView;
}(Component));
export default SResizableView;
