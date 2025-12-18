import { wheresPostgres } from "./wheres";
var Sql = /** @class */ (function () {
    function Sql() {
    }
    Sql.build = function (_a) {
        var dinamicTableInstance = _a.dinamicTableInstance, _b = _a.DBType, DBType = _b === void 0 ? "postgres" : _b;
        console.log("Construyendo SQL");
        var consultaBase = "SELECT usuario.key, usuario.nombre, usuario.apellido FROM usuario";
        var where = Sql.buildWhere({ dinamicTableInstance: dinamicTableInstance });
        var order = Sql.buildOrder({ dinamicTableInstance: dinamicTableInstance });
        var SQL = "SELECT sq1.* FROM ( ${CONTENT} ) sq1 WHERE ".concat(where, " ORDER BY ").concat(order);
        console.log(SQL);
    };
    Sql.buildWhere = function (_a) {
        var dinamicTableInstance = _a.dinamicTableInstance;
        var where = dinamicTableInstance.filtros.map(function (filtro) {
            return wheresPostgres[filtro.operator](filtro);
        }).join(" AND ");
        return where;
    };
    Sql.buildOrder = function (_a) {
        var dinamicTableInstance = _a.dinamicTableInstance;
        var order = dinamicTableInstance.sorter.map(function (sorter) {
            return "".concat(sorter.key, " ").concat(sorter.order);
        }).join(", ");
        return order;
    };
    return Sql;
}());
export default Sql;
