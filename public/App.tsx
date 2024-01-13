import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import AuthNavigator from "./navigation/AuthNavigator";
import HomeNavigator from "./navigation/HomeNavigator";


const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user: ", user);
      setLoggedIn(!!user); 
    });
  }, []);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <HomeNavigator loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      ) : (
        <AuthNavigator loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
    </NavigationContainer>
  );
};

export default App;