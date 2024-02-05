import {ActivityIndicator, Image, ImageBackground, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../components/common/shared/components";
import { useTranslation } from "react-i18next";
import '../../constants/'
import {containerStyles, imageStyles} from "../../styles/components.style";
import { COLORS, IMAGES } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserEdit } from "../../types/localTypes/editTypes";
import { NativeBaseProvider, Text } from "native-base";
import { AuthRouterProps, SideBarRouterProps } from "../../navigation/routers";
import { FIRESTORE, FIREBASE_AUTH } from "../../firebase/firebaseConfig";



const Home = ({ navigation, setLoggedIn }: AuthRouterProps & SideBarRouterProps) => {
  // Your translation and other necessary hooks
    const {t} = useTranslation()
    const usersCollection = FIRESTORE.collection('users');

    const [loading, setLoading] = useState(false)
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [enablement, setEnablement] = useState(true);
    const [initiatingQuiz, setInitiatingQuiz] = useState(false);     


    useEffect(() => {
      const updatedUserData : UserEdit = {
        loggedIn: true
      }

      usersCollection.doc(FIREBASE_AUTH.currentUser.uid).update(updatedUserData)
      .then(() => {
          console.log('Document successfully updated!');
          setLoading(true)
      })
      .catch((error) => {
          console.error('Error updating document:', error);
      }).finally(() => {
        setLoading(false)
      })
    }, []);

    const startButtonPress = () => {
      if (!enablement) {
        setPopoverVisible(true); 
      } else {
        setInitiatingQuiz(true)
        navigation.navigate('InitializeQuizNavigatorScreens');
      }
      // const unsubscribe = questionCollection.onSnapshot(async (querySnapshot) => {
      //   const updatedQuestions = await Promise.all(
      //     querySnapshot.docs.map(async (doc) => {
      //       const questionData = { id: doc.id, ...doc.data() };
      //       const possibleAnswersDoc = await doc.ref.collection('possibleAnswers').get();
      //       const possibleAnswers = possibleAnswersDoc.docs.map((answerDoc) => answerDoc.data());
    
      //       return { ...questionData, possibleAnswers };
      //     })
      //   );
  
      //   updatedQuestions.sort((q1: QuestionEdit, q2: QuestionEdit) => (q1 && q1.category ? q1.category: '').localeCompare(q2 && q2.category ? q2.category: ''));
      //   setQuestions(updatedQuestions);
    
      //   setCategories(
      //     updatedQuestions
      //       ? Array.from(new Set(updatedQuestions.map((question: QuestionEdit) => question.category)))
      //       : []
      //   );
      // }

    };

    return (
        <SafeAreaView style={containerStyles.container}>
          <NativeBaseProvider>
          {!loading ? (
            <>
            <View style={containerStyles.container}>
              <Text fontSize="6xl" bold>{t('welcomeName')}</Text>
             <Image source={IMAGES.LOGO} style={imageStyles.image1}/>
            </View>
            <View style={containerStyles.bottom}>
              <CustomButton label={t('startGame')} onPress={startButtonPress}/>
              <CustomButton label={t('joynGame')} />
            </View>
            </>
          ): (
            <ActivityIndicator size="large" color={COLORS.activityIndicatorColor} />
          )}
          </NativeBaseProvider>
        </SafeAreaView>
    );
};

export default Home;