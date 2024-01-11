import {NavigationContainer} from '@react-navigation/native';
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './components/auth/welcome/welcome.tsx';
import LoginScreen from './components/auth/registration/login/login.tsx';
import RegistrationScreen from './components/auth/registration/registration.tsx';
import Home from './components/home/home.tsx';


const Stack = createNativeStackNavigator();

console.log(999)

export default function App (){
  const isLoggedIn = true; 
  console.log(8778)
  return(
    <NavigationContainer independent={true}>
    <Stack.Navigator>
     {isLoggedIn ? (
       <Stack.Screen name="Home" component={Home} />
     ) : (
       <>
         <Stack.Screen name="Welcome" component={Welcome}/>
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Registration" component={RegistrationScreen} />
       </>
     )}
   </Stack.Navigator>
 </NavigationContainer>
  ); 
}


