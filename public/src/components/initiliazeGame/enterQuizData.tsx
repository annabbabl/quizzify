import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, View, } from 'react-native';
import { useTranslation } from "react-i18next";
import "../../constants/i18next"
import { TextInput } from "react-native-paper";
import { CheckIcon, NativeBaseProvider, Select } from 'native-base';
import { containerStyles, imageStyles } from '../../styles/components.style';
import { COLORS, IMAGES } from '../../constants';
import { CustomButton, CustomLink, CustomText, CustomTitle } from '../common/shared/components';
import { EnteredQuizData } from '../../navigation/routers';
import { QuestionEdit } from '../../types/localTypes/editTypes';
import NumericInput from 'react-numeric-input';


const NoTemplateScreen = ({navigation}) => {
  const {t} = useTranslation()

  const [loading, setLoading] = useState(false)

  return (
    <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
        <View style={{alignItems:'center'}}>
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
    if (redirectToCategories) {
      navigation.navigate('InitializeQuizNavigatorScreens', { screen: 'EnterCategoryScreen' });
    } else {
      navigation.navigate('InitializeQuizNavigatorScreens', { screen: 'EnterAmountOfQuestions' });
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
          <View style={{ alignItems: 'center' }}>
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
    console.log(1282)
   
    return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center'}}>
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
            }} mt={1} onValueChange={(category: string) => setQuizCategory?.(category)}>
            {categories?.map((category: string)=>
              <Select.Item label={category} value={category} />
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
      </KeyboardAvoidingView>
    );
          
};
const EnterAmountOfQuestions = ({navigation, numberOfQuestions, setInitiatingQuiz, setAmountOfQuestions}: EnteredQuizData) => {
    const {t} = useTranslation()

    const [loading, ] = useState(false)

   
  function startGame(): void {
    setAmountOfQUestions(numberOfQuestions)
    setInitiatingQuiz?.(false)
    throw new Error('Function not implemented.');
  }

    return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center'}}>
            <CustomTitle label={t('enterAmountOfQuestions')}/>
          </View> 
          <CustomText label={ numberOfQuestions?.toString()+ ' ' + t('questions'+ ' ' + t('availiable'))}/>
          <NumericInput 
            value={numberOfQuestions}
            onChange={(selectedAmount: number) => setAmountOfQuestions(selectedAmount)}
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1}
          />
          <View style={containerStyles.bottom}>
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor}/>
            ) : (
              <>
               <CustomLink label={t('back')} onPress={()=>{navigation?.navigate("EnterNameScreen")}} />
                <CustomButton label={t('startGame')} onPress={startGame} />
              </>
              )}
          </View>
          </NativeBaseProvider>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
          
};

export {  
  EnterCategoryScreen, 
  EnterAmountOfQuestions,
  EnterNameScreen, 
  NoTemplateScreen
}
