/// <reference types="react" />
import { TextStyle } from "react-native";
type STablePropsType = {
    loadData: Promise<any>;
    cellStyle: TextStyle;
};
declare function STable(props: STablePropsType): JSX.Element;
export default STable;
