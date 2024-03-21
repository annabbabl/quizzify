import { useEffect, useState } from "react";
import { SafeAreaView, View, ImageBackground, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { GameNavigatorProps } from "navigation/routers";
import { FIRESTORE } from "firebase/firebaseConfig";
import { NativeBaseProvider } from "native-base";
import { CustomTitle, CustomText, CustomButton } from "components/common/shared/components";
import { containerStyles, imageStyles } from "styles/components.style";
import { COLORS, IMAGES } from "constants/theme";
import { QuizInitDataEdit, joinedUser } from "types/localTypes/editTypes";
import firebase from "firebase/compat";


const EndScreen = ({gameId, navigation}: GameNavigatorProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [winners, setWinners] = useState<Array<joinedUser>>([]);
  const [winnerPoints, setMaxPoints] = useState(0);
  const [label, setLabel] = useState("");

  const determineWinners = (joinedUsers: Array<joinedUser>): Array<joinedUser> => {
    if (joinedUsers.length === 0) return []; 

    const maxPoints = Math.max(...joinedUsers.map(user => user.currentPoints || 0));
    setMaxPoints(maxPoints)

    const w = joinedUsers.filter(user => user.currentPoints === maxPoints);
      return w;
    };  

    const setEndData = async (winners: Array<joinedUser>) => {
      try {
        const gamesCollection = FIRESTORE.collection('games'); 
        const gameDoc = gamesCollection.doc(gameId);
        await gameDoc.update({
          winners: firebase.firestore.FieldValue.arrayUnion(...winners.map(winner => ({...winner}))),
          started: false,
        });
      } catch (error) {
        console.error("Error updating winners", error);
      }
    }

    useEffect(() => {
        const fetchGameData = async () => {
          setLoading(true); 
          try {
            const game = await FIRESTORE.collection("games").doc(gameId).get();
            const gameData = game.data() as QuizInitDataEdit;
      
            if (gameData && gameData.joinedUsers && gameData.joinedUsers.length > 0) {
              const currentWinners = determineWinners(gameData.joinedUsers);
              setEndData(currentWinners)
              const points = currentWinners[0].currentPoints; 
              
              const winnerLabel = currentWinners.length > 1 ? t("winnersAre") + " " + currentWinners.map(winner => winner?.username).join(", ") + " " + t("with") + " " + points : 
                                  currentWinners.length === 1 ? t("theWinneris") + " " + currentWinners[0].username + " " + t("with") + " " + currentWinners[0].currentPoints : 
                                  t("noWinners");

              setLabel(winnerLabel);
            }
          } catch(error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchGameData();
      }, [gameId, t]);
  
  return (
    <SafeAreaView style={containerStyles.container}>
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale"  style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <CustomTitle label={t('end')} />
          </View> 
          <CustomText label={label+ " " + t('congratilation')} />
          <View style={containerStyles.bottom}>
            {loading ? (
              <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
                <CustomButton label={t('backToHome')} onPress={() => navigation?.navigate("Home")} />
            )}
          </View>
        </NativeBaseProvider>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EndScreen;
