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
import Assets from "../../Assets";
var MenuGrouper = /** @class */ (function (_super) {
    __extends(MenuGrouper, _super);
    function MenuGrouper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuGrouper.prototype.render = function () {
        var _this = this;
        var groupers = this.props.dinamicTableInstance.groupers;
        var colors = this.props.dinamicTableInstance.colors;
        return groupers.map(function (item, index) {
            var _a, _b;
            var col = _this.props.dinamicTableInstance.cols.find(function (a) { return a.key == item.key; });
            return (React.createElement(TouchableOpacity, { key: "grouper-".concat(item.key), style: {
                    padding: 4,
                    paddingRight: 4,
                    paddingLeft: 4,
                    borderWidth: 0.5,
                    borderColor: colors.accent + "99",
                    backgroundColor: colors.card,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    maxWidth: 140,
                    marginTop: 2
                }, onPress: function () {
                    _this.props.dinamicTableInstance.groupers.splice(index, 1);
                    _this.props.dinamicTableInstance.applyGroup();
                } },
                React.createElement(View, { style: { width: 10 } }, React.createElement(Assets.List, { stroke: colors.text, width: 10, height: 10 })),
                React.createElement(View, { style: { width: 2 } }),
                React.createElement(Text, { style: { color: colors.text, fontSize: 9, fontWeight: "bold" }, numberOfLines: 1 }, (_b = (_a = col === null || col === void 0 ? void 0 : col.props) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : item.key)));
        });
    };
    return MenuGrouper;
}(React.Component));
export default MenuGrouper;
