import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../components/auth/welcome/welcome.tsx';
import LoginScreen from '../components/auth/registration/login/login.tsx';
import RegistrationScreen from '../components/auth/registration/registration.tsx';


const Stack = createNativeStackNavigator();



export default function Index() {
  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}



