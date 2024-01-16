import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, View } from 'react-native';
import firebase from 'firebase/compat/app'
import { CustomButton, CustomTitle, CustomSwitch, CustomText, CustomButtonWithIcon, HeaderRectangle } from '../../common/shared/components';
import {containerStyles, imageStyles, styles} from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid'; 
import { COLORS, IMAGES, SHADOWS } from "../../../constants";
import '../../../constants/i18next'
import { FIREBASE_AUTH, FIRESTORE } from '../../../firebaseConfig'
import { PossibleAnswerAdd,  QuestionAdd } from '../../../types/databaseTypes'
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import { ScrollView } from 'react-native-gesture-handler';
import { ICONSIZE } from '../../../constants/theme';
import { NativeBaseProvider, Text} from 'native-base';
import { TextInput } from 'react-native-paper';



const AddQuestions = ({adding: addQuestion, editing}: QuestionScreenRouterProps) => {
    const {t} = useTranslation()
    const questionCollection = FIRESTORE.collection('questions'); 
   

    const [loading, setLoading] = useState(false)
    const [adding, setAdding] = useState(true)
    const [switchVisibility, setSwitchVisibility] = useState(true)

    const [question, setQuestion] = useState('');
    const [rightAnswer, setRightAnswer] = useState('');
    const [rightAnswerBoolean, setRightAnswerBoolean] = useState(true);
    const [trueOrFalseQuestion, setTrueOrFalseQuestion] = useState(false);
    const [possibleAnswer, setPossibleAnswer] = useState('');
    const [possibleAnswers, setPossibleAnswers] = useState([]);
    
    const createdAt = firebase.firestore.Timestamp.now()
    const createdBy = FIREBASE_AUTH.currentUser.uid
    
    
    const addQuestionToFirebase = async () =>{
        try {
          setLoading(true)
          const newQuestionUUID = uuidv4();

          const actualRightAnswer = trueOrFalseQuestion ? rightAnswerBoolean.toString(): rightAnswer
          
          if(question || actualRightAnswer === ''){
            console.log(t('emptyData'))
            throw Error(t('missingAnswers'))
          }

          const questionData: QuestionAdd = {
            question: question, 
            rightAnswer: actualRightAnswer,
            trueOrFalseQuestion: trueOrFalseQuestion, 
            createdAt: createdAt, 
            createdBy: createdBy, 
          }

          if(!questionData.trueOrFalseQuestion && possibleAnswers.length < 1){
            throw Error(t('missingAnswers'))
          }

          await questionCollection.doc(newQuestionUUID).set(questionData);
           
          try{
              const answers = questionData.trueOrFalseQuestion ? [!Boolean(questionData.rightAnswer)] : possibleAnswers

              const batch = FIRESTORE.batch();
              const possibleAnswersCollection = questionCollection.doc(newQuestionUUID).collection('possibleAnswers'); 
      
              answers.forEach((possibleAnswer: string) => {
                const answerData: PossibleAnswerAdd = {
                  possibleAnswer: possibleAnswer, 
                  questionID: newQuestionUUID
                }
                const documentRef = possibleAnswersCollection.doc(uuidv4());
                batch.set(documentRef, { possibleAnswer });
              });

              await batch.commit();
            }catch(error){
              console.log(t('error'))
          }
            
          console.log('Question added successfully!');
          console.log(t('questionAddedSuccessfully'))
          setAdding(false)
        } catch (error) {
          console.error('Error adding question:', error.message);
          console.log(t('errorWhileAddingQuestion'))
        }
        finally{
          setLoading(false)
        }
    };

    const deletePossibleAnswer =  (possibleAnswer: string) => {
      const newArray = possibleAnswers.filter((answer) => answer !== possibleAnswer);
      setPossibleAnswers(newArray)
      console.log(t('possibleAnswerDeleted'))
    };

    const addPossibleAnswer = () => {
      if(possibleAnswer ===''){
        console.log(t('emptyAnswer'))
      }else{
        possibleAnswers.push(possibleAnswer)
        setPossibleAnswers(possibleAnswers)
        setPossibleAnswer('')
        console.log(t('possibleAnswerAdded'))
      }
    };

    return (
      <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="resize" style={imageStyles.backgroundImage}>
        <ScrollView contentContainerStyle={containerStyles.container}>
          <KeyboardAvoidingView behavior='padding'>
            <NativeBaseProvider>
            <Text fontSize="4xl" bold>{t('addQuestion')}</Text>
              <TextInput
                  label={t('question')}
                  value={question}
                  right={<TextInput.Icon icon="jaj" />}
                  onChangeText={(text) => setQuestion(text)}
                  placeholder={t('question')}
                  style={{marginBottom: 20, marginTop: 30}}
              />
              <CustomText boldFactor={true} label={t('trueFalseQuestion')} />
                  <CustomSwitch switchSize='med'
                    switchValue={trueOrFalseQuestion}
                    onValueChange={(value) => {
                      setTrueOrFalseQuestion(value);
                      setSwitchVisibility(!switchVisibility);
                    }}
                />
                <CustomText boldFactor={true} label={t('rightAnswer')} />
                {trueOrFalseQuestion ? (
                  <>
                    <CustomSwitch switchSize='med'
                      switchValue={rightAnswerBoolean}
                      onValueChange={(value) => setRightAnswerBoolean(value)}
                    />
                  </>
                ) : (
                  <>
                    <TextInput
                        label={t('rightAnswer')}
                        value={rightAnswer}
                        right={<TextInput.Icon icon="check" />}
                        onChangeText={(text) => setRightAnswer(text)}
                        placeholder={t('rightAnswer')}
                        style={{marginBottom: 20}}
                    />
                    <CustomText boldFactor={true} label={t('possibleAnswer')} />
                    {possibleAnswers.length > 0 && possibleAnswers.length < 5 ? (
                      <View style={containerStyles.marginContainer}>
                        {possibleAnswers.map((possibleAnswer: string, index: number) => (
                          <View style={containerStyles.horizontalContainer1} key={index}>
                          <CustomText label={possibleAnswer} />
                            <CustomButtonWithIcon
                              onPress={() => deletePossibleAnswer(possibleAnswer)}
                              iconName={'cancel'}
                              iconType={'Material'}
                              iconSize={ICONSIZE.small}
                              iconColor={COLORS.primaryIconColor}
                            />
                          </View>
                        ))}
                      </View>
                    ) : possibleAnswers.length === 4 ? (
                      <>
                        <NativeBaseProvider>
                          <Text fontSize="2xl" bold>{t('maxPossibleAnswers')}</Text>
                        </NativeBaseProvider>
                      </>
                    ) : null}
                    <TextInput
                        label={t('possibleAnswer')}
                        value={possibleAnswer}
                        right={<TextInput.Icon icon="exclamation"/>}
                        onChangeText={(text) => setPossibleAnswer(text)}
                        placeholder={t('possibleAnswer')}
                        style={{marginBottom: 20}}
                    />
                  </>
                )}
            </NativeBaseProvider>
          </KeyboardAvoidingView>
            {loading ? (
              <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
              <View style={containerStyles.bottom}>
                  <CustomButton small={true} label={t('addPossibleAnswer')} onPress={addPossibleAnswer} />
                  <CustomButton small={true} label={t('save')} onPress={addQuestionToFirebase} />
                </View>
            )}
        </ScrollView>
      </ImageBackground>
    );
}

export default AddQuestions; 
