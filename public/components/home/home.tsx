import {ActivityIndicator, Image, ImageBackground, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../components/common/shared/components";
import { useTranslation } from "react-i18next";
import '../../constants/'
import {containerStyles, imageStyles} from "../../styles/components.style";
import { COLORS, IMAGES } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIRESTORE } from "../../firebaseConfig";
import { UserEdit } from "../../types/localTypes/editTypes";
import { NativeBaseProvider, Text } from "native-base";



const Home = () => {
    // Your translation and other necessary hooks
    const {t} = useTranslation()
    const usersCollection = FIRESTORE.collection('users');

    const [loading, setLoading] = useState(false)


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
              <CustomButton label={t('startGame')} />
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