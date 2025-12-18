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
import * as React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import SDate from '../SDate';
import Assets from '../../Assets';
var DatePickerCalendar = /** @class */ (function (_super) {
    __extends(DatePickerCalendar, _super);
    function DatePickerCalendar() {
        var _this = this;
        var _a, _b;
        _this = _super.apply(this, arguments) || this;
        _this.textStyle = { color: (_a = _this.props.color) !== null && _a !== void 0 ? _a : "#fff", fontSize: 12 };
        _this.state = {
            selectedDate: (_b = _this.props.defaultValue) !== null && _b !== void 0 ? _b : new SDate()
        };
        return _this;
    }
    DatePickerCalendar.prototype.componentDidMount = function () {
        if (this.props.onChange) {
            this.props.onChange(this.state.selectedDate);
        }
    };
    DatePickerCalendar.prototype.render = function () {
        var _this = this;
        var selectedDate = this.state.selectedDate;
        selectedDate.setLanguage(this.props.language);
        return React.createElement(View, { style: { width: 200 } },
            React.createElement(Text, { style: [this.textStyle, { fontSize: this.textStyle.fontSize * 1.8, paddingStart: 8 }] }, selectedDate.toString("dd MON yyyy").toLocaleLowerCase()),
            React.createElement(View, { style: { height: 16 } }),
            React.createElement(Calendar, { value: this.state.selectedDate, accentColor: this.props.accentColor, language: this.props.language, textStyle: this.textStyle, onChange: function (e) {
                    if (_this.props.onChange) {
                        _this.props.onChange(e);
                    }
                    _this.setState({ selectedDate: e });
                } }));
    };
    DatePickerCalendar.defaultProps = {
        color: "#fff",
        accentColor: "#78C7ED",
        language: "en"
    };
    return DatePickerCalendar;
}(React.Component));
export default DatePickerCalendar;
var Calendar = function (_a) {
    var textStyle = _a.textStyle, _b = _a.accentColor, accentColor = _b === void 0 ? "#78C7ED" : _b, value = _a.value, _c = _a.onChange, onChange = _c === void 0 ? null : _c, _d = _a.language, language = _d === void 0 ? "es" : _d;
    var _e = React.useState({
        startDate: value.clone(),
        type: "days"
        // type: "years"
    }), state = _e[0], setState = _e[1];
    state.startDate.setLanguage(language);
    var RederDays = function () {
        return React.createElement(View, null,
            React.createElement(View, { style: { flexDirection: "row", flexWrap: "wrap" } }, new Array(7).fill(0).map(function (_, i) {
                var d = SDate.getDayOfWeek(i, language);
                return React.createElement(Day, { textStyle: textStyle },
                    " ",
                    d.text.substring(0, 1));
            })),
            React.createElement(View, { style: { width: "100%" } }, new Array(6).fill(0).map(function (_, i) {
                return React.createElement(View, { style: { flexDirection: "row", flexWrap: "wrap" } }, new Array(7).fill(0).map(function (_, j) {
                    var postion = i * 7 + j;
                    if (postion < firstDay.getDayOfWeek()) {
                        return React.createElement(Day, { textStyle: textStyle });
                    }
                    var d = firstDay.clone().addDay(postion - firstDay.getDayOfWeek());
                    if (d.getMonth() != firstDay.getMonth()) {
                        return React.createElement(Day, { textStyle: textStyle });
                    }
                    var select = value.toString("yyyy-MM-dd") == d.toString("yyyy-MM-dd");
                    var curdate = new SDate().toString("yyyy-MM-dd") == d.toString("yyyy-MM-dd");
                    return React.createElement(Day, { textStyle: textStyle, select: select, curdate: curdate, accentColor: accentColor, onPress: function () {
                            if (onChange)
                                onChange(d);
                            setState(__assign({}, state));
                        } }, d.getDay());
                }));
            })));
    };
    var RenderYears = function () {
        var start = 1900;
        var years = new Array(201).fill(0).map(function (_, i) { return (start + i).toString(); });
        var selectedYear = value.toString("yyyy");
        var initialIndex = years.indexOf(selectedYear);
        var rowIndex = Math.floor(initialIndex / 3); // ← Esto es lo que necesitas
        // Asume que cada ítem tiene altura aproximada de 50px (ajustalo si es distinto)
        var ITEM_HEIGHT = 30;
        return (React.createElement(View, { style: { width: "100%", maxHeight: 280, overflow: "hidden" } },
            React.createElement(FlatList, { style: { flex: 1, width: "100%", height: "100%" }, scrollEnabled: true, data: years, numColumns: 3, keyExtractor: function (item) { return item.toString(); }, initialScrollIndex: rowIndex, getItemLayout: function (data, index) {
                    return {
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index: index
                    };
                }, renderItem: function (_a) {
                    var item = _a.item;
                    var select = selectedYear === item;
                    return (React.createElement(TouchableOpacity, { style: [{
                                width: "33.33%", height: ITEM_HEIGHT, alignItems: "center", justifyContent: "center"
                            }, select ? { backgroundColor: accentColor, borderRadius: 8 } : null,], onPress: function () {
                            state.startDate.setYear(parseInt(item));
                            state.type = "days";
                            setState(__assign({}, state));
                        } },
                        React.createElement(Text, { style: [textStyle, select && { fontWeight: "bold" }] }, item)));
                } })));
    };
    var firstDay = new SDate(state.startDate.toString("yyyy-MM-01"), "yyyy-MM-dd");
    return React.createElement(View, { style: {} },
        React.createElement(View, { style: {
                flexDirection: "row", flexWrap: "wrap", paddingStart: 8,
                alignItems: "center"
            } },
            React.createElement(TouchableOpacity, { style: { flexDirection: "row", justifyContent: "center" }, onPress: function () {
                    state.type = state.type == "days" ? "years" : "days";
                    setState(__assign({}, state));
                } },
                React.createElement(Text, { style: [textStyle, { fontSize: textStyle.fontSize * 0.85 }] }, state.startDate.toString("MONTH, yyyy")),
                React.createElement(View, { style: { width: 8 } }),
                React.createElement(View, { style: { width: 8 } },
                    React.createElement(Assets.ArrowDown, { width: textStyle.fontSize * 0.80, height: textStyle.fontSize * 0.80, fill: textStyle.color }))),
            React.createElement(View, { style: { flex: 1 } }),
            state.type == "days" &&
                React.createElement(React.Fragment, null,
                    React.createElement(TouchableOpacity, { style: {
                            width: 30,
                            justifyContent: "center",
                            alignItems: "center"
                        }, onPress: function () {
                            state.startDate.addMonth(-1);
                            setState(__assign({}, state));
                        } },
                        React.createElement(View, { style: { width: 10, height: 10, transform: [{ rotate: "90deg" }] } },
                            React.createElement(Assets.ArrowDown, { width: "100%", height: "100%", fill: textStyle.color }))),
                    React.createElement(TouchableOpacity, { style: {
                            width: 30,
                            justifyContent: "center",
                            alignItems: "center"
                        }, onPress: function () {
                            state.startDate.addMonth(+1);
                            setState(__assign({}, state));
                        } },
                        React.createElement(View, { style: { width: 10, height: 10, transform: [{ rotate: "270deg" }] } },
                            React.createElement(Assets.ArrowDown, { width: "100%", height: "100%", fill: textStyle.color }))))),
        React.createElement(View, { style: { height: 8 } }),
        state.type == "days" && RederDays(),
        state.type == "years" && RenderYears());
};
var Day = function (_a) {
    var _b = _a.children, children = _b === void 0 ? null : _b, textStyle = _a.textStyle, _c = _a.onPress, onPress = _c === void 0 ? null : _c, _d = _a.select, select = _d === void 0 ? false : _d, _e = _a.curdate, curdate = _e === void 0 ? false : _e, _f = _a.accentColor, accentColor = _f === void 0 ? "#78C7ED" : _f;
    var Elm = View;
    if (onPress) {
        Elm = TouchableOpacity;
    }
    return React.createElement(Elm, { style: {
            flex: 1,
            alignItems: "center",
            height: 30,
            justifyContent: "center"
        }, onPress: onPress },
        React.createElement(View, { style: [{
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center"
                },
                curdate ? { backgroundColor: accentColor + "44", borderWidth: 1, borderColor: accentColor } : null,
                select ? { backgroundColor: accentColor } : null,
            ] },
            React.createElement(Text, { style: [textStyle] }, children)));
};
