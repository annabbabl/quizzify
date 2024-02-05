import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EnteredQuizData } from "./routers";
import { EnterAmountOfQuestions, EnterCategoryScreen, EnterNameScreen, InitializedGameScreen } from "../components/game/enterQuizData";
import { FIREBASE_AUTH, FIRESTORE } from "../firebase/firebaseConfig";
import { QuestionEdit } from "../types/localTypes/editTypes";
import { capitalizeFirstLetter, capitalizeKeys } from "../appFunctions/utils";
import GameNavigatorScreens from "./GameNavigator";

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
                                    navigation, 
                                    initiatingQuiz,
                                  }: InitializeQuizNavigatorProps) =>{
                                    
  const questionCollection = FIRESTORE.collection('questions').where('createdBy', '==', FIREBASE_AUTH?.currentUser?.uid);

  const [gameQuestions, setGameQuestions] = useState([] as QuestionEdit[]);
  const [categories, setCategories] = useState([] as string[]);

  const [ quizCategory , setQuizCategory ] = useState('')
  const [ quizName , setQuizName ] = useState('')
  const [ gameCode , setGameCode ] = useState("")
  const [loading, setLoading] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)


  useEffect(() => {
    setLoading(true);
  
    const unsubscribe = questionCollection.onSnapshot(async (querySnapshot) => {
      const updatedQuestions = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const questionData = { id: doc.id, ...doc.data() };
          const possibleAnswersDoc = await doc.ref.collection('possibleAnswers').get();
          const possibleAnswers = possibleAnswersDoc.docs.map((answerDoc) => answerDoc.data());
          const capitalizedQuestionData = capitalizeKeys(questionData);

  
          return { ...capitalizedQuestionData, possibleAnswers };
        })
      );
  
      updatedQuestions.sort((q1: QuestionEdit, q2: QuestionEdit) =>
        (q1 && q1.category ? q1.category : '').localeCompare(q2 && q2.category ? q2.category : '')
      );
      setGameQuestions(updatedQuestions);
  
      setCategories(
        updatedQuestions
          ? Array.from(new Set(updatedQuestions.map((question: QuestionEdit) => question.category)))
          : []
      );
      setLoading(false);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

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
                  redirectToCategories={categories ? true: false}
                />
            )}
        </InitializeQuizNavigator.Screen>
      {categories && categories.length > 0  ? (
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
                  quizName={quizName} 
                  questions={gameQuestions} 
                  navigation={navigation} 
                  setGameCode={setGameCode}
                  setQuestions={setGameQuestions}
                />
            )}
        </InitializeQuizNavigator.Screen>
       <InitializeQuizNavigator.Screen
            name="InitializedGameScreen"
            options={{ headerShown: false }}
        >
            {(props) => (
                <InitializedGameScreen 
                  {...props} 
                  quizName={quizName} 
                  navigation={navigation} 
                  gameCode={gameCode}
                  setGameStarted={setGameStarted}
                  gameStarted={gameStarted}
                />
            )}
        </InitializeQuizNavigator.Screen>
        <InitializeQuizNavigator.Screen
          name="GameNavigatorScreens"
          options={{ headerShown: false }}
        >
            {(props) => (
                <GameNavigatorScreens 
                  {...props} 
                  quizName={quizName} 
                  navigation={navigation} 
                  gameCode={gameCode}
                  setGameStarted={setGameStarted}
                  gameQuestions={gameQuestions}
                  gameStarted={gameStarted}
                />
            )}
        </InitializeQuizNavigator.Screen>
    </InitializeQuizNavigator.Navigator>
  );
}
export default InitializeQuizNavigatorScreens; 