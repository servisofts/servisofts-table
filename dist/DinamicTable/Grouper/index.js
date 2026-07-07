import SDate from "../../Components/SDate";
var Grouper = /** @class */ (function () {
    function Grouper() {
    }
    Grouper.group = function (data, groupers) {
        if (!groupers || groupers.length === 0)
            return data;
        var grouper = groupers[0];
        var groupMap = new Map();
        var groupOrder = [];
        data.forEach(function (item) {
            var value = item[grouper.key];
            var displayValue;
            if (value === null || value === undefined || value === "") {
                displayValue = "(empty)";
            }
            else if (grouper.type === "date" && value instanceof Date) {
                displayValue = grouper.dateFormat
                    ? String(new SDate(value).toString(grouper.dateFormat))
                    : value.toISOString();
            }
            else {
                displayValue = value.toString();
            }
            if (!groupMap.has(displayValue)) {
                groupMap.set(displayValue, []);
                groupOrder.push(displayValue);
            }
            groupMap.get(displayValue).push(item);
        });
        var result = [];
        groupOrder.forEach(function (groupValue) {
            var rows = groupMap.get(groupValue);
            result.push({
                __type: "group-header",
                __groupKey: grouper.key,
                __groupValue: groupValue,
                __groupRawValue: rows[0][grouper.key],
                __groupFirstRow: rows[0],
                __count: rows.length,
                __key: "__group-".concat(grouper.key, "-").concat(groupValue)
            });
            rows.forEach(function (row) { return result.push(row); });
        });
        return result;
    };
    return Grouper;
}());
export default Grouper;
