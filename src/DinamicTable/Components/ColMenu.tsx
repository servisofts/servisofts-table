import React, { useEffect } from "react";
import { Animated, FlatList, PanResponder, ScrollView, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, } from "react-native";
import DinamicTable, { CellStyle } from "../DinamicTable";
import { DataType } from "..";
import Select from "../../Components/Select";
import Filter, { FilterType, OPERATORS } from "../Filter";
import Col from "../Col";
import CheckBox from "../../Components/CheckBox";
import Assets from "../../Assets";
import SDate from "../../Components/SDate";
import Btn from "../../Components/Btn";
import DatePickerCalendar from "../../Components/DatePickerCalendar";
import SLanguage from "../../Components/SLanguage";

export const OPERADORES = {
    string: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.NO_CONTAINS, label: { en: "No Contains", es: "No Contiene" }, params: 1 },
        { value: OPERATORS.STARTS_WITH, label: { en: "Starts with", es: "Empieza con" }, params: 1 },
        { value: OPERATORS.ENDS_WITH, label: { en: "Ends with", es: "Termina con" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    number: [
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.CONTAINS, label: { en: "Contains", es: "Contiene" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    boolean: [
        { value: OPERATORS.IS_TRUE, label: { en: "Is true", es: "Es verdadero" }, params: 0 },
        { value: OPERATORS.IS_FALSE, label: { en: "Is false", es: "Es falso" }, params: 0 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    date: [
        { value: OPERATORS.BETWEEN, label: { en: "Between", es: "Entre" }, params: 2 },
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    time: [
        { value: OPERATORS.BETWEEN, label: { en: "Between", es: "Entre" }, params: 2 },
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
    datetime: [
        { value: OPERATORS.BETWEEN, label: { en: "Between", es: "Entre" }, params: 2 },
        { value: OPERATORS.EQUAL, label: { en: "Equal to", es: "Igual a" }, params: 1 },
        { value: OPERATORS.NOT_EQUAL, label: { en: "Not equal to", es: "No igual a" }, params: 1 },
        { value: OPERATORS.LESS_THAN, label: { en: "Less than", es: "Menor que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN, label: { en: "Greater than", es: "Mayor que" }, params: 1 },
        { value: OPERATORS.LESS_THAN_OR_EQUAL, label: { en: "Less than or equal to", es: "Menor o igual que" }, params: 1 },
        { value: OPERATORS.GREATER_THAN_OR_EQUAL, label: { en: "Greater than or equal to", es: "Mayor o igual que" }, params: 1 },
        { value: OPERATORS.IS_NULL, label: { en: "Is null", es: "Es nulo" }, params: 0 },
        { value: OPERATORS.IS_NOT_NULL, label: { en: "Is not null", es: "No es nulo" }, params: 0 },
    ],
}


const ColMenu = (props: { col: Col<any> }) => {

    const filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(e => e.col == props.col.props.id)
    let filtro = null;
    if (filtroI >= 0) {
        filtro = props.col.props.dinamicTableInstance.filtros[filtroI]
        // setSearch({ ...filtro })
    }

    const [list, setList] = React.useState([] as any[])
    const [counts, setCounts] = React.useState<{ [key: string]: number }>({})
    const [state, setState] = React.useState({
        dateSelec: null
    })
    const [search, setSearch] = React.useState({
        col: props.col.props.id,
        type: props.col.props.dataType,
        operator: "contains",
        dateFormat: props.col.props.dateFormat,
        value: [],
        ...filtro
    } as FilterType)
    const commitFilter = (newSearch: FilterType) => {
        setSearch(newSearch)
        const instance = props.col.props.dinamicTableInstance;
        const OP = OPERADORES[props.col.props.dataType].find(e => e.value == newSearch.operator);
        const filtroI = instance.filtros.findIndex(e => e.col == props.col.props.id)
        if (newSearch.value.length > 0 || (OP?.params ?? 1) <= 0) {
            if (filtroI >= 0) {
                instance.filtros[filtroI] = newSearch
            } else {
                instance.filtros.push(newSearch)
            }
        } else if (filtroI >= 0) {
            instance.filtros.splice(filtroI, 1)
        }
        instance.applyFilter()
    }

    // What the filter picker groups by: day/time/full-timestamp for date-ish
    // columns (ignoring the column's own display dateFormat), the raw value otherwise.
    const groupValue = (raw: any) => {
        if (!raw) return raw;
        if (props.col.props.dataType == "date") return String(new SDate(raw).toString("yyyy-MM-dd"));
        if (props.col.props.dataType == "time") return String(new SDate(raw).toString("hh:mm:ss"));
        if (props.col.props.dataType == "datetime") return String(new SDate(raw).toString(props.col.props.dateFormat ?? "yyyy-MM-dd hh:mm:ss"));
        return raw;
    }
    // const searchRef = React.useRef(search);

    // useEffect(() => {
    //     searchRef.current = search;
    // }, [search])

    useEffect(() => {


        const formatData = async () => {
            let maxIndex = props.col.props.dinamicTableInstance.filtros.length;
            if (filtroI >= 0) {
                maxIndex = filtroI;
            }
            let dataFormat = props.col.props.dinamicTableInstance.dataFormat;
            let dataFilter: any = await Filter.filterData(dataFormat, props.col.props.dinamicTableInstance.filtros.slice(0, maxIndex))
            const rows = [];
            const sortKeys: string[] = [];
            const rowCounts: { [key: string]: number } = {};
            const groups = dataFilter.reduce((acc, row, index) => {
                const rawValue = row[props.col.props.id];
                if (!rawValue) return acc;
                const value = groupValue(rawValue);
                if (Array.isArray(value)) {
                    // Array-valued columns (eg. tags/tipos) can't be represented by a
                    // single row: a row with several values would otherwise render ALL
                    // its values every time any one of them is newly discovered. Push a
                    // lightweight marker for just this single value instead.
                    value.map(e => {
                        rowCounts[e] = (rowCounts[e] ?? 0) + 1;
                        if (!acc.includes(e)) {
                            acc.push(e)
                            rows.push({ __arrayFilterValue: e })
                            sortKeys.push(String(e))
                        }
                    })
                } else {
                    rowCounts[value] = (rowCounts[value] ?? 0) + 1;
                    if (!acc.includes(value)) {
                        rows.push(row)
                        sortKeys.push(String(value))
                        acc.push(value)
                    }
                }
                return acc;
            }, [] as any[])
            // Sort alphabetically (ascending) so long option lists are quick to scan/search.
            const order = rows.map((_, i) => i)
                .sort((a, b) => sortKeys[a].localeCompare(sortKeys[b], undefined, { numeric: true, sensitivity: "base" }))
            setList(order.map(i => rows[i]))
            setCounts(rowCounts)
        }

        formatData()


        // return () => {
        //     if (searchRef.current && searchRef.current.value.length > 0) {
        //         const filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(e => e.col == props.col.props.id)
        //         if (filtroI >= 0) {
        //             props.col.props.dinamicTableInstance.filtros[filtroI] = searchRef.current
        //         } else {
        //             props.col.props.dinamicTableInstance.filtros.push(searchRef.current)
        //         }

        //         props.col.props.dinamicTableInstance.applyFilter()
        //     }
        // }

        // Recompute when the popup targets a different column: the popup is reused
        // across columns (same "colMenu" key in Popup.tsx) instead of being remounted,
        // so without this dependency the list stays frozen from whichever column
        // opened the popup first.
    }, [props.col.props.id])

    useEffect(() => {
        setSearch({
            col: props.col.props.id,
            type: props.col.props.dataType,
            operator: "contains",
            dateFormat: props.col.props.dateFormat,
            value: [],
            ...filtro
        } as FilterType)
        // Same reuse issue as above: reset the search/filter state when switching
        // to a different column so stale values/operator from the previous column
        // don't leak in.
    }, [props.col.props.id])

    const hanldeSort = (order) => {
        const sorters = props.col.props.dinamicTableInstance.sorter;
        const sorterI = sorters.findIndex(e => e.key == props.col.props.id)
        if (sorterI >= 0) {
            props.col.props.dinamicTableInstance.sorter[sorterI].order = order

        } else {
            props.col.props.dinamicTableInstance.sorter.push({
                key: props.col.props.id,
                order: order,
                type: props.col.props.dataType,
                dateFormat: props.col.props.dateFormat
            })
        }
        props.col.props.dinamicTableInstance.popup.close("colMenu");
        props.col.props.dinamicTableInstance.applySort();
    }

    const colors = props.col.props.dinamicTableInstance.colors;

    let OP = OPERADORES[props.col.props.dataType].find(e => e.value == search.operator);
    if (!OP) {

        OP = OPERADORES[props.col.props.dataType].find(e => e.value == "=");
        search.operator = "=";
    }

    // "datetime" values are grouped by day: check the day to filter everything
    // on that date, or check a single time underneath to filter that exact instant.
    // Shared by "datetime" (grouped by day) and "time" (grouped by hour): check the
    // group to filter everything under it, or check one exact time underneath for
    // just that instant.
    const RenderGroupedFilterList = (groupFormat: string) => {
        const styleText = StyleSheet.flatten([{ color: colors.text }, props.col.props.dinamicTableInstance.props.textStyle, props.col.props.textStyle]);
        const groups: { dayKey: string, items: { iso: string, timeLabel: string }[] }[] = [];
        list.forEach((row) => {
            const d: Date = row[props.col.props.id];
            const dayKey = String(new SDate(d).toString(groupFormat));
            const iso = d.toISOString();
            let group = groups.find(g => g.dayKey === dayKey);
            if (!group) {
                group = { dayKey, items: [] };
                groups.push(group);
            }
            if (!group.items.some(it => it.iso === iso)) {
                group.items.push({ iso, timeLabel: String(new SDate(d).toString("hh:mm:ss")) });
            }
        });

        return <View style={{ flex: 1, minHeight: 0 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4, paddingBottom: 12 }}>
                {groups.map((group) => {
                    const currentValue: string[] = Array.isArray(search.value) ? search.value : [];
                    const checkedCount = group.items.filter(it => currentValue.includes(it.iso)).length;
                    const allChecked = group.items.length > 0 && checkedCount === group.items.length;
                    return <View key={group.dayKey} style={{
                        borderRadius: 6,
                        backgroundColor: allChecked ? colors.accent + "22" : "transparent",
                        paddingTop: 2,
                        paddingBottom: 4
                        // paddingHorizontal: 4
                        //  backgroundColor: "cyan"
                    }}>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingVertical: 2 }} onPress={() => {
                            if (allChecked) {
                                commitFilter({ ...search, value: currentValue.filter(v => !group.items.some(it => it.iso === v)) })
                            } else {
                                const toAdd = group.items.map(it => it.iso).filter(iso => !currentValue.includes(iso));
                                commitFilter({ ...search, value: [...currentValue, ...toAdd] })
                            }
                        }}>
                            <CheckBox value={allChecked} color={colors.accent} colorActive={colors.accent} colorIcon={colors.text} />
                            <View style={{ width: 6 }} />
                            <Text numberOfLines={1} style={[styleText, { fontWeight: "700", fontSize: 12 }]}>{group.dayKey}</Text>
                            <View style={{ flex: 1 }} />
                            <Text numberOfLines={1} style={{ color: colors.card, fontSize: 9, opacity: 0.7, marginLeft: 6, fontVariant: ["tabular-nums"] }}>
                                {checkedCount > 0 ? `${checkedCount}/${group.items.length}` : `${group.items.length}`}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: 8 }} />
                            <View style={{ width: 1, backgroundColor: colors.border, marginVertical: 2 }} />
                            <View style={{ width: 8 }} />
                            <View style={{
                                flex: 1, paddingTop: 2,
                                // backgroundColor: "green"
                            }}>
                                {group.items.map((it) => {
                                    const isCheck = currentValue.includes(it.iso);
                                    return <TouchableOpacity key={it.iso} style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: 3,
                                        paddingHorizontal: 2,
                                        borderRadius: 4,
                                        //  backgroundColor: "red"
                                        backgroundColor: isCheck ? colors.accent + "18" : "transparent",
                                    }} onPress={() => {
                                        if (isCheck) {
                                            commitFilter({ ...search, value: currentValue.filter(v => v != it.iso) })
                                        } else {
                                            commitFilter({ ...search, value: [...currentValue, it.iso] })
                                        }
                                    }}>
                                        <CheckBox value={isCheck} color={colors.accent} colorActive={colors.accent} colorIcon={colors.text} />
                                        <View style={{ width: 6 }} />
                                        <Text numberOfLines={1} style={[styleText, { fontSize: 11 }]}>{it.timeLabel}</Text>
                                    </TouchableOpacity>
                                })}
                            </View>
                        </View>
                    </View>
                })}
            </ScrollView>
        </View>
    }

    const RenderFilterList = () => {
        if (!!props.col.props.disableFilter) return null;
        if (!!props.col.props.disableFilterGroup) return null;
        if (props.col.props.dataType == "datetime" || props.col.props.dataType == "time") {
            return <>
                <View style={{ height: 5, }} />
                <View style={{ height: 1, backgroundColor: colors.border }} />
                <View style={{ height: 4, }} />
                {RenderGroupedFilterList(props.col.props.dataType == "time" ? "hh:00" : "yyyy-MM-dd")}
                <View style={{ height: 1, backgroundColor: colors.border }} />
            </>
        }
        return <>
            <View style={{ height: 5, }} />
            <View style={{ height: 1, backgroundColor: colors.border }} />
            <View style={{ height: 4, }} />
            <ScrollView horizontal contentContainerStyle={{
                minWidth: "100%"
            }}>
                <FlatList data={list}
                    style={{
                        width: "100%",
                        // backgroundColor:"#F0f",
                        // borderColor: colors.border,
                        borderRadius: 4,
                    }}
                    contentContainerStyle={{ padding: 4, paddingBottom: 40 }}
                    ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
                    renderItem={({ item, index }) => {
                        if (item && item.__arrayFilterValue !== undefined) {
                            const value = item.__arrayFilterValue;
                            const styleText = StyleSheet.flatten([{ color: colors.text }, props.col.props.dinamicTableInstance.props.textStyle, props.col.props.textStyle])
                            const isCheck = search.value.includes(value);
                            return <TouchableOpacity style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }} onPress={() => {
                                if (!Array.isArray(search.value)) {
                                    search.value = []
                                }
                                if (isCheck) {
                                    commitFilter({ ...search, value: search.value.filter(e => e != value) })
                                } else {
                                    commitFilter({ ...search, value: [...search.value, value] })
                                }
                            }}>
                                <CheckBox value={isCheck} color={colors.accent} colorActive={colors.accent} colorIcon={colors.text} />
                                <View style={{ width: 4 }} />
                                <View style={{ flex: 1, }} pointerEvents="none">
                                    <Text numberOfLines={1} style={[styleText]}>{value}</Text>
                                </View>
                                <Text numberOfLines={1} style={{ color: colors.card, fontSize: 9, opacity: 0.7, marginLeft: 6, fontVariant: ["tabular-nums"] }}>{counts[value] ?? 0}</Text>
                            </TouchableOpacity>
                        }
                        let COMPONENT = null;

                        const colData = props.col.props.dinamicTableInstance.colData[props.col.props.id];
                        let data = item[props.col.props.id];
                        const count = counts[groupValue(data)] ?? 0;
                        if (props.col.props.customComponent)
                            COMPONENT = props.col.props.customComponent({
                                data: item[props.col.props.id],
                                dataFormat: item[props.col.props.id],
                                row: item.__original,
                                index,
                                dinamicTable: props.col.props.dinamicTableInstance,
                                textStyle: { color: colors.text },
                                colData: colData,
                                filterList: true,
                            })
                        else {
                            if (props.col.props.format) {
                                data = props.col.props.format({ data: item[props.col.props.id], row: item.__original, index, textStyle: { color: colors.text } })
                            }
                            else if (props.col.props.dataType == "date") {
                                data = new SDate(data).toString("yyyy-MM-dd")
                            }
                            else if (props.col.props.dataType == "time") {
                                data = new SDate(data).toString("hh:mm:ss")
                            }
                            else if (props.col.props.dataType == "datetime") {
                                data = new SDate(data).toString(props.col.props.dateFormat ?? "yyyy-MM-dd hh:mm:ss")
                            }
                            const styleText = StyleSheet.flatten([{ color: colors.text }, props.col.props.dinamicTableInstance.props.textStyle, props.col.props.textStyle])
                            // Default filter text to Title Case regardless of how the
                            // underlying value is cased ("ERICKA SEVILLANO" -> "Ericka Sevillano"),
                            // it reads better than all-caps or all-lowercase. Only applies
                            // to plain text (no format/customComponent already styling it).
                            COMPONENT = <Text numberOfLines={1} style={[styleText, { textTransform: "capitalize" }]}>{!data ? null : data.toString()}</Text>
                        }
                        if (props.col.props.dataType == "date" || props.col.props.dataType == "time" || props.col.props.dataType == "datetime") {
                            const da = item[props.col.props.id];
                            data = da.toISOString();
                        }

                        const isCheck = search.value.includes(!data ? null : data.toString());

                        return <TouchableOpacity style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // Keep every row the same height no matter what the column's
                            // customComponent renders (a photo, an initials circle, plain
                            // text, ...): oversized content gets clipped instead of
                            // stretching this row taller than its neighbours.
                            height: 28,
                            overflow: "hidden",
                        }} onPress={() => {
                            if (!Array.isArray(search.value)) {
                                search.value = []
                            }


                            if (isCheck) {
                                commitFilter({ ...search, value: search.value.filter(e => e != data.toString()) })
                            } else {
                                commitFilter({ ...search, value: [...search.value, data.toString()] })
                            }

                        }}>
                            <CheckBox value={isCheck} color={colors.accent} colorActive={colors.accent} colorIcon={colors.text} />
                            <View style={{ width: 4 }} />
                            <View style={{ flex: 1, height: "100%", flexDirection: "row", alignItems: "center" }} pointerEvents="none">
                                {COMPONENT}
                            </View>
                            <Text numberOfLines={1} style={{ color: colors.card, fontSize: 9, opacity: 0.7, marginLeft: 6, fontVariant: ["tabular-nums"] }}>{count}</Text>
                        </TouchableOpacity>
                    }} />
            </ScrollView>
            <View style={{ height: 1, backgroundColor: colors.border }} />

        </>
    }

    const RenderFilterTypeDate = (index) => {

        // let valtxt = !Array.isArray(search.value) ? search.value : search.value[index]
        let valtxt = search.value[index]
        if (!!valtxt) {
            // The calendar only ever picks a day, so always show just the day here
            // regardless of the column's (possibly full datetime) dateFormat.
            valtxt = new SDate(valtxt).toString("yyyy-MM-dd")
        }

        return <TouchableOpacity
            style={[props.col.props.dinamicTableInstance.inputStyle, {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }]}
            onPress={e => {
                console.log(e);
                props.col.props.dinamicTableInstance.popup.show({
                    key: "selectDate",
                    onPressEvent: e,
                    height: 200,
                    width: 220,
                    parent: props.col.props.dinamicTableInstance.containerRef,
                    render: () => {
                        return <View style={{
                            backgroundColor: colors.background, padding: 4, borderRadius: 8,
                            borderWidth: 1,
                            borderColor: colors.border
                        }}>
                            <DatePickerCalendar color={colors.text} accentColor={colors.accent}
                                defaultValue={state.dateSelec}
                                onChange={e => {
                                    state.dateSelec = e

                                }} />
                            <View style={{ height: 16 }} />
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <TouchableOpacity style={{ padding: 4 }} onPress={() => {
                                    props.col.props.dinamicTableInstance.popup.close("selectDate");
                                }}>
                                    <Text style={{ fontSize: 12, color: colors.accent }}>{"Cancelar"}</Text>
                                </TouchableOpacity>
                                <View style={{ width: 16 }} />
                                <TouchableOpacity style={{ padding: 4 }} onPress={() => {
                                    props.col.props.dinamicTableInstance.popup.close("selectDate");
                                    // setSearch({ ...search, value: [state.dateSelec.toString("yyyy-MM-dd")] })
                                    search.value[index] = state.dateSelec.date.toISOString()
                                    setSearch({ ...search, value: search.value })
                                }}>
                                    <Text style={{ color: colors.accent, fontSize: 12 }}>{"Aceptar"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                })
            }}>
            <View style={{ width: 14, height: 14, justifyContent: "center", alignItems: "center" }}>
                <Assets.Search fill={colors.accent} />
            </View>
            <View style={{ width: 4 }} />
            <Text numberOfLines={1} style={[{ flex: 1, }, props.col.props.dinamicTableInstance.textStyle]}>{valtxt}</Text>
        </TouchableOpacity>
    }
    const RenderFilterTypeText = (index) => {
        return <View>
            <TextInput
                placeholder={
                    props.col.props.dataType == "time" ? "HH:mm" :
                        props.col.props.dataType == "datetime" ? "yyyy-MM-dd HH:mm:ss" :
                            SLanguage.select({ en: "Search...", es: "Buscar..." })
                }
                // value={search.value}

                value={!Array.isArray(search.value) ? search.value : ""}
                placeholderTextColor={colors.card}
                style={[props.col.props.dinamicTableInstance.inputStyle, { paddingStart: 24 }]}
                // autoFocus
                onChangeText={e => {
                    console.log("cambio el texto", e)
                    setSearch({ ...search, value: e })
                }} />
            <View style={{ width: 12, height: 12, justifyContent: "center", alignItems: "center", position: "absolute", left: 8, top: 6 }}>
                <Assets.Search fill={colors.accent} />
            </View>
        </View>
    }
    const RenderFilterInput = () => {
        if (!!props.col.props.disableFilter) return null;
        return <>
            <View style={{ height: 1, backgroundColor: colors.border }} />
            <View style={{ height: 5, }} />
            {/* <View style={{ padding:/ 2, borderBottomWidth: 1, borderBottomColor: colors.border }}> */}
            <Select
                dinamicTableInstance={props.col.props.dinamicTableInstance}
                defaultValue={search.operator}
                icon={<Assets.Filter stroke={colors.accent} />}
                options={OPERADORES[props.col.props.dataType]} onSelect={e => {
                    const newOp = OPERADORES[props.col.props.dataType].find(op => op.value === e.value);
                    setSearch({ ...search, operator: e.value, value: (newOp?.params ?? 1) <= 0 ? [] : search.value })
                }} />
            {/* </View> */}
            <View style={{ height: 4, }} />
            {/* <View style={{ padding: 2, borderBottomWidth: 1, borderBottomColor: colors.border }}> */}
            {!!(OP ?? {})?.params ? new Array(OP?.params).fill(0).map((e, index) => {
                return props.col.props.dataType == "date" ?
                    RenderFilterTypeDate(index)
                    :
                    RenderFilterTypeText(index)
            }) : null}
        </>
    }
    const hanldeGroup = () => {
        const instance = props.col.props.dinamicTableInstance!;
        const colId = props.col.props.id ?? "";
        const existingI = instance.groupers.findIndex(g => g.key == colId);
        if (existingI >= 0) {
            instance.groupers.splice(existingI, 1);
        } else {
            instance.groupers = [{
                key: colId,
                type: props.col.props.dataType,
                dateFormat: props.col.props.dateFormat,
            }];
        }
        instance.popup!.close("colMenu");
        instance.applyGroup();
    }

    const RenderGrouper = () => {
        if (!!(props.col.props as any).disableGrouper) return null;
        const isGrouped = props.col.props.dinamicTableInstance!.groupers.some(g => g.key == props.col.props.id);
        const ListIcon = Assets.List as any;
        return <>
            <TouchableOpacity onPress={hanldeGroup} style={{ flexDirection: "row", alignItems: "center" }}>
                <ListIcon width={16} height={16} stroke={colors.accent} />
                <View style={{ width: 2 }} />
                <Text numberOfLines={1} style={{ color: colors.text, fontSize: 12 }}>
                    {isGrouped
                        ? SLanguage.select({ en: "Remove group", es: "Quitar agrupación" })
                        : SLanguage.select({ en: "Group by", es: "Agrupar por" })
                    }
                </Text>
            </TouchableOpacity>
            <View style={{ height: 4 }} />
        </>
    }

    const RenderSorter = () => {
        if (!!props.col.props.disableSorter) return null;
        return <>
            <View style={{ flexDirection: "row" }} >
                <TouchableOpacity onPress={() => {
                    hanldeSort("asc")
                }} style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Assets.Arrow width={16} height={16} stroke={colors.accent} />
                    <View style={{ width: 2 }} />
                    <Text numberOfLines={1} style={{ color: colors.text, fontSize: 12 }}  >{
                        SLanguage.select({
                            en: "Ascending",
                            es: "Ascendente",
                        })}</Text>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity onPress={() => {
                    hanldeSort("desc")
                }} style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Assets.Arrow width={16} height={16} stroke={colors.accent} transform={"rotate(180)"}
                    />
                    <View style={{ width: 2 }} />
                    <Text numberOfLines={1} style={{ color: colors.text, fontSize: 12 }}  >{SLanguage.select({
                        en: "Descending",
                        es: "Descendente",
                    })}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 4, }} />
        </>
    }
    return <View style={{
        padding: 8, margin: 1, backgroundColor: colors.background, width: "100%", height: "100%", borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border
    }}>
        <Text style={{ color: colors.text, fontWeight: "bold", textAlign: "center", fontSize: 12, }}  >{typeof props?.col?.props?.label === "string" ? props.col.props.label : props?.col?.props?.id}</Text>
        <View style={{ height: 8 }} />
        <TouchableOpacity onPress={() => {
            props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap = !props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap;
            setSearch({ ...search })
            props.col.props.dinamicTableInstance.forceUpdate();
        }} style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox value={props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap} color={colors.accent} colorActive={colors.accent} colorIcon={colors.text} />
            <View style={{ width: 8 }} />
            <Text style={{ color: colors.text, fontSize: 11 }}  >{
                SLanguage.select({
                    en: "Wrap content",
                    es: "Ajustar contenido",
                })
            }</Text>
        </TouchableOpacity>
        <View style={{ height: 8 }} />
        {RenderGrouper()}
        {RenderSorter()}
        {RenderFilterInput()}
        {RenderFilterList()}
        {/* <View style={{ flex: 1, minHeight: 4 }} /> */}
        <View style={{ flexDirection: "row" }}>
            <Btn colors={colors}
                style={{ padding: 2, backgroundColor: colors.background, borderWidth: 0.5, borderColor: colors.accent, borderRadius: 4, flex: 1 }}
                onPress={(e) => {
                    props.col.props.dinamicTableInstance.popup.close("colMenu");
                }}>{"Cancelar"}</Btn>
            <View style={{ width: 8 }} />
            <Btn colors={colors}
                color={colors.background}
                style={{ padding: 2, backgroundColor: colors.accent, borderRadius: 4, flex: 1 }}
                onPress={(e) => {
                    if (search) {
                        if (search.value.length > 0 || OP.params <= 0) {
                            const filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(e => e.col == props.col.props.id)
                            if (filtroI >= 0) {
                                props.col.props.dinamicTableInstance.filtros[filtroI] = search
                            } else {
                                props.col.props.dinamicTableInstance.filtros.push(search)
                            }

                        } else {
                            const filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(e => e.col == props.col.props.id)
                            if (filtroI >= 0) {
                                props.col.props.dinamicTableInstance.filtros.splice(filtroI, 1)
                            }

                        }
                        props.col.props.dinamicTableInstance.applyFilter()
                        props.col.props.dinamicTableInstance.popup.close("colMenu");
                    }
                }}>{"Aplicar"}</Btn>

        </View>
    </View>

}

export default ColMenu;