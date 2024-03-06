import { TextStyle } from "react-native"

export interface rowProps {
    hpx: number,
}
export interface colProps {
    wpx: number
}


export interface TableProps {
    rows: rowProps[],
    cols: colProps[],
    data: any[][],
    width: number,
    handleScroll?: (evt: { x: number, y: number }) => void,
    cellStyle:TextStyle
}