import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import SDate from '../SDate';
import Assets from '../../Assets';


export default class DatePickerCalendar extends React.Component<{
    color?: string, accentColor?: string, language?: string,
    defaultValue?: SDate,
    onChange?: (date: SDate) => void
}> {
    static defaultProps = {
        color: "#fff",
        accentColor: "#78C7ED",
        language: "en"
    }
    textStyle: any = { color: this.props.color ?? "#fff", fontSize: 12 };
    state = {
        selectedDate: this.props.defaultValue ?? new SDate()
    }
    componentDidMount(): void {
        if (this.props.onChange) {
            this.props.onChange(this.state.selectedDate);
        }
    }
    render() {
        const { selectedDate } = this.state;
        selectedDate.setLanguage(this.props.language as any);
        return <View style={{ width: 200 }}>
            <Text style={[this.textStyle, { fontSize: this.textStyle.fontSize * 1.8, paddingStart: 8 }]}>{selectedDate.toString("dd MON yyyy").toLocaleLowerCase()}</Text>
            <View style={{ height: 16 }} />
            <Calendar value={this.state.selectedDate}
                accentColor={this.props.accentColor}
                language={this.props.language} textStyle={this.textStyle}
                onChange={(e) => {
                    if (this.props.onChange) {
                        this.props.onChange(e);
                    }
                    this.setState({ selectedDate: e })
                }} />
            {/* <View style={{ height: 16 }} /> */}
            {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity style={{ padding: 4 }}>
                    <Text style={[this.textStyle, { color: this.props.accentColor }]}>{"Cancelar"}</Text>
                </TouchableOpacity>
                <View style={{ width: 16 }} />
                <TouchableOpacity style={{ padding: 4 }}>
                    <Text style={[this.textStyle, { color: this.props.accentColor }]}>{"Aceptar"}</Text>
                </TouchableOpacity>
            </View> */}

        </View >
    }
}

const Calendar = ({ textStyle, accentColor = "#78C7ED", value, onChange = null, language = "es" }) => {
    const [state, setState] = React.useState({
        startDate: value.clone(),
        type: "days"
        // type: "years"
    });
    state.startDate.setLanguage(language as any);

    const RederDays = () => {
        return <View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {new Array(7).fill(0).map((_, i) => {
                    const d = SDate.getDayOfWeek(i, language as any);
                    return < Day textStyle={textStyle} > {d.text.substring(0, 1)}</Day>
                })}
            </View>
            {/* <View style={{ height: 4 }} /> */}
            <View style={{ width: "100%" }}>
                {new Array(6).fill(0).map((_, i) => {
                    return <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{
                        new Array(7).fill(0).map((_, j) => {
                            const postion = i * 7 + j;
                            if (postion < firstDay.getDayOfWeek()) {
                                return <Day textStyle={textStyle} ></Day>
                            }
                            const d = firstDay.clone().addDay(postion - firstDay.getDayOfWeek());
                            if (d.getMonth() != firstDay.getMonth()) {
                                return <Day textStyle={textStyle} ></Day>
                            }
                            const select = value.toString("yyyy-MM-dd") == d.toString("yyyy-MM-dd");
                            const curdate = new SDate().toString("yyyy-MM-dd") == d.toString("yyyy-MM-dd");



                            return <Day textStyle={textStyle}
                                select={select}
                                curdate={curdate}
                                accentColor={accentColor}
                                onPress={() => {
                                    if (onChange) onChange(d)
                                    setState({ ...state })
                                }} >{d.getDay()}</Day>
                        })
                    }
                    </View>
                })}
            </View>
        </View>
    }

    const RenderYears = () => {
        const start = 1900;
        const years = new Array(201).fill(0).map((_, i) => (start + i).toString());
        const selectedYear = value.toString("yyyy");
        const initialIndex = years.indexOf(selectedYear);

        const rowIndex = Math.floor(initialIndex / 3); // ← Esto es lo que necesitas

        // Asume que cada ítem tiene altura aproximada de 50px (ajustalo si es distinto)
        const ITEM_HEIGHT = 30;
        return (
            <View style={{ width: "100%", maxHeight: 280, overflow: "hidden" }}>
                <FlatList
                    style={{ flex: 1, width: "100%", height: "100%" }}
                    scrollEnabled
                    data={years}
                    numColumns={3}
                    keyExtractor={(item) => item.toString()}
                    initialScrollIndex={rowIndex}
                    getItemLayout={(data, index) => {
                        return {
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index,
                        };
                    }}
                    renderItem={({ item }) => {
                        const select = selectedYear === item;
                        return (
                            <TouchableOpacity style={[{
                                width: "33.33%", height: ITEM_HEIGHT, alignItems: "center", justifyContent: "center",

                            }, select ? { backgroundColor: accentColor, borderRadius: 8 } : null,]}
                                onPress={() => {
                                    state.startDate.setYear(parseInt(item));
                                    state.type = "days";
                                    setState({ ...state })
                                }}
                            >
                                <Text style={[textStyle, select && { fontWeight: "bold" }]}>{item}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    }
    const firstDay = new SDate(state.startDate.toString("yyyy-MM-01"), "yyyy-MM-dd");

    return <View style={{
    }}>
        <View style={{
            flexDirection: "row", flexWrap: "wrap", paddingStart: 8,
            alignItems: "center",
            // borderWidth: 1,
            // borderColor: "#fff"
        }}>
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }} onPress={() => {
                state.type = state.type == "days" ? "years" : "days";
                setState({
                    ...state
                })
            }}>
                <Text style={[textStyle, { fontSize: textStyle.fontSize * 0.85, }]}>{state.startDate.toString("MONTH, yyyy")}</Text>
                <View style={{ width: 8 }} />
                <View style={{ width: 8 }} >
                    <Assets.ArrowDown width={textStyle.fontSize * 0.80} height={textStyle.fontSize * 0.80} fill={textStyle.color} />
                </View>

            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            {
                state.type == "days" &&
                <>
                    <TouchableOpacity
                        style={{
                            width: 30,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onPress={() => {
                            state.startDate.addMonth(-1)
                            setState({ ...state })
                        }}>
                        <View style={{ width: 10, height: 10, transform: [{ rotate: "90deg" }] }}>
                            <Assets.ArrowDown width={"100%"} height={"100%"} fill={textStyle.color} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 30,
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => {
                        state.startDate.addMonth(+1)
                        setState({ ...state })
                    }}>
                        <View style={{ width: 10, height: 10, transform: [{ rotate: "270deg" }] }}>
                            <Assets.ArrowDown width={"100%"} height={"100%"} fill={textStyle.color} />
                        </View>
                    </TouchableOpacity>
                </>
            }
        </View >
        <View style={{ height: 8 }} />
        {state.type == "days" && RederDays()}
        {state.type == "years" && RenderYears()}
    </View >
}

const Day = ({ children = null, textStyle, onPress = null, select = false, curdate = false, accentColor = "#78C7ED" }) => {
    var Elm: any = View;
    if (onPress) {
        Elm = TouchableOpacity;
    }
    return <Elm style={{
        flex: 1,
        alignItems: "center",
        height: 30,
        justifyContent: "center",
    }} onPress={onPress}>
        <View style={[{
            width: 30,
            height: 30,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
        },
        curdate ? { backgroundColor: accentColor + "44", borderWidth: 1, borderColor: accentColor } : null,
        select ? { backgroundColor: accentColor } : null,
        ]} >
            <Text style={[textStyle]}>{children}</Text>
        </View>
    </Elm>
}

