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
import { View } from 'react-native';
import React, { Component } from 'react';
var ToolBar = /** @class */ (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolBar.prototype.render = function () {
        // const table = this.props.sheet.props.table;
        // const sheet = this.props.sheet;
        var style = {
            height: "100%",
            borderWidth: 1,
            borderColor: this.props.cellStyle.borderColor
        };
        return React.createElement(View, { style: {
                width: "100%",
                height: 36,
                flexDirection: "row",
                padding: 4
            } },
            React.createElement(View, { style: [{ width: 100 }, style] }),
            React.createElement(View, { style: { width: 8 } }),
            React.createElement(View, { style: [{ width: 40 }, style] }),
            React.createElement(View, { style: { width: 8 } }),
            React.createElement(View, { style: [{ flex: 1 }, style] }));
    };
    ToolBar.defaultProps = {
        height: 30
    };
    return ToolBar;
}(Component));
export default ToolBar;
