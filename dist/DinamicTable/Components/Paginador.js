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
var BtnPagina = function (_a) {
    var label = _a.label, disabled = _a.disabled, onPress = _a.onPress, colors = _a.colors;
    return (React.createElement(TouchableOpacity, { disabled: disabled, onPress: onPress, style: {
            paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4,
            backgroundColor: colors.card,
            opacity: disabled ? 0.4 : 1
        } },
        React.createElement(Text, { style: { color: colors.text, fontSize: 12 } }, label)));
};
var Paginador = /** @class */ (function (_super) {
    __extends(Paginador, _super);
    function Paginador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paginador.prototype.render = function () {
        var dinamicTableInstance = this.props.dinamicTableInstance;
        var colors = dinamicTableInstance.colors;
        var totalPages = dinamicTableInstance.getTotalPages();
        if (totalPages <= 1)
            return null;
        var currentPage = dinamicTableInstance.state.currentPage;
        return (React.createElement(View, { style: { flexDirection: "row", alignItems: "center", gap: 6 } },
            React.createElement(BtnPagina, { label: "\u2039 Anterior", colors: colors, disabled: currentPage <= 1, onPress: function () { return dinamicTableInstance.changePage(currentPage - 1); } }),
            React.createElement(Text, { style: { color: colors.text, fontSize: 12 } }, "P\u00E1gina ".concat(currentPage, " de ").concat(totalPages)),
            React.createElement(BtnPagina, { label: "Siguiente \u203A", colors: colors, disabled: currentPage >= totalPages, onPress: function () { return dinamicTableInstance.changePage(currentPage + 1); } })));
    };
    return Paginador;
}(React.Component));
export default Paginador;
