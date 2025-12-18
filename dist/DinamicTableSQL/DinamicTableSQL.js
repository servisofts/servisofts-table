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
import React from "react";
import { FlatList, ScrollView, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import Popup from "./Popup";
import Col from "./Col";
import MenuFilter from "./Filter/MenuFilter";
import MenuSorter from "./Sorter/MenuSorter";
import Row from "./Row";
import TopMenuOptions from "./TopMenuOptions";
import Assets from "../Assets";
var DinamicTableSQL = /** @class */ (function (_super) {
    __extends(DinamicTableSQL, _super);
    function DinamicTableSQL() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.colData = {};
        _this.colRef = {};
        _this.colors = __assign({ text: "#ffffff", background: "#333", card: "#444", border: "#666", accent: "#4689CC", header: "#444" }, _this.props.colors);
        _this.textStyle = __assign({ color: _this.colors.text, fontSize: 12 }, ((_a = _this.props.textStyle) !== null && _a !== void 0 ? _a : {}));
        _this.inputStyle = {
            color: _this.colors.text,
            borderWidth: 1,
            borderColor: _this.colors.border,
            borderRadius: 4,
            fontSize: 12,
            height: 22,
            padding: 6,
            justifyContent: "center",
            // @ts-ignore
            outlineWidth: 0,
            // flex: 1,
            width: "100%"
        };
        _this.showScrollToTop = false;
        _this.rowSelecteds = {};
        _this.cols = [];
        _this.filtros = [];
        _this.size = 0;
        _this.sorter = [];
        _this.containerRef = null;
        _this.popup = null;
        _this.buscador = "";
        _this.dataFiltrada = [];
        _this.counter = null;
        _this.flatList = null;
        _this.limit = 100;
        _this.offset = 0;
        _this.init = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.buildChildrenTypes();
                        return [4 /*yield*/, this.loadInitialState()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.rowEventListeners = {};
        _this.loadData = function (reset) {
            if (reset === void 0) { reset = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.props.loadData)
                                throw "DinamicTableSQL: Function loadData is required";
                            if (reset) {
                                this.offset = 0;
                            }
                            return [4 /*yield*/, this.props.loadData(this)];
                        case 1:
                            data = _a.sent();
                            if (reset) {
                                this.dataFiltrada = data;
                            }
                            else {
                                this.dataFiltrada = __spreadArray(__spreadArray([], this.dataFiltrada, true), data, true);
                            }
                            // this.dataFiltrada = data;
                            this.dataFiltrada.forEach(function (a, index) {
                                var _a;
                                a.__key = (_a = a["__key"]) !== null && _a !== void 0 ? _a : index.toString();
                                return a;
                            });
                            this.loadSize();
                            this.forceUpdate();
                            console.log("DinamicTableSQL", data);
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.loadSize = function () { return __awaiter(_this, void 0, void 0, function () {
            var size, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.loadSize)
                            return [2 /*return*/, null];
                        if (this.counter) {
                            this.counter.setState({ loading: true });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.props.loadSize(this)];
                    case 2:
                        size = _a.sent();
                        this.size = size;
                        this.counter.setState({ count: size, loading: false });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.counter.setState({ loading: false });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.applyFilter = function () {
            _this.forceUpdate();
            _this.loadData();
        };
        _this.applySort = function () {
            _this.forceUpdate();
            _this.loadData();
        };
        _this.applyHeaderSize = function () {
            Object.keys(_this.colRef).forEach(function (key) {
                var col = _this.colRef[key];
                if (col) {
                    col.currentWidth = _this.colData[key].width;
                    col.widthAnim.setValue(_this.colData[key].width);
                }
            });
        };
        return _this;
    }
    DinamicTableSQL.prototype.componentDidMount = function () {
        this.init();
    };
    DinamicTableSQL.prototype.loadInitialState = function () {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.props.loadInitialState)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.props.loadInitialState()];
                    case 1:
                        state = _f.sent();
                        this.filtros = (_a = state.filters) !== null && _a !== void 0 ? _a : [];
                        this.sorter = (_b = state.sorters) !== null && _b !== void 0 ? _b : [];
                        this.limit = (_c = state.limit) !== null && _c !== void 0 ? _c : 100;
                        this.offset = (_d = state.offset) !== null && _d !== void 0 ? _d : 0;
                        this.colData = __assign(__assign({}, this.colData), ((_e = state.cols) !== null && _e !== void 0 ? _e : {}));
                        this.forceUpdate();
                        return [2 /*return*/];
                }
            });
        });
    };
    DinamicTableSQL.prototype.addRowEventListener = function (key, listener) {
        this.rowEventListeners[key] = listener;
    };
    DinamicTableSQL.prototype.removeRowEventListener = function (key) {
        delete this.rowEventListeners[key];
    };
    DinamicTableSQL.prototype.dispatchRowEvent = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Object.keys(this.rowEventListeners).forEach(function (key) {
                    if (_this.rowEventListeners[key])
                        _this.rowEventListeners[key](evt);
                });
                return [2 /*return*/];
            });
        });
    };
    DinamicTableSQL.prototype.setSelect = function (key, value, e) {
        if (this.props.onSelect) {
            var row = this.dataFiltrada.find(function (a) { return a.__key === key; });
            this.props.onSelect({ evt: e, key: key, row: row });
        }
        if (!this.props.selectType)
            return;
        if (this.props.selectType === "single") {
            this.rowSelecteds = {};
        }
        this.rowSelecteds[key] = value;
        this.dispatchRowEvent({ type: "onSelect", key: key, value: value });
    };
    DinamicTableSQL.prototype.buildChildrenTypes = function () {
        var _this = this;
        var children;
        if (!Array.isArray(this.props.children)) {
            children = [this.props.children];
        }
        else {
            children = this.props.children;
        }
        this.cols = [];
        this.cols.push(React.createElement(DinamicTableSQL.Col, { key: 'index', id: "index", textStyle: { fontSize: 10, color: this.colors.text }, format: function (e) { return e.index + 1; }, width: 40 },
            React.createElement(CounterData, { dinamicTableInstance: this, ref: function (ref) { return _this.counter = ref; } })));
        this.colData["index"] = {
            width: 40,
            wrap: false
        };
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            // if (child.type === Header) {
            //     this.headers.push(child as ReactElement<typeof Header>)
            // }
            if (child.type === Col) {
                var c = child;
                this.cols.push(c);
                this.colData[c.key] = {
                    width: c.props.width,
                    wrap: c.props.wrap
                };
            }
        }
        this.forceUpdate();
        // this.cols.sort((a, b) => a.key > b.key ? 1 : -1)
    };
    DinamicTableSQL.prototype.getExportState = function () {
        return {
            limit: this.limit,
            offset: this.offset,
            filters: this.filtros,
            sorters: this.sorter,
            cols: this.colData
        };
    };
    DinamicTableSQL.prototype.render = function () {
        var _this = this;
        if (this.props.onEvent) {
            this.props.onEvent({ evt: "render" });
        }
        return React.createElement(View, { style: { flex: 1, width: "100%" }, ref: function (ref) { return _this.containerRef = ref; } },
            React.createElement(View, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" } },
                React.createElement(TopMenuOptions, { dinamicTableInstance: this }),
                React.createElement(MenuSorter, { dinamicTableInstance: this }),
                React.createElement(MenuFilter, { dinamicTableInstance: this })),
            React.createElement(View, { style: { height: 4 } }),
            React.createElement(ScrollView, { horizontal: true, style: { flex: 1, width: "100%" }, contentContainerStyle: { flexDirection: "column", minWidth: "100%" } },
                React.createElement.apply(React, __spreadArray([View, { style: { flexDirection: "row" } }], this.cols.filter(function (a) { return !_this.colData[a.key].hidden; }).map(function (c, index) { return React.cloneElement(c, {
                    key: c.key, id: c.key,
                    ref: function (ref) { return _this.colRef[c.key] = ref; },
                    dinamicTableInstance: _this
                }); }), false)),
                React.createElement(FlatList, { ref: function (ref) { return _this.flatList = ref; }, data: this.dataFiltrada.filter(function (row) {
                        if (_this.props.filter) {
                            return _this.props.filter({ row: row });
                        }
                        return true;
                    }), contentContainerStyle: { minWidth: "100%", alignItems: "flex-start", paddingRight: 70 }, keyExtractor: function (item, index) { return item.__key; }, renderItem: function (_a) {
                        var item = _a.item, index = _a.index;
                        return React.createElement(Row, { item: item, index: index, dinamicTableInstance: _this });
                    }, onEndReachedThreshold: 0.4, onEndReached: function () {
                        if (_this.size <= _this.dataFiltrada.length)
                            return null;
                        _this.offset += _this.limit;
                        _this.loadData(false);
                        console.log("onEndReached");
                    }, ListFooterComponent: function () {
                        if (_this.size <= _this.dataFiltrada.length)
                            return null;
                        return React.createElement(View, { style: { height: 50, width: "100%", justifyContent: "center", alignItems: "center" } },
                            React.createElement(ActivityIndicator, null));
                    }, onScroll: function (e) {
                        var bol = e.nativeEvent.contentOffset.y > 100;
                        if (_this.showScrollToTop != bol) {
                            _this.showScrollToTop = bol;
                            _this.forceUpdate();
                        }
                    } })),
            this.showScrollToTop && React.createElement(TouchableOpacity, { style: {
                    width: 30, height: 30, borderRadius: 100, backgroundColor: this.colors.accent,
                    position: "absolute", bottom: 8, right: 8,
                    justifyContent: "center", alignItems: "center"
                }, onPress: function () {
                    var _a;
                    (_a = _this.flatList) === null || _a === void 0 ? void 0 : _a.scrollToOffset({ offset: 0, animated: true });
                } },
                React.createElement(Assets.Arrow, { stroke: this.colors.background })),
            React.createElement(Popup, { ref: function (ref) { return _this.popup = ref; }, dinamicTableInstance: this }));
    };
    DinamicTableSQL.Col = Col;
    return DinamicTableSQL;
}(React.Component));
export default DinamicTableSQL;
function separarPorMiles(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
var CounterData = /** @class */ (function (_super) {
    __extends(CounterData, _super);
    function CounterData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            count: 0,
            loading: false
        };
        return _this;
    }
    CounterData.prototype.render = function () {
        return React.createElement(View, { style: {
                padding: 2,
                flex: 1
            } }, this.state.loading ? React.createElement(ActivityIndicator, { size: "small", color: this.props.dinamicTableInstance.colors.text }) :
            React.createElement(Text, { numberOfLines: 1, style: [this.props.dinamicTableInstance.textStyle, { fontWeight: "bold" }] }, "".concat(separarPorMiles(this.state.count))));
    };
    return CounterData;
}(React.Component));
