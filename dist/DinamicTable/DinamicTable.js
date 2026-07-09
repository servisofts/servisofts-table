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
import { FlatList, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import Col from "./Col";
import Row from "./Row";
import Popup from "./Popup";
import TopMenuOptions from "./TopMenuOptions";
import Filter from "./Filter";
import MenuFilter from "./Filter/MenuFilter";
import SFlashList from "../Components/SFlashList";
import Assets from "../Assets";
import Sorter from "./Sorter";
import MenuSorter from "./Sorter/MenuSorter";
import Grouper from "./Grouper";
import MenuGrouper from "./Grouper/MenuGrouper";
import SLanguage from "../Components/SLanguage";
import CheckHeader from "./Components/CheckHeader";
var CHECK_COL_WIDTH = 36;
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
        _this.checkHeaderRef = null;
        _this.rowSelecteds = {};
        // filtros: any[] = [];
        _this.filtros = [];
        _this.sorter = [];
        _this.groupers = [];
        _this.dataGrouped = [];
        _this.collapsedGroups = new Set();
        _this.state = {
            state: "loading",
            currentPage: 1
        };
        _this.buscador = "";
        _this.containerWidth = 0;
        _this._webBodyHeight = 0;
        _this._webHeaderHeight = 0;
        _this.colData = {};
        _this.colRef = {};
        _this._colWidthVersion = 0;
        _this._webFooterHeight = 0;
        _this._webListFooterHeight = 0;
        _this._sFlashRef = null;
        _this.rowEventListeners = {};
        _this.onContainerLayout = function (event) {
            var width = event.nativeEvent.layout.width;
            if (width !== _this.containerWidth) {
                _this.containerWidth = width;
                // Force re-render of columns to apply new widths
                _this.forceUpdate();
            }
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
                if (this.props.selectType === "check" && this.checkHeaderRef) {
                    this.checkHeaderRef.forceUpdate();
                }
                return [2 /*return*/];
            });
        });
    };
    DinamicTable.prototype.selectAll = function () {
        var _this = this;
        this.dataFiltrada.forEach(function (item) {
            _this.rowSelecteds[item.__key] = true;
        });
        this.dispatchRowEvent({ type: "onSelect", key: "__selectAll__", value: true });
        if (this.props.onSelectionChange)
            this.props.onSelectionChange(this.getSelectedRows());
    };
    DinamicTable.prototype.getSelectedRows = function () {
        var _this = this;
        return this.dataFiltrada
            .filter(function (item) { return _this.rowSelecteds[item.__key]; })
            .map(function (item) { return item.__original; });
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
        if (this.props.onSelectionChange)
            this.props.onSelectionChange(this.getSelectedRows());
    };
    DinamicTable.prototype.clearSelect = function () {
        var _this = this;
        Object.keys(this.rowSelecteds).forEach(function (key) {
            _this.rowSelecteds[key] = false;
            _this.dispatchRowEvent({ type: "onSelect", key: key, value: false });
        });
        this.rowSelecteds = {};
        if (this.props.onSelectionChange)
            this.props.onSelectionChange([]);
    };
    DinamicTable.prototype.changePage = function (page) {
        if (!this.props.pageLimit)
            return;
        var totalPages = this.getTotalPages();
        if (page < 1 || page > totalPages)
            return;
        this.setState({ currentPage: page });
    };
    DinamicTable.prototype.getVisibleData = function () {
        if (this.collapsedGroups.size === 0)
            return this.dataGrouped;
        var result = [];
        var collapsed = false;
        for (var _i = 0, _a = this.dataGrouped; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.__type === "group-header") {
                collapsed = this.collapsedGroups.has(item.__key);
                result.push(item);
            }
            else if (!collapsed) {
                result.push(item);
            }
        }
        return result;
    };
    DinamicTable.prototype.toggleGroup = function (groupKey) {
        if (this.collapsedGroups.has(groupKey)) {
            this.collapsedGroups["delete"](groupKey);
        }
        else {
            this.collapsedGroups.add(groupKey);
        }
        this.forceUpdate();
    };
    DinamicTable.prototype.getTotalPages = function () {
        if (!this.props.pageLimit)
            return 1;
        return Math.ceil(this.getVisibleData().length / this.props.pageLimit);
    };
    DinamicTable.prototype.getPaginatedData = function () {
        var visibleData = this.getVisibleData();
        if (!this.props.pageLimit)
            return visibleData;
        var startIndex = (this.state.currentPage - 1) * this.props.pageLimit;
        var endIndex = startIndex + this.props.pageLimit;
        return visibleData.slice(startIndex, endIndex);
    };
    DinamicTable.prototype.getAdjustedColumnWidth = function (colKey) {
        var _this = this;
        // Only adjust column width if the feature is enabled
        if (!this.props.adjustColumnWidth) {
            return this.colData[colKey].width;
        }
        var visibleCols = this.cols.filter(function (a) { return !_this.colData[a.key].hidden; });
        var totalOriginalWidth = visibleCols.reduce(function (sum, col) { return sum + _this.colData[col.key].width; }, 0);
        // Calculate available width considering padding and check column
        var padding = this.props.padding || 0;
        var checkColOffset = this.props.selectType === "check" ? CHECK_COL_WIDTH : 0;
        var availableWidth = this.containerWidth - (padding * 2) - checkColOffset;
        if (totalOriginalWidth >= availableWidth || availableWidth <= 0) {
            // Use original width when total width exceeds available space or no space available
            return this.colData[colKey].width;
        }
        // Distribute extra space proportionally among visible columns.
        // Use fractional parts to distribute any leftover pixels so total sums to availableWidth.
        var extraSpace = availableWidth - totalOriginalWidth;
        var targets = visibleCols.map(function (col) {
            var original = _this.colData[col.key].width || 0;
            var proportionalExtra = (original / totalOriginalWidth) * extraSpace;
            var exact = original + proportionalExtra;
            var floored = Math.floor(exact);
            var frac = exact - floored;
            return { key: String(col.key), original: original, exact: exact, floored: floored, frac: frac };
        });
        var sumFloored = targets.reduce(function (s, t) { return s + t.floored; }, 0);
        // remainder pixels to distribute
        var remainder = Math.round(availableWidth - sumFloored);
        if (remainder < 0)
            remainder = 0;
        // distribute remaining pixels to columns with largest fractional parts
        targets.sort(function (a, b) { return b.frac - a.frac; });
        var idx = 0;
        while (remainder > 0 && targets.length > 0) {
            targets[idx % targets.length].floored += 1;
            remainder -= 1;
            idx += 1;
        }
        var found = targets.find(function (t) { return t.key === String(colKey); });
        return found ? found.floored : (this.colData[colKey].width || 0);
    };
    DinamicTable.prototype.getTotalColumnsWidth = function () {
        var _this = this;
        var visibleCols = this.cols.filter(function (a) { return !_this.colData[a.key].hidden; });
        var colsWidth = visibleCols.reduce(function (sum, col) { var _a, _b; return sum + ((_b = (_a = _this.colData[col.key]) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0); }, 0);
        return colsWidth + (this.props.selectType === "check" ? CHECK_COL_WIDTH : 0);
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
                        console.error(error_1);
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
                                data = Array.isArray(data) ? data : data + "";
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
                switch (_a.label) {
                    case 0:
                        this.dataFiltrada = Sorter.sort(this.dataFiltrada, this.sorter);
                        return [4 /*yield*/, this.applyGroup()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DinamicTable.prototype.applyGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.dataGrouped = Grouper.group(this.dataFiltrada, this.groupers);
                this.forceUpdate();
                return [2 /*return*/];
            });
        });
    };
    DinamicTable.prototype.getExportState = function () {
        return {
            filters: this.filtros,
            sorters: this.sorter,
            cols: this.colData,
            groupers: this.groupers
        };
    };
    DinamicTable.prototype.setExportState = function (state) {
        var _this = this;
        var _a, _b, _c;
        this.filtros = (_a = state.filters) !== null && _a !== void 0 ? _a : [];
        this.sorter = (_b = state.sorters) !== null && _b !== void 0 ? _b : [];
        this.groupers = (_c = state.groupers) !== null && _c !== void 0 ? _c : [];
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
    DinamicTable.prototype.addRow = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.data.push(data);
                        this.data.splice(0, 0, data);
                        return [4 /*yield*/, this.applyFormatData()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.applyFilter()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DinamicTable.prototype.renderCantidadResultados = function () {
        return React.createElement(Text, { style: { color: this.colors.text, fontSize: 12 } }, "Resultados: " + this.dataFiltrada.length + " de " + this.dataFormat.length);
    };
    DinamicTable.prototype.renderHeaderGroups = function () {
        var _this = this;
        var groups = this.props.headerGroups;
        if (!groups || groups.length === 0)
            return null;
        var visibleCols = this.cols.filter(function (a) { return !_this.colData[a.key].hidden; });
        var keyToGroupIndex = {};
        groups.forEach(function (g, gi) { return g.cols.forEach(function (k) { keyToGroupIndex[k] = gi; }); });
        var runs = [];
        var i = 0;
        while (i < visibleCols.length) {
            var colKey = String(visibleCols[i].key);
            var gi = keyToGroupIndex[colKey];
            if (gi === undefined) {
                runs.push({ refKey: colKey, width: this.getAdjustedColumnWidth(colKey) });
                i++;
                continue;
            }
            var width = 0;
            var j = i;
            while (j < visibleCols.length && keyToGroupIndex[String(visibleCols[j].key)] === gi) {
                width += this.getAdjustedColumnWidth(String(visibleCols[j].key));
                j++;
            }
            runs.push({ refKey: "group-".concat(gi, "-").concat(colKey), label: groups[gi].label, width: width, style: groups[gi].style, textStyle: groups[gi].textStyle });
            i = j;
        }
        return (React.createElement(View, { style: { flexDirection: "row" } },
            this.props.selectType === "check" && React.createElement(View, { style: { width: CHECK_COL_WIDTH } }),
            runs.map(function (r) { return (React.createElement(View, { key: r.refKey, style: [{
                        width: r.width,
                        height: 28,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: r.label ? 0.5 : 0,
                        borderColor: _this.colors.border,
                        backgroundColor: r.label ? _this.colors.header : "transparent"
                    }, r.style] }, r.label ? (React.createElement(Text, { numberOfLines: 1, style: [{ color: _this.colors.text, fontWeight: "bold", fontSize: 11 }, _this.props.textStyle, r.textStyle] }, r.label)) : null)); })));
    };
    DinamicTable.prototype.renderColumnHeaders = function () {
        var _this = this;
        return (React.createElement(View, { style: { flexDirection: "row" } },
            this.props.selectType === "check" && (React.createElement(CheckHeader, { ref: function (ref) { return _this.checkHeaderRef = ref; }, width: CHECK_COL_WIDTH, dinamicTableInstance: this })),
            this.cols.filter(function (a) { return !_this.colData[a.key].hidden; }).map(function (c) {
                var _a;
                var cKey = c.key;
                return React.cloneElement(c, __assign(__assign({ key: cKey, id: cKey, dinamicTableInstance: _this, headerStyle: _this.props.headerStyle ? __assign(__assign({}, _this.props.headerStyle), ((_a = c.props.headerStyle) !== null && _a !== void 0 ? _a : {})) : {} }, _this.props.headerTextStyle ? { textStyle: _this.props.headerTextStyle } : {}), { ref: function (ref) { return _this.colRef[cKey] = ref; } }));
            })));
    };
    DinamicTable.prototype.renderColumnFooters = function () {
        var _this = this;
        return (React.createElement(View, { style: { flexDirection: "row" } },
            this.props.selectType === "check" && React.createElement(View, { style: { width: CHECK_COL_WIDTH } }),
            this.cols.filter(function (a) { return !_this.colData[a.key].hidden; }).map(function (c) { return (React.createElement(View, { key: String(c.key), style: { width: _this.getAdjustedColumnWidth(String(c.key)) } }, c.props.footerComponent
                ? c.props.footerComponent({ textStyle: _this.textStyle, dinamicTable: _this })
                : null)); })));
    };
    DinamicTable.prototype.renderListItem = function (item, index) {
        var _this = this;
        var _a, _b;
        if (item.__type === "group-header") {
            var col = this.cols.find(function (a) { return a.key == item.__groupKey; });
            var label = (_b = (_a = col === null || col === void 0 ? void 0 : col.props) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : item.__groupKey;
            var colProps = col === null || col === void 0 ? void 0 : col.props;
            var colData = this.colData[item.__groupKey];
            var rawValue = item.__groupRawValue;
            var firstRow = item.__groupFirstRow;
            var valueNode = void 0;
            if (colProps === null || colProps === void 0 ? void 0 : colProps.customComponent) {
                valueNode = colProps.customComponent({
                    data: rawValue, dataFormat: rawValue,
                    row: firstRow === null || firstRow === void 0 ? void 0 : firstRow.__original, index: 0,
                    textStyle: __assign(__assign({}, this.textStyle), { fontWeight: "bold", fontSize: 12 }),
                    dinamicTable: this,
                    colData: colData
                });
            }
            else if (colProps === null || colProps === void 0 ? void 0 : colProps.format) {
                var formatted = colProps.format({
                    data: rawValue, row: firstRow === null || firstRow === void 0 ? void 0 : firstRow.__original, index: 0,
                    textStyle: __assign(__assign({}, this.textStyle), { fontWeight: "bold", fontSize: 12 })
                });
                valueNode = React.createElement(Text, { style: [this.textStyle, { fontWeight: "bold", fontSize: 12, flex: 1 }], numberOfLines: 1 }, formatted);
            }
            else {
                valueNode = React.createElement(Text, { style: [this.textStyle, { fontWeight: "bold", fontSize: 12, flex: 1 }], numberOfLines: 1 }, item.__groupValue);
            }
            var isCollapsed = this.collapsedGroups.has(item.__key);
            return (React.createElement(TouchableOpacity, { onPress: function () { return _this.toggleGroup(item.__key); }, activeOpacity: 0.7, style: { width: "100%", marginTop: 12 } },
                React.createElement(View, { style: { flexDirection: "row", alignItems: "center", paddingHorizontal: 4, paddingBottom: 4 } },
                    React.createElement(Text, { style: [this.textStyle, { fontSize: 10, opacity: 0.7, marginRight: 6, width: 10 }] }, isCollapsed ? "▶" : "▾"),
                    React.createElement(Text, { style: [this.textStyle, { fontSize: 10, opacity: 0.5, marginRight: 4 }] }, label),
                    React.createElement(View, { style: { flex: 1 }, pointerEvents: "none" }, valueNode),
                    React.createElement(View, { style: { backgroundColor: this.colors.accent + "30", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 1, marginLeft: 8, alignItems: "center" } },
                        React.createElement(Text, { style: [this.textStyle, { fontSize: 9, opacity: 0.8 }] }, item.__count))),
                React.createElement(View, { style: { height: 1, backgroundColor: this.colors.accent + "40", marginBottom: 1 } })));
        }
        return React.createElement(Row, { key: "row" + index, item: item, index: index, dinamicTableInstance: this, colWidthVersion: this._colWidthVersion });
    };
    DinamicTable.prototype.renderStates = function () {
        if (this.state.state === "loading") {
            return this.props.renderLoading
                ? this.props.renderLoading({ dinamicTable: this })
                : React.createElement(View, { style: { width: "100%", padding: 8 } },
                    React.createElement(Text, { style: this.textStyle }, SLanguage.select({ en: "Loading data... please wait.", es: "Cargando datos... por favor espera." })));
        }
        if (this.state.state === "error") {
            return this.props.renderError
                ? this.props.renderError({ error: this.state.error, dinamicTable: this })
                : React.createElement(View, { style: { width: "100%", padding: 8 } },
                    React.createElement(Text, { style: this.textStyle }, SLanguage.select({ en: "An error occurred while loading data.", es: "Ocurrió un error al cargar los datos." })),
                    React.createElement(Text, { style: this.textStyle }, JSON.stringify(this.state.error)));
        }
        if (this.state.state === "ready" && this.dataFiltrada.length <= 0) {
            return this.props.renderNoResults
                ? this.props.renderNoResults({ dinamicTable: this })
                : React.createElement(View, { style: { width: "100%", padding: 8 } },
                    React.createElement(Text, { style: this.textStyle }, SLanguage.select({ es: "No se encontraron resultados.", en: "No results found." })));
        }
        return null;
    };
    DinamicTable.prototype.renderWebLayout = function (contentMinWidth) {
        var _this = this;
        var ROW_HEIGHT = 30;
        var GROUP_HEADER_HEIGHT = 48;
        var paginatedData = this.getPaginatedData();
        var hasData = this.state.state === "ready" && paginatedData.length > 0;
        var hasColFooters = this.cols.some(function (c) { return !!c.props.footerComponent; });
        var hasListFooter = !!this.props.listFooterComponent;
        // listFooterComponent is appended as the last virtual item so it appears
        // immediately after the last data row (not anchored to the container bottom).
        var webData = (hasData && hasListFooter)
            ? __spreadArray(__spreadArray([], paginatedData, true), [{ __type: "list-footer", __key: "__list-footer__" }], false) : paginatedData;
        if (!hasColFooters && this._webFooterHeight !== 0)
            this._webFooterHeight = 0;
        // listHeight is measured explicitly to avoid Yoga / CSS overflow interaction issues.
        // Only column footers (hasColFooters) are fixed outside the list; listFooterComponent
        // scrolls with the data as the last virtual item.
        var listHeight = Math.max(0, this._webBodyHeight - this._webHeaderHeight - this._webFooterHeight);
        return (React.createElement(View, { style: { flex: 1 }, onLayout: function (e) {
                var h = e.nativeEvent.layout.height;
                if (h !== _this._webBodyHeight) {
                    _this._webBodyHeight = h;
                    _this.forceUpdate();
                }
            } },
            React.createElement(View, { style: { height: this._webBodyHeight, overflowX: "auto", overflowY: "hidden" } },
                React.createElement(View, { style: { minWidth: contentMinWidth, height: this._webBodyHeight, flexDirection: "column" } },
                    React.createElement(View, { onLayout: function (e) {
                            var h = e.nativeEvent.layout.height;
                            if (h !== _this._webHeaderHeight) {
                                _this._webHeaderHeight = h;
                                _this.forceUpdate();
                            }
                        } },
                        this.renderHeaderGroups(),
                        this.renderColumnHeaders()),
                    this.renderStates(),
                    hasData && listHeight > 0 && (React.createElement(View, { style: { height: listHeight } },
                        React.createElement(SFlashList, { ref: function (ref) { _this._sFlashRef = ref; }, estimatedItemSize: ROW_HEIGHT, getItemSize: function (index) {
                                var item = webData[index];
                                if ((item === null || item === void 0 ? void 0 : item.__type) === "list-footer")
                                    return _this._webListFooterHeight || 30;
                                return (item === null || item === void 0 ? void 0 : item.__type) === "group-header" ? GROUP_HEADER_HEIGHT : ROW_HEIGHT;
                            }, data: webData, renderItem: function (_a) {
                                var item = _a.item, index = _a.index;
                                if (item.__type === "list-footer") {
                                    return (React.createElement(View, { onLayout: function (e) {
                                            var _a;
                                            var h = e.nativeEvent.layout.height;
                                            if (h !== _this._webListFooterHeight) {
                                                _this._webListFooterHeight = h;
                                                (_a = _this._sFlashRef) === null || _a === void 0 ? void 0 : _a.resetAfterIndex(index, false);
                                            }
                                        } }, _this.props.listFooterComponent()));
                                }
                                return _this.renderListItem(item, index);
                            } }))),
                    hasColFooters && (React.createElement(View, { onLayout: function (e) {
                            var h = e.nativeEvent.layout.height;
                            if (h !== _this._webFooterHeight) {
                                _this._webFooterHeight = h;
                                _this.forceUpdate();
                            }
                        } }, this.renderColumnFooters()))))));
    };
    DinamicTable.prototype.renderMobileLayout = function (contentMinWidth, columnsCanExpand) {
        var _this = this;
        return (React.createElement(ScrollView, { horizontal: true, scrollEnabled: !columnsCanExpand, showsHorizontalScrollIndicator: !columnsCanExpand, style: { flex: 1, width: "100%" }, contentContainerStyle: {
                flexDirection: "column",
                minWidth: contentMinWidth,
                padding: this.props.padding,
                paddingTop: 0,
                paddingBottom: 0
            } },
            this.renderHeaderGroups(),
            this.renderColumnHeaders(),
            this.renderStates(),
            this.state.state === "ready" && this.dataFiltrada.length > 0 &&
                React.createElement(FlatList, { data: this.getPaginatedData(), contentContainerStyle: { minWidth: "100%", alignItems: "flex-start", paddingRight: 70 }, keyExtractor: function (item) { return item.__key; }, ListFooterComponent: function () { return (React.createElement(React.Fragment, null,
                        React.createElement(View, { style: { flexDirection: "row" } },
                            _this.props.selectType === "check" && React.createElement(View, { style: { width: CHECK_COL_WIDTH } }),
                            _this.cols.filter(function (a) { return !_this.colData[a.key].hidden; }).map(function (c) { return (React.createElement(View, { key: String(c.key), style: { width: _this.getAdjustedColumnWidth(String(c.key)) } }, c.props.listFooterComponent
                                ? c.props.listFooterComponent({ textStyle: _this.textStyle, dinamicTable: _this })
                                : null)); })),
                        _this.props.listFooterComponent ? _this.props.listFooterComponent() : null)); }, renderItem: function (_a) {
                        var item = _a.item, index = _a.index;
                        return _this.renderListItem(item, index);
                    } }),
            this.renderColumnFooters()));
    };
    DinamicTable.prototype.render = function () {
        var _this = this;
        var _a, _b;
        if (this.props.onEvent) {
            this.props.onEvent({ evt: "render" });
        }
        var size = (_a = this.props.iconSize) !== null && _a !== void 0 ? _a : 22;
        var padding = this.props.padding || 0;
        var availableWidth = this.containerWidth - (padding * 2);
        var totalOriginalWidth = this.getTotalColumnsWidth();
        var columnsCanExpand = !!(this.props.adjustColumnWidth &&
            totalOriginalWidth < availableWidth &&
            availableWidth > 0);
        var contentMinWidth = columnsCanExpand ? "100%" : totalOriginalWidth;
        return (React.createElement(View, { style: { flex: 1, width: "100%" }, ref: function (ref) { return _this.containerRef = ref; }, onLayout: this.onContainerLayout },
            React.createElement(View, { style: {
                    flexDirection: "row", alignItems: "center", flexWrap: "wrap",
                    padding: (_b = this.props.padding) !== null && _b !== void 0 ? _b : 0, paddingBottom: 0, paddingTop: 0,
                    // @ts-ignore
                    gap: 4
                } },
                !this.props.hiddenMenu && React.createElement(React.Fragment, null,
                    React.createElement(TopMenuOptions, { dinamicTableInstance: this }),
                    React.createElement(View, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" } },
                        React.createElement(TextInput, { placeholderTextColor: this.colors.card, style: [this.inputStyle, { height: size, paddingStart: 26 }], placeholder: "Search...", onChangeText: function (e) { _this.buscador = e; _this.applyFilter(); } }),
                        React.createElement(View, { style: { width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8 } },
                            React.createElement(Assets.Search, { fill: this.colors.accent }))),
                    this.renderCantidadResultados()),
                React.createElement(MenuSorter, { dinamicTableInstance: this }),
                React.createElement(MenuFilter, { dinamicTableInstance: this }),
                React.createElement(MenuGrouper, { dinamicTableInstance: this }),
                this.props.renderHeaderActions && this.props.renderHeaderActions({ dinamicTable: this })),
            React.createElement(View, { style: { height: 4 } }),
            Platform.OS === "web"
                ? this.renderWebLayout(contentMinWidth)
                : this.renderMobileLayout(contentMinWidth, columnsCanExpand),
            React.createElement(Popup, { ref: function (ref) { return _this.popup = ref; }, dinamicTableInstance: this })));
    };
    DinamicTable.Header = Header;
    DinamicTable.Col = Col;
    return DinamicTable;
}(React.Component));
export default DinamicTable;
