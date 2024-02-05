import { NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native";
import { CustomTitle } from "../common/shared/components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { containerStyles } from "../../styles/components.style";
import { EnteredQuizData, GameNavigatorProps } from "../../navigation/routers";

const GameScreen = ({
    quizName,
    gameCode,
    gameQuestions,
    setGameStarted, 
    navigation
    }: EnteredQuizData) => {
    const {t} = useTranslation()

    const [loading, ] = useState(false)
   
    return (
      <SafeAreaView style={containerStyles.container}>
        <NativeBaseProvider>
        
        <CustomTitle label={gameCode}/>
        <CustomTitle label={"gamecode"}/>
       
        </NativeBaseProvider>
      </SafeAreaView>
    );
          
};
export default GameScreen; 