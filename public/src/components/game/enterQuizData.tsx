import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, View, } from 'react-native';
import { useTranslation } from "react-i18next";
import "../../constants/i18next"
import { TextInput } from "react-native-paper";
import { CheckIcon, NativeBaseProvider, Select } from 'native-base';
import { containerStyles, imageStyles } from '../../styles/components.style';
import { COLORS, IMAGES } from '../../constants';
import { CustomButton, CustomLink, CustomText, CustomTitle } from '../common/shared/components';
import { EnteredQuizData } from '../../navigation/routers';
import { Avatar, Card, IconButton } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
import { QuizInitData } from '../../types/databaseTypes';
import firebase from 'firebase/compat';
import { FIRESTORE, FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { generateGameCode, getRandomQuestions } from '../../appFunctions/utils';
import { QuestionEdit } from '../../types/localTypes/editTypes';
import { SafeAreaView } from 'react-native-safe-area-context';


const NoTemplateScreen = ({navigation}) => {
  const {t} = useTranslation()

  const [loading, setLoading] = useState(false)

  return (
    <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
        <View style={{alignItems:'center', marginTop: 15}}>
          <CustomTitle label={t('noTemplate')}/>
          <CustomText label={t('wantToContinue')}/>
        </View> 
        <View style={containerStyles.bottom}>
          {loading ? 
            (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor}/>
          ) : (
            <>
             <CustomLink label={t('backToHome')} onPress={()=>{navigation.navigate("Home")}} />
              <CustomButton label={t('continue')} onPress={()=>{navigation.navigate("EnterNameScreen")}} />
            </>
            )}
        </View>
        </NativeBaseProvider>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
          
};

const EnterNameScreen = ({ navigation, quizName, setQuizName, redirectToCategories }: EnteredQuizData) => {
  const { t } = useTranslation();

  const [loading,] = useState(false);

  const navigateToNextScreen = () => {
    if(quizName.length > 0) {
      if (redirectToCategories) {
        navigation.navigate('InitializeQuizNavigatorScreens', { screen: 'EnterCategoryScreen' });
      } else {
        navigation.navigate('InitializeQuizNavigatorScreens', { screen: 'EnterAmountOfQuestions' });
      }
    }
    else{
      console.log(t('plsEnterQuizName'))
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
      <ImageBackground
        source={IMAGES.WAVY_BACKGROUND}
        style={[containerStyles.container, imageStyles.backgroundImage]}
        resizeMethod="scale"
        resizeMode="cover"
      >
        <NativeBaseProvider>
          <View style={{ alignItems: 'center', marginTop: 15}}>
            <CustomTitle label={t('enterQuizName')} />
          </View>
          <TextInput
            label={t('name')}
            value={quizName}
            onChangeText={(quizName) => setQuizName?.(quizName)}
            placeholder={t('name')}
            style={{ marginTop: 30, marginBottom: 20, width: '80%' }}
          />
          <View style={containerStyles.bottom}>
            {loading ? (
              <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
              <>
                <CustomLink label={t('backToHome')} onPress={() => { navigation?.navigate("Home") }} />
                <CustomButton label={t('continue')} onPress={navigateToNextScreen} />
              </>
            )}
          </View>
        </NativeBaseProvider>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};


const EnterCategoryScreen = ({navigation, categories, quizCategory, setQuizCategory }: EnteredQuizData) => {
    const {t} = useTranslation()

    const [loading, ] = useState(false)
   
    return (
      <SafeAreaView style={containerStyles.container}>
        <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center', marginTop: 15}}>
            <CustomTitle label={t('selectCategory')}/>
          </View> 
          <Select 
            selectedValue={t('selectCategory')} 
            minWidth="200" 
            accessibilityLabel={t('selectCategory')} 
            placeholder={t('selectCategory')} 
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={(category: string) => {setQuizCategory?.(category); console.log(category)}}>
            {categories?.map((category: string, index: number)=>
              <Select.Item label={category} value={category} key={index} />
            )}
          </Select>
          <View style={containerStyles.bottom}>
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor}/>
            ) : (
              <>
               <CustomLink label={t('back')} onPress={()=>{navigation?.navigate("EnterNameScreen")}} />
                <CustomButton label={t('continue')} onPress={()=>{navigation?.navigate("EnterAmountOfQuestions")}} />
              </>
              )}
          </View>
          </NativeBaseProvider>
        </ImageBackground>
      </SafeAreaView>
    );
          
};


