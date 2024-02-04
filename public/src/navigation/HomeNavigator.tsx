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

const Drawer = createDrawerNavigator();

const HomeNavigator: React.FC<SideBarRouterProps & { navigation?: DrawerNavigationHelpers, 
                                      initiatingQuiz: boolean,
                                      setInitiatingQuiz: React.Dispatch<React.SetStateAction<boolean>>, 
                                      setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; }>
                                      
                                      = ({ navigation, setInitiatingQuiz, setLoggedIn, initiatingQuiz, setQuestions }: AuthRouterProps & SideBarRouterProps) => {

  const navigateToScreen = (screenName: string) => {
    navigation?.navigate(screenName, { editing: false, adding: false });
  };
  const [, setSettingChange] = useState(false); // Track if quiz is being initiated
  console.log(initiatingQuiz, 728123)

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
          >
            {(props) => (
              <Profile {...props} setSettingChange={setSettingChange}/>
            )}
          </Drawer.Screen>
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
            name={(sideBarItem  && sideBarItem.screenName ? sideBarItem.screenName : '')}
            component={sideBarItem.component}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                navigateToScreen((sideBarItem  && sideBarItem.screenName ? sideBarItem.screenName : ''));
              },
            }}
          />
        )
      ))}
      <Drawer.Screen 
        name="InitializeQuizNavigatorScreens"
        component={InitializeQuizNavigatorScreens}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;