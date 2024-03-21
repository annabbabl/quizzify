import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EnteredQuizData } from "./routers";
import { EnterAmountOfQuestions, EnterCategoryScreen, EnterNameScreen, InitializedGameScreen } from "../components/game/enterQuizData";
import { FIREBASE_AUTH, FIRESTORE } from "../firebase/firebaseConfig";
import { QuestionEdit } from "../types/localTypes/editTypes";
import { capitalizeKeys } from "../appFunctions/utils";
import GameNavigatorScreens from "./GameNavigator";

const InitializeQuizNavigator = createNativeStackNavigator();

const InitializeQuizNavigatorScreens = ({ navigation }: EnteredQuizData) => {

                                    
  const questionCollection = FIRESTORE.collection('questions').where('createdBy', '==', FIREBASE_AUTH?.currentUser?.uid);

  const [gameQuestions, setGameQuestions] = useState([] as QuestionEdit[]);
  const [questions, setQuestions] = useState([] as QuestionEdit[]);
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

      setQuestions(updatedQuestions)

      const newCategories = updatedQuestions
        .map((question: QuestionEdit) => question.category)
        .filter((category) => typeof category === 'string' && category.trim() !== ''); 
  
      setCategories((prevCategories: any) => {
        const uniqueCategories = Array.from(new Set([...prevCategories, ...newCategories]));
        return uniqueCategories;
      });
      setLoading(false);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <InitializeQuizNavigator.Navigator >
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
                  redirectToCategories={categories && categories.length > 0 ? true: false}
                  initQuiz={questions && questions.length > 0 ? true: false}
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
                  questions={questions}
                  quizCategory={quizCategory} 
                  quizName={quizName} 
                  navigation={navigation} 
                  setGameCode={setGameCode}
                  setGameQuestions={setGameQuestions}
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