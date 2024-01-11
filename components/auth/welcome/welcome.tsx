
import {Image, ImageBackground } from "react-native";
import {containerStyles, imageStyles} from "./welcome.style";
import '../../../constants/i18next'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton } from "../../common/shared/components";
import { IMAGES } from "../../../constants"


const Welcome = ({navigation}) => {
  const {t} = useTranslation()

  const navigateToLogin = () => {
      navigation.push('Login');
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.BACKGROUND} resizeMode="cover" style={imageStyles.backgroundImage} >
        <Image source={IMAGES.WELCOMESCREEN} style={imageStyles.image1}/>
        <Image source={IMAGES.LOGO} style={imageStyles.image1}/>
        <CustomButton label={t('clickMe')} onPress={navigateToLogin}/>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Welcome