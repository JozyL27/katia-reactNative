import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './src/Components/Landing/Landing';
import Login from './src/Components/Login/Login';
import SignUp from './src/Components/SignUp/SignUp';
import {UserProvider} from './src/Contexts/UserContext';
import Main from './src/Components/Main/Main';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
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
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}
