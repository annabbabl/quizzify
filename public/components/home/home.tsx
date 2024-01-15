import {Image, ImageBackground, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, HeaderRectangle } from "../../components/common/shared/components";
import { useTranslation } from "react-i18next";
import '../../constants/'
import {containerStyles, imageStyles} from "../../styles/components.style";
import { IMAGES } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIRESTORE } from "../../firebaseConfig";
import { User } from "../../types/database";



const Home = () => {
    // Your translation and other necessary hooks
    const {t} = useTranslation()
    const usersCollection = FIRESTORE.collection('users');

    const [loading, setLoading] = useState(false)


    useEffect(() => {
      const updatedUserData : User = {
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
          {!loading ? (
            <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="resize"style={imageStyles.backgroundImage}>
              <HeaderRectangle label={(t('welcomeName') + FIREBASE_AUTH.currentUser.displayName)}/>
              <Image source={IMAGES.LOGO} style={imageStyles.image1}/>
              <View style={containerStyles.bottom}>
                <CustomButton label={t('startGame')} />
                <CustomButton label={t('joynGame')} />
              </View>
            </ImageBackground>
          ): (
            <>
            </>
          )}
          
        </SafeAreaView>
    );
};

export default Home;