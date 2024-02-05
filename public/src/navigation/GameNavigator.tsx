import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EnteredQuizData, GameNavigatorProps } from "./routers";
import { EnterAmountOfQuestions, EnterCategoryScreen, EnterNameScreen, InitializedGameScreen } from "../components/game/enterQuizData";
import { FIREBASE_AUTH, FIRESTORE } from "../firebase/firebaseConfig";
import { QuestionEdit } from "../types/localTypes/editTypes";
import { capitalizeFirstLetter, capitalizeKeys } from "../appFunctions/utils";
import GameScreen from "../components/game/gameScreen";

const GameNavigator = createNativeStackNavigator();


const GameNavigatorScreens = ({ navigation, quizName, gameCode, gameQuestions, gameStarted, setGameStarted }: EnteredQuizData) =>{
                                    

  const [categories, setCategories] = useState([] as string[]);

  const [ quizCategory , setQuizCategory ] = useState('')
  const [loading, setLoading] = useState(false)
  console.log(gameCode)


  return (
    <GameNavigator.Navigator>
         <GameNavigator.Screen
          name="GameScreen"
          options={{ headerShown: false }}
        >
            {(props) => (
                <GameScreen 
                  {...props} 
                  quizName={quizName} 
                  navigation={navigation} 
                  gameCode={gameCode}
                  setGameStarted={setGameStarted}
                  gameQuestions={gameQuestions}
                  gameStarted={gameStarted}
                />
            )}
        </GameNavigator.Screen>
      {/* <GameNavigator.Screen
        name="EnterNameScreen"
        options={{ headerShown: false }}
      >
         {(props) => (
                <EnterNameScreen {...props} 
                  categories={categories} 
                  navigation={navigation}
                  setQuizName={setQuizName}
                  quizName={quizName}
                  redirectToCategories={categories ? true: false}
                />
            )}
        </GameNavigator.Screen> */}
    
    </GameNavigator.Navigator>
  );
}
export default GameNavigatorScreens; 