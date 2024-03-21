// HomeNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../components/auth/welcome/welcome";
import LoginScreen from "../components/auth/registration/login/login";
import RegistrationScreen from "../components/auth/registration/registration";
import { AuthRouterProps } from "./routers";

const Stack = createNativeStackNavigator();

const AuthNavigator = ({ loggedIn, setLoggedIn }: AuthRouterProps) =>{
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}
export default AuthNavigator; 