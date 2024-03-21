import React, { useState, useEffect } from 'react';
import { ImageBackground, ActivityIndicator, View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeBaseProvider } from 'native-base';
import { CustomText, CustomTitle, LeftGameContent } from 'components/common/shared/components';
import { containerStyles, imageStyles } from 'styles/components.style';
import { COLORS, IMAGES } from 'constants/theme';
import { Card, List } from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import { FIREBASE_AUTH, FIRESTORE } from 'firebase/firebaseConfig';
import { QuizInitDataEdit, joinedUser } from 'types/localTypes/editTypes';

const GamesStatistics = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true); 
  const [gameCreatedData, setGameCreatedData] = useState<Array<QuizInitDataEdit>>([]);
  const [gameParticipatedData, setGameParticipatedData] = useState<Array<QuizInitDataEdit>>([]);
  const [wonGames, setWonGames] = useState(0);
  const [series, setSeries] = useState([0, 0]);
  const widthAndHeight = 250;
  const sliceColor = [COLORS.redPrimaryColor, COLORS.greenPrimaryColor];

  const calculateWonGames = () => {
    let wonGamesCount = gameParticipatedData.reduce((count, game) => {
      const filterWinners = game.winners?.findIndex(winner => winner.id === FIREBASE_AUTH.currentUser?.uid);
      return count + (filterWinners !== -1 ? 1 : 0);
    }, 0);

    setWonGames(wonGamesCount);
    setSeries([gameParticipatedData.length - wonGamesCount, wonGamesCount]);
    console.log(series, 1232)
    console.log(gameParticipatedData, 1232)
    console.log(wonGamesCount, 1232)
  };

  useEffect(() => {
    const fetchGamesData = async () => {
      const createdGames: Array<QuizInitDataEdit> = [];
      const participatedGames: Array<QuizInitDataEdit> = [];
      
      const createdSnapshot = await FIRESTORE.collection('games').where('createdBy', '==', FIREBASE_AUTH.currentUser?.uid).get();
      createdSnapshot.forEach(doc => {
        createdGames.push({ id: doc.id, ...doc.data() });
      });
      
      const participatedSnapshot = await FIRESTORE.collection('games').get();
      participatedSnapshot.forEach(doc => {
        const gameData = doc.data();
        const isParticipant = gameData.joinedUsers?.some((user: joinedUser) => user.id === FIREBASE_AUTH.currentUser?.uid);
        if (isParticipant) {
          participatedGames.push({ id: doc.id, ...gameData });
        }
      });
      
      setGameCreatedData(createdGames);
      setGameParticipatedData(participatedGames);
      setLoading(false);
    };

    fetchGamesData();
    }, []);

  useEffect(() => {
    if(gameCreatedData && gameCreatedData.length > 0) {
      calculateWonGames();
    }
  }, [gameParticipatedData]);

  console.log(gameCreatedData, 8989)
  console.log(gameParticipatedData, 1232)
  return (
    <ScrollView contentContainerStyle={containerStyles.container}>
        {gameParticipatedData && gameParticipatedData.length < 1 && gameParticipatedData 
            && gameParticipatedData.length < 1 &&
            <CustomText label={t("noGamesStitisticsAvaliable")} />
        }
      <ImageBackground source={IMAGES.WAVY_BACKGROUND} resizeMethod="scale" style={imageStyles.backgroundImage}>
        <NativeBaseProvider>
          {loading ? (
            <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
          ) : (
            <View>
              <CustomTitle label={t('gamesStatistic')}/>
              <CustomText label={t('wonGames') + ": " + wonGames}/>
              {series[0] !== 0 || series[1] !== 0  &&
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  coverRadius={0.45}
                  coverFill={'#FFF'}
                />
              }
                {gameCreatedData.map((game, index) => (
                <Card key={index} contentStyle={{ backgroundColor: COLORS.backgroundColor, borderWidth: 2, borderColor: COLORS.secondaryColor, elevation: 1 }}>
                    <Card.Title title={game.quizName} left={LeftGameContent} />
                    <Card.Content>
                    <CustomText label={game.quizCategory} />
                    <CustomText label={`${t("amountQuestions")}: ${game.numberOfQuestions || 0}`} />
                    <List.Section title={game.winners && game.winners.length > 1 ? t("winners") : t("winner")}>
                        {game.winners && game.winners.map((winner, winnerIndex) =>
                        <List.Item key={winnerIndex} title={`- ${winner.username}`} />
                        )}
                    </List.Section>
                    </Card.Content>
                </Card>
                ))}
            </View>
          )}
        </NativeBaseProvider>
      </ImageBackground>
    </ScrollView>
  );
};

export default GamesStatistics;
