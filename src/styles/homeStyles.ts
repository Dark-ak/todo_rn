import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },

    navBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 20,
        justifyContent: "space-between"
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 14,
        backgroundColor: "#2a2828ff",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8
    },

    input: {
        flex: 1,
        color: "#fff",
        fontSize: 12
    },

    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff"
    },

    emptyText: {
        fontSize: 16,
        color: "gray"
    },
    text: {
        color: "#fff"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#2a2828',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        color: '#ccc',
        marginBottom: 5,
        fontSize: 14,
    },
    modalInput: {
        backgroundColor: '#1E1E1E',
        color: '#fff',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownButton: {
        backgroundColor: '#1E1E1E',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#444',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownOptions: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#333',
        borderRadius: 5,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#444',
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    btn: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})