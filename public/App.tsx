import { NavigationContainer } from "@react-navigation/native";
import { View, } from 'react-native';
import React, { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import AuthNavigator from "./navigation/AuthNavigator";
import HomeNavigator from "./navigation/HomeNavigator";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [settingChange, setSettingChange] = useState(false); 

  const [fontsLoaded] = useFonts({
    'kumarOne': require('./assets/fonts/KumarOne-Regular.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      //TODO Splashscreen loaded fonts expo website 
    }
  }, [fontsLoaded])
 

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user: ", user);
      setLoggedIn(!!user);
      setSettingChange(settingChange); 
    });
  }, []);

  if(!fontsLoaded){
    return null
  }

  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <Toast />
      <NavigationContainer>
      {loggedIn ? (
        <HomeNavigator loggedIn={loggedIn} setLoggedIn={setLoggedIn} setSettingChange={settingChange} />
      ) : (
        <AuthNavigator loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
    </NavigationContainer>
    </View>
    
  );
};

export default App;