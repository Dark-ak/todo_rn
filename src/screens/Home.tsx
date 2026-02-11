import React, { useState } from 'react'
import { Pressable, Text, TextInput, View, Modal, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import ScreenWrapper from '../utils/ScreenWrapper'
import { StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/routeType';
import TaskCard from '../components/TaskCard';
import { Task } from '../models/Task';
import { useRealm, useQuery } from '@realm/react';
import Realm from 'realm';
import { useAuth } from '../context/AuthContext';
import { homeStyles } from '../styles/homeStyles';
import AddTaskModal from '../components/AddTaskModal';

type NavProp = NativeStackScreenProps<RootStackParamList>

const Home = ({ navigation }: NavProp) => {

  const [search, setSearch] = useState('');
  const { user, logout } = useAuth();
  const realm = useRealm();
  let tasks = useQuery(Task).filtered('userId == $0', user?._id);

  if (search.length >= 2) {
    tasks = tasks.filtered('name CONTAINS[c] $0 OR description CONTAINS[c] $0', search);
  }
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = (name: string, desc: string, priority: string) => {
    realm.write(() => {
      realm.create('Task', {
        _id: new Realm.BSON.UUID(),
        name: name,
        description: desc,
        priority: priority,
        isComplete: false,
        createdAt: new Date(),
        userId: user!._id,
      });
    });

    setModalVisible(false);
  };

  const handleLogout = () => {
    logout();
  };


  return (
    <ScreenWrapper>
      <View style={homeStyles.container}>
        <View style={homeStyles.navBar}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Feather name="check-circle" size={24} color={colors.primary} />
            <Text style={homeStyles.header}>TaskFlow</Text>
          </View>
          <View>
            <Pressable onPress={handleLogout}>
              <Feather name="log-out" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        <View>
          <View style={homeStyles.searchBar}>
            <View>
              <Feather name="search" size={16} color="gray" />
            </View>
            <View>
              <TextInput
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder="Search Tasks"
                placeholderTextColor="gray"
                style={{ color: "white" }}
              />
            </View>
          </View>
        </View>

        {tasks.length > 0 ? <ScrollView style={{ marginTop: 20 }} contentContainerStyle={{ paddingBottom: 100 }}>
          {tasks.map((task) => (
            <TaskCard key={task._id.toHexString()} task={task} />
          ))}
        </ScrollView> : search.length < 2 ? <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Feather name="check-circle" size={65} color="gray" />
          <Text style={homeStyles.emptyText}>No Tasks Yet</Text>
          <Text style={homeStyles.emptyText}>Tap + to create your first task</Text>
        </View>
          :
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Feather name="search" size={65} color="gray" />
            <Text style={homeStyles.emptyText}>No Tasks Found</Text>
            <Text style={homeStyles.emptyText}>Try searching for something else</Text>
          </View>}


        <Pressable style={homeStyles.fab} onPress={() => setModalVisible(true)}>
          <Feather name="plus" size={24} color="#fff" />
        </Pressable>

        <AddTaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddTask}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Home