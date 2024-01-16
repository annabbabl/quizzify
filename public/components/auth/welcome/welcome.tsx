
import {Image, ImageBackground, View } from "react-native";
import {containerStyles, imageStyles} from '../../../styles/components.style';
import '../../../constants/i18next'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton, HeaderRectangle } from "../../common/shared/components";
import { IMAGES } from "../../../constants";
import { NativeBaseProvider, Text } from "native-base";


const Welcome = ({navigation}) => {
  const {t} = useTranslation()

  const navigateToLogin = () => {
    navigation.push('Login');
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="scale" resizeMode="cover" style={imageStyles.backgroundImage} >
        <NativeBaseProvider>
          <View style={containerStyles.container}>
            <Text fontSize="6xl" bold>{t('welcome')}</Text>
            <Image source={IMAGES.LOGO} style={imageStyles.image1}/>
          </View>
          <View style={containerStyles.bottom}>
              <CustomButton label={t('clickMe')} onPress={navigateToLogin}/>
          </View>
        </NativeBaseProvider>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Welcome