import { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, View, } from 'react-native';
import { useTranslation } from "react-i18next";
import "../../constants/i18next"
import { TextInput } from "react-native-paper";
import { CheckIcon, NativeBaseProvider, Select } from 'native-base';
import { containerStyles, imageStyles } from '../../styles/components.style';
import { COLORS, IMAGES } from '../../constants';
import { CustomButton, CustomLink, CustomText, CustomTitle } from '../common/shared/components';
import { EnteredQuizData } from '../../navigation/routers';
import { Avatar, Card } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
import { QuizInitData } from '../../types/databaseTypes';
import firebase from 'firebase/compat';
import { generateGameCode, getRandomQuestions } from '../../appFunctions/utils';
import { QuestionEdit } from '../../types/localTypes/editTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE } from '../../firebase/firebaseConfig';
import { RouteProp } from '@react-navigation/native';


type InitProp = {
  navigation: NavigationProp<any>;
};


const NoTemplateScreen = ({navigation}: InitProp) => {
  const {t} = useTranslation()

  const [loading, setLoading] = useState(false)

  return (
    <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale"  style={imageStyles.backgroundImage}>
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

const EnterNameScreen = ({ navigation, quizName, setQuizName, redirectToCategories, initQuiz }: EnteredQuizData) => {
  const { t } = useTranslation();

  const [loading,] = useState(false);

  const navigateToNextScreen = () => {
    if( quizName && quizName.length > 0) {
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
      >
        <NativeBaseProvider>
          {initQuiz ? (
             <><View style={{ alignItems: 'center', marginTop: 15 }}>
              <CustomTitle label={t('enterQuizName')} />
            </View><TextInput
                label={t('name')}
                value={quizName}
                onChangeText={(quizName) => setQuizName?.(quizName)}
                placeholder={t('name')}
                style={{ marginTop: 30, marginBottom: 20, width: '80%' }} /></>
          ): (
            <CustomTitle label={t('cantPlay')} />
          )}
         
          <View style={containerStyles.bottom}>
            {loading ? (
              <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
              <>
                <CustomLink label={t('backToHome')} onPress={() => { navigation?.navigate("Home") }} />
                {initQuiz &&
                  <CustomButton label={t('continue')} onPress={navigateToNextScreen} />
                }
              </>
            )}
          </View>
        </NativeBaseProvider>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};


const EnterCategoryScreen = ({navigation, categories, setQuizCategory }: EnteredQuizData) => {
    const {t} = useTranslation()

    const [loading, ] = useState(false)
    const [defaultValue, setDefaultValue] = useState(categories?.[0])
   
    return (
      <SafeAreaView style={containerStyles.container}>
        <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale"  style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center', marginTop: 15}}>
            <CustomTitle label={t('selectCategory')}/>
          </View> 
          <Select 
            selectedValue={t('selectCategory')} 
            minWidth="200" 
            aria-label={t('selectCategory')} 
            placeholder={t('selectCategory')}
            defaultValue={defaultValue}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={(category: string) => {setQuizCategory?.(category); setDefaultValue(defaultValue)}}>
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
    setGameQuestions
  }
    : EnteredQuizData) => {
    const {t} = useTranslation()
    const gamesCollection = FIRESTORE.collection('games'); 

    const categoryQuestions = quizCategory && quizCategory.length > 0 ? questions?.filter((question: QuestionEdit)=>{return question.category === quizCategory}): questions
    const [loading, setLoading] = useState(false)
    const q = categoryQuestions ? categoryQuestions.length : questions?.length
    const [numberOfQuestions, setAmountOfQuestions] = useState(q ? q : 0);
    const [totalAmount, ] = useState((questions  ? questions.length : 0))

    
    const initGame = async () => {
      try {

        setLoading(true)

        if(quizName === '' || numberOfQuestions > totalAmount  || numberOfQuestions < 5 ){
          throw Error(t('missingInformation'))
        }

        const gameCode = generateGameCode()
        const randomizedQuestions = getRandomQuestions((categoryQuestions ? categoryQuestions: []), numberOfQuestions)

        const quizInitData: QuizInitData = {
          gameCode: gameCode,
          quizName: quizName ?  quizName : '', 
          quizCategory : quizCategory, 
          numberOfQuestions: numberOfQuestions, 
          createdBy: FIREBASE_AUTH?.currentUser?.uid ? FIREBASE_AUTH.currentUser.uid : '', 
          createdAt: firebase.firestore.Timestamp.now(),
          questions: randomizedQuestions,
          started: false, 
          initialized: true, 
          joinedUsers: [ {
            id: FIREBASE_AUTH.currentUser?.uid,
            username: FIREBASE_AUTH.currentUser?.displayName,
            currentPoints: 0,
          }],
          roundInformation: [], 
          winners: []
        }

        await gamesCollection.add(quizInitData)
        setGameCode?.((gameCode ? gameCode : ''))
        setGameQuestions?.(randomizedQuestions)

          
        console.log('Quiz init successfully!');
        console.log(t('quizInitSucc'))
        navigation?.navigate('InitializedGameScreen', { gameCode: gameCode})
      } catch (err) {
        console.error('Error init quiz:', err);
        console.log(t('quizInitError'))
      }
      finally{
        setLoading(false)
    }

    };

    const setTotalAmountOfQuestions = (number: number) =>{
      if(number < 5 || number > numberOfQuestions){
        return numberOfQuestions
      }else{ 
        return number
      }
    }

   

    return (
      <SafeAreaView style={containerStyles.container}>
        <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale"  style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center', marginTop: 15}}>
            <CustomTitle label={t('enterAmountOfQuestions')}/>
          </View> 
          <CustomText label={ numberOfQuestions.toString()+ ' ' + t('questions'+ ' ' + t('availiable'))}/>
          <NumericInput 
            value={numberOfQuestions}
            type='up-down'
            maxValue={numberOfQuestions}
            onChange={(numberOfQuestions: number) => setTotalAmountOfQuestions(numberOfQuestions)}
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
               <CustomLink label={t('back')} onPress={()=>{navigation?.navigate("EnterCategoryScreen")}} />
                <CustomButton label={t('startGame')} onPress={initGame} />
              </>
              )}
          </View>
          </NativeBaseProvider>
        </ImageBackground>
      </SafeAreaView>
    );
          
};

const InitializedGameScreen = ({ navigation, quizName, gameCode, setGameStarted, gameStarted }:  EnteredQuizData) => {
  const gamesCollection = FIRESTORE.collection('games'); 
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);


  const setStart = async () => {
    try {
      setLoading(true);
      const querySnapshot = await gamesCollection.where("gameCode", "==", gameCode).limit(1).get();
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
  
      const gameDoc = querySnapshot.docs[0];
      await gameDoc.ref.update({ started: true, initialized: false });
  
      // Fetch the updated game data  
      console.log('Document successfully updated!');
      console.log(t('gameStarted'));
  
      setGameStarted?.(true); // Assuming this function updates context or state higher up
    } catch (error) {
      console.error('Error updating document:', error);
      console.log(t('gameStartedError'));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        setStart()
        setGameStarted?.(true)
        console.log(gameStarted)

        clearInterval(timer);
        navigation.navigate('GameNavigatorScreens', {
          screen: 'GameScreen',
          params: { gameCode: gameCode },
      });

        console.log('Timer reached 0');
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [remainingTime]);

  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale"  style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
          {gameCode ? (
            <>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <CustomTitle label={t('quizInitSucc')} style={{marginBottom: 15}}/>
                <CustomText boldFactor={true} label={quizName + ' ' + t('startsIn') + ' ' + remainingTime} style={{marginBottom: 15}}/>
                <QRCode value={gameCode} size={200}  />
                <Card style={{ width: "80%", marginTop: 15}}>
                  <Card.Title
                    title={t('gameCode')}
                    subtitle={t('joynGame')}
                    left={(props) => <Avatar.Icon {...props} icon="gamepad" />}
                  />
                  <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <CustomText label={gameCode} textColor="black" />
                  </View>
                </Card>
              </View>
              <View style={containerStyles.bottom}>
                {loading ? (
                  <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
                ) : (
                  <>
                    <CustomButton label={t('cancel')} onPress={() => { navigation?.navigate('Home'); }} />
                    <CustomButton label={t('skipTime')} onPress={() => setRemainingTime(0)} />
                  </>
                )}
              </View>
            </>
          ) : (
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <CustomText label={t('quizCodeNotInit')} />
              <CustomLink label={t('back')} onPress={() => { navigation?.navigate("Home") }} />
            </View>
          )}
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