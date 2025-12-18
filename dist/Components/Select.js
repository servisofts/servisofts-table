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
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import SLanguage from "./SLanguage";
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.defaultValue
        };
        return _this;
    }
    Select.prototype.render = function () {
        var _this = this;
        var _a;
        var value = this.state.value;
        var option;
        if (value && this.props.options) {
            option = this.props.options.find(function (e) { return e.value == value; });
        }
        if (!option && this.props.options) {
            option = this.props.options[0];
            this.state.value = option.value;
            this.props.onSelect(option);
        }
        var colors = this.props.dinamicTableInstance.colors;
        return React.createElement(TouchableOpacity, { style: [this.props.dinamicTableInstance.inputStyle, { flexDirection: "row", alignItems: "center" }], onPress: function (e) {
                _this.props.dinamicTableInstance.popup.show({
                    key: "select",
                    onPressEvent: e,
                    height: 200,
                    width: 180,
                    parent: _this.props.dinamicTableInstance.containerRef,
                    left: 16,
                    render: function () {
                        return React.createElement(SelectContent, { options: _this.props.options, onSelect: function (e) {
                                _this.setState({ value: e.value });
                                _this.props.onSelect(e);
                                _this.props.dinamicTableInstance.popup.close("select");
                            }, dinamicTableInstance: _this.props.dinamicTableInstance });
                    }
                });
            } },
            React.createElement(View, { style: { width: 14, height: 14, justifyContent: "center", alignItems: "center" } }, this.props.icon),
            React.createElement(View, { style: { width: 4 } }),
            React.createElement(Text, { style: [{ flex: 1 }, !(option === null || option === void 0 ? void 0 : option.label) ? { color: colors.card } : this.props.dinamicTableInstance.textStyle] }, (_a = SLanguage.select(option === null || option === void 0 ? void 0 : option.label)) !== null && _a !== void 0 ? _a : this.props.placeholder));
    };
    Select.defaultProps = {
        placeholder: "Seleccionar"
    };
    return Select;
}(React.Component));
export default Select;
var SelectContent = /** @class */ (function (_super) {
    __extends(SelectContent, _super);
    function SelectContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectContent.prototype.render = function () {
        var _this = this;
        var colors = this.props.dinamicTableInstance.colors;
        return React.createElement(View, { style: { backgroundColor: colors.background, padding: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.border } },
            React.createElement(FlatList, { data: this.props.options, ItemSeparatorComponent: function () { return React.createElement(View, { style: { height: 4 } }); }, renderItem: function (_a) {
                    var item = _a.item;
                    return React.createElement(TouchableOpacity, { style: { padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 8, height: 25, justifyContent: "center" }, onPress: function () {
                            _this.props.onSelect(item);
                        } },
                        React.createElement(Text, { style: { color: colors.text } }, SLanguage.select(item.label)));
                } }));
    };
    return SelectContent;
}(React.Component));
