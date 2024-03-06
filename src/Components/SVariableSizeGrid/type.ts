import { TextStyle, ViewStyle } from "react-native"
import { TableProps } from "../../types"

export type SVariableSizeGridType = {
    keyInstance: string,
    cellStyle?: TextStyle,
    scrollWidth?: number
} & TableProps 