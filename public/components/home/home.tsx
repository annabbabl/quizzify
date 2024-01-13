import {Image, ImageBackground, View } from "react-native";
import React, { useState } from "react";
import { CustomButton, Rectangle } from "../../components/common/shared/components";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons"; 
import { Item, HeaderButton, HeaderButtons, } from "react-navigation-header-buttons"; 
import '../../constants/'
import {containerStyles, imageStyles} from "../../styles/components.style";
import { IMAGES } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthRouterProps } from "../../navigation/routers/authRouter";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import Toast from "react-native-toast-message";



const Home = ({navigation, loggedIn, setLoggedIn}: AuthRouterProps) => {
    // Your translation and other necessary hooks
    const {t} = useTranslation()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
      try{
        setLoading(true); 
        const response = await FIREBASE_AUTH.signOut()
        console.log(response)
        Toast.show({
          type: 'success',
          text1:  'logged ot Successfully!',
        });
        setLoggedIn(false); 
      }catch(error: any){
        console.log(error, error)
        Toast.show({
          type: 'error',
          text1:  'logging out failed',
        });
        setLoading(false); 
      }
    }            

    return (
        <SafeAreaView style={containerStyles.container}>
          <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="resize"style={imageStyles.backgroundImage}>
            <Rectangle label={(t('welcomeName') + FIREBASE_AUTH.currentUser.displayName)}/>
            <Image source={IMAGES.LOGO} style={imageStyles.image1}/>
            <CustomButton label={'log Out'} onPress={handleLogout} />

            <View style={containerStyles.bottom}>
              <CustomButton label={t('startGame')} />
              <CustomButton label={t('joynGame')} />
            </View>
          </ImageBackground>
        </SafeAreaView>
    );
};

const HeaderButtonComponent = (props) => ( 
  <HeaderButton 
    IconComponent={Ionicons} 
    iconSize={23} 
    color="#FFF"
    {...props} 
  /> 
); 
  
Home.navigationOptions = (navData) => { 
  return { 
    headerTitle: "Home", 
    headerRight: () => ( 
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}> 
        <Item 
          title="Setting"
          iconName="ios-settings-outline"
          onPress={() => navData.navigation.navigate("Setting")} 
        /> 
      </HeaderButtons> 
    ), 
  }; 
}; 
  

export default Home;