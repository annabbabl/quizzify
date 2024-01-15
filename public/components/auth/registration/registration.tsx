import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, TextInput, View, } from 'react-native';
import { CustomButton, CustomLink, CustomTitle } from '../../common/shared/components';
import {containerStyles, imageStyles, styles} from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { COLORS, IMAGES, SHADOWS } from "../../../constants";
import '../../../constants/i18next'
import { NavigationProp } from '@react-navigation/native';
import { showErrorToast, showSuccessToast } from '../../../constants/toasts';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../../../types/database';
import { FIREBASE_AUTH, FIRESTORE } from '../../../firebaseConfig';


interface RouterProps{
  navigation: NavigationProp<any, any>
}

const RegistrationScreen = ({navigation}: RouterProps) => {
    const {t} = useTranslation()
    const usersCollection = FIRESTORE.collection('users');

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegistration = async () => {
      try{
        setLoading(true)

        if(username === null){
          showErrorToast('registrationFail')
        }else{
          const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        
          const newUser : User = {
            id: response.user.uid,
            email: email,
            username: username,
            loggedIn: false,
            password: password
          }

          usersCollection.add(newUser)
            .then(async (docRef) => {
              console.log('Document written with ID:', docRef.id);
              await updateProfile(response.user, { displayName: username });
              showSuccessToast('registrationFail')
            })
            .catch((error) => {
              console.error('Error adding document:', error);
              showErrorToast('registeredSuccessfull'); 
          });    
        }
      }catch(error: any){
        console.log(error)
        showErrorToast('registrationFail'); 
      }finally{
        setLoading(false)
      }
    };

    
    return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="scale" resizeMode="cover"style={imageStyles.backgroundImage}>
          <CustomTitle label={t('registration')} />
            <TextInput style={[styles.input1, SHADOWS.middle]} value= {username} editable={true} placeholder={t('name')} onChangeText={(username) => setUsername(username)} />
            <TextInput style={[styles.input1, SHADOWS.middle]} value= {email} editable={true} placeholder={t('email')} onChangeText={(email) => setEmail(email)} />
            <TextInput style={[styles.input1, SHADOWS.middle]} value= {password} editable={true} placeholder={t('pw')} secureTextEntry={true} onChangeText={(pw) => setPassword(pw)}/>
          
          <View style={containerStyles.bottom}>
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor}/>
            ) : (
              <CustomButton label={t('registration')} onPress={handleRegistration} />
              )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
          
};

export default RegistrationScreen
