import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { COLORS, IMAGES } from "../../constants";
import { containerStyles, imageStyles } from "../../styles/components.style";
import { AuthRouterProps, SideBarRouterProps } from "../../navigation/routers";
import { FIREBASE_AUTH, FIRESTORE } from "../../firebase/firebaseConfig";
import { UserEdit } from "types/localTypes/editTypes";
import { CustomButton } from "components/common/shared/components";

const Home = ({ navigation }: AuthRouterProps & SideBarRouterProps) => {
  const { t } = useTranslation();
  const usersCollection = FIRESTORE.collection('users');

  const [loading, setLoading] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [enablement, setEnablement] = useState(true);
  const [initiatingQuiz, setInitiatingQuiz] = useState(false);
  const [joinQuiz, setJoinQuiz] = useState(false);

  useEffect(() => {
    const updatedUserData: UserEdit = {
      loggedIn: true
    }

    usersCollection.doc(FIREBASE_AUTH?.currentUser?.uid).update(updatedUserData)
      .then(() => {
        console.log('Document successfully updated!');
        setLoading(true);
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      }).finally(() => {
        setLoading(false);
      })
  }, []);

  const joinButtonPress = () => {
    if (!enablement) {
      setJoinQuiz(true);
    } else {
      setJoinQuiz(true);
      navigation.navigate('GameNavigatorScreens', { screen: 'JoinGameScreen' });
    }
  };

  const startButtonPress = () => {
    if (!enablement) {
      setPopoverVisible(true);
    } else {
      setInitiatingQuiz(true);
      navigation.navigate('InitializeQuizNavigatorScreens', { screen: 'EnterNameScreen' });
    }
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
              <CustomButton label={t('joynGame')} onPress={joinButtonPress} />
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" color={COLORS.activityIndicatorColor} />
        )}
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default Home;
