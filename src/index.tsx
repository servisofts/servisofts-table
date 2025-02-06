import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import styles from "./style";
import { colProps, rowProps } from "./types";
import SVariableSizeGrid from "./Components/SVariableSizeGrid";
import Headers from "./Headers";
import RowNumbers from "./RowNumbers";
import ToolBar from "./ToolBar";
import FloatView from "./FloatView";

type STablePropsType = {
    loadData: () => Promise<any[]>,
    cellStyle?: TextStyle
    style?: Partial<typeof styles>,
}



function STable(props: STablePropsType) {
    let style = props.style ?? {}
    Object.keys(styles).map(k => {
        styles[k] = {
            ...styles[k],
            ...(style[k] ?? {})
        }
    })
    const cellStyle: any = {
        ...styles.cell,
        ...styles.text,
        ...props.cellStyle ?? {}
    }
    const [keyInstance, setKeyInstance] = useState(new Date().getTime() + "");
    const [data, setData] = useState([]);
    const [cols, setCols] = useState<colProps[]>(new Array<colProps>(30).fill({ wpx: 100 }));
    const [rows, setRows] = useState<rowProps[]>(new Array<rowProps>(1000).fill({ hpx: cellStyle.height as number }));
    const header = useRef<Headers>();
    const numbers = useRef<RowNumbers>();



    useEffect(() => {
        props.loadData().then(e => {
            setData(e);
            setRows([...rows])
        }).catch(e => {
            console.error(e);
        })
    }, [])
    // cols[1] = { wpx: 300 }

    const width = useMemo(() => {
        return cols.reduce((acc, item) => acc + item.wpx, 0)
    }, [cols])

    const TABLE = useMemo(() => {
        return <SVariableSizeGrid
            keyInstance={keyInstance}
            cols={cols}
            rows={rows}
            width={width}
            data={data}
            cellStyle={cellStyle}
            handleScroll={(e) => {
                header.current.scrollTo({ x: e.x, y: 0 })
                numbers.current.scrollTo({ x: 0, y: e.y })
            }} />
    }, [rows, cols, data, keyInstance])


    const HandleExportExcel = () => {
        console.log(data);

    }
    const widthNumbers = styles.cellNumber.width ?? 40

    return <View style={styles.container}>
        <ToolBar cellStyle={cellStyle} />
        <View style={{ height: 4 }} ></View>

        <View style={{ width: "100%", height: 25, flexDirection: "row" }}>
            <TouchableOpacity style={[{ height: "100%", width: widthNumbers, }, cellStyle]} onPress={HandleExportExcel} />
            <Headers ref={header} cols={cols} rows={rows} width={width}
                data={data}
                cellStyle={cellStyle}
                onChangeColSize={(e) => {
                    cols[e.index] = { ...cols[e.index], wpx: e.size }
                    setKeyInstance(new Date().getTime() + "")
                    setCols([...cols])
                    console.log(e);
                }} />
        </View>
        <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
            <View style={{ height: "100%", width: widthNumbers, }}>
                <RowNumbers ref={numbers} cellStyle={cellStyle} cols={cols} rows={rows} width={width} data={data} />
            </View>
            <View style={{ height: "100%", flex: 1 }}>
                {TABLE}
            </View>
            <FloatView />
        </View>
    </View>
}



export default STable;