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
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { FilterType,  } from "./Filter";
import ColMenu from "./Components/ColMenu";
import Assets from "../Assets";
var Col = /** @class */ (function (_super) {
    __extends(Col, _super);
    function Col() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isResizing: false
        };
        _this.widthAnim = new Animated.Value(_this.props.dinamicTableInstance.colData[_this.props.id].width);
        _this.currentWidth = _this.props.dinamicTableInstance.colData[_this.props.id].width;
        _this.startX = 0;
        _this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: function () { return true; },
            onMoveShouldSetPanResponder: function () { return true; },
            onPanResponderGrant: function (evt) {
                _this.setState({ isResizing: true });
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
                _this.props.dinamicTableInstance._colWidthVersion++;
                _this.setState({ isResizing: false });
                _this.props.dinamicTableInstance.forceUpdate();
                // this.setState({ width: this.currentWidth });
            }
        });
        return _this;
    }
    Col.prototype.componentDidUpdate = function () {
        // Sync animation value with adjusted width when not resizing
        if (!this.state.isResizing) {
            var adjustedWidth = this.props.dinamicTableInstance.getAdjustedColumnWidth(this.props.id);
            if (this.currentWidth !== adjustedWidth) {
                this.currentWidth = adjustedWidth;
                this.widthAnim.setValue(adjustedWidth);
            }
        }
    };
    Col.prototype.showPopup = function (evt) {
        var _this = this;
        var dinamicTableInstance = this.props.dinamicTableInstance;
        dinamicTableInstance.popup.show({
            key: "colMenu",
            onPressEvent: evt,
            // "datetime"/"time" list a grouped tree (day or hour), which needs more room than a flat list.
            height: (this.props.dataType === "datetime" || this.props.dataType === "time") ? 460 : 308,
            // "date"/"time"/"datetime" values are short and fixed-format ("2026-07-08",
            // "08:30:00"), so the popup can stay narrow. Anything else (string, number,
            // boolean - names, labels, custom avatars, etc.) tends to run longer, so it
            // gets extra room. 210 is still enough to fit "Ascendente"/"Descendente" side by side.
            width: this.props.dataType === "date" ? 180 : (this.props.dataType === "time" || this.props.dataType === "datetime") ? 200 : 290,
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
    Col.prototype.renderGrouper = function () {
        var _this = this;
        var grouped = this.props.dinamicTableInstance.groupers.some(function (g) { return g.key == _this.props.id; });
        if (!grouped)
            return null;
        var ListIcon = Assets.List;
        return React.createElement(View, { style: { backgroundColor: this.props.dinamicTableInstance.colors.accent, borderRadius: 1 } },
            React.createElement(ListIcon, { width: 10, height: 10, fill: this.props.dinamicTableInstance.colors.background, stroke: this.props.dinamicTableInstance.colors.background }));
    };
    Col.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        var colors = this.props.dinamicTableInstance.colors;
        var colData = (_b = (_a = this.props.dinamicTableInstance) === null || _a === void 0 ? void 0 : _a.colData) === null || _b === void 0 ? void 0 : _b[this.props.id];
        // Use widthAnim for smooth resizing, but sync with adjusted width when not resizing
        var adjustedWidth = this.props.dinamicTableInstance.getAdjustedColumnWidth(this.props.id);
        // Determine if this is first or last visible column for border radius
        var visibleCols = this.props.dinamicTableInstance.cols.filter(function (a) { return !_this.props.dinamicTableInstance.colData[a.key].hidden; });
        var hasCheckCol = ((_d = (_c = this.props.dinamicTableInstance) === null || _c === void 0 ? void 0 : _c.props) === null || _d === void 0 ? void 0 : _d.selectType) === "check";
        var isFirstColumn = visibleCols.length > 0 && visibleCols[0].key === this.props.id && !hasCheckCol;
        var isLastColumn = visibleCols.length > 0 && visibleCols[visibleCols.length - 1].key === this.props.id;
        var borderRadius = 8; // You can make this configurable later
        var sumTotalText = "";
        if (this.props.sumTotal) {
            var rows = ((_f = (_e = this.props.dinamicTableInstance) === null || _e === void 0 ? void 0 : _e.dataFiltrada) !== null && _f !== void 0 ? _f : []).map(function (item) { return item.__original; });
            if (typeof this.props.sumTotal === "function") {
                sumTotalText = (_g = this.props.sumTotal(rows)) !== null && _g !== void 0 ? _g : "";
            }
            else {
                var total = rows.reduce(function (s, row) { return s + (Number(_this.props.data({ row: row, index: 0 })) || 0); }, 0);
                if (Array.isArray(this.props.sumTotal)) {
                    var _y = this.props.sumTotal, prefix = _y[0], decimals = _y[1];
                    sumTotalText = "".concat(prefix !== null && prefix !== void 0 ? prefix : "", " ").concat(total.toFixed(decimals !== null && decimals !== void 0 ? decimals : 0)).trim();
                }
                else {
                    sumTotalText = this.props.format
                        ? this.props.format({ data: total, row: null, index: -1, textStyle: { color: colors.text } })
                        : String(total);
                }
            }
        }
        return React.createElement(View, { style: { flexDirection: "row", alignItems: "center" } },
            React.createElement(Animated.View, { style: [
                    {
                        // borderWidth: 0.5,
                        borderColor: colors.border,
                        minHeight: 26,
                        height: "100%",
                        backgroundColor: colors.header,
                        justifyContent: "center",
                        alignItems: "center",
                        width: this.widthAnim,
                        borderBottomColor: colors.border,
                        borderBottomWidth: 0.5,
                        borderTopLeftRadius: isFirstColumn ? borderRadius : 0,
                        borderTopRightRadius: isLastColumn ? borderRadius : 0
                    },
                    (_k = (_j = (_h = this.props) === null || _h === void 0 ? void 0 : _h.dinamicTableInstance) === null || _j === void 0 ? void 0 : _j.props) === null || _k === void 0 ? void 0 : _k.cellStyle,
                    this.props.headerStyle,
                ] },
                React.createElement(TouchableOpacity, { onPress: this.showPopup.bind(this), style: __assign(__assign({ width: "100%", flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row", overflow: "hidden", paddingHorizontal: 4 }, this.props.headerStyle ? {
                        justifyContent: this.props.headerStyle.justifyContent,
                        alignItems: this.props.headerStyle.alignItems
                    } : {}), this.props.sumTotal ? { justifyContent: "space-between" } : {}) },
                    this.props.customHeaderComponent ? (this.props.customHeaderComponent({
                        label: this.props.label,
                        sumTotal: this.props.sumTotal ? sumTotalText : undefined,
                        textStyle: StyleSheet.flatten([{ color: colors.text }, (_o = (_m = (_l = this.props) === null || _l === void 0 ? void 0 : _l.dinamicTableInstance) === null || _m === void 0 ? void 0 : _m.props) === null || _o === void 0 ? void 0 : _o.textStyle, this.props.textStyle]),
                        colors: colors,
                        dinamicTable: this.props.dinamicTableInstance
                    })) : (React.createElement(React.Fragment, null,
                        this.props.labelIcon,
                        this.props.labelIcon && this.props.label ? React.createElement(View, { style: { width: 8 } }) : null,
                        typeof this.props.label === "string" || this.props.label === undefined ? (React.createElement(Text, { style: [{ color: colors.text, overflow: "hidden", flexWrap: "wrap", textAlign: "center", flexShrink: 1, minWidth: 0 }, (_r = (_q = (_p = this.props) === null || _p === void 0 ? void 0 : _p.dinamicTableInstance) === null || _q === void 0 ? void 0 : _q.props) === null || _r === void 0 ? void 0 : _r.textStyle, this.props.textStyle, (_u = (_t = (_s = this.props) === null || _s === void 0 ? void 0 : _s.dinamicTableInstance) === null || _t === void 0 ? void 0 : _t.props) === null || _u === void 0 ? void 0 : _u.textTitleStyle, this.props.textTitleStyle], numberOfLines: colData.wrap ? 0 : 1 }, this.props.label)) : this.props.label,
                        this.props.sumTotal ? (React.createElement(Text, { numberOfLines: 1, style: [{ color: colors.text, fontWeight: "bold", flexShrink: 1, minWidth: 0 }, (_x = (_w = (_v = this.props) === null || _v === void 0 ? void 0 : _v.dinamicTableInstance) === null || _w === void 0 ? void 0 : _w.props) === null || _x === void 0 ? void 0 : _x.textStyle, this.props.textStyle] }, sumTotalText)) : null)),
                    this.props.children),
                React.createElement(View, { style: {
                        position: "absolute", right: 2, bottom: -2, flexDirection: "row"
                    } },
                    this.renderFilter(),
                    React.createElement(View, { style: { width: 2 } }),
                    this.renderSorter(),
                    React.createElement(View, { style: { width: 2 } }),
                    this.renderGrouper())),
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
