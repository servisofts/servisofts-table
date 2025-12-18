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
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import SDate from "../Components/SDate";
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selected: false };
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
        return React.createElement(TouchableWithoutFeedback, { onPress: function (e) {
                console.log(e);
                dinamicTableInstance.setSelect(_this.props.item.__key, !selected, e);
                // dinamicTableInstance.forceUpdate();
                // this.setState({ selected: !selected });
            } },
            React.createElement(View, { style: [{
                        flexDirection: "row",
                        borderWidth: 0.5,
                        borderColor: "transparent",
                        backgroundColor: this.props.index % 2 === 1 ? colors.text + "10" : "transparent"
                    },
                    selected ? {
                        backgroundColor: colors.accent + "40",
                        borderColor: colors.accent,
                        borderWidth: 0.5
                    } : {},
                ] }, dinamicTableInstance.cols.filter(function (a) { return !dinamicTableInstance.colData[a.key].hidden; }).map(function (col) {
                var colProps = col.props;
                var styleText = StyleSheet.flatten([{ color: colors.text }, dinamicTableInstance.props.textStyle, colProps.textStyle]);
                var colData = dinamicTableInstance.colData[col.key];
                var data = _this.props.item[col.key];
                var dataFormat;
                if (colProps.format) {
                    dataFormat = colProps.format({
                        data: data,
                        row: _this.props.item,
                        index: _this.props.index,
                        textStyle: styleText
                    });
                }
                else {
                    dataFormat = !data ? "" : data.toString();
                    if (dataFormat) {
                        if (colProps.dataType === "date") {
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
                        row: _this.props.item,
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
                return React.createElement(View, { key: "".concat(col.key, "-").concat(_this.props.index), style: [
                        { borderWidth: 0.5, borderColor: colors.border, justifyContent: "center", padding: 4 },
                        dinamicTableInstance.props.cellStyle,
                        colProps.cellStyle,
                        {
                            width: colData.width
                        },
                    ] }, CONTENT);
            })));
    };
    Row.defaultProps = {};
    return Row;
}(React.Component));
export default Row;
