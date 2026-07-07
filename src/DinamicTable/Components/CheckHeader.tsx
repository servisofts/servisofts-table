import React from "react";
import { TouchableOpacity, View } from "react-native";
import DinamicTable from "../DinamicTable";

type Props<T> = {
    dinamicTableInstance: DinamicTable<T>;
    width: number;
};

export default class CheckHeader<T> extends React.Component<Props<T>> {
    render() {
        const { dinamicTableInstance, width } = this.props;
        const colors = dinamicTableInstance.colors;

        const total = dinamicTableInstance.dataFiltrada.length;
        const selectedCount = dinamicTableInstance.dataFiltrada.filter(
            item => dinamicTableInstance.rowSelecteds[item.__key]
        ).length;

        const allSelected = total > 0 && selectedCount === total;
        const someSelected = selectedCount > 0 && selectedCount < total;

        return (
            <TouchableOpacity
                onPress={() => {
                    if (allSelected) {
                        dinamicTableInstance.clearSelect();
                    } else {
                        dinamicTableInstance.selectAll();
                    }
                }}
                style={{
                    width,
                    minHeight: 26,
                    height: "100%" as any,
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                    backgroundColor: colors.header,
                    borderTopLeftRadius: 8,
                }}
            >
                <View style={{
                    width: 14,
                    height: 14,
                    borderWidth: 1.5,
                    borderColor: allSelected || someSelected ? colors.accent : colors.border,
                    borderRadius: 3,
                    backgroundColor: allSelected ? colors.accent : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {someSelected && !allSelected && (
                        <View style={{
                            width: 8,
                            height: 2,
                            backgroundColor: colors.accent,
                            borderRadius: 1,
                        }} />
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}
