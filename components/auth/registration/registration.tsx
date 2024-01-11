import React from 'react';
import { ImageBackground } from 'react-native';
import { CustomButton, CustomInput, CustomLink, CustomTitle } from '../../common/shared/components';
import {containerStyles, imageStyles} from "../../common/shared/components.style";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMAGES } from "../../../constants";
import '../../../constants/i18next'



const RegistrationScreen = ({ navigation }) => {
    const {t} = useTranslation()

    const handleRegistration = () => {
      console.log("register")
    };

    const navigateToRegistration = () => {
      navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={containerStyles.container}>
          <ImageBackground source={IMAGES.BACKGROUND} style={imageStyles.backgroundImage}>
            <CustomTitle label={t('login')} />
            <CustomInput label={t('name')} />
            <CustomInput label={t('email')} />
            <CustomInput label={t('pw')} secureTextEntry={true} />
            <CustomButton label={t('register')} onPress={handleRegistration} />
            <CustomLink label={t('backToLogin')} onPress={navigateToRegistration} />
          </ImageBackground>
        </SafeAreaView>
    );
};
    

export default RegistrationScreen
