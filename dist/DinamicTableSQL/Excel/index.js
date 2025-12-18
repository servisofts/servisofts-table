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
import { utils, writeFile } from 'xlsx-color';
var Excel = /** @class */ (function () {
    function Excel() {
    }
    Excel.build = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var dataFiltrada, colors, headers, dataRows, totalRow, sheetData, ws, wb;
            return __generator(this, function (_a) {
                dataFiltrada = props.dinamicTableInstance.dataFiltrada;
                colors = props.dinamicTableInstance.colors;
                // Si los datos están vacíos, no hacer nada
                if (!dataFiltrada || dataFiltrada.length === 0) {
                    console.warn("No hay datos para exportar.");
                    return [2 /*return*/];
                }
                headers = props.dinamicTableInstance.cols.filter(function (col) { return !col.props.disableExport; }).map(function (col) { return col.key; });
                dataRows = dataFiltrada.map(function (row) {
                    return headers.map(function (header) { return row[header]; });
                });
                // Convertir los datos a formato de hoja de cálculo
                console.log(dataFiltrada);
                totalRow = headers.map(function (header, i) {
                    var _a;
                    var colProps = (_a = props.dinamicTableInstance.cols.find(function (col) { return col.key == header; })) === null || _a === void 0 ? void 0 : _a.props;
                    if (!colProps.sumExcel)
                        return null;
                    // if (i === 0) return 'Totales'; // Columna A: texto
                    var colLetter = utils.encode_col(i);
                    var firstDataRow = 3; // Fila donde empiezan los datos en Excel (1-based)
                    var lastDataRow = firstDataRow + dataRows.length - 1;
                    return {
                        f: "SUM(".concat(colLetter).concat(firstDataRow, ":").concat(colLetter).concat(lastDataRow, ")"),
                        s: {
                            font: { bold: true },
                            fill: {
                                fgColor: { rgb: "D9D9D9" } // mismo color de fondo
                            }
                        }
                    };
                });
                sheetData = __spreadArray([headers,
                    totalRow], dataRows, true);
                ws = utils.aoa_to_sheet(sheetData);
                // Definir el tamaño de las columnas
                ws["!cols"] = [];
                //ws["!cols"] = props.dinamicTableInstance.cols.map(col => ({ wpx: col.props.width }));
                // Aplicar estilos de color a las celdas (ejemplo: encabezado en amarillo con negrita)
                headers.forEach(function (header, colIndex) {
                    var cellRef = utils.encode_cell({ r: 0, c: colIndex });
                    if (!ws[cellRef])
                        ws[cellRef] = {}; // Asegurar que la celda existe
                    ws[cellRef].s = {
                        fill: { fgColor: { rgb: colors.background.replace("#", "") } },
                        font: { bold: true, color: { rgb: colors.text.replace("#", "") } } // Texto negro y en negrita
                    };
                    ws["!cols"].push({
                        wpx: props.dinamicTableInstance.colData[header].width || 100,
                        hidden: props.dinamicTableInstance.colData[header].hidden || false
                    });
                    var col = props.dinamicTableInstance.cols.find(function (col) { return col.key == header; });
                    var colProps = col.props;
                    if (colProps.dateFormat) {
                        for (var r = 0; r < sheetData.length; r++) {
                            var cellRef_1 = utils.encode_cell({ r: (r + 1), c: colIndex });
                            if (!ws[cellRef_1])
                                ws[cellRef_1] = {}; // Asegurar que la celda existe
                            var dateFormat = colProps.dateFormat
                                .replaceAll("HH", "h:mm AM/PM")
                                .replaceAll("MONTH", "mmmm")
                                .replaceAll("MON", "mmm");
                            // if (colProps.dateFormat == "HH") {
                            //     dateFormat = "h:mm AM/PM";
                            // }
                            // if (colProps.dateFormat == "HH") {
                            //     dateFormat = "mmmm dd, yyyy";
                            // }
                            ws[cellRef_1].z = dateFormat;
                        }
                    }
                    if (colProps.excelFormat) {
                        for (var r = 0; r < sheetData.length; r++) {
                            var cellRef_2 = utils.encode_cell({ r: (r + 1), c: colIndex });
                            if (!ws[cellRef_2])
                                ws[cellRef_2] = {}; // Asegurar que la celda existe
                            ws[cellRef_2].z = colProps.excelFormat;
                        }
                    }
                    if (props.dinamicTableInstance.colData[header].wrap) {
                        // Header
                        // ws[cellRef].s.alignment = { wrapText: true }; 
                        // Body
                        for (var r = 0; r < sheetData.length; r++) {
                            var cellRef_3 = utils.encode_cell({ r: (r + 1), c: colIndex });
                            if (!ws[cellRef_3])
                                ws[cellRef_3] = {}; // Asegurar que la celda existe
                            if (!ws[cellRef_3].s)
                                ws[cellRef_3].s = {}; // Asegurar que la celda existe
                            ws[cellRef_3].s.alignment = { wrapText: true };
                        }
                    }
                });
                wb = utils.book_new();
                utils.book_append_sheet(wb, ws, "Datos Exportados");
                // Guardar el archivo Excel
                writeFile(wb, "exportado.xlsx");
                return [2 /*return*/];
            });
        });
    };
    return Excel;
}());
export default Excel;
