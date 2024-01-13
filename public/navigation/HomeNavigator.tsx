// HomeNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "../components/home/sidebar";
import Home from "../components/home/home";

const Drawer = createDrawerNavigator();

const HomeNavigator = ({ loggedIn, setLoggedIn }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
          <Drawer.Screen name="Home">
            {(props) => <Home {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default HomeNavigator; 