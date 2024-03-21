import React, { useState } from "react";
import { SafeAreaView, View, ImageBackground, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { GameNavigatorProps } from "navigation/routers";
import { FIREBASE_AUTH, FIRESTORE } from "firebase/firebaseConfig";
import { TextInput } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import { CustomTitle, CustomText, CustomButton, CustomLink } from "components/common/shared/components";
import { containerStyles, imageStyles } from "styles/components.style";
import { COLORS, IMAGES } from "constants/theme";
import { QuizInitData } from "types/databaseTypes";
import firebase from "firebase/compat";
import { joinedUser } from "types/localTypes/editTypes";


const JoinGameScreen = ({ navigation, gameCode, setGameCode}: GameNavigatorProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const currentUser = FIREBASE_AUTH?.currentUser
  console.log(gameCode, 1222222, "gameCode")
  
  const joinGame = async () => {
    try {
      setLoading(true);
      const gamesCollection = FIRESTORE.collection('games');
      const gameQuery = await gamesCollection.where('gameCode', '==', gameCode).get();
  
      if (gameQuery.empty) {
        throw new Error(t('invalidGameCode'));
      } else {
        const gameDoc = gameQuery.docs[0];
        const gameData = gameDoc.data() as QuizInitData;  
        if (gameData.initialized && !gameData.started) {
          if (!gameData.joinedUsers?.some(user => user.id === currentUser?.uid)) {
            const currentUserData: joinedUser = {
              id: currentUser?.uid,
              username: currentUser?.displayName,
              currentPoints: 0,
            };
  
            try {
              await gameDoc.ref.update({
                joinedUsers: firebase.firestore.FieldValue.arrayUnion(currentUserData)
              });
              console.log("User added successfully:", currentUserData);
            } catch (error) {
              console.error("Error adding user:", error);
            }
          }

          navigation?.navigate('WaitingScreen', { gameCode: gameCode });
        } 
      else {
        console.log('Game is not ready to join');
      }
    }
    } catch (error) {
      console.error(t('gameCodeNotExists'), error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale"  style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <CustomTitle label={t('joynGame')} />
          </View> 
          <CustomText label={t('enterGameCode')} />
          <TextInput
            label={t('gameCode')}
            value={gameCode}
            placeholder={t('gameCode')}
            onChangeText={(gameCode: string) => setGameCode?.(gameCode)}
            style={{ marginTop: 30, marginBottom: 20, width: '80%' }}
          />
          <View style={containerStyles.bottom}>
            {loading ? (
              <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
                <>
                  <CustomLink label={t('backToHome')} onPress={() =>{ navigation?.navigate("Home");}} />
                  <CustomButton label={t('joynGame')} onPress={joinGame} />
                </>
            )}
          </View>
        </NativeBaseProvider>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default JoinGameScreen;
