import React, { useEffect } from "react";
import { FlatList, Text, TextInput, TextStyle, TouchableOpacity, View } from "react-native";
import { DinamicTableSQL } from "../DinamicTableSQL";
import { DinamicTable } from "../DinamicTable";
import SLanguage, { LanguageSource } from "./SLanguage";
import Assets from "../Assets";

type Options = {
    label: LanguageSource,
    value: any
}
export default class Select extends React.Component<{
    options: Options[],
    defaultValue?: any,
    placeholder?: string,
    icon?: any,
    onSelect: (value: any) => void,
    dinamicTableInstance: DinamicTable<any> | DinamicTableSQL<any>
}> {

    static defaultProps = {
        placeholder: "Seleccionar"
    }

    state = {
        value: this.props.defaultValue
    }
    render() {

        const value = this.state.value;
        let option;
        if (value && this.props.options) {
            option = this.props.options.find(e => e.value == value);
        }
        if(!option && this.props.options) {
            option = this.props.options[0];
            this.state.value = option.value;
            this.props.onSelect(option);
        }

        const colors = this.props.dinamicTableInstance.colors;
        return <TouchableOpacity
            style={[this.props.dinamicTableInstance.inputStyle, { flexDirection: "row", alignItems: "center" }]}
            onPress={(e) => {
                this.props.dinamicTableInstance.popup.show({
                    key: "select",
                    onPressEvent: e,
                    height: 200,
                    width: 180,
                    parent: this.props.dinamicTableInstance.containerRef,
                    left: 16,
                    render: () => {
                        return <SelectContent options={this.props.options} onSelect={(e) => {
                            this.setState({ value: e.value });
                            this.props.onSelect(e);
                            this.props.dinamicTableInstance.popup.close("select");
                        }} dinamicTableInstance={this.props.dinamicTableInstance} />
                    }
                })
            }}>
            <View style={{ width: 14, height: 14, justifyContent: "center", alignItems: "center" }}>
                {this.props.icon}
            </View>
            <View style={{ width: 4 }} />
            <Text style={[{ flex: 1 }, !option?.label ? { color: colors.card } : this.props.dinamicTableInstance.textStyle]}>{SLanguage.select(option?.label) ?? this.props.placeholder}</Text>
        </TouchableOpacity>
    }
}

class SelectContent extends React.Component<{
    options: Options[],
    onSelect: (value: any) => void,
    dinamicTableInstance: DinamicTable<any> | DinamicTableSQL<any>
}> {

    render() {
        const colors = this.props.dinamicTableInstance.colors;
        return <View style={{ backgroundColor: colors.background, padding: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.border, }}>
            <FlatList
                data={this.props.options}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                renderItem={({ item }) => <TouchableOpacity
                    style={{ padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 8, height: 25, justifyContent: "center", }}
                    onPress={() => {
                        this.props.onSelect(item);
                    }}
                >
                    <Text style={{ color: colors.text }}>{SLanguage.select(item.label)}</Text>
                </TouchableOpacity>}

            />
        </View>
    }
}