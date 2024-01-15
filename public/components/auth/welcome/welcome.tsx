
import {Image, ImageBackground, View } from "react-native";
import {containerStyles, imageStyles} from '../../../styles/components.style';
import '../../../constants/i18next'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton, HeaderRectangle } from "../../common/shared/components";
import { IMAGES } from "../../../constants";


const Welcome = ({navigation}) => {
  const {t} = useTranslation()

  const navigateToLogin = () => {
    navigation.push('Login');
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage} >
        <HeaderRectangle label={t('welcome')}/>
        <Image source={IMAGES.LOGO} style={imageStyles.image1}/>
        <View style={containerStyles.bottom}>
          <CustomButton label={t('clickMe')} onPress={navigateToLogin}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Welcome