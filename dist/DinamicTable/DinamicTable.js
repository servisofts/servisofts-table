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
import React from "react";
import { FlatList, ScrollView, Text, TextInput, View } from "react-native";
import Header from "./Header";
import Col from "./Col";
import Row from "./Row";
import Popup from "./Popup";
import TopMenuOptions from "./TopMenuOptions";
import Filter from "./Filter";
import MenuFilter from "./Filter/MenuFilter";
import Assets from "../Assets";
import Sorter from "./Sorter";
import MenuSorter from "./Sorter/MenuSorter";
import SLanguage from "../Components/SLanguage";
var DinamicTable = /** @class */ (function (_super) {
    __extends(DinamicTable, _super);
    function DinamicTable(props) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, props) || this;
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
            // alignItems: "center",
            // @ts-ignore
            outlineWidth: 0,
            // flex: 1,
            width: "100%"
        };
        _this.containerRef = null;
        _this.headers = [];
        _this.cols = [];
        _this.data = [];
        _this.dataFiltrada = [];
        _this.dataFormat = [];
        _this.popup = null;
        _this.rowSelecteds = {};
        // filtros: any[] = [];
        _this.filtros = [];
        _this.sorter = [];
        _this.state = {
            state: "loading"
        };
        _this.buscador = "";
        _this.colData = {};
        _this.colRef = {};
        _this.rowEventListeners = {};
        _this.applyHeaderSize = function () {
            Object.keys(_this.colRef).forEach(function (key) {
                var col = _this.colRef[key];
                if (col) {
                    col.currentWidth = _this.colData[key].width;
                    col.widthAnim.setValue(_this.colData[key].width);
                }
            });
        };
        SLanguage.change((_b = _this.props.language) !== null && _b !== void 0 ? _b : "en");
        _this.buildChildrenTypes();
        return _this;
    }
    DinamicTable.prototype.addRowEventListener = function (key, listener) {
        this.rowEventListeners[key] = listener;
    };
    DinamicTable.prototype.removeRowEventListener = function (key) {
        delete this.rowEventListeners[key];
    };
    DinamicTable.prototype.dispatchRowEvent = function (evt) {
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
    DinamicTable.prototype.setSelect = function (key, value, e) {
        if (this.props.onSelect) {
            var row = this.dataFiltrada.find(function (a) { return a.__key === key; });
            this.props.onSelect({ evt: e, key: key, row: row.__original, dinamicTable: this });
        }
        if (!this.props.selectType)
            return;
        if (this.props.selectType === "single") {
            this.rowSelecteds = {};
        }
        this.rowSelecteds[key] = value;
        this.dispatchRowEvent({ type: "onSelect", key: key, value: value });
    };
    DinamicTable.prototype.clearSelect = function () {
        var _this = this;
        Object.keys(this.rowSelecteds).forEach(function (key) {
            _this.rowSelecteds[key] = false;
            _this.dispatchRowEvent({ type: "onSelect", key: key, value: false });
        });
        this.rowSelecteds = {};
        // this.forceUpdate();
    };
    DinamicTable.prototype.buildChildrenTypes = function () {
        var children;
        if (!Array.isArray(this.props.children)) {
            children = [this.props.children];
        }
        else {
            children = this.props.children;
        }
        this.headers = [];
        this.cols = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.type === Header) {
                this.headers.push(child);
            }
            if (child.type === Col) {
                var c = child;
                this.cols.push(c);
                this.colData[c.key] = {
                    width: c.props.width,
                    wrap: c.props.wrap
                };
            }
        }
        // this.cols.sort((a, b) => a.key > b.key ? 1 : -1)
    };
    DinamicTable.prototype.componentDidMount = function () {
        this._start();
    };
    DinamicTable.prototype._start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadInitialState()];
                    case 1:
                        _a.sent();
                        this.loadData();
                        return [2 /*return*/];
                }
            });
        });
    };
    DinamicTable.prototype.loadInitialState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.loadInitialState) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.loadInitialState()];
                    case 1:
                        state = _a.sent();
                        this.setExportState(state);
                        _a.label = 2;
                    case 2:
                        this.forceUpdate();
                        return [2 /*return*/];
                }
            });
        });
    };
    DinamicTable.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        // this.setState({ state: "loading" })
                        _a = this;
                        return [4 /*yield*/, this.props.loadData()];
                    case 1:
                        // this.setState({ state: "loading" })
                        _a.data = _b.sent();
                        return [4 /*yield*/, this.applyFormatData()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.applyFilter()];
                    case 3:
                        _b.sent();
                        this.setState({ state: "ready" });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        this.setState({ state: "error", error: error_1 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DinamicTable.prototype.applyFormatData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.dataFormat = this.data.map(function (item, index) {
                    var key = _this.props.keyExtractor ? _this.props.keyExtractor(item, index) : index + "";
                    var newItem = {
                        __key: key,
                        __original: item
                    };
                    _this.cols.forEach(function (col) {
                        var colProps = col.props;
                        var data = colProps.data({ row: item, index: index });
                        if (!data) {
                            data = "";
                        }
                        switch (colProps.dataType) {
                            case "number":
                                data = Number(data);
                                if (isNaN(data)) {
                                    data = 0;
                                }
                                break;
                            case "string":
                                data = data + "";
                                break;
                            case "date":
                                if (!!data) {
                                    if (data instanceof Date) {
                                        data = data;
                                    }
                                    else {
                                        data = new Date(data);
                                        if (isNaN(data.getTime())) {
                                            data = "INVALID DATE";
                                        }
                                    }
                                }
                                break;
                            case "boolean":
                                if (typeof data === "string") {
                                    data = Boolean(data);
                                }
                                if (typeof data === "number") {
                                    data = Boolean(data);
                                }
                                if (typeof data === "boolean") {
                                    data = data;
                                }
                                break;
                            default:
                                data = "INVALID FORMAT";
                                break;
                        }
                        newItem[col.key] = data;
                        // colProps.dataType
                    });
                    return newItem;
                });
                return [2 /*return*/];
            });
        });
    };
    DinamicTable.prototype.applyFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Filter.filterData(this.dataFormat, this.filtros)];
                    case 1:
                        _a.dataFiltrada = _b.sent();
                        if (this.buscador) {
                            this.dataFiltrada = this.dataFiltrada.filter(function (item) {
                                var found = false;
                                Object.keys(item).forEach(function (key) {
                                    if (typeof item[key] === "string") {
                                        if (item[key].toLowerCase().includes(_this.buscador.toLowerCase())) {
                                            found = true;
                                        }
                                    }
                                });
                                return found;
                            });
                        }
                        return [4 /*yield*/, this.applySort()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DinamicTable.prototype.applySort = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.dataFiltrada = Sorter.sort(this.dataFiltrada, this.sorter);
                this.forceUpdate();
                return [2 /*return*/];
            });
        });
    };
    DinamicTable.prototype.getExportState = function () {
        return {
            filters: this.filtros,
            sorters: this.sorter,
            cols: this.colData
        };
    };
    DinamicTable.prototype.setExportState = function (state) {
        var _this = this;
        var _a, _b;
        this.filtros = (_a = state.filters) !== null && _a !== void 0 ? _a : [];
        this.sorter = (_b = state.sorters) !== null && _b !== void 0 ? _b : [];
        Object.keys(this.colData).forEach(function (key) {
            if (state.cols && state.cols[key]) {
                _this.colData[key] = __assign(__assign({}, _this.colData[key]), state.cols[key]);
            }
        });
        // this.colData = {
        //     ...this.colData,
        //     ...(state.cols ?? {})
        // }
    };
    DinamicTable.prototype.render = function () {
        var _this = this;
        var _a;
        if (this.props.onEvent) {
            this.props.onEvent({ evt: "render" });
        }
        var size = (_a = this.props.iconSize) !== null && _a !== void 0 ? _a : 22;
        return React.createElement(View, { style: { flex: 1, width: "100%" }, ref: function (ref) { return _this.containerRef = ref; } },
            React.createElement(View, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" } },
                !this.props.hiddenMenu && React.createElement(React.Fragment, null,
                    React.createElement(TopMenuOptions, { dinamicTableInstance: this }),
                    React.createElement(View, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" } },
                        React.createElement(TextInput, { placeholderTextColor: this.colors.card, style: [this.inputStyle, { height: size, paddingStart: 26 }], placeholder: "Search...", onChangeText: function (e) {
                                _this.buscador = e;
                                _this.applyFilter();
                            } }),
                        React.createElement(View, { style: { width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8 } },
                            React.createElement(Assets.Search, { fill: this.colors.accent })))),
                React.createElement(MenuSorter, { dinamicTableInstance: this }),
                React.createElement(MenuFilter, { dinamicTableInstance: this })),
            React.createElement(View, { style: { height: 4 } }),
            React.createElement(ScrollView, { horizontal: true, style: { flex: 1, width: "100%" }, contentContainerStyle: { flexDirection: "column", minWidth: "100%" } },
                React.createElement(View, { style: { flexDirection: "row" } }, this.cols.filter(function (a) { return !_this.colData[a.key].hidden; }).map(function (c, index) {
                    var a = React.cloneElement(c, {
                        key: c.key,
                        id: c.key,
                        dinamicTableInstance: _this,
                        ref: function (ref) { return _this.colRef[c.key] = ref; }
                    });
                    return a;
                })),
                this.state.state === "loading" && React.createElement(View, { style: { width: "100%", padding: 8 } },
                    React.createElement(Text, { style: [this.textStyle] }, SLanguage.select({
                        en: "Loading data... please wait.",
                        es: "Cargando datos... por favor espera."
                    }))),
                this.state.state === "error" && React.createElement(View, { style: { width: "100%", padding: 8 } },
                    React.createElement(Text, { style: [this.textStyle] }, SLanguage.select({
                        en: "An error occurred while loading data.",
                        es: "Ocurrió un error al cargar los datos."
                    }))),
                this.state.state === "ready" && this.dataFiltrada.length <= 0 && React.createElement(View, { style: { width: "100%", padding: 8 } },
                    React.createElement(Text, { style: [this.textStyle] }, SLanguage.select({
                        es: "No se encontraron resultados.",
                        en: "No results found."
                    }))),
                this.state.state === "ready" && this.dataFiltrada.length > 0 &&
                    React.createElement(FlatList, { data: this.dataFiltrada, contentContainerStyle: { minWidth: "100%", alignItems: "flex-start", paddingRight: 70 }, keyExtractor: function (item, index) { return item.__key; }, ListFooterComponent: function () {
                            return React.createElement(React.Fragment, null,
                                React.createElement(View, { style: { flexDirection: "row" } }, _this.cols.filter(function (a) { return !_this.colData[a.key].hidden; }).map(function (c, index) { return React.createElement(View, { style: {
                                        width: _this.colData[c.key].width
                                    } }, c.props.listFooterComponent ? c.props.listFooterComponent({ textStyle: _this.textStyle, dinamicTable: _this }) : null); })),
                                _this.props.listFooterComponent ? _this.props.listFooterComponent() : null);
                        }, renderItem: function (_a) {
                            var item = _a.item, index = _a.index;
                            return React.createElement(Row, { item: item, index: index, dinamicTableInstance: _this });
                        } }),
                React.createElement(View, { style: { flexDirection: "row" } }, this.cols.filter(function (a) { return !_this.colData[a.key].hidden; }).map(function (c, index) { return React.createElement(View, { style: {
                        width: _this.colData[c.key].width
                    } }, c.props.footerComponent ? c.props.footerComponent({ textStyle: _this.textStyle, dinamicTable: _this }) : null); }))),
            React.createElement(Popup, { ref: function (ref) { return _this.popup = ref; }, dinamicTableInstance: this }));
    };
    DinamicTable.Header = Header;
    DinamicTable.Col = Col;
    return DinamicTable;
}(React.Component));
export default DinamicTable;
