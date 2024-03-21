import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ImageBackground, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeBaseProvider } from 'native-base';
import { CustomLink, CustomTitle } from 'components/common/shared/components';
import { FIRESTORE } from 'firebase/firebaseConfig';
import { GameNavigatorProps } from 'navigation/routers';
import { containerStyles, imageStyles } from 'styles/components.style';
import { QuizInitData } from 'types/databaseTypes';
import { COLORS, IMAGES } from 'constants/theme';

const WaitingScreen = ({ navigation, gameCode }: GameNavigatorProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const gameQuery = await FIRESTORE.collection('games').where('gameCode', '==', gameCode).get();
        if (gameQuery.empty) {
          throw new Error(t('invalidGameCode'));
        } else {
          const gameDoc = gameQuery.docs[0];
          const gameData = gameDoc.data() as QuizInitData;

          if (gameData && gameData.started) {
            clearInterval(interval);
            setLoading(false);
            navigation.navigate('GameScreen', { gameCode: gameCode});
          }
        }
      } catch (error) {
        console.error(t('errorFetchingGameData'), error);
        setLoading(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [gameCode, navigation, t]); 

  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
          <View style={{ alignItems: 'center', justifyContent: "center"}}>
            <CustomTitle label={t('waitForNextGame')} style={{marginBottom: 15}}/>
          </View>
          {loading ? (
            <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
          ) : (
            <View style={containerStyles.bottom}>
              <CustomLink label={t('home')} onPress={() => navigation.navigate("Home")} style={{ marginBottom: 20 }} />
            </View>
          )}
        </NativeBaseProvider>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WaitingScreen;