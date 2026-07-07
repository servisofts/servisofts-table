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
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { OPERADORES } from "..";
import Select from "../../Components/Select";
import CheckBox from "../../Components/CheckBox";
import Assets from "../../Assets";
import SDate from "../../Components/SDate";
import Btn from "../../Components/Btn";
import DatePickerCalendar from "../../Components/DatePickerCalendar";
import SLanguage from "../../Components/SLanguage";
var ColMenu = function (props) {
    var _a, _b, _c, _d, _e;
    var filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(function (e) { return e.col == props.col.props.id; });
    var filtro = null;
    if (filtroI >= 0) {
        filtro = props.col.props.dinamicTableInstance.filtros[filtroI];
        // setSearch({ ...filtro })
    }
    var _f = React.useState(null), list = _f[0], setList = _f[1];
    var _g = React.useState({
        dateSelec: null
    }), state = _g[0], setState = _g[1];
    var _h = React.useState(__assign({ col: props.col.props.id, type: props.col.props.dataType, operator: "contains", dateFormat: props.col.props.dateFormat, value: [] }, filtro)), search = _h[0], setSearch = _h[1];
    // const searchRef = React.useRef(search);
    // useEffect(() => {
    //     searchRef.current = search;
    // }, [search])
    useEffect(function () {
        if (props.col.props.loadListOptions) {
            var liste = props.col.props.loadListOptions({
                dinamicTable: props.col.props.dinamicTableInstance,
                colData: props.col.props.dinamicTableInstance.colData[props.col.props.id]
            }).then(function (e) {
                setList(e);
            })["catch"](function (e) {
                console.warn("Error loading list options for column", props.col.props.id, e);
                setList([]);
            });
        }
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
        if (props.col.props.dataType == "boolean") {
            OP = OPERADORES[props.col.props.dataType].find(function (e) { return e.value == "istrue"; });
            search.operator = "istrue";
        }
    }
    var RenderFilterList = function () {
        if (!!props.col.props.disableFilter)
            return null;
        if (!!props.col.props.disableFilterGroup)
            return null;
        if (!props.col.props.loadListOptions)
            return null;
        if (!list)
            return React.createElement(ActivityIndicator, { size: "small", color: colors.text });
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
                            React.createElement(CheckBox, { value: isCheck, color: colors.accent, colorActive: colors.text }),
                            React.createElement(View, { style: { width: 4 } }),
                            React.createElement(View, { style: { flex: 1 } }, COMPONENT));
                    } })),
            React.createElement(View, { style: { height: 1, backgroundColor: colors.border } }));
    };
    var RenderFilterTypeDate = function (index) {
        return React.createElement(TouchableOpacity, { style: [props.col.props.dinamicTableInstance.inputStyle, {
                    flexDirection: "row",
                    // justifyContent: "center",
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
                                        search.value[index] = state.dateSelec.toString("yyyy-MM-dd");
                                        setSearch(__assign(__assign({}, search), { value: search.value }));
                                    } },
                                    React.createElement(Text, { style: { color: colors.accent, fontSize: 12 } }, "Aceptar"))));
                    }
                });
            } },
            React.createElement(View, { style: { width: 14, height: 14, justifyContent: "center", alignItems: "center" } },
                React.createElement(Assets.Search, { fill: colors.accent })),
            React.createElement(View, { style: { width: 8 } }),
            React.createElement(Text, { style: [{ flex: 1, color: props.col.props.dinamicTableInstance.inputStyle.color, fontSize: props.col.props.dinamicTableInstance.inputStyle.fontSize }] }, !Array.isArray(search.value) ? search.value : search.value[index]));
    };
    var RenderFilterTypeText = function (index) {
        // TypeText
        return React.createElement(View, null,
            React.createElement(TextInput, { placeholder: SLanguage.select({ en: "Search...", es: "Buscar..." }), 
                // value={search.value}
                value: !Array.isArray(search.value) ? search.value : search.value.join(", "), placeholderTextColor: colors.card, style: [props.col.props.dinamicTableInstance.inputStyle, { paddingStart: 24 }], 
                // autoFocus
                onChangeText: function (e) {
                    console.log("cambio el texto", e);
                    setSearch(__assign(__assign({}, search), { value: e }));
                } }),
            React.createElement(View, { style: { width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8, top: 6 } },
                React.createElement(Assets.Search, { fill: colors.accent })));
    };
    var RenderFilterInput = function () {
        if (!!props.col.props.disableFilter)
            return null;
        return React.createElement(React.Fragment, null,
            React.createElement(View, { style: { height: 1, backgroundColor: colors.border } }),
            React.createElement(View, { style: { height: 4 } }),
            React.createElement(Select, { dinamicTableInstance: props.col.props.dinamicTableInstance, defaultValue: search.operator, icon: React.createElement(Assets.Filter, { stroke: colors.accent }), options: OPERADORES[props.col.props.dataType], onSelect: function (e) {
                    var _a;
                    var newOp = OPERADORES[props.col.props.dataType].find(function (op) { return op.value === e.value; });
                    setSearch(__assign(__assign({}, search), { operator: e.value, value: ((_a = newOp === null || newOp === void 0 ? void 0 : newOp.params) !== null && _a !== void 0 ? _a : 1) <= 0 ? [] : search.value }));
                } }),
            React.createElement(View, { style: { height: 4 } }),
            OP.params ? new Array(OP.params).fill(0).map(function (e, index) {
                return props.col.props.dataType == "date" ?
                    RenderFilterTypeDate(index)
                    :
                        RenderFilterTypeText(index);
            }) : null);
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
            React.createElement(CheckBox, { value: props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap, color: colors.accent, colorActive: colors.accent }),
            React.createElement(View, { style: { width: 8 } }),
            React.createElement(Text, { style: { color: colors.text, fontSize: 11 } }, SLanguage.select({
                en: "Wrap content",
                es: "Ajustar contenido"
            }))),
        React.createElement(View, { style: { height: 8 } }),
        RenderSorter(),
        RenderFilterInput(),
        RenderFilterList(),
        React.createElement(View, { style: { flex: 1, minHeight: 4 } }),
        React.createElement(View, { style: { flexDirection: "row" } },
            React.createElement(Btn, { colors: colors, style: { padding: 2, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.accent, borderRadius: 4, flex: 1 }, onPress: function (e) {
                    props.col.props.dinamicTableInstance.popup.close("colMenu");
                } }, "Cancelar"),
            React.createElement(View, { style: { width: 8 } }),
            React.createElement(Btn, { colors: colors, color: colors.background, style: { padding: 2, backgroundColor: colors.accent, borderRadius: 4, flex: 1 }, onPress: function (e) {
                    if (search) {
                        if (search.value.length > 0 || OP.params <= 0) {
                            var filtroI_1 = props.col.props.dinamicTableInstance.filtros.findIndex(function (e) { return e.col == props.col.props.id; });
                            if (!Array.isArray(search.value)) {
                                var sa = search.value.toString().split(",").map(function (e) { return e.trim(); }).filter(function (e) { return e.length > 0; });
                                search.value = sa;
                            }
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
