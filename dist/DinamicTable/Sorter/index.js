import SDate from "../../Components/SDate";
var Sorter = /** @class */ (function () {
    function Sorter() {
    }
    Sorter.sort = function (data, sorterArray) {
        var ftdata = data.sort(function (a, b) {
            for (var _i = 0, sorterArray_1 = sorterArray; _i < sorterArray_1.length; _i++) {
                var sorter = sorterArray_1[_i];
                var key = sorter.key, order = sorter.order, type = sorter.type;
                var valueA = a[key];
                var valueB = b[key];
                var compareResult = 0;
                if (valueA === null && valueB === null)
                    return 0;
                if (valueA === null)
                    return order === 'asc' ? -1 : 1;
                if (valueB === null)
                    return order === 'asc' ? 1 : -1;
                switch (type) {
                    case 'number':
                        compareResult = valueA - valueB;
                        break;
                    case 'string':
                        compareResult = String(valueA).localeCompare(String(valueB));
                        break;
                    case 'boolean':
                        compareResult = Number(valueA) - Number(valueB);
                        break;
                    case 'date':
                    case 'datetime':
                        if (sorter.dateFormat) {
                            console.log("Asdasdas");
                            var a1 = new SDate(valueA);
                            var a2 = a1.toString(sorter.dateFormat);
                            var a3 = new SDate(a2, sorter.dateFormat);
                            valueA = a3;
                            valueB = new SDate((new SDate(valueB).toString(sorter.dateFormat)), sorter.dateFormat);
                        }
                        compareResult = valueA.getTime() - valueB.getTime();
                        break;
                    case 'time':
                        // Only the hour/minute of day matter, the date part is irrelevant.
                        compareResult = (valueA.getHours() * 60 + valueA.getMinutes()) - (valueB.getHours() * 60 + valueB.getMinutes());
                        break;
                    default:
                        break;
                }
                if (compareResult !== 0) {
                    return order === 'asc' ? compareResult : -compareResult;
                }
            }
            // const valA = a[sorter.key] ?? null;
            // const valB = b[sorter.key] ?? null;
            // if (valA === null && valB === null) return 0;
            // if (valA === null) return sorter.order === "asc" ? 1 : -1;
            // if (valB === null) return sorter.order === "asc" ? -1 : 1;
            // if (valA > valB) return sorter.order === "asc" ? 1 : -1;
            // if (valA < valB) return sorter.order === "asc" ? -1 : 1;
            return 0;
        });
        return ftdata;
    };
    return Sorter;
}());
export default Sorter;
