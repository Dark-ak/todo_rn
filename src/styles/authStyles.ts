import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const authStyles = StyleSheet.create({
    container: {
        alignItems: "center", justifyContent: "center", flex: 1
    },
    header: {
        color: colors.primary,
        fontSize: 32,
        textAlign: "center",
        fontWeight: 700
    },
    subHeader: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center"

    },
    main: {
        backgroundColor: "#151412",
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginVertical: 24,
        marginHorizontal: 10,
        borderRadius: 10,
        width: "90%",
        gap: 18
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        color: "#fff"
    },
    label: {
        color: "#878181",
        fontSize: 18
    },
    text: {
        color: "#fff"
    },
    btn: {
        width: "100%",
        backgroundColor: colors.primary,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 5
    },
    btnSecondary: {
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 5
    },
    errorText: {
        color: colors.danger,
        fontSize: 14,
        marginTop: 4,
        marginLeft: 4,
    },
})