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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import Select from "../../Components/Select";
import Filter, { OPERATORS } from "../Filter";
import CheckBox from "../../Components/CheckBox";
import Assets from "../../Assets";
import SDate from "../../Components/SDate";
import Btn from "../../Components/Btn";
import DatePickerCalendar from "../../Components/DatePickerCalendar";
import SLanguage from "../../Components/SLanguage";
export var OPERADORES = {
    string: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.NO_CONTAINS, label: { en: "No Contains", es: "No Contiene" }, params: 1 },
        { value: OPERATORS.STARTS_WITH, label: { en: "Starts with", es: "Empieza con" }, params: 1 },
        { value: OPERATORS.ENDS_WITH, label: { en: "Ends with", es: "Termina con" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    number: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    boolean: [
        { value: OPERATORS.IS_TRUE, label: { en: "Is true", es: "Es verdadero" }, params: 0 },
        { value: OPERATORS.IS_FALSE, label: { en: "Is false", es: "Es falso" }, params: 0 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    date: [
        { value: OPERATORS.BETWEEN, label: { en: "Between", es: "Entre" }, params: 2 },
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ]
};
var ColMenu = function (props) {
    var _a, _b, _c, _d, _e;
    var filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(function (e) { return e.col == props.col.props.id; });
    var filtro = null;
    if (filtroI >= 0) {
        filtro = props.col.props.dinamicTableInstance.filtros[filtroI];
        // setSearch({ ...filtro })
    }
    var _f = React.useState([]), list = _f[0], setList = _f[1];
    var _g = React.useState({
        dateSelec: null
    }), state = _g[0], setState = _g[1];
    var _h = React.useState(__assign({ col: props.col.props.id, type: props.col.props.dataType, operator: "contains", dateFormat: props.col.props.dateFormat, value: [] }, filtro)), search = _h[0], setSearch = _h[1];
    // const searchRef = React.useRef(search);
    // useEffect(() => {
    //     searchRef.current = search;
    // }, [search])
    useEffect(function () {
        var formatData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var maxIndex, dataFormat, dataFilter, rows, groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxIndex = props.col.props.dinamicTableInstance.filtros.length;
                        if (filtroI >= 0) {
                            maxIndex = filtroI;
                        }
                        dataFormat = props.col.props.dinamicTableInstance.dataFormat;
                        return [4 /*yield*/, Filter.filterData(dataFormat, props.col.props.dinamicTableInstance.filtros.slice(0, maxIndex))];
                    case 1:
                        dataFilter = _a.sent();
                        rows = [];
                        groups = dataFilter.reduce(function (acc, row, index) {
                            var value = row[props.col.props.id];
                            if (!value)
                                return acc;
                            if (props.col.props.dataType == "date") {
                                if (props.col.props.dateFormat) {
                                    value = new SDate(value).toString(props.col.props.dateFormat);
                                }
                                else {
                                    value = value.toString();
                                }
                            }
                            if (Array.isArray(value)) {
                                value.map(function (e) {
                                    if (!acc.includes(e)) {
                                        rows.push(row);
                                        acc.push(e);
                                    }
                                });
                            }
                            else if (!acc.includes(value)) {
                                rows.push(row);
                                acc.push(value);
                            }
                            return acc;
                        }, []);
                        // console.log("rows", groups);
                        setList(rows);
                        return [2 /*return*/];
                }
            });
        }); };
        formatData();
        // return () => {
        //     if (searchRef.current && searchRef.current.value.length > 0) {
        //         const filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(e => e.col == props.col.props.id)
        //         if (filtroI >= 0) {
        //             props.col.props.dinamicTableInstance.filtros[filtroI] = searchRef.current
        //         } else {
        //             props.col.props.dinamicTableInstance.filtros.push(searchRef.current)
        //         }
        //         props.col.props.dinamicTableInstance.applyFilter()
        //     }
        // }
    }, []);
    var hanldeSort = function (order) {
        var sorters = props.col.props.dinamicTableInstance.sorter;
        var sorterI = sorters.findIndex(function (e) { return e.key == props.col.props.id; });
        if (sorterI >= 0) {
            props.col.props.dinamicTableInstance.sorter[sorterI].order = order;
        }
        else {
            props.col.props.dinamicTableInstance.sorter.push({
                key: props.col.props.id,
                order: order,
                type: props.col.props.dataType,
                dateFormat: props.col.props.dateFormat
            });
        }
        props.col.props.dinamicTableInstance.popup.close("colMenu");
        props.col.props.dinamicTableInstance.applySort();
    };
    var colors = props.col.props.dinamicTableInstance.colors;
    var OP = OPERADORES[props.col.props.dataType].find(function (e) { return e.value == search.operator; });
    if (!OP) {
        OP = OPERADORES[props.col.props.dataType].find(function (e) { return e.value == "="; });
        search.operator = "=";
    }
    var RenderFilterList = function () {
        if (!!props.col.props.disableFilter)
            return null;
        if (!!props.col.props.disableFilterGroup)
            return null;
        return React.createElement(React.Fragment, null,
            React.createElement(View, { style: { height: 5 } }),
            React.createElement(View, { style: { height: 1, backgroundColor: colors.border } }),
            React.createElement(View, { style: { height: 4 } }),
            React.createElement(ScrollView, { horizontal: true, contentContainerStyle: {
                    minWidth: "100%"
                } },
                React.createElement(FlatList, { data: list, style: {
                        width: "100%",
                        // backgroundColor:"#F0f",
                        // borderColor: colors.border,
                        borderRadius: 4
                    }, contentContainerStyle: { padding: 4, paddingBottom: 40 }, ItemSeparatorComponent: function () { return React.createElement(View, { style: { height: 8 } }); }, renderItem: function (_a) {
                        var item = _a.item, index = _a.index;
                        var COMPONENT = null;
                        var colData = props.col.props.dinamicTableInstance.colData[props.col.props.id];
                        var data = item[props.col.props.id];
                        if (props.col.props.customComponent)
                            COMPONENT = props.col.props.customComponent({
                                data: item[props.col.props.id],
                                dataFormat: item[props.col.props.id],
                                row: item.__original,
                                index: index,
                                dinamicTable: props.col.props.dinamicTableInstance,
                                textStyle: { color: colors.text },
                                colData: colData
                            });
                        else {
                            if (props.col.props.format) {
                                data = props.col.props.format({ data: item[props.col.props.id], row: item.__original, index: index, textStyle: { color: colors.text } });
                            }
                            else if (props.col.props.dataType == "date" && props.col.props.dateFormat) {
                                data = new SDate(data).toString(props.col.props.dateFormat);
                            }
                            var styleText = StyleSheet.flatten([{ color: colors.text }, props.col.props.dinamicTableInstance.props.textStyle, props.col.props.textStyle]);
                            COMPONENT = React.createElement(Text, { numberOfLines: 1, style: [styleText] }, !data ? null : data.toString());
                        }
                        if (props.col.props.dataType == "date") {
                            var da = item[props.col.props.id];
                            data = da.toISOString();
                        }
                        var isCheck = search.value.includes(!data ? null : data.toString());
                        return React.createElement(TouchableOpacity, { style: {
                                flexDirection: "row",
                                alignItems: "center"
                            }, onPress: function () {
                                if (!Array.isArray(search.value)) {
                                    search.value = [];
                                }
                                if (isCheck) {
                                    setSearch(__assign(__assign({}, search), { value: search.value.filter(function (e) { return e != data.toString(); }) }));
                                }
                                else {
                                    setSearch(__assign(__assign({}, search), { value: __spreadArray(__spreadArray([], search.value, true), [data.toString()], false) }));
                                }
                                // props.col.props.dinamicTableInstance.filtros.push({
                                //     col: props.col.props.id,
                                //     type: props.col.props.dataType,
                                //     operator: "=",
                                //     value: item[props.col.props.id]
                                // })
                                // props.col.props.dinamicTableInstance.applyFilter()
                                // props.col.props.dinamicTableInstance?.popup?.close("colMenu")
                            } },
                            React.createElement(CheckBox, { value: isCheck, color: colors.accent, colorActive: colors.accent }),
                            React.createElement(View, { style: { width: 4 } }),
                            React.createElement(View, { style: { flex: 1 }, pointerEvents: "none" }, COMPONENT));
                    } })),
            React.createElement(View, { style: { height: 1, backgroundColor: colors.border } }));
    };
    var RenderFilterTypeDate = function (index) {
        // let valtxt = !Array.isArray(search.value) ? search.value : search.value[index]
        var valtxt = search.value[index];
        if (!!valtxt) {
            if (props.col.props.dateFormat) {
                valtxt = new SDate(valtxt).toString(props.col.props.dateFormat);
            }
        }
        return React.createElement(TouchableOpacity, { style: [props.col.props.dinamicTableInstance.inputStyle, {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }], onPress: function (e) {
                console.log(e);
                props.col.props.dinamicTableInstance.popup.show({
                    key: "selectDate",
                    onPressEvent: e,
                    height: 200,
                    width: 220,
                    parent: props.col.props.dinamicTableInstance.containerRef,
                    render: function () {
                        return React.createElement(View, { style: {
                                backgroundColor: colors.background, padding: 4, borderRadius: 8,
                                borderWidth: 1,
                                borderColor: colors.border
                            } },
                            React.createElement(DatePickerCalendar, { color: colors.text, accentColor: colors.accent, defaultValue: state.dateSelec, onChange: function (e) {
                                    state.dateSelec = e;
                                } }),
                            React.createElement(View, { style: { height: 16 } }),
                            React.createElement(View, { style: { flexDirection: "row", justifyContent: "flex-end" } },
                                React.createElement(TouchableOpacity, { style: { padding: 4 }, onPress: function () {
                                        props.col.props.dinamicTableInstance.popup.close("selectDate");
                                    } },
                                    React.createElement(Text, { style: { fontSize: 12, color: colors.accent } }, "Cancelar")),
                                React.createElement(View, { style: { width: 16 } }),
                                React.createElement(TouchableOpacity, { style: { padding: 4 }, onPress: function () {
                                        props.col.props.dinamicTableInstance.popup.close("selectDate");
                                        // setSearch({ ...search, value: [state.dateSelec.toString("yyyy-MM-dd")] })
                                        search.value[index] = state.dateSelec.date.toISOString();
                                        setSearch(__assign(__assign({}, search), { value: search.value }));
                                    } },
                                    React.createElement(Text, { style: { color: colors.accent, fontSize: 12 } }, "Aceptar"))));
                    }
                });
            } },
            React.createElement(View, { style: { width: 14, height: 14, justifyContent: "center", alignItems: "center" } },
                React.createElement(Assets.Search, { fill: colors.accent })),
            React.createElement(View, { style: { width: 4 } }),
            React.createElement(Text, { numberOfLines: 1, style: [{ flex: 1 }, props.col.props.dinamicTableInstance.textStyle] }, valtxt));
    };
    var RenderFilterTypeText = function (index) {
        return React.createElement(View, null,
            React.createElement(TextInput, { placeholder: SLanguage.select({ en: "Search...", es: "Buscar..." }), 
                // value={search.value}
                value: !Array.isArray(search.value) ? search.value : "", placeholderTextColor: colors.card, style: [props.col.props.dinamicTableInstance.inputStyle, { paddingStart: 24 }], 
                // autoFocus
                onChangeText: function (e) {
                    console.log("cambio el texto", e);
                    setSearch(__assign(__assign({}, search), { value: e }));
                } }),
            React.createElement(View, { style: { width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8, top: 6 } },
                React.createElement(Assets.Search, { fill: colors.accent })));
    };
    var RenderFilterInput = function () {
        var _a;
        if (!!props.col.props.disableFilter)
            return null;
        return React.createElement(React.Fragment, null,
            React.createElement(View, { style: { height: 1, backgroundColor: colors.border } }),
            React.createElement(View, { style: { height: 5 } }),
            React.createElement(Select, { dinamicTableInstance: props.col.props.dinamicTableInstance, defaultValue: search.operator, icon: React.createElement(Assets.Filter, { stroke: colors.accent }), options: OPERADORES[props.col.props.dataType], onSelect: function (e) {
                    var _a;
                    var newOp = OPERADORES[props.col.props.dataType].find(function (op) { return op.value === e.value; });
                    setSearch(__assign(__assign({}, search), { operator: e.value, value: ((_a = newOp === null || newOp === void 0 ? void 0 : newOp.params) !== null && _a !== void 0 ? _a : 1) <= 0 ? [] : search.value }));
                } }),
            React.createElement(View, { style: { height: 4 } }),
            !!((_a = (OP !== null && OP !== void 0 ? OP : {})) === null || _a === void 0 ? void 0 : _a.params) ? new Array(OP === null || OP === void 0 ? void 0 : OP.params).fill(0).map(function (e, index) {
                return props.col.props.dataType == "date" ?
                    RenderFilterTypeDate(index)
                    :
                        RenderFilterTypeText(index);
            }) : null);
    };
    var hanldeGroup = function () {
        var _a;
        var instance = props.col.props.dinamicTableInstance;
        var colId = (_a = props.col.props.id) !== null && _a !== void 0 ? _a : "";
        var existingI = instance.groupers.findIndex(function (g) { return g.key == colId; });
        if (existingI >= 0) {
            instance.groupers.splice(existingI, 1);
        }
        else {
            instance.groupers = [{
                    key: colId,
                    type: props.col.props.dataType,
                    dateFormat: props.col.props.dateFormat
                }];
        }
        instance.popup.close("colMenu");
        instance.applyGroup();
    };
    var RenderGrouper = function () {
        if (!!props.col.props.disableGrouper)
            return null;
        var isGrouped = props.col.props.dinamicTableInstance.groupers.some(function (g) { return g.key == props.col.props.id; });
        var ListIcon = Assets.List;
        return React.createElement(React.Fragment, null,
            React.createElement(TouchableOpacity, { onPress: hanldeGroup, style: { flexDirection: "row", alignItems: "center" } },
                React.createElement(ListIcon, { width: 16, height: 16, stroke: colors.accent }),
                React.createElement(View, { style: { width: 2 } }),
                React.createElement(Text, { numberOfLines: 1, style: { color: colors.text, fontSize: 12 } }, isGrouped
                    ? SLanguage.select({ en: "Remove group", es: "Quitar agrupación" })
                    : SLanguage.select({ en: "Group by", es: "Agrupar por" }))),
            React.createElement(View, { style: { height: 4 } }));
    };
    var RenderSorter = function () {
        if (!!props.col.props.disableSorter)
            return null;
        return React.createElement(React.Fragment, null,
            React.createElement(View, { style: { flexDirection: "row" } },
                React.createElement(TouchableOpacity, { onPress: function () {
                        hanldeSort("asc");
                    }, style: { flex: 1, flexDirection: "row", alignItems: "center" } },
                    React.createElement(Assets.Arrow, { width: 16, height: 16, stroke: colors.accent }),
                    React.createElement(View, { style: { width: 2 } }),
                    React.createElement(Text, { numberOfLines: 1, style: { color: colors.text, fontSize: 12 } }, SLanguage.select({
                        en: "Asending",
                        es: "Ascendente"
                    }))),
                React.createElement(View, { style: { height: 4 } }),
                React.createElement(TouchableOpacity, { onPress: function () {
                        hanldeSort("desc");
                    }, style: { flex: 1, flexDirection: "row", alignItems: "center" } },
                    React.createElement(Assets.Arrow, { width: 16, height: 16, stroke: colors.accent, transform: "rotate(180)" }),
                    React.createElement(View, { style: { width: 2 } }),
                    React.createElement(Text, { numberOfLines: 1, style: { color: colors.text, fontSize: 12 } }, SLanguage.select({
                        en: "Descending",
                        es: "Descendente"
                    })))),
            React.createElement(View, { style: { height: 4 } }));
    };
    return React.createElement(View, { style: {
            padding: 8, margin: 1, backgroundColor: colors.background, width: "100%", height: "100%", borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border
        } },
        React.createElement(Text, { style: { color: colors.text, fontWeight: "bold", textAlign: "center", fontSize: 12 } }, (_c = (_b = (_a = props === null || props === void 0 ? void 0 : props.col) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : (_e = (_d = props === null || props === void 0 ? void 0 : props.col) === null || _d === void 0 ? void 0 : _d.props) === null || _e === void 0 ? void 0 : _e.id),
        React.createElement(View, { style: { height: 8 } }),
        React.createElement(TouchableOpacity, { onPress: function () {
                props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap = !props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap;
                setSearch(__assign({}, search));
                props.col.props.dinamicTableInstance.forceUpdate();
            }, style: { flexDirection: "row", alignItems: "center" } },
            React.createElement(CheckBox, { value: props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap, color: colors.accent, colorActive: colors.accent, colorIcon: colors.background }),
            React.createElement(View, { style: { width: 8 } }),
            React.createElement(Text, { style: { color: colors.text, fontSize: 11 } }, SLanguage.select({
                en: "Wrap content",
                es: "Ajustar contenido"
            }))),
        React.createElement(View, { style: { height: 8 } }),
        RenderGrouper(),
        RenderSorter(),
        RenderFilterInput(),
        RenderFilterList(),
        React.createElement(View, { style: { flexDirection: "row" } },
            React.createElement(Btn, { colors: colors, style: { padding: 2, backgroundColor: colors.background, borderWidth: 0.5, borderColor: colors.accent, borderRadius: 4, flex: 1 }, onPress: function (e) {
                    props.col.props.dinamicTableInstance.popup.close("colMenu");
                } }, "Cancelar"),
            React.createElement(View, { style: { width: 8 } }),
            React.createElement(Btn, { colors: colors, color: colors.background, style: { padding: 2, backgroundColor: colors.accent, borderRadius: 4, flex: 1 }, onPress: function (e) {
                    if (search) {
                        if (search.value.length > 0 || OP.params <= 0) {
                            var filtroI_1 = props.col.props.dinamicTableInstance.filtros.findIndex(function (e) { return e.col == props.col.props.id; });
                            if (filtroI_1 >= 0) {
                                props.col.props.dinamicTableInstance.filtros[filtroI_1] = search;
                            }
                            else {
                                props.col.props.dinamicTableInstance.filtros.push(search);
                            }
                        }
                        else {
                            var filtroI_2 = props.col.props.dinamicTableInstance.filtros.findIndex(function (e) { return e.col == props.col.props.id; });
                            if (filtroI_2 >= 0) {
                                props.col.props.dinamicTableInstance.filtros.splice(filtroI_2, 1);
                            }
                        }
                        props.col.props.dinamicTableInstance.applyFilter();
                        props.col.props.dinamicTableInstance.popup.close("colMenu");
                    }
                } }, "Aplicar")));
};
export default ColMenu;
