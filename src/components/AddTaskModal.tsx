import React, { useState } from 'react';
import { Modal, Pressable, Text, TextInput, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../styles/colors';
import { homeStyles } from '../styles/homeStyles';

interface AddTaskModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (name: string, desc: string, priority: string) => void;
}

const AddTaskModal = ({ visible, onClose, onSubmit }: AddTaskModalProps) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('Low');
    const [showDropdown, setShowDropdown] = useState(false);

    const priorities = ['High', 'Medium', 'Low'];

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSubmit(name, desc, priority);
        setName('');
        setDesc('');
        setPriority('Low');
        setShowDropdown(false);
    };

    const handleClose = () => {
        onClose();
        setName('');
        setDesc('');
        setPriority('Low');
        setShowDropdown(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={homeStyles.modalOverlay}>
                    <View style={homeStyles.modalContent}>
                        <Text style={homeStyles.modalHeader}>Add New Task</Text>

                        <View style={{ gap: 12 }}>
                            <View>
                                <Text style={homeStyles.label}>Task Name</Text>
                                <TextInput
                                    style={homeStyles.modalInput}
                                    placeholder="Enter task name"
                                    placeholderTextColor="#888"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            <View>
                                <Text style={homeStyles.label}>Description</Text>
                                <TextInput
                                    style={[homeStyles.modalInput, { height: 80, textAlignVertical: 'top' }]}
                                    placeholder="Enter description"
                                    placeholderTextColor="#888"
                                    value={desc}
                                    onChangeText={setDesc}
                                    multiline
                                    numberOfLines={4}
                                />
                            </View>

                            <View style={{ zIndex: 1000 }}>
                                <Text style={homeStyles.label}>Priority</Text>
                                <Pressable
                                    style={homeStyles.dropdownButton}
                                    onPress={() => setShowDropdown(!showDropdown)}
                                >
                                    <Text style={{ color: '#fff' }}>{priority}</Text>
                                    <Feather name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
                                </Pressable>
                                {showDropdown && (
                                    <View style={homeStyles.dropdownOptions}>
                                        {priorities.map((item) => (
                                            <Pressable
                                                key={item}
                                                style={homeStyles.dropdownItem}
                                                onPress={() => {
                                                    setPriority(item);
                                                    setShowDropdown(false);
                                                }}
                                            >
                                                <Text style={{ color: '#fff' }}>{item}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                )}
                            </View>

                            <View style={homeStyles.modalButtons}>
                                <Pressable
                                    style={[homeStyles.btn, { backgroundColor: '#444' }]}
                                    onPress={handleClose}
                                >
                                    <Text style={homeStyles.btnText}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={[homeStyles.btn, { backgroundColor: colors.primary }]}
                                    onPress={handleSubmit}
                                >
                                    <Text style={homeStyles.btnText}>Add Task</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AddTaskModal;
