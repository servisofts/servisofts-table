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
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SDate from "../Components/SDate";
var CHECK_COL_WIDTH = 36;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selected: false, hover: false };
        return _this;
    }
    Row.prototype.componentDidMount = function () {
        var _this = this;
        this.props.dinamicTableInstance.addRowEventListener(this.props.item["__key"], function (obj) {
            if (obj.type == "onSelect") {
                var selected = _this.props.dinamicTableInstance.rowSelecteds[_this.props.item.__key];
                if (_this.state.selected != selected) {
                    _this.setState({ selected: selected });
                }
                // this.setState({ selected:  });
            }
        });
    };
    Row.prototype.componentWillUnmount = function () {
        this.props.dinamicTableInstance.removeRowEventListener(this.props.item["__key"]);
    };
    Row.prototype.render = function () {
        var _this = this;
        var dinamicTableInstance = this.props.dinamicTableInstance;
        var colors = dinamicTableInstance.colors;
        // const selected = this.state.selected;
        var selected = this.props.dinamicTableInstance.rowSelecteds[this.props.item.__key];
        this.state.selected = selected;
        var style = {};
        if (this.props.dinamicTableInstance.props.buildRowStyle) {
            var buildRowStyle = this.props.dinamicTableInstance.props.buildRowStyle({
                item: this.props.item,
                index: this.props.index,
                dinamicTable: dinamicTableInstance
            });
            style = __assign(__assign({}, style), buildRowStyle);
        }
        return React.createElement(TouchableWithoutFeedback, { onPress: function (e) {
                if (dinamicTableInstance.props.selectType === "check")
                    return;
                dinamicTableInstance.setSelect(_this.props.item.__key, !selected, e);
            } },
            React.createElement(View, __assign({}, {
                onMouseEnter: function () { return _this.setState({ hover: true }); },
                onMouseLeave: function () { return _this.setState({ hover: false }); }
            }, { style: [{
                        flexDirection: "row",
                        borderWidth: 0.5,
                        borderColor: "transparent",
                        backgroundColor: this.props.index % 2 === 1 ? colors.text + "10" : "transparent"
                    },
                    style,
                ] }),
                dinamicTableInstance.props.selectType === "check" && (React.createElement(TouchableOpacity, { onPress: function () { return dinamicTableInstance.setSelect(_this.props.item.__key, !selected); }, style: {
                        width: CHECK_COL_WIDTH,
                        borderWidth: 0.5,
                        borderColor: selected ? colors.accent : colors.border,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "stretch",
                        backgroundColor: selected ? colors.accent + "40" : "transparent"
                    } },
                    React.createElement(View, { style: {
                            width: 14,
                            height: 14,
                            borderWidth: 1.5,
                            borderColor: selected ? colors.accent : colors.border,
                            borderRadius: 3,
                            backgroundColor: selected ? colors.accent : "transparent"
                        } }))),
                dinamicTableInstance.cols.filter(function (a) { return !dinamicTableInstance.colData[a.key].hidden; }).map(function (col, colIndex, visibleCols) {
                    var _a;
                    var colProps = col.props;
                    var styleText = StyleSheet.flatten([{ color: colors.text }, dinamicTableInstance.props.textStyle, colProps.textStyle]);
                    var colData = dinamicTableInstance.colData[col.key];
                    var data = _this.props.item[col.key];
                    // Determine if this is first or last column for border radius
                    var isFirstColumn = colIndex === 0;
                    var isLastColumn = colIndex === visibleCols.length - 1;
                    var borderRadius = 8;
                    var dataFormat;
                    if (colProps.format) {
                        dataFormat = colProps.format({
                            data: data,
                            row: _this.props.item["__original"],
                            index: _this.props.index,
                            textStyle: styleText
                        });
                    }
                    else {
                        dataFormat = (data === null || data === undefined || data === "") ? "" : data.toString();
                        if (dataFormat) {
                            if (colProps.dataType === "date" || colProps.dataType === "time" || colProps.dataType === "datetime") {
                                if (colProps.dateFormat) {
                                    dataFormat = new SDate(data).toString(colProps.dateFormat);
                                }
                            }
                        }
                    }
                    var CONTENT = colProps.customComponent ?
                        colProps.customComponent({
                            data: data,
                            dataFormat: dataFormat,
                            row: _this.props.item["__original"],
                            index: _this.props.index,
                            textStyle: styleText,
                            dinamicTable: dinamicTableInstance,
                            colData: colData
                        })
                        : React.createElement(Text, { style: styleText, numberOfLines: !colData.wrap ? 1 : 0 }, dataFormat !== null && dataFormat !== void 0 ? dataFormat : "");
                    if (colProps.usePermission) {
                        if (!colProps.usePermission({ data: data, row: _this.props.item, index: _this.props.index, textStyle: styleText, colData: colData, dinamicTable: dinamicTableInstance })) {
                            CONTENT = null;
                        }
                    }
                    var ComponentView = View;
                    var onPress = null;
                    if (colProps.onPress) {
                        ComponentView = TouchableOpacity;
                        onPress = function () {
                            colProps.onPress({
                                data: data,
                                dataFormat: dataFormat,
                                row: _this.props.item["__original"],
                                index: _this.props.index,
                                textStyle: styleText,
                                dinamicTable: dinamicTableInstance,
                                colData: colData
                            });
                            // colProps.onPress
                        };
                    }
                    return React.createElement(ComponentView, { key: "".concat(col.key, "-").concat(_this.props.index), onPress: onPress, style: [
                            { borderWidth: 0.5, borderColor: colors.border, justifyContent: "center", padding: 4 },
                            dinamicTableInstance.props.cellStyle,
                            colProps.cellStyle,
                            {
                                width: dinamicTableInstance.getAdjustedColumnWidth(String(col.key))
                            },
                            _this.state.hover ? __assign({ backgroundColor: colors.accent + "20" }, ((_a = _this.props.dinamicTableInstance.props.hoverStyle) !== null && _a !== void 0 ? _a : {})) : {},
                            selected ? {
                                backgroundColor: colors.accent + "40",
                                borderColor: colors.accent,
                                borderWidth: 0.5,
                                borderBottomColor: colors.accent
                            } : {},
                        ] }, CONTENT);
                })));
    };
    Row.defaultProps = {};
    return Row;
}(React.PureComponent));
export default Row;
