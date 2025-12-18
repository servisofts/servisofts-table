import DinamicTable from "../DinamicTable";
export default class Excel {
    static build(props: {
        dinamicTableInstance: DinamicTable<any>;
    }): Promise<void>;
}
