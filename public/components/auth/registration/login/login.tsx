import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {containerStyles, imageStyles, styles} from "../../../../styles/components.style";
import { COLORS, IMAGES } from "../../../../constants"
import '../../../../constants/i18next'
import { CustomButton, CustomLink, CustomTitle } from '../../../common/shared/components';
import { AuthRouterProps } from '../../../../navigation/routers';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../../firebaseConfig';
import { NativeBaseProvider, Text } from 'native-base';
import { TextInput } from "react-native-paper";



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
      ShowedSnackbar(t('signUpSuccessfull'))
      navigation.navigate('Root', { screen: 'Home' });
    }catch(error: any){
      console.log(error, error)
      ShowedSnackbar(t('signUpFail'))
    }finally{
      setLoading(false)
    }
  };

  
  return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.BACKGROUND}  resizeMethod="scale"  style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center'}}>
            <CustomTitle label={t('login')}/>
          </View> 
            <TextInput
                label={t('email')}
                value={email}
                right={<TextInput.Icon icon="email" />}
                onChangeText={(email) => setEmail(email)}
                placeholder={t('email')}
                style={{marginTop: 30, marginBottom: 20}}
            />
            <TextInput
                label={(t('password'))}
                value={password}
                secureTextEntry
                right={<TextInput.Icon icon="onepassword" />}
                onChangeText={(password) => setPassword(password)}
                placeholder={t('pw')}
                style={{ marginBottom: 20}}
            />          
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
              <View style={containerStyles.bottom}>
                  <CustomLink label={t('noAccount')} onPress={()=>{navigation.navigate("Registration")}} style={{marginBottom: 20}} />
                  <CustomButton label={t('login')} onPress={handleLogin}/>
                </View>
            )}
        </NativeBaseProvider>
        </ImageBackground>
      </KeyboardAvoidingView>
  );
};

export default LoginScreen;
