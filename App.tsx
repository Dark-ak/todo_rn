

import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from '@realm/react';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Signup from './src/screens/Signup';
import { RootStackParamList } from './src/utils/routeType';
import { User } from './src/models/User';
import { Task } from './src/models/Task';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Login'
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <RealmProvider schema={[User, Task]}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </RealmProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
