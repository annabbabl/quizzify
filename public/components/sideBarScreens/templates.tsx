import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton, HeaderRectangle } from '../common/shared/components';
import {containerStyles, imageStyles } from "../../styles/components.style";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../constants";
import '../../../constants/i18next'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIRESTORE } from '../../firebaseConfig';



const Templates = ({ navigation }) => {
    const {t} = useTranslation()
    const templatesCollection = FIRESTORE.collection('templates');

    const [templates, setTemplates] = useState([]);



    useEffect(() => {
      const unsubscribe = templatesCollection.onSnapshot((querySnapshot) => {
        const updatedQuestions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTemplates(updatedQuestions);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <SafeAreaView style={containerStyles.container}>
        <View style={containerStyles.container}>
        
        
        </View>
      </SafeAreaView>
    );
}
  

