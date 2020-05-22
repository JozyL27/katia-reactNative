import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './src/Components/Landing/Landing';
import {View, Text} from 'react-native';
import Login from './src/Components/Login/Login';
import SignUp from './src/Components/SignUp/SignUp'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
