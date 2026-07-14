import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DinamicTable from "../DinamicTable";

type BtnPaginaProps = {
    label: string,
    disabled: boolean,
    onPress: () => void,
    colors: DinamicTable<any>["colors"],
}
const BtnPagina = ({ label, disabled, onPress, colors }: BtnPaginaProps) => (
    <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
            paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4,
            backgroundColor: colors.card,
            opacity: disabled ? 0.4 : 1,
        }}
    >
        <Text style={{ color: colors.text, fontSize: 12 }}>{label}</Text>
    </TouchableOpacity>
)

export default class Paginador extends React.Component<{ dinamicTableInstance: DinamicTable<any> }> {
    render() {
        const dinamicTableInstance = this.props.dinamicTableInstance;
        const colors = dinamicTableInstance.colors;
        const totalPages = dinamicTableInstance.getTotalPages();
        if (totalPages <= 1) return null;
        const currentPage = dinamicTableInstance.state.currentPage;
        return (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 } as any}>
                <BtnPagina label="‹ Anterior" colors={colors} disabled={currentPage <= 1} onPress={() => dinamicTableInstance.changePage(currentPage - 1)} />
                <Text style={{ color: colors.text, fontSize: 12 }}>{`Página ${currentPage} de ${totalPages}`}</Text>
                <BtnPagina label="Siguiente ›" colors={colors} disabled={currentPage >= totalPages} onPress={() => dinamicTableInstance.changePage(currentPage + 1)} />
            </View>
        );
    }
}
