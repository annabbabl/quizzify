import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../components/auth/registration/registration";
import Home from "../components/home/home";
import { EnteredQuizData } from "./routers";
import { EnterAmountOfQuestions, EnterCategoryScreen, EnterNameScreen } from "../components/initiliazeGame/enterQuizData";

const InitializeQuizNavigator = createNativeStackNavigator();

interface InitializeQuizNavigatorProps extends EnteredQuizData {
    loggedIn : boolean, 
    setLoggedIn : any, 
    enablement: boolean, 
    setInitiatingQuiz: React.Dispatch<React.SetStateAction<boolean>>
}

const InitializeQuizNavigatorScreens = (
                                  {  
                                    loggedIn, 
                                    setLoggedIn, 
                                    categories, 
                                    navigation, 
                                    questions,
                                    initiatingQuiz,
                                    setInitiatingQuiz
                                  }: InitializeQuizNavigatorProps) =>{

  const [ quizCategory , setQuizCategory ] = useState('')
  const [ quizName , setQuizName ] = useState('')
  const [ numberOfQuestions , setAmountOfQUestions ] = useState(10)

  return (
    <InitializeQuizNavigator.Navigator>
      <InitializeQuizNavigator.Screen
        name="EnterNameScreen"
        options={{ headerShown: false }}
      >
         {(props) => (
                <EnterNameScreen {...props} 
                  categories={categories} 
                  navigation={navigation}
                  setQuizName={setQuizName}
                  quizName={quizName}
                  reedirectToCategories={categories ? true: false}
                />
            )}
        </InitializeQuizNavigator.Screen>
      {categories ? (
         <InitializeQuizNavigator.Screen
            name="EnterCategoryScreen"
            options={{ headerShown: false }}
        >
            {(props) => (
                <EnterCategoryScreen {...props} 
                  categories={categories} 
                  navigation={navigation}
                  setQuizCategory={setQuizCategory}
                  quizCategory={quizCategory}
                />
            )}
        </InitializeQuizNavigator.Screen>
      ): (
        <></>
      )}
       <InitializeQuizNavigator.Screen
            name="EnterAmountOfQuestions"
            options={{ headerShown: false }}
        >
            {(props) => (
                <EnterAmountOfQuestions 
                  {...props} 
                  quizCategory={quizCategory} 
                  setAmountOfQuestions={setAmountOfQUestions}
                  quizName={quizName} 
                  questions={questions} 
                  navigation={navigation} 
                  setInitiatingQuiz={setInitiatingQuiz}
                  numberOfQuestions={numberOfQuestions}
                />
            )}
        </InitializeQuizNavigator.Screen>
    </InitializeQuizNavigator.Navigator>
  );
}
export default InitializeQuizNavigatorScreens; 