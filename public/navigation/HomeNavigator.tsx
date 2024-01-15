import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "../components/home/sidebar";
import Home from "../components/home/home";
import sideBarItems from "../constants/sideBarItems";
import Profile from "../components/sideBarScreens/profile";

const Drawer = createDrawerNavigator();

const HomeNavigator = ({ setSettingChange }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
      {/* Add other screens from sideBarItems as needed */}
      {sideBarItems.map((sideBarItem, index) => (
        sideBarItem.screenName === 'profile' ? (
          <Drawer.Screen name="Profile">
            {(props) => (
              <Profile {...props}  setSettingChange={setSettingChange} />
            )}
          </Drawer.Screen>
        ) : (
          <Drawer.Screen name={sideBarItem.screenName} component={sideBarItem.component} key={index} />
        )
      ))}
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
