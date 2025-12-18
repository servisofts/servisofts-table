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
import { Animated, PanResponder, Text, TouchableOpacity, View } from "react-native";
// import { FilterType,  } from "./Filter";
import ColMenu from "./Components/ColMenu";
import Assets from "../Assets";
var Col = /** @class */ (function (_super) {
    __extends(Col, _super);
    function Col() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.widthAnim = new Animated.Value(_this.props.dinamicTableInstance.colData[_this.props.id].width);
        _this.currentWidth = _this.props.dinamicTableInstance.colData[_this.props.id].width;
        _this.startX = 0;
        _this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: function () { return true; },
            onMoveShouldSetPanResponder: function () { return true; },
            onPanResponderGrant: function (evt) {
                _this.startX = evt.nativeEvent.pageX;
            },
            onPanResponderMove: function (evt) {
                var diffX = evt.nativeEvent.pageX - _this.startX;
                _this.startX = evt.nativeEvent.pageX; // Actualiza el punto de inicio
                // Calculamos el nuevo ancho
                _this.currentWidth = Math.max(20, _this.currentWidth + diffX);
                // Aplicamos el nuevo valor de ancho con `setValue()`
                _this.widthAnim.setValue(_this.currentWidth);
            },
            onPanResponderRelease: function (evt) {
                _this.props.dinamicTableInstance.colData[_this.props.id].width = _this.currentWidth;
                _this.props.dinamicTableInstance.forceUpdate();
                // this.setState({ width: this.currentWidth });
            }
        });
        return _this;
    }
    Col.prototype.showPopup = function (evt) {
        var _this = this;
        var dinamicTableInstance = this.props.dinamicTableInstance;
        dinamicTableInstance.popup.show({
            key: "colMenu",
            onPressEvent: evt,
            height: 308,
            width: 190,
            parent: dinamicTableInstance.containerRef, render: function () { return React.createElement(ColMenu, { col: _this }); }
        });
    };
    Col.prototype.renderFilter = function () {
        var _this = this;
        var dinamicTableInstance = this.props.dinamicTableInstance;
        var filter = dinamicTableInstance.filtros.find(function (f) { return f.col == _this.props.id; });
        if (!filter)
            return null;
        return React.createElement(View, { style: { backgroundColor: dinamicTableInstance.colors.accent, borderRadius: 2 } },
            React.createElement(Assets.Filter, { width: 10, height: 10, fill: dinamicTableInstance.colors.background, stroke: dinamicTableInstance.colors.background }));
    };
    Col.prototype.renderSorter = function () {
        var _this = this;
        var dinamicTableInstance = this.props.dinamicTableInstance;
        var sorter = dinamicTableInstance.sorter.find(function (f) { return f.key == _this.props.id; });
        if (!sorter)
            return null;
        return React.createElement(View, { style: { backgroundColor: dinamicTableInstance.colors.accent, borderRadius: 1 } },
            React.createElement(Assets.Arrow, { width: 10, height: 10, fill: dinamicTableInstance.colors.background, stroke: dinamicTableInstance.colors.background, transform: "rotate(".concat(sorter.order == "asc" ? 0 : 180, ")") }));
    };
    Col.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var colors = this.props.dinamicTableInstance.colors;
        var colData = (_b = (_a = this.props.dinamicTableInstance) === null || _a === void 0 ? void 0 : _a.colData) === null || _b === void 0 ? void 0 : _b[this.props.id];
        return React.createElement(View, { style: { flexDirection: "row", alignItems: "center" } },
            React.createElement(Animated.View, { style: [
                    {
                        borderWidth: 0.5,
                        borderColor: colors.border,
                        minHeight: 26,
                        height: "100%",
                        backgroundColor: colors.header,
                        justifyContent: "center",
                        alignItems: "center",
                        width: this.widthAnim,
                        borderBottomColor: colors.border,
                        borderBottomWidth: 0.5
                    },
                    (_e = (_d = (_c = this.props) === null || _c === void 0 ? void 0 : _c.dinamicTableInstance) === null || _d === void 0 ? void 0 : _d.props) === null || _e === void 0 ? void 0 : _e.cellStyle,
                    this.props.headerStyle,
                ] },
                React.createElement(TouchableOpacity, { onPress: this.showPopup.bind(this), style: { width: "100%", flex: 1, justifyContent: "center", alignItems: "flex-end", flexDirection: "row", paddingStart: 2, paddingBottom: 2 } },
                    this.props.labelIcon,
                    React.createElement(Text, { style: [{ color: colors.text, overflow: "hidden", flexWrap: "wrap", textAlign: "center" }, (_h = (_g = (_f = this.props) === null || _f === void 0 ? void 0 : _f.dinamicTableInstance) === null || _g === void 0 ? void 0 : _g.props) === null || _h === void 0 ? void 0 : _h.textStyle, this.props.textStyle, (_l = (_k = (_j = this.props) === null || _j === void 0 ? void 0 : _j.dinamicTableInstance) === null || _k === void 0 ? void 0 : _k.props) === null || _l === void 0 ? void 0 : _l.textTitleStyle, this.props.textTitleStyle], numberOfLines: colData.wrap ? 0 : 1 }, this.props.label)),
                this.props.children,
                React.createElement(View, { style: {
                        position: "absolute", right: 2, bottom: -2, flexDirection: "row"
                    } },
                    this.renderFilter(),
                    React.createElement(View, { style: { width: 2 } }),
                    this.renderSorter())),
            React.createElement(View, __assign({}, this.panResponder.panHandlers, { style: {
                    position: "absolute",
                    width: 8,
                    right: 0,
                    height: "100%",
                    backgroundColor: "transparent",
                    borderRightWidth: 1,
                    borderRightColor: colors.border,
                    // @ts-ignore
                    cursor: "ew-resize"
                } })));
    };
    Col.defaultProps = {
        dataType: "string",
        width: 100,
        wrap: false
    };
    return Col;
}(React.Component));
export default Col;
