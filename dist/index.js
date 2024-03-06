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
var DefaultCellStyle = {
    borderColor: "#222",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    height: 24,
    justifyContent: "center",
    color: "#fff",
    fontSize: 12,
    padding: 2
};
function STable(props) {
    var _a;
    var cellStyle = __assign(__assign({}, DefaultCellStyle), (_a = props.cellStyle) !== null && _a !== void 0 ? _a : {});
    var _b = useState(new Date().getTime() + ""), keyInstance = _b[0], setKeyInstance = _b[1];
    var _c = useState([]), data = _c[0], setData = _c[1];
    var _d = useState(new Array(20).fill({ wpx: 100 })), cols = _d[0], setCols = _d[1];
    var _e = useState(new Array(20000).fill({ hpx: cellStyle.height })), rows = _e[0], setRows = _e[1];
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
    var widthNumbers = 40;
    return React.createElement(View, { style: styles.container },
        React.createElement(ToolBar, { cellStyle: cellStyle }),
        React.createElement(View, { style: { height: 4 } }),
        React.createElement(View, { style: { width: "100%", height: 25, flexDirection: "row" } },
            React.createElement(TouchableOpacity, { style: [{ height: "100%", width: widthNumbers }, cellStyle], onPress: HandleExportExcel }),
            React.createElement(Headers, { ref: header, cols: cols, rows: rows, width: width, data: data, cellStyle: cellStyle, onChangeColSize: function (e) {
                    cols[e.index] = __assign(__assign({}, cols[e.index]), { wpx: e.size });
                    setKeyInstance(new Date().getTime() + "");
                    setCols(__spreadArray([], cols, true));
                } })),
        React.createElement(View, { style: { width: "100%", flex: 1, flexDirection: "row" } },
            React.createElement(View, { style: { height: "100%", width: widthNumbers } },
                React.createElement(RowNumbers, { ref: numbers, cellStyle: cellStyle, cols: cols, rows: rows, width: width, data: data })),
            React.createElement(View, { style: { height: "100%", flex: 1 } }, TABLE)));
}
export default STable;
