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
import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            popups: {}
        };
        return _this;
    }
    Popup.prototype.close = function (key) {
        delete this.state.popups[key];
        this.setState(__assign({}, this.state));
    };
    Popup.prototype.show = function (props) {
        var _this = this;
        var _a;
        var key = (_a = props.key) !== null && _a !== void 0 ? _a : Math.random().toString();
        var parent = props.parent;
        var target = props.onPressEvent.currentTarget;
        parent.measure(function (px, py, pwidth, pheight, ppageX, ppageY) {
            target.measureLayout(props.parent, function (x, y, width, height, pageX, pageY) {
                var _a;
                var itemHeight = props.height || height;
                var itemWidth = props.width || width;
                var top = y + height;
                if ((top + itemHeight) > pheight) {
                    top = pheight - itemHeight;
                }
                var left = x + (props.left || 0);
                if ((left + itemWidth) > pwidth) {
                    left = pwidth - itemWidth;
                }
                if (left < 0) {
                    left = 0;
                }
                var elm = React.createElement(TouchableOpacity, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }, onPress: function () {
                        _this.close(key);
                    } },
                    React.createElement(TouchableWithoutFeedback, null,
                        React.createElement(View, { style: { position: "absolute", top: top, left: left, width: itemWidth, height: itemHeight } }, props.render())));
                _this.setState({
                    popups: __assign(__assign({}, _this.state.popups), (_a = {}, _a[key] = elm, _a))
                });
            });
        });
        return key;
        // console.log("show", x, y, col)
    };
    Popup.prototype.render = function () {
        // const dinamicTableInstance = this.props.dinamicTableInstance;
        return Object.values(this.state.popups);
        return React.createElement(View, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } }, Object.values(this.state.popups));
    };
    Popup.defaultProps = {};
    return Popup;
}(React.Component));
export default Popup;
