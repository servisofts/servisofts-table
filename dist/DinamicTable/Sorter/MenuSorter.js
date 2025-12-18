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
var MenuSorter = /** @class */ (function (_super) {
    __extends(MenuSorter, _super);
    function MenuSorter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuSorter.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var sorters = this.props.dinamicTableInstance.sorter;
        var colors = this.props.dinamicTableInstance.colors;
        var size = (_d = (_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.dinamicTableInstance) === null || _b === void 0 ? void 0 : _b.props) === null || _c === void 0 ? void 0 : _c.iconSize) !== null && _d !== void 0 ? _d : 18;
        return sorters.map(function (item, index) {
            var _a, _b;
            var header = _this.props.dinamicTableInstance.cols.find(function (a) { return a.key == item.key; });
            return React.createElement(React.Fragment, null,
                React.createElement(View, { style: { width: 4 } }),
                React.createElement(TouchableOpacity, { style: {
                        // padding: 2,
                        padding: 4,
                        height: size,
                        paddingRight: 4,
                        paddingLeft: 4,
                        borderWidth: 0.5,
                        borderColor: colors.accent + "99",
                        backgroundColor: colors.header,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        maxWidth: 140,
                        marginTop: 2
                    }, onPress: function () {
                        _this.props.dinamicTableInstance.sorter.splice(index, 1);
                        _this.props.dinamicTableInstance.applySort();
                    } },
                    React.createElement(View, { style: { width: 10 } },
                        React.createElement(Assets.Arrow, { stroke: colors.text, fill: colors.text, width: 10, height: 10, transform: "rotate(".concat(item.order === "asc" ? 0 : 180, ")") })),
                    React.createElement(View, { style: { width: 2 } }),
                    React.createElement(Text, { style: {
                            color: colors.text,
                            fontSize: 9
                        }, numberOfLines: 1 },
                        React.createElement(Text, { style: { color: colors.text, fontWeight: "bold" } }, (_b = (_a = header === null || header === void 0 ? void 0 : header.props) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : item.key))));
        });
        // return <FlatList
        //     data={sorters}
        //     horizontal
        //     scrollEnabled={false}
        //     ListHeaderComponent={() => <View style={{ width: 4 }} />}
        //     ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
        //     contentContainerStyle={{
        //         flexWrap: "wrap",
        //     }}
        //     renderItem={({ item, index }) => {
        //     }}
        // />
    };
    MenuSorter.defaultProps = {};
    return MenuSorter;
}(React.Component));
export default MenuSorter;
