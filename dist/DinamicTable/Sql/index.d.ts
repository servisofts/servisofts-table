import DinamicTable from "../DinamicTable";
type DBType = "postgres" | "mysql";
export default class Sql {
    static build({ dinamicTableInstance, DBType }: {
        dinamicTableInstance: DinamicTable<any>;
        DBType: DBType;
    }): void;
    static buildWhere({ dinamicTableInstance }: {
        dinamicTableInstance: DinamicTable<any>;
    }): string;
    static buildOrder({ dinamicTableInstance }: {
        dinamicTableInstance: DinamicTable<any>;
    }): string;
}
export {};
