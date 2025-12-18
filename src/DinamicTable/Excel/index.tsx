import data from "../../Components/SDate/data";
import Col, { ColPropsType } from "../Col";
import DinamicTable from "../DinamicTable";
import xlsx, { utils, writeFile } from 'xlsx-color';

export default class Excel {
    static async build(props: { dinamicTableInstance: DinamicTable<any> }) {
        const dataFiltrada = props.dinamicTableInstance.dataFiltrada;

        const colors = props.dinamicTableInstance.colors
        // Si los datos están vacíos, no hacer nada
        if (!dataFiltrada || dataFiltrada.length === 0) {
            console.warn("No hay datos para exportar.");
            return;
        }



        // Obtener las claves del primer objeto como encabezados

        const headers = props.dinamicTableInstance.cols.filter(col => !(col.props as any as ColPropsType<any>).disableExport).map(col => col.key)
        const headersName = props.dinamicTableInstance.cols.filter(col => !(col.props as any as ColPropsType<any>).disableExport).map(col => ((col.props as any)?.label) ?? col.key)

        const dataRows = dataFiltrada.map(row =>
            headers.map(header => row[header])
        );

        // Convertir los datos a formato de hoja de cálculo
        console.log(dataFiltrada)


        let isTotal = false;
        const totalRow: any[] = headers.map((header, i) => {

            const colProps = props.dinamicTableInstance.cols.find(col => col.key == header)?.props as unknown as ColPropsType<any>;
            if (!colProps.sumExcel) return null;
            isTotal = true;
            // if (i === 0) return 'Totales'; // Columna A: texto

            const colLetter = utils.encode_col(i);
            const firstDataRow = 2; // Fila donde empiezan los datos en Excel (1-based)
            const lastDataRow = firstDataRow + dataRows.length - 1;
            return {
                f: `SUM(${colLetter}${firstDataRow}:${colLetter}${lastDataRow})`,
                s: {
                    font: { bold: true },
                    fill: {
                        fgColor: { rgb: "D9D9D9" } // mismo color de fondo
                    }
                }
            };
        });


        const sheetData = [];
        sheetData.push(headersName)
        sheetData.push(...dataRows)
        if (isTotal) {
            sheetData.push(totalRow)
        }
        // headers,
        //     totalRow,
        //     ...dataRows

        // Crear hoja de trabajo (worksheet)
        const ws = utils.aoa_to_sheet(sheetData);

        const range = xlsx.utils.decode_range(ws['!ref']);
        const tableRange = {
            s: { r: range.s.r + 1, c: range.s.c },
            e: { r: range.e.r, c: range.e.c - 1 }
        };

        const encodedr = xlsx.utils.encode_range(tableRange)
        console.log("tableRange", tableRange, encodedr)
        ws['!autofilter'] = { ref: ws["!ref"] }
        ws['!table'] = {
            headerRow: 1,
            ref: encodedr,
            style: {
                theme: 'TableStyleMedium9',
                showRowStripes: true
            }
        };
        // Definir el tamaño de las columnas
        ws["!cols"] = [];
        
        //ws["!cols"] = props.dinamicTableInstance.cols.map(col => ({ wpx: col.props.width }));

        // Aplicar estilos de color a las celdas (ejemplo: encabezado en amarillo con negrita)
        headers.forEach((header, colIndex) => {
            const cellRef = utils.encode_cell({ r: 0, c: colIndex });
            if (!ws[cellRef]) ws[cellRef] = {}; // Asegurar que la celda existe

            ws[cellRef].s = {
                fill: { fgColor: { rgb: colors.background.replace("#", "") } }, // Color amarillo
                font: { bold: true, color: { rgb: colors.text.replace("#", "") } } // Texto negro y en negrita
            };

            ws["!cols"].push({
                wpx: props.dinamicTableInstance.colData[header].width || 100,
                hidden: props.dinamicTableInstance.colData[header].hidden || false,
            });
            const col = props.dinamicTableInstance.cols.find(col => col.key == header);
            const colProps = (col.props as any as ColPropsType<any>)
            if (colProps.dateFormat) {
                for (let r = 0; r < sheetData.length; r++) {
                    const cellRef = utils.encode_cell({ r: (r + 1), c: colIndex });
                    if (!ws[cellRef]) ws[cellRef] = {}; // Asegurar que la celda existe
                    let dateFormat = colProps.dateFormat
                        .replaceAll("HH", "h:mm AM/PM")
                        .replaceAll("MONTH", "mmmm")
                        .replaceAll("MON", "mmm")
                    // if (colProps.dateFormat == "HH") {
                    //     dateFormat = "h:mm AM/PM";
                    // }
                    // if (colProps.dateFormat == "HH") {
                    //     dateFormat = "mmmm dd, yyyy";
                    // }
                    ws[cellRef].z = dateFormat;
                }
            }
            if (colProps.excelFormat) {
                for (let r = 0; r < sheetData.length; r++) {
                    const cellRef = utils.encode_cell({ r: (r + 1), c: colIndex });
                    if (!ws[cellRef]) ws[cellRef] = {}; // Asegurar que la celda existe
                    ws[cellRef].z = colProps.excelFormat;
                }
            }

            if (props.dinamicTableInstance.colData[header].wrap) {
                // Header
                // ws[cellRef].s.alignment = { wrapText: true }; 
                // Body
                for (let r = 0; r < sheetData.length; r++) {
                    const cellRef = utils.encode_cell({ r: (r + 1), c: colIndex });
                    if (!ws[cellRef]) ws[cellRef] = {}; // Asegurar que la celda existe
                    if (!ws[cellRef].s) ws[cellRef].s = {}; // Asegurar que la celda existe

                    ws[cellRef].s.alignment = { wrapText: true };
                }
            }
        });

      

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Datos Exportados");

        // Guardar el archivo Excel
        writeFile(wb, "exportado.xlsx");
    }
}
