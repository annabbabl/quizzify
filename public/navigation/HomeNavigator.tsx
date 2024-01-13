// HomeNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "../components/home/sidebar";
import Home from "../components/home/home";
import sideBarItems from "../constants/sideBarItems";

const Drawer = createDrawerNavigator();

const HomeNavigator = ({ loggedIn, setLoggedIn }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
          <Drawer.Screen name="Home">
            {(props) => <Home {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Drawer.Screen>
    {sideBarItems.map((sideBarItem, index) => (
        <Drawer.Screen name={sideBarItem.screenName} component={sideBarItem.component} key={index}/> 
    ))}
    </Drawer.Navigator>
  );
}

export default HomeNavigator; 