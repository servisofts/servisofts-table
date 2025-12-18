import DinamicTable from "../DinamicTable";
import { wheresPostgres } from "./wheres";

type DBType = "postgres" | "mysql"
export default class Sql {

    static build({ dinamicTableInstance, DBType = "postgres" }: { dinamicTableInstance: DinamicTable<any>, DBType: DBType }) {
        console.log("Construyendo SQL");
        const consultaBase = `SELECT usuario.key, usuario.nombre, usuario.apellido FROM usuario`;

        const where = Sql.buildWhere({ dinamicTableInstance });

        const order = Sql.buildOrder({ dinamicTableInstance });

        const SQL = `SELECT sq1.* FROM ( \${CONTENT} ) sq1 WHERE ${where} ORDER BY ${order}`;

        console.log(SQL);
    }

    static buildWhere({ dinamicTableInstance }: { dinamicTableInstance: DinamicTable<any> }) {
        const where = dinamicTableInstance.filtros.map((filtro) => {
            return wheresPostgres[filtro.operator](filtro)
        }).join(" AND ");
        return where;
    }

    static buildOrder({ dinamicTableInstance }: { dinamicTableInstance: DinamicTable<any> }) {
        const order = dinamicTableInstance.sorter.map((sorter) => {
            return `${sorter.key} ${sorter.order}`
        }).join(", ");
        return order;
    }

}