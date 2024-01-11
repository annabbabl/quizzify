import React from 'react';
import { ImageBackground, SafeAreaView,  } from 'react-native';
import { useTranslation } from 'react-i18next';
import {containerStyles, imageStyles} from "../../../common/shared/components.style";
import { IMAGES } from "../../../../constants"
import '../../../../constants/i18next'
import { CustomButton, CustomInput, CustomLink, CustomTitle } from '../../../common/shared/components';


const LoginScreen = ({ navigation }) => {
  const {t} = useTranslation()

  const navigateToRegistration = () => {
    navigation.navigate('Registration');
  };
  const handleLogin = () => {
    console.log("login")
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.BACKGROUND} style={imageStyles.backgroundImage}>
        <CustomTitle label={t('login')} />
        <CustomInput label={t('email')} />
        <CustomInput label={t('pw')} secureTextEntry={true} />
        <CustomButton label={t('login')} onPress={handleLogin} />
        <CustomLink label={t('noAccount')} onPress={navigateToRegistration} />
      </ImageBackground>
    </SafeAreaView>
  );
};


export default LoginScreen;
