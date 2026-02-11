import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import ScreenWrapper from '../utils/ScreenWrapper'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/routeType'
import { authStyles } from '../styles/authStyles'
import { colors } from '../styles/colors'
import { useAuth } from '../context/AuthContext';

type NavProp = NativeStackScreenProps<RootStackParamList>


const Signup = ({ navigation }: NavProp) => {

  const { signup, error } = useAuth();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validate = () => {
    let valid = true;
    if (!name) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S/.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSignup = async () => {
    if (validate()) {
      const success = await signup(name, email, password);
      if (success) {
        console.log("Signup successful");
        // Navigation handled by App.tsx through user state change, 
        // but if we auto-login, App content will switch to AppStack.
        // If we didn't auto-login in context, we'd navigate to Login.
        // Current AuthContext implementation auto-logins.
      } else {
        if (error) setEmailError(error);
      }
    }
  };

  return (
    <ScreenWrapper>
      <View style={authStyles.container}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={authStyles.header}>TaskFlow</Text>
          <View style={authStyles.main}>
            <Text style={authStyles.subHeader}> Signup</Text>

            <View style={{ gap: 8 }}>
              <Text style={authStyles.label}>Name</Text>
              <TextInput
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError('');
                }}
                placeholder="Enter Name"
                style={[authStyles.input, nameError ? { borderColor: colors.danger } : null]}
              />
              {nameError ? <Text style={authStyles.errorText}>{nameError}</Text> : null}
            </View>
            <View style={{ gap: 8 }}>
              <Text style={authStyles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                placeholder="abc@gmail.com"
                style={[authStyles.input, emailError ? { borderColor: colors.danger } : null]}
              />
              {emailError ? <Text style={authStyles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={{ gap: 8 }}>
              <Text style={authStyles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                placeholder="Enter Password"
                style={[authStyles.input, passwordError ? { borderColor: colors.danger } : null]}
                textContentType="password"
                secureTextEntry
              />
              {passwordError ? <Text style={authStyles.errorText}>{passwordError}</Text> : null}
            </View>

            <View style={{ gap: 12, paddingTop: 30 }}>
              <Pressable
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  width: "100%"
                })}
                onPress={handleSignup}
              >
                <View style={authStyles.btn}>
                  <Text style={{ fontSize: 16, color: "#fff" }}>Signup</Text>
                </View>
              </Pressable>


              <Pressable
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  width: "100%"
                })}

                onPress={() => {
                  navigation.navigate("Login")
                }}
              >
                <View style={authStyles.btnSecondary}>
                  <Text style={{ fontSize: 16, color: colors.primary }}>Already have an account ? Login</Text>
                </View>
              </Pressable>
            </View>


          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Signup