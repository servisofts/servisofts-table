import React, { useEffect } from "react";
import { ActivityIndicator, Animated, FlatList, PanResponder, ScrollView, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, } from "react-native";
import { DataType, FilterType, OPERADORES, OPERATORS } from "..";
import Select from "../../Components/Select";
// import Filter, { FilterType, OPERATORS } from "../Filter";
import Col from "../Col";
import CheckBox from "../../Components/CheckBox";
import Assets from "../../Assets";
import SDate from "../../Components/SDate";
import Btn from "../../Components/Btn";
import DatePickerCalendar from "../../Components/DatePickerCalendar";
import SLanguage from "../../Components/SLanguage";

const ColMenu = (props: { col: Col<any> }) => {

    const filtroI = props.col.props.dinamicTableInstance.filtros.findIndex(e => e.col == props.col.props.id)
    let filtro = null;
    if (filtroI >= 0) {
        filtro = props.col.props.dinamicTableInstance.filtros[filtroI]
        // setSearch({ ...filtro })
    }

    const [list, setList] = React.useState(null as any[])
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
    // const searchRef = React.useRef(search);

    // useEffect(() => {
    //     searchRef.current = search;
    // }, [search])

    useEffect(() => {
        if (props.col.props.loadListOptions) {
            const liste = props.col.props.loadListOptions({
                dinamicTable: props.col.props.dinamicTableInstance,
                colData: props.col.props.dinamicTableInstance.colData[props.col.props.id],
            }).then((e) => {
                setList(e);
            }).catch(e => {
                console.warn("Error loading list options for column", props.col.props.id, e);
                setList([]);
            })
        }


    }, [])

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
        if (props.col.props.dataType == "boolean") {
            OP = OPERADORES[props.col.props.dataType].find(e => e.value == "istrue");
            search.operator = "istrue"
        }
    }


    const RenderFilterList = () => {
        if (!!props.col.props.disableFilter) return null;
        if (!!props.col.props.disableFilterGroup) return null;
        if (!props.col.props.loadListOptions) return null;

        if (!list) return <ActivityIndicator size="small" color={colors.text} />;
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
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    renderItem={({ item, index }) => {
                        let COMPONENT = null;

                        const colData = props.col.props.dinamicTableInstance.colData[props.col.props.id];
                        let data = item[props.col.props.id];
                        if (props.col.props.customComponent)
                            COMPONENT = props.col.props.customComponent({
                                data: item[props.col.props.id],
                                dataFormat: item[props.col.props.id],
                                row: item.__original,
                                index,
                                dinamicTable: props.col.props.dinamicTableInstance,
                                textStyle: { color: colors.text },
                                colData: colData
                            })
                        else {
                            if (props.col.props.format) {
                                data = props.col.props.format({ data: item[props.col.props.id], row: item.__original, index, textStyle: { color: colors.text } })
                            } else if (props.col.props.dataType == "date" && props.col.props.dateFormat) {
                                data = new SDate(data).toString(props.col.props.dateFormat)
                            }
                            const styleText = StyleSheet.flatten([{ color: colors.text }, props.col.props.dinamicTableInstance.props.textStyle, props.col.props.textStyle])
                            COMPONENT = <Text numberOfLines={1} style={[styleText]}>{!data ? null : data.toString()}</Text>
                        }


                        const isCheck = search.value.includes(!data ? null : data.toString());

                        return <TouchableOpacity style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }} onPress={() => {
                            if (!Array.isArray(search.value)) {
                                search.value = []
                            }
                            if (isCheck) {
                                setSearch({ ...search, value: search.value.filter(e => e != data.toString()) })
                            } else {
                                setSearch({ ...search, value: [...search.value, data.toString()] })
                            }
                            // props.col.props.dinamicTableInstance.filtros.push({
                            //     col: props.col.props.id,
                            //     type: props.col.props.dataType,
                            //     operator: "=",
                            //     value: item[props.col.props.id]
                            // })
                            // props.col.props.dinamicTableInstance.applyFilter()
                            // props.col.props.dinamicTableInstance?.popup?.close("colMenu")

                        }}>
                            <CheckBox value={isCheck} color={colors.accent} colorActive={colors.text} />
                            <View style={{ width: 4 }} />
                            <View style={{ flex: 1 }}>
                                {COMPONENT}
                            </View>
                        </TouchableOpacity>
                    }} />
            </ScrollView>
            <View style={{ height: 1, backgroundColor: colors.border }} />

        </>
    }

    const RenderFilterTypeDate = (index) => {
        return <TouchableOpacity
            style={[props.col.props.dinamicTableInstance.inputStyle, {
                flexDirection: "row",
                // justifyContent: "center",
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
                                    search.value[index] = state.dateSelec.toString("yyyy-MM-dd");
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
            <View style={{ width: 8 }} />

            <Text style={[{ flex: 1, color: props.col.props.dinamicTableInstance.inputStyle.color, fontSize: props.col.props.dinamicTableInstance.inputStyle.fontSize }]}>{!Array.isArray(search.value) ? search.value : search.value[index]}</Text>

        </TouchableOpacity>
    }
    const RenderFilterTypeText = (index) => {
        // TypeText
        return <View>
            <TextInput
                placeholder={SLanguage.select({ en: "Search...", es: "Buscar..." })}
                // value={search.value}

                value={!Array.isArray(search.value) ? search.value : search.value.join(", ")}
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
            <View style={{ height: 4, }} />
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
            {OP.params ? new Array(OP.params).fill(0).map((e, index) => {
                return props.col.props.dataType == "date" ?
                    RenderFilterTypeDate(index)
                    :
                    RenderFilterTypeText(index)
            }) : null}
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
                            en: "Asending",
                            es: "Ascendente",
                        })}</Text>
                </TouchableOpacity>
                <View style={{ height: 4 }} />
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
        <Text style={{ color: colors.text, fontWeight: "bold", textAlign: "center", fontSize: 12, }}  >{props?.col?.props?.label ?? props?.col?.props?.id}</Text>
        <View style={{ height: 8 }} />
        <TouchableOpacity onPress={() => {
            props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap = !props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap;
            setSearch({ ...search })
            props.col.props.dinamicTableInstance.forceUpdate();
        }} style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox value={props.col.props.dinamicTableInstance.colData[props.col.props.id].wrap} color={colors.accent} colorActive={colors.accent} />
            <View style={{ width: 8 }} />
            <Text style={{ color: colors.text, fontSize: 11 }}  >{
                SLanguage.select({
                    en: "Wrap content",
                    es: "Ajustar contenido",
                })
            }</Text>
        </TouchableOpacity>
        <View style={{ height: 8 }} />
        {RenderSorter()}
        {RenderFilterInput()}
        {RenderFilterList()}
        <View style={{ flex: 1, minHeight: 4 }} />
        <View style={{ flexDirection: "row" }}>
            <Btn colors={colors}
                style={{ padding: 2, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.accent, borderRadius: 4, flex: 1 }}
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
                            if (!Array.isArray(search.value)) {
                                const sa = search.value.toString().split(",").map(e => e.trim()).filter(e => e.length > 0);
                                search.value = sa;
                            }

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