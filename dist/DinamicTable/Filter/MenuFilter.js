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
import SDate from "../../Components/SDate";
import Assets from "../../Assets";
var MenuFilter = /** @class */ (function (_super) {
    __extends(MenuFilter, _super);
    function MenuFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuFilter.prototype.render = function () {
        var _this = this;
        var filters = this.props.dinamicTableInstance.filtros;
        var colors = this.props.dinamicTableInstance.colors;
        var dinamicTable = this.props.dinamicTableInstance;
        return filters.map(function (item, index) {
            var _a, _b;
            var header = _this.props.dinamicTableInstance.cols.find(function (a) { return a.key == item.col; });
            var text = item.value;
            if (item.type == "date") {
                if (Array.isArray(item.value)) {
                    text = "";
                    item.value.forEach(function (v, i) {
                        if (v) {
                            var date = new Date(v);
                            if (header.props.dateFormat) {
                                text += new SDate(date).toString(header.props.dateFormat);
                                if (i < item.value.length - 1) {
                                    text += ", ";
                                }
                            }
                        }
                    });
                }
            }
            return React.createElement(React.Fragment, null,
                React.createElement(View, { style: { width: 4 } }),
                React.createElement(TouchableOpacity, { style: {
                        padding: 4,
                        paddingRight: 4,
                        paddingLeft: 4,
                        borderWidth: 0.5,
                        borderColor: colors.accent + "99",
                        backgroundColor: colors.accent + "30",
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        maxWidth: 180,
                        marginTop: 2
                    }, onPress: function () {
                        _this.props.dinamicTableInstance.filtros.splice(index, 1);
                        _this.props.dinamicTableInstance.applyFilter();
                    } },
                    React.createElement(View, { style: { width: 10 } },
                        React.createElement(Assets.Filter, { stroke: colors.text, width: 10, height: 10 })),
                    React.createElement(View, { style: { width: 2 } }),
                    React.createElement(Text, { numberOfLines: 1, style: { color: colors.text, fontSize: 9, fontWeight: "bold", maxWidth: 70 } }, (_b = (_a = header === null || header === void 0 ? void 0 : header.props) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : item.col),
                    React.createElement(View, { style: { width: 2 } }),
                    React.createElement(Text, { style: {
                            color: colors.text,
                            fontSize: 9
                        }, numberOfLines: 1 },
                        React.createElement(Text, { style: { color: colors.text } }, " ".concat(item.operator, " ")),
                        React.createElement(Text, { style: { color: colors.text } }, text))));
        });
    };
    MenuFilter.defaultProps = {};
    return MenuFilter;
}(React.Component));
export default MenuFilter;
