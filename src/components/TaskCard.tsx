import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../styles/colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Task } from '../models/Task'
import { useRealm } from '@realm/react'

interface TaskCardProps {
    task: Task;
}

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High': return colors.danger;
        case 'Medium': return '#F59E0B'; // Amber
        case 'Low': return colors.secondary;
        default: return '#888';
    }
};

const TaskCard = ({ task }: TaskCardProps) => {
    const realm = useRealm();

    const toggleComplete = () => {
        realm.write(() => {
            task.isComplete = !task.isComplete;
        });
    };

    const deleteTask = () => {
        realm.write(() => {
            realm.delete(task);
        });
    };

    return (
        <View style={[styles.container, { borderLeftColor: getPriorityColor(task.priority) }]}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12, flex: 1 }}>
                <Pressable onPress={toggleComplete} style={{ marginTop: 2 }}>
                    <View style={[styles.checkbox, task.isComplete && styles.checkboxActive]}>
                        {task.isComplete && <Feather name="check" size={14} color="#fff" />}
                    </View>
                </Pressable>

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.title, task.isComplete && styles.completedText]}>
                            {task.name}
                        </Text>
                        <View style={[styles.badge, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
                            <Text style={[styles.badgeText, { color: getPriorityColor(task.priority) }]}>
                                {task.priority}
                            </Text>
                        </View>
                    </View>

                    {task.description ? (
                        <Text style={[styles.description, task.isComplete && styles.completedText]} numberOfLines={2}>
                            {task.description}
                        </Text>
                    ) : null}

                    <Text style={styles.date}>
                        {task.createdAt.toLocaleDateString()}
                    </Text>
                </View>
            </View>

            <Pressable style={styles.deleteBtn} onPress={deleteTask}>
                <Feather name="trash-2" size={20} color="#ff4444" />
            </Pressable>
        </View>
    )
}

export default TaskCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161616',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 4,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
        borderWidth: 1,
        borderColor: '#222',
    },
    content: {
        flex: 1,
        gap: 4,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        flex: 1,
        marginRight: 8,
    },
    description: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#666',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#666',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: colors.primary,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    deleteBtn: {
        padding: 8,
        marginLeft: 8,
    },
})
