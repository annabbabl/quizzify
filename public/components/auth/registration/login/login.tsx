import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth'
import {containerStyles, imageStyles, styles} from "../../../../styles/components.style";
import { COLORS, IMAGES, SHADOWS } from "../../../../constants"
import '../../../../constants/i18next'
import { CustomButton, CustomLink, CustomTitle } from '../../../common/shared/components';
import { FIREBASE_AUTH } from '../../../../firebaseConfig'
import { AuthRouterProps } from '../../../../navigation/routers/authRouter';


const LoginScreen = ({ navigation, loggedIn, setLoggedIn}: AuthRouterProps) => {
  const {t} = useTranslation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH

  const handleLogin = async () => {
    try{
      setLoading(true); 
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log(response)
      Toast.show({
        type: 'success',
        text1:  t('signUpSuccessfull'),
      });
      setLoggedIn(true); 
      navigation.navigate('Root', { screen: 'Home' });
    }catch(error: any){
      console.log(error, error)
      Toast.show({
        type: 'error',
        text1:  t('signUpFail'),
      });
      setLoading(false); 
    }
  };

  return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.BACKGROUND}  resizeMethod="scale"  style={imageStyles.backgroundImage}>
          <CustomTitle label={t('login')} />
          <TextInput style={[styles.input, SHADOWS.middle]} value= {email} editable={true} placeholder={t('email')} onChangeText={(email) => setEmail(email)} />
          <TextInput style={[styles.input, SHADOWS.middle]} value= {password} editable={true} placeholder={t('pw')} secureTextEntry={true} onChangeText={(pw) => setPassword(pw)}/>
          <CustomLink label={t('noAccount')} onPress={()=>{navigation.navigate("Registration")}} />
          <View style={containerStyles.bottom}>
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
              <CustomButton label={t('login')} onPress={handleLogin}/>
            )}
          </View>
          </ImageBackground> 
      </KeyboardAvoidingView>
  );
};


export default LoginScreen;
