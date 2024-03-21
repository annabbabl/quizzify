import  { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useTranslation } from 'react-i18next';
import { containerStyles } from '../../styles/components.style';
import { capitalizeFirstLetter, convertStylesToStyleSheet } from 'appFunctions/utils';
import { Container } from 'types/localTypes/templateTypes';
import { FIRESTORE, FIREBASE_AUTH} from 'firebase/firebaseConfig';
import { PossibleAnswerEdit, QuestionEdit, QuizInitDataEdit, TemplateEdit, joinedUser } from 'types/localTypes/editTypes';
import { COLORS, SIZES } from 'constants/theme';
import { 
  defaultTemplatePreviewStyle, 
  answerContainerStylesArray, 
  questionContainerStylesArray, 
  screenTouchableArray  
} from 'styles/defaultPreview.styles';
import firebase from 'firebase/compat';
import { GameNavigatorProps } from 'navigation/routers';
import { RouteProp, useRoute } from '@react-navigation/native';

type GameScreenParams = {
  GameScreen: {
      gameCode: string;
  };
};

type GameScreenRouteProp = RouteProp<GameScreenParams, 'GameScreen'>;


const GameScreen = ({ gameCode, navigation, setEndScreen, setGameId }: GameNavigatorProps) => {
  const { t } = useTranslation();
  const [containers, setContainers] = useState<Array<Container>>();
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<Array<string>>([]); 
  const [backgroundImage, setBackgroundImage] = useState(''); 
  const [direction, setDirection] = useState('column');
  const [joinedUser, setJoinedUser] = useState<joinedUser>();
  const [template, setTemplate] = useState<TemplateEdit>({} as TemplateEdit);
  const [gameData, setGameData] = useState<QuizInitDataEdit>({} as QuizInitDataEdit);
  const [questions, setQuestions] = useState<Array<QuestionEdit>>([]);
  const [round, setRound] = useState(0);
  const [pickedAnswer, setPickedAnswer] = useState("");
  const [answerStatus, setAnswerStatus] = useState<{[key: number]: 'correct' | 'incorrect' | 'none'}>({});
  const [randomizedAnswers, setRandomizedAnswers] = useState<Array<PossibleAnswerEdit>>([]);
  const [remainingTime, setRemainingTime] = useState(15);



  const route = useRoute<GameScreenRouteProp>();

  const newGameCode = route.params?.gameCode ?? gameCode;

  const currentUser = FIREBASE_AUTH.currentUser ? FIREBASE_AUTH.currentUser : undefined


  const gameCollection = FIRESTORE.collection("games")
  

  const checkAnswer = async (possibleAnswer: PossibleAnswerEdit, index: number) => {
    const isCorrect = possibleAnswer?.possibleAnswer?.toString() === questions[round].rightAnswer?.toString();
    setPickedAnswer(possibleAnswer?.possibleAnswer?.toString() || "");
    setAnswerStatus((prevStatus) => ({...prevStatus, [index]: isCorrect ? 'correct' : 'incorrect'}));

    try {
      const gameDocRef = gameCollection.doc(gameData.id);
      
      if (gameDocRef) {
        const gameDocSnapshot = await gameDocRef.get();

        if (isCorrect && joinedUser && gameDocSnapshot.exists) {
          const gameDocData = gameDocSnapshot.data(); // This is the document's data

          const updatedJoinedUsers = gameDocData?.joinedUsers.map((user: joinedUser) => {
            if (user.id === currentUser?.uid) {
              return { ...user, currentPoints: (user.currentPoints ? user.currentPoints + 1 : 1) }; // Update points
            } 
            return user;
            
          });

          await gameDocRef.update({ // Use gameDocRef directly here
            joinedUsers: updatedJoinedUsers
          });
        }
        const roundInformation = {
          userId: currentUser?.uid,
          answerStatus: isCorrect,
          question: questions[round].question,
          currentRound: round
        };

        await gameDocRef.update({ // Use gameDocRef directly here
          roundInformation: firebase.firestore.FieldValue.arrayUnion(roundInformation)
        });
      }
      const blinkTime = remainingTime*1000; 
      
      setTimeout(() => {
        setAnswerStatus((prevStatus) => ({...prevStatus, [index]: 'none'}));
      },blinkTime ); // Adjust time as needed
    } catch (error) {
      console.log(error, "error init next round");
    } finally {
      setLoading(false);
    }
  };
  const setPossibleAnswers = (question: QuestionEdit | undefined): Array<PossibleAnswerEdit> => {
    let answers: Array<PossibleAnswerEdit> = [];

    if (question?.trueOrFalseQuestion) {
        answers = [
            { possibleAnswer: true, count: 1 },
            { possibleAnswer: false, count: 2 }
        ];
    } else {
        answers = [
            ...(question?.rightAnswer ? [{ possibleAnswer: question.rightAnswer, count: questions[round].possibleAnswers?.length }] : []),
            ...(question?.possibleAnswers || [])
        ];
    }

    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]]; 
    }
    console.log(answers, 718718)
    return answers;
  };

  const goToNextRound = () => {
    if (round >= (gameData.questions?.length ? gameData.questions.length - 1 : 0)) {
      setGameId?.(gameData.id ? gameData.id : "");
      setEndScreen?.(true);
      navigation?.navigate('EndScreen');
      setRemainingTime(15); 
    } else {
      setRound(round + 1);
      setRemainingTime(15); 
    }
    setAnswerStatus({}); 
  };
  

  const checkForPropery = (property: string, containerNumber: number, defaultValue: string | number) => {
    const searchedValue: any = 
          containers && containers[containerNumber].stylesArray && containers[containerNumber]  && containers[containerNumber].stylesArray.find(css => css.property === property)?.value ?
          containers[containerNumber].stylesArray.find(css => css.property === property)?.value : defaultValue 
    return searchedValue
  }
  
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    console.log(item, 718718)
    console.log(item.possibleAnswer, 718718)
    return (
      <Pressable 
        key={index}
        style={({pressed}) => [
          convertStylesToStyleSheet(containers && containers[2]?.stylesArray ? containers[2].stylesArray : []),
          {
            width: 150,
            height: '100%',
            marginLeft: 6,
            backgroundColor: pressed ? 'grey' : answerStatus[index] === 'correct' ? 'green' :
              answerStatus[index] === 'incorrect' ? 'red' : checkForPropery('backgroundColor', 2, COLORS.thirdColor),
            marginTop: 10, 
            alignItems: 'center',
          }
        ]}
        onPress={() => checkAnswer(item, index)}
      >
       
        <Text
          style={{
            color:  checkForPropery('color', 1, COLORS.backgroundColor),
            fontSize:  checkForPropery('fontSize', 1, SIZES.xxLarge) ,
            textAlign: checkForPropery('textAlign', 1, 'center'), 
          }}
        >
          {capitalizeFirstLetter(item.possibleAnswer)}
        </Text>
      </Pressable>
    );
  };

 
  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true); 
      if(newGameCode){
        const gameDocRef = gameCollection.where("gameCode", "==", newGameCode);

        const snapshot = await gameDocRef.get();
        
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]
          const fetchedGameData = doc.data() as QuizInitDataEdit;
          fetchedGameData.id = doc.id;
        

          if (fetchedGameData) {
            setGameData(fetchedGameData);
            setQuestions(fetchedGameData.questions || []); 

            const currentUser = FIREBASE_AUTH.currentUser;
            if (currentUser && fetchedGameData.joinedUsers) {
              const matchedUser = fetchedGameData.joinedUsers.find(user => user.id === currentUser.uid);
              if (matchedUser) {
                setJoinedUser(matchedUser);
              }
            }
        }
      
          const createdBy = fetchedGameData.createdBy || gameData.id;
          if (createdBy) {
            const templateCollectionRef = FIRESTORE.collection("users").doc(createdBy).collection("templates");
            try {
              const querySnapshot = await templateCollectionRef.get();
              const newTemplateObject: Record<string, any> = {};
  
              for (const doc of querySnapshot.docs) {
                const templateData = doc.data();
                const templateId = doc.id;
        
                if (templateData) {
                  const imageSnapshot = await FIRESTORE.collection("users").doc(createdBy).collection("templates").doc(templateId).collection('images').get();
                  const images = imageSnapshot.docs.map(imgDoc => ({ id: imgDoc.id, ...imgDoc.data() }));
                  newTemplateObject[templateId] = { id: templateId, ...templateData, images };
                }
              }
  
              if (Object.keys(newTemplateObject).length > 0) {
                const firstTemplateKey = Object.keys(newTemplateObject)[0];
                const firstTemplate = newTemplateObject[firstTemplateKey];
                setTemplate(firstTemplate);
                setImages(firstTemplate.images);
                setBackgroundImage(firstTemplate.backgroundImage);
                setDirection(firstTemplate.direction);
                setContainers([
                  {
                    name: 'Background',
                    style: firstTemplate.templateBackground.style,
                    stylesArray: firstTemplate.templateBackground.stylesArray,
                  },
                  {
                    name: 'Question',
                    style: firstTemplate.questionContainer.style,
                    stylesArray: firstTemplate.questionContainer.stylesArray,
                  },
                  {
                    name: 'Answers',
                    style: firstTemplate.answerContainer.style,
                    stylesArray: firstTemplate.answerContainer.stylesArray,
                  }
                ]);
              } else {
                setContainers( [
                  {
                    name: 'Background',
                    style: defaultTemplatePreviewStyle.screenTouchable,
                    stylesArray: screenTouchableArray,
                  },
                  {
                    name: 'Question', 
                    style: defaultTemplatePreviewStyle.questionContainer,
                    stylesArray: questionContainerStylesArray,
                  },
                  {
                    name: 'Answers', 
                    style: defaultTemplatePreviewStyle.answerContainerColumn,
                    stylesArray: answerContainerStylesArray,
                  }
                ]);
              }
            } catch (error) {
              console.error('Error fetching template data:', error);
            }
          }
        }
      } else {
        console.warn("No game data found for the code:", newGameCode);
      }
      setLoading(false); 
    };
  
    fetchGameData();
  }, [newGameCode]);

  useEffect(() => {
    if (questions.length > 0 && questions[round] && questions) {
      setRandomizedAnswers(setPossibleAnswers(questions[round]));
    }
  }, [questions, round]);

  useEffect(() => {
    const timer = setTimeout(() => {
        if (remainingTime > 0) {
            setRemainingTime(remainingTime - 1);
        } else {
            clearTimeout(timer); 
            goToNextRound();
        }
    }, 1000); 

    return () => clearTimeout(timer);
}, [remainingTime]);
console.log(randomizedAnswers, 718718)
  return (
    <SafeAreaView style={containerStyles.container}>
      <NativeBaseProvider>
        <View style=
        {{ ...convertStylesToStyleSheet(containers && containers[0] && containers[0].stylesArray ? containers[0].stylesArray : screenTouchableArray),
          width: '100%', 
          height: 900
        }}>
          {backgroundImage && direction === 'column' && (
            <Image source={{ uri: backgroundImage }} style={{ width: 200, height: 200, marginVertical: 30 }} />
          )}
          {/* <CustomText label={gameData?.quizName} /> */}
          {questions.length > 0 && questions[round] ? (
            <>
              <SafeAreaView style=
              {{
                ...convertStylesToStyleSheet(containers && containers?.length >= 2 ? containers[1].stylesArray : questionContainerStylesArray), 
                minWidth: 750,
                maxHeight: 350,
                height: 150 
              }} 
              >
                <Text  
                  style={{
                      color:  checkForPropery('color', 1, COLORS.backgroundColor),
                      fontSize:  checkForPropery('fontSize', 1, SIZES.large)* 1.5,
                      marginTop: 20,
                      textAlign: checkForPropery('textAlign', 1, 'center'), 
                    }}
                >
                  {questions[round].question}
                </Text>
              </SafeAreaView>
              {backgroundImage && direction === 'row' && (
                <Image source={{ uri: backgroundImage }} style={{ width: 100, height: 100, marginVertical: 30 }} />
              )}
              {direction === 'row' ? (
                <FlatList 
                  data={randomizedAnswers} 
                  renderItem={renderItem} keyExtractor={(item, index) => index.toString()} 
                  numColumns={2} 
                  style={{marginTop: 10}}
                  columnWrapperStyle={{marginTop: 10}}
                  scrollEnabled={false}
                  />
              ) : (
                <>
                  {randomizedAnswers?.map((possibleAnswer: any, index: number) => (
                    <Pressable 
                    key={index}
                    style={({pressed}) => [
                        convertStylesToStyleSheet(containers && containers[2]?.stylesArray ? containers[2].stylesArray : []),
                        {
                            marginLeft: 4,
                            marginBottom: 40,
                            backgroundColor: pressed ? 'grey' : answerStatus[index] === 'correct' ? 'green' :
                            answerStatus[index] === 'incorrect' ? 'red' : checkForPropery('backgroundColor', 2, COLORS.thirdColor),
                            width: 150,
                            height: 100 
                        }
                    ]}
                    onPress={() => checkAnswer(possibleAnswer, index)}
                  >
                      <Text 
                        style={{
                          color:  checkForPropery('color', 1, COLORS.backgroundColor),
                          fontSize:  checkForPropery('fontSize', 1, SIZES.xxLarge) ,
                          marginTop: 20,
                          textAlign: checkForPropery('textAlign', 1, 'center'), 
                        }}
                      >
                        {capitalizeFirstLetter(possibleAnswer.possibleAnswer)} 
                      </Text>
                    </Pressable>
                  ))}
                </>
              )}
            </>
          ) : (
            <ActivityIndicator size="large" color={COLORS.activityIndicatorColor} />
          )}
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
);
}
export default GameScreen;
