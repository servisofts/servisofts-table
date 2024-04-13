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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./style";
import SVariableSizeGrid from "./Components/SVariableSizeGrid";
import Headers from "./Headers";
import RowNumbers from "./RowNumbers";
import ToolBar from "./ToolBar";
import FloatView from "./FloatView";
function STable(props) {
    var _a, _b, _c;
    var style = (_a = props.style) !== null && _a !== void 0 ? _a : {};
    Object.keys(styles).map(function (k) {
        var _a;
        styles[k] = __assign(__assign({}, styles[k]), ((_a = style[k]) !== null && _a !== void 0 ? _a : {}));
    });
    var cellStyle = __assign(__assign(__assign({}, styles.cell), styles.text), (_b = props.cellStyle) !== null && _b !== void 0 ? _b : {});
    var _d = useState(new Date().getTime() + ""), keyInstance = _d[0], setKeyInstance = _d[1];
    var _e = useState([]), data = _e[0], setData = _e[1];
    var _f = useState(new Array(30).fill({ wpx: 100 })), cols = _f[0], setCols = _f[1];
    var _g = useState(new Array(20000).fill({ hpx: cellStyle.height })), rows = _g[0], setRows = _g[1];
    var header = useRef();
    var numbers = useRef();
    useEffect(function () {
        props.loadData.then(function (e) {
            setData(e);
            setRows(__spreadArray([], rows, true));
        })["catch"](function (e) {
            console.error(e);
        });
    }, []);
    // cols[1] = { wpx: 300 }
    var width = useMemo(function () {
        return cols.reduce(function (acc, item) { return acc + item.wpx; }, 0);
    }, [cols]);
    var TABLE = useMemo(function () {
        return React.createElement(SVariableSizeGrid, { keyInstance: keyInstance, cols: cols, rows: rows, width: width, data: data, cellStyle: cellStyle, handleScroll: function (e) {
                header.current.scrollTo({ x: e.x, y: 0 });
                numbers.current.scrollTo({ x: 0, y: e.y });
            } });
    }, [rows, cols, data, keyInstance]);
    var HandleExportExcel = function () {
        console.log(data);
    };
    var widthNumbers = (_c = styles.cellNumber.width) !== null && _c !== void 0 ? _c : 40;
    return React.createElement(View, { style: styles.container },
        React.createElement(ToolBar, { cellStyle: cellStyle }),
        React.createElement(View, { style: { height: 4 } }),
        React.createElement(View, { style: { width: "100%", height: 25, flexDirection: "row" } },
            React.createElement(TouchableOpacity, { style: [{ height: "100%", width: widthNumbers }, cellStyle], onPress: HandleExportExcel }),
            React.createElement(Headers, { ref: header, cols: cols, rows: rows, width: width, data: data, cellStyle: cellStyle, onChangeColSize: function (e) {
                    cols[e.index] = __assign(__assign({}, cols[e.index]), { wpx: e.size });
                    setKeyInstance(new Date().getTime() + "");
                    setCols(__spreadArray([], cols, true));
                    console.log(e);
                } })),
        React.createElement(View, { style: { width: "100%", flex: 1, flexDirection: "row" } },
            React.createElement(View, { style: { height: "100%", width: widthNumbers } },
                React.createElement(RowNumbers, { ref: numbers, cellStyle: cellStyle, cols: cols, rows: rows, width: width, data: data })),
            React.createElement(View, { style: { height: "100%", flex: 1 } }, TABLE),
            React.createElement(FloatView, null)));
}
export default STable;
