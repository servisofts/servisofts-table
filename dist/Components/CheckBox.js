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
import { View } from "react-native";
import Assets from "../Assets";
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.value
        };
        return _this;
    }
    CheckBox.prototype.render = function () {
        var _a, _b, _c, _d;
        var color = (_a = this.props.color) !== null && _a !== void 0 ? _a : "#fff";
        var colorActive = (_b = this.props.colorActive) !== null && _b !== void 0 ? _b : ((_c = this.props.color) !== null && _c !== void 0 ? _c : "#fff");
        var colorIcon = (_d = this.props.colorIcon) !== null && _d !== void 0 ? _d : "#3774C1";
        var styleContent = __assign({ width: 16, height: 16, borderRadius: 4, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: color }, this.props.style);
        var CONTENT = null;
        if (this.props.value) {
            styleContent.backgroundColor = colorActive;
            CONTENT = React.createElement(Assets.Check, { stroke: colorIcon });
        }
        return React.createElement(View, { style: styleContent }, CONTENT);
    };
    return CheckBox;
}(React.Component));
export default CheckBox;