const EnterAmountOfQuestions = ({
    navigation, 
    setGameCode, 
    quizName, 
    quizCategory, 
    questions, 
    setQuestions
  }
    : EnteredQuizData) => {
    const {t} = useTranslation()
    const gamesCollection = FIRESTORE.collection('games'); 

    const categoryQuestions = quizName && quizName.length > 0 ? questions.filter((question: QuestionEdit)=>{return question.category === quizCategory}): questions
       
    const [loading, setLoading] = useState(false)
    const [numberOfQuestions,setAmountOfQuestions] = useState(questions.length)

    const [totalAmount, ] = useState(questions.length)
    
    const initGame = async () => {
      try {

        setLoading(true)

        if(quizName === '' || numberOfQuestions > totalAmount  || numberOfQuestions < 5 ){
          throw Error(t('missingInformation'))
        }

        const gameCode = generateGameCode()
        const randomizedQuestions = getRandomQuestions(categoryQuestions, numberOfQuestions)

        const quizInitData: QuizInitData = {
          gameCode: gameCode,
          quizName: quizName, 
          quizCategory : quizCategory, 
          numberOfQuestions: numberOfQuestions, 
          createdBy: FIREBASE_AUTH.currentUser.uid, 
          createdAt: firebase.firestore.Timestamp.now(),
          questions: randomizedQuestions
        }

        await gamesCollection.add(quizInitData)
        setGameCode(gameCode)
        setQuestions(randomizedQuestions)

          
        console.log('Quiz init successfully!');
        console.log(t('quizInitSucc'))
        navigation?.navigate('InitializedGameScreen')
      } catch (error) {
        console.error('Error init quiz:', error.message);
        console.log(t('quizInitError'))
      }
      finally{
        setLoading(false)
    }

  };


    return (
      <SafeAreaView style={containerStyles.container}>
        <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center', marginTop: 15}}>
            <CustomTitle label={t('enterAmountOfQuestions')}/>
          </View> 
          <CustomText label={ totalAmount.toString()+ ' ' + t('questions'+ ' ' + t('availiable'))}/>
          <NumericInput 
            value={numberOfQuestions}
            type='up-down'
            maxValue={totalAmount}
            onChange={(numberOfQuestions: number) => setAmountOfQuestions(numberOfQuestions)}
            onLimitReached={(totalAmount) => console.log(totalAmount,t('maxValMsg'))}
            totalWidth={140} 
            totalHeight={50} 
            iconSize={25}
            minValue={5}
            step={1}
            valueType='integer'
            rounded 
            textColor='black' 
            rightButtonBackgroundColor={COLORS.secondaryColor} 
            leftButtonBackgroundColor={COLORS.secondaryColor} 
            upDownButtonsBackgroundColor={COLORS.secondaryColor} 
          />
          <View style={containerStyles.bottom}>
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor}/>
            ) : (
              <>
               <CustomLink label={t('back')} onPress={()=>{navigation?.navigate("EnterNameScreen")}} />
                <CustomButton label={t('startGame')} onPress={initGame} />
              </>
              )}
          </View>
          </NativeBaseProvider>
        </ImageBackground>
      </SafeAreaView>
    );
          
};

const InitializedGameScreen = ({ navigation, quizName, gameCode, setGameStarted, gameStarted }: EnteredQuizData) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // 60 seconds = 1 minute

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        setGameStarted(true)
        console.log(gameStarted)

        clearInterval(timer);
        // Timer has reached 0, you can perform actions here
        console.log('Timer reached 0');
        navigation?.navigate('GameNavigatorScreens')
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [remainingTime]);

  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
        {gameCode.length > 0 ? (
           <><View style={{ alignItems: 'center', marginTop: 20 }}>
              <CustomTitle label={t('quizInitSucc')} />
              <CustomText  boldFactor={true} label={quizName+ ' ' + t('startsIn') + ' ' + remainingTime} />
              <Card style={{width: "80%"}}>
                <Card.Title
                  title={t('gameCode')}
                  subtitle={t('joynGame')}
                  left={(props) => <Avatar.Icon {...props} icon="gamepad" />}
                />
                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                  <CustomText label={gameCode} textColor="black"/>
                </View>
              </Card>
             
            </View><View style={containerStyles.bottom}>
                {loading ? (
                  <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
                ) : (
                  <>
                    <CustomButton label={t('cancel')} onPress={() => { navigation?.navigate('Home'); } } />
                    <CustomButton label={t('continue')} onPress={() => { navigation?.navigate('EnterAmountOfQuestions'); } } />
                  </>
                )}
              </View></>
          ): (
            <><View style={{ alignItems: 'center', marginTop: 15 }}>
              <CustomText label={t('quizCodeNotInit')} />
              <CustomLink label={t('back')} onPress={()=>{navigation?.navigate("Home")}} />
            </View></>
          )
        }
         
        </NativeBaseProvider>
      </ImageBackground>
    </SafeAreaView>
  );
};

export {  
  EnterCategoryScreen, 
  EnterAmountOfQuestions,
  EnterNameScreen, 
  NoTemplateScreen, 
  InitializedGameScreen
}
