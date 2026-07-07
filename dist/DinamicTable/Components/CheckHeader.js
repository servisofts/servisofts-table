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
import { TouchableOpacity, View } from "react-native";
var CheckHeader = /** @class */ (function (_super) {
    __extends(CheckHeader, _super);
    function CheckHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckHeader.prototype.render = function () {
        var _a = this.props, dinamicTableInstance = _a.dinamicTableInstance, width = _a.width;
        var colors = dinamicTableInstance.colors;
        var total = dinamicTableInstance.dataFiltrada.length;
        var selectedCount = dinamicTableInstance.dataFiltrada.filter(function (item) { return dinamicTableInstance.rowSelecteds[item.__key]; }).length;
        var allSelected = total > 0 && selectedCount === total;
        var someSelected = selectedCount > 0 && selectedCount < total;
        return (React.createElement(TouchableOpacity, { onPress: function () {
                if (allSelected) {
                    dinamicTableInstance.clearSelect();
                }
                else {
                    dinamicTableInstance.selectAll();
                }
            }, style: {
                width: width,
                minHeight: 26,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 0.5,
                borderBottomColor: colors.border,
                backgroundColor: colors.header,
                borderTopLeftRadius: 8
            } },
            React.createElement(View, { style: {
                    width: 14,
                    height: 14,
                    borderWidth: 1.5,
                    borderColor: allSelected || someSelected ? colors.accent : colors.border,
                    borderRadius: 3,
                    backgroundColor: allSelected ? colors.accent : "transparent",
                    justifyContent: "center",
                    alignItems: "center"
                } }, someSelected && !allSelected && (React.createElement(View, { style: {
                    width: 8,
                    height: 2,
                    backgroundColor: colors.accent,
                    borderRadius: 1
                } })))));
    };
    return CheckHeader;
}(React.Component));
export default CheckHeader;
