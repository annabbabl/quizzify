import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "../components/home/sidebar";
import Profile from "../components/sideBarScreens/profile";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import QuestionsScreenNavigator from "./QuestionScreenNavigator";
import sideBarItems from "../constants/barItems/sideBarItems";
import { AuthRouterProps, SideBarRouterProps } from "./routers";
import Home from "../components/home/home";
import InitializeQuizNavigatorScreens from "./InitializeQuizNavigation";
import GameNavigatorScreens from "./GameNavigator";


const Drawer = createDrawerNavigator();

const HomeNavigator: React.FC<SideBarRouterProps & { navigation?: DrawerNavigationHelpers, 
                                      initiatingQuiz: boolean,
                                      setInitiatingQuiz: React.Dispatch<React.SetStateAction<boolean>>, 
                                      setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; }>
                                      
                                      = ({ navigation }: AuthRouterProps & SideBarRouterProps) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />} >
      {sideBarItems.map((sideBarItem, index) => (
         sideBarItem.screenName === 'home' ? (
          <Drawer.Screen
            key={index}
            name="Home"
            component={Home}
          >
      
          </Drawer.Screen>):
        sideBarItem.screenName === 'profile' ? (
          <Drawer.Screen
            key={index}
            name="Profile" 
            component={Profile}
          />        
        ) : sideBarItem.screenName === 'questions' ? (
          // Use QuestionsScreenNavigator for 'questions' screen
          <Drawer.Screen
            key={index}
            name="Questions"
            component={QuestionsScreenNavigator}
            options={{ title: 'Questions' }}
          />
        ) : (
           <Drawer.Screen
            key={index}
            name={(sideBarItem && sideBarItem.screenName ? sideBarItem.screenName : '')}
            component={sideBarItem.component}
            options={{
              title: sideBarItem.screenName === "questions" ? "Questions" : undefined
            }}
          />
        )
      ))}
      <Drawer.Screen 
        name="InitializeQuizNavigatorScreens"
        options={{ headerShown: false }}
        component={InitializeQuizNavigatorScreens}
      />
      <Drawer.Screen 
        name="GameNavigatorScreens"
        options={{ headerShown: false }}
        component={GameNavigatorScreens}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;