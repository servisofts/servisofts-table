import DinamicTable from "../DinamicTableSQL";
export default class Excel {
    static build(props: {
        dinamicTableInstance: DinamicTable<any>;
    }): Promise<void>;
}
