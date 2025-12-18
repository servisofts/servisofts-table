/// <reference types="react" />
import { TextStyle } from "react-native";
import styles from "./style";
type STablePropsType = {
    loadData: () => Promise<any[]>;
    cellStyle?: TextStyle;
    style?: Partial<typeof styles>;
};
declare function STable(props: STablePropsType): JSX.Element;
export default STable;
