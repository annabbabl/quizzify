import { SafeAreaView, View, ImageBackground} from "react-native";
import { Image } from "react-native";
import React from "react";
import { CustomButton } from "../../components/common/shared/components";
import { useTranslation } from "react-i18next";
import '../../constants/'
import {containerStyles, imageStyles} from "../common/shared/components.style";
import { IMAGES } from "../../constants";

const Home = ({navigation}) => {
    // Your translation and other necessary hooks
    const {t} = useTranslation()
    
    return (
        <SafeAreaView style={containerStyles.container}>
          <ImageBackground source={IMAGES.BACKGROUND} style={imageStyles.backgroundImage}>
            <Image source={IMAGES.LOGO} style={imageStyles.image2}/>
            <View style={containerStyles.bottom}>
              <CustomButton label={t('startGame')} />
              <CustomButton label={t('joynGame')} />
            </View>
          </ImageBackground>
        </SafeAreaView>
    );
};

export default Home;