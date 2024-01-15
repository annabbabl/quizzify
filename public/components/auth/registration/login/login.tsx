import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {containerStyles, imageStyles, styles} from "../../../../styles/components.style";
import { COLORS, IMAGES, SHADOWS } from "../../../../constants"
import '../../../../constants/i18next'
import { CustomButton, CustomLink, CustomTitle } from '../../../common/shared/components';
import { AuthRouterProps } from '../../../../navigation/routers';
import { NavigationProp } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { showErrorToast, showSuccessToast } from '../../../../constants/toasts';
import { FIREBASE_AUTH } from '../../../../firebaseConfig';


const LoginScreen = ({ navigation }: AuthRouterProps) => {
  const {t} = useTranslation()
  const auth = FIREBASE_AUTH


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try{
      setLoading(true)
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log(response)
      showSuccessToast('signUpSuccessfull')
      navigation.navigate('Root', { screen: 'Home' });
    }catch(error: any){
      console.log(error, error)
      showErrorToast('signUpFail')
    }finally{
      setLoading(false)
    }
  };

  
  return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.BACKGROUND}  resizeMethod="scale"  style={imageStyles.backgroundImage}>
          <CustomTitle label={t('login')} />
          <TextInput style={[styles.input1, SHADOWS.middle]} value= {email} editable={true} placeholder={t('email')} onChangeText={(email) => setEmail(email)} />
          <TextInput style={[styles.input1, SHADOWS.middle]} value= {password} editable={true} placeholder={t('pw')} secureTextEntry={true} onChangeText={(pw) => setPassword(pw)}/>
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
