import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, TextInput, View, } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { CustomButton, CustomLink, CustomTitle } from '../../common/shared/components';
import {containerStyles, imageStyles, styles} from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, IMAGES, SHADOWS } from "../../../constants";
import '../../../constants/i18next'
import { FIREBASE_AUTH, FIREBASE_APP } from '../../../firebaseConfig'
import Toast from 'react-native-toast-message';
import { NavigationProp } from '@react-navigation/native';


interface RouterProps{
  navigation: NavigationProp<any, any>
}

const RegistrationScreen = ({navigation}: RouterProps) => {
    const {t} = useTranslation()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const users = FIREBASE_APP.firestore().collection('users')

    
    const handleRegistration = async () => {
      setLoading(true); 
      try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        console.log(response)

        await updateProfile(response.user, { displayName: username });

        Toast.show({
          type: 'success',
          text1:  t('registeredSuccessfull'),
        });
      }catch(error: any){
        console.log(error)
        setLoading(false); 
        Toast.show({
          type: 'error',
          text1:  ('registrationFail'),
        });
        setLoading(false); 
      }
    };
  
    return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="scale" resizeMode="cover"style={imageStyles.backgroundImage}>
          <CustomTitle label={t('registration')} />
            <TextInput style={[styles.input, SHADOWS.middle]} value= {username} editable={true} placeholder={t('name')} onChangeText={(username) => setUsername(username)} />
            <TextInput style={[styles.input, SHADOWS.middle]} value= {email} editable={true} placeholder={t('email')} onChangeText={(email) => setEmail(email)} />
            <TextInput style={[styles.input, SHADOWS.middle]} value= {password} editable={true} placeholder={t('pw')} secureTextEntry={true} onChangeText={(pw) => setPassword(pw)}/>
          
          <View style={containerStyles.bottom}>
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor}/>
            ) : (
              <CustomButton label={t('registration')} onPress={handleRegistration} />
              )}
            <CustomLink label={t('backToLogin')} onPress={()=>{navigation.navigate("Login")}} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
          
};

export default RegistrationScreen
