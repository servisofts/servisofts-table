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
import { Text, TouchableOpacity, View } from "react-native";
import CheckBox from "../../Components/CheckBox";
import DraggableList from "../../Components/DraggableList";
import Assets from "../../Assets";
var ColumConfig = /** @class */ (function (_super) {
    __extends(ColumConfig, _super);
    function ColumConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumConfig.prototype.render = function () {
        var _this = this;
        var colors = this.props.dinamicTableInstance.colors;
        var columns = this.props.dinamicTableInstance.cols;
        return React.createElement(View, { style: {
                backgroundColor: colors.background, height: "100%", borderRadius: 8, borderWidth: 1,
                borderColor: colors.border
            } },
            React.createElement(DraggableList, { data: columns, itemHeight: 25, onChange: function (items) {
                    _this.props.dinamicTableInstance.cols = items;
                    _this.props.dinamicTableInstance.forceUpdate();
                }, renderItem: function (_a) {
                    var _b;
                    var item = _a.item, index = _a.index;
                    // @ts-ignore
                    var pitem = item.props;
                    return React.createElement(View, { style: { width: "100%", flexDirection: "row", alignItems: "center", height: 25 } },
                        React.createElement(View, { style: { justifyContent: "center", alignItems: "center", width: 25, height: 25 } },
                            React.createElement(Assets.Sort, { width: 12, stroke: _this.props.dinamicTableInstance.colors.text })),
                        React.createElement(Text, { numberOfLines: 1, style: [_this.props.dinamicTableInstance.textStyle, { flex: 1 }] }, (_b = pitem.label) !== null && _b !== void 0 ? _b : item.key),
                        React.createElement(TouchableOpacity, { onPress: function () {
                                // this.props.dinamicTableInstance.colData[item.key].wrap = !this.props.dinamicTableInstance.colData[item.key].wrap;
                                _this.props.dinamicTableInstance.colData[item.key].hidden = !_this.props.dinamicTableInstance.colData[item.key].hidden;
                                _this.forceUpdate();
                                _this.props.dinamicTableInstance.forceUpdate();
                            } },
                            React.createElement(CheckBox, { color: colors.accent, colorActive: colors.accent, value: !_this.props.dinamicTableInstance.colData[item.key].hidden, colorIcon: colors.background })));
                } }));
    };
    return ColumConfig;
}(React.Component));
export default ColumConfig;
