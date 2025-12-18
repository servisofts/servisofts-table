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
import { View } from "react-native";
import Btn from "../Components/Btn";
import Excel from "./Excel";
import ColumConfig from "./Components/ColumConfig";
// import ColumConfig from "./Components/ColumConfig";
// import Sql from "./Sql"
var TopMenuOptions = /** @class */ (function (_super) {
    __extends(TopMenuOptions, _super);
    function TopMenuOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopMenuOptions.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var colors = this.props.dinamicTableInstance.colors;
        var textStyle = { color: this.props.dinamicTableInstance.colors.text, padding: 8, fontSize: 12 };
        var size = (_d = (_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.dinamicTableInstance) === null || _b === void 0 ? void 0 : _b.props) === null || _c === void 0 ? void 0 : _c.iconSize) !== null && _d !== void 0 ? _d : 18;
        return React.createElement(View, { style: { flexDirection: "row" } },
            React.createElement(Btn, { colors: colors, size: size, onPress: function () {
                    _this.props.dinamicTableInstance.loadData();
                }, icon: "Reload" }, ""),
            React.createElement(View, { style: { width: 4 } }),
            React.createElement(Btn, { colors: colors, size: size, icon: "List", onPress: function (e) {
                    _this.props.dinamicTableInstance.popup.show({
                        key: "columnas",
                        parent: _this.props.dinamicTableInstance.containerRef,
                        onPressEvent: e,
                        height: 300,
                        width: 180,
                        render: function () {
                            return React.createElement(ColumConfig, { dinamicTableInstance: _this.props.dinamicTableInstance });
                        }
                    });
                } }, ""),
            React.createElement(View, { style: { width: 4 } }),
            React.createElement(Btn, { icon: "DownloadTable", size: size, colors: colors, onPress: function () {
                    var dinamicTableInstance = _this.props.dinamicTableInstance;
                    Excel.build({ dinamicTableInstance: dinamicTableInstance });
                } }, ""));
    };
    return TopMenuOptions;
}(React.Component));
export default TopMenuOptions;
