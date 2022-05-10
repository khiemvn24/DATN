import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreen/LoginScreen'
import LoginWelcome from '../screens/AuthScreen/LoginWelcome';
import SignUpScreen from '../screens/AuthScreen/SignUpScreen';



const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  
  return (
    <AuthStack.Navigator initialRouteName="LoginWelcome">
      <AuthStack.Screen
        name="LoginWelcome"
        component={LoginWelcome}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

    </AuthStack.Navigator>
  );
};

export default AuthNavigator;