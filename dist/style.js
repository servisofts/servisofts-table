import { StyleSheet, } from 'react-native';
var styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1
    },
    text: {
        color: "#fff",
        fontSize: 12
    },
    button: {
        borderWidth: 1,
        borderColor: "#fff",
        padding: 8,
        borderRadius: 4
    },
    cellNumber: {
        height: 24,
        overflow: "hidden",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        flex: 1
    }
});
export default styles;
