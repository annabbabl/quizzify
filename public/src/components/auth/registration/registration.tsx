import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, View } from 'react-native';
import {containerStyles, imageStyles} from "../../../styles/components.style";
import { COLORS, IMAGES } from "../../../constants"
import '../../../constants/i18next'
import { CustomButton, CustomLink, CustomTitle } from '../../common/shared/components';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { AuthRouterProps } from '../../../navigation/routers';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { FIREBASE_AUTH, FIRESTORE } from '../../../firebase/firebaseConfig';
import { NavigationProp } from '@react-navigation/native';
import { UserEdit } from 'types/localTypes/editTypes';


type AuthProps = {
  navigation: NavigationProp<any>;
};

const RegistrationScreen = ({ navigation }: AuthProps) => {
  const {t} = useTranslation()
  const auth = FIREBASE_AUTH
  const [email, setEmail] = useState('')
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const register = async () => {
    try{
      setLoading(true)
      const response = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(response.user, {displayName: username})
      const userCollection = FIRESTORE.collection("users")
      const userData: UserEdit = {
        email: email, 
        password: password, 
        username: username, 
        loggedIn: true
      }
      userCollection.doc(response.user.uid).set(userData)
      console.log(t('signUpSuccessfull'))
      navigation.navigate('Root', { screen: 'Home' });
    }catch(error: any){
      console.log(error, error)
      console.log(t('signUpFail'))
    }finally{
      setLoading(false)
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND}  resizeMethod="scale"  style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
        <View style={{alignItems:'center'}}>
          <CustomTitle label={t('Register')}/>
        </View> 
        <TextInput
              label={(t('username'))}
              value={username}
              right={<TextInput.Icon icon="account" />}
              onChangeText={(password) => setusername(password)}
              placeholder={t('username')}
              style={{ marginTop: 30,marginBottom: 20}}
          />        
          <TextInput
              label={t('email')}
              value={email}
              right={<TextInput.Icon icon="email" />}
              onChangeText={(email: string) => setEmail(email)}
              placeholder={t('email')}
              style={{ marginBottom: 20}}
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
                <CustomLink label={t('login')} onPress={()=>{navigation.navigate("Login")}} style={{marginBottom: 20}} />
                <CustomButton label={t('register')} onPress={register}/>
              </View>
          )}
      </NativeBaseProvider>
      </ImageBackground>
    </KeyboardAvoidingView>
);
};
export default RegistrationScreen