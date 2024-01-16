import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, View, } from 'react-native';
import { CustomButton, CustomLink, CustomTitle } from '../../common/shared/components';
import {containerStyles, imageStyles, styles} from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { COLORS, IMAGES, SHADOWS } from "../../../constants";
import '../../../constants/i18next'
import { NavigationProp } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { UserDatabase } from '../../../types/databaseTypes';
import { FIREBASE_AUTH, FIRESTORE } from '../../../firebaseConfig';
import { TextInput } from "react-native-paper";
import { NativeBaseProvider } from 'native-base';


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
          console.log(t('registrationFail'))
        }else{
          const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        
          const newUser : UserDatabase = {
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
            })
            .catch((error) => {
              console.error('Error adding document:', error);
          });    
        }
      }catch(error: any){
        console.log(error)
      }finally{
        setLoading(false)
      }
    };

    
    return (
      <KeyboardAvoidingView behavior='padding' style={containerStyles.container}>
        <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="scale" resizeMode="cover"style={imageStyles.backgroundImage}>
          <NativeBaseProvider>
          <View style={{alignItems:'center'}}>
            <CustomTitle label={t('registration')}/>
          </View> 
            <TextInput
                label={(t('name'))}
                value={username}
                right={<TextInput.Icon icon="account" />}
                onChangeText={(username) => setUsername(username)}
                placeholder={t('name')}
                style={{ marginTop: 30, marginBottom: 20}}
            />   
            <TextInput
                label={t('email')}
                value={email}
                right={<TextInput.Icon icon="email" />}
                onChangeText={(email) => setEmail(email)}
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
          <View style={containerStyles.bottom}>
            {loading ? 
              (<ActivityIndicator size='large' color={COLORS.activityIndicatorColor}/>
            ) : (
              <>
               <CustomLink label={t('backToLogin')} onPress={()=>{navigation.navigate("Login")}} />
                <CustomButton label={t('registration')} onPress={handleRegistration} />
              </>
              )}
          </View>
          </NativeBaseProvider>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
          
};

export default RegistrationScreen
