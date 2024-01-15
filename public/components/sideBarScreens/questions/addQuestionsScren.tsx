import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, TextInput, View } from 'react-native';
import firebase from 'firebase/compat/app'
import { CustomButton, CustomTitle, CustomSwitch, CustomText, CustomErrorText, CustomButtonWithIcon, HeaderRectangle } from '../../common/shared/components';
import {containerStyles, imageStyles, styles} from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid'; 
import { COLORS, IMAGES, SHADOWS } from "../../../constants";
import '../../../constants/i18next'
import { FIREBASE_AUTH, FIRESTORE } from '../../../firebaseConfig'
import { PossibleAnswer, Question } from '../../../types/database'
import { showErrorToast, showSuccessToast } from '../../../constants/toasts';
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import { ScrollView } from 'react-native-gesture-handler';
import { ICONSIZE } from '../../../constants/theme';



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
    
    const questionData: Question = {
      question: question, 
      rightAnswer: rightAnswer,
      trueOrFalseQuestion: trueOrFalseQuestion, 
      createdAt: createdAt, 
      createdBy: createdBy
    }

    const addQuestionToFirebase = async () =>{
        try {
          setLoading(true)
          const newQuestionUUID = uuidv4();
              
          await questionCollection.doc(newQuestionUUID).set(questionData);
          
          if(!questionData.trueOrFalseQuestion && possibleAnswers.length < 1){
            throw Error(t('missingAnswers'))
          }

          const answers = questionData.trueOrFalseQuestion ? [!Boolean(questionData.rightAnswer)] : possibleAnswers
          
          try{
              const batch = FIRESTORE.batch();
              const possibleAnswersCollection = questionCollection.doc(newQuestionUUID).collection('possibleAnswers'); 
      
              answers.forEach((possibleAnswer: PossibleAnswer) => {
                const documentRef = possibleAnswersCollection.doc(possibleAnswer.id || uuidv4());
                batch.set(documentRef, { possibleAnswer });
              });
              await batch.commit();

            }catch(error){
              showErrorToast('error')
          }
            
          console.log('Question added successfully!');
          showSuccessToast(t('questionAddedSuccessfully'))
          setAdding(false)
        } catch (error) {
          console.error('Error adding question:', error.message);
          showErrorToast(t('errorWhileAddingQuestion'))
        }
        finally{
          setLoading(false)
        }
    };

    const deletePossibleAnswer =  (possibleAnswer: string) => {
      const newArray = possibleAnswers.filter((answer) => answer !== possibleAnswer);
      setPossibleAnswers(newArray)
      showSuccessToast(t('possibleAnswerDeleted'))
    };

    const addPossibleAnswer = () => {
      possibleAnswers.push(possibleAnswer)
      setPossibleAnswers(possibleAnswers)
      setPossibleAnswer('')
      showSuccessToast(t('possibleAnswerAdded'))
    };

    return (
      <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="resize" style={imageStyles.backgroundImage}>
        <ScrollView contentContainerStyle={containerStyles.container}>
          <KeyboardAvoidingView behavior='padding'>
            <HeaderRectangle label={t('addQuestion')} />
            <CustomText bold={true} label={t('question')} />
            <TextInput
              style={[styles.input1, SHADOWS.middle]}
              value={question}
              editable={true}
              placeholder={t('question')}
              onChangeText={(text) => setQuestion(text)}
            />
            {switchVisibility && (
              <>
                <CustomText bold={true} label={t('trueFalseQuestion')} />
                <CustomSwitch
                  switchValue={trueOrFalseQuestion}
                  onValueChange={(value) => {
                    setTrueOrFalseQuestion(value);
                    setSwitchVisibility(!switchVisibility);
                  }}
                />
                {trueOrFalseQuestion ? (
                  <>
                    <CustomTitle label={t('rightAnswer')} />
                    <CustomSwitch
                      switchValue={rightAnswerBoolean}
                      onValueChange={(value) => setRightAnswerBoolean(value)}
                    />
                  </>
                ) : (
                  <>
                    <CustomText bold={true} label={t('rightAnswer')} />
                    <TextInput
                      style={[styles.input1, SHADOWS.middle]}
                      value={rightAnswer}
                      editable={true}
                      placeholder={t('rightAnswer')}
                      onChangeText={(text) => setRightAnswer(text)}
                    />
                    <CustomText bold={true} label={t('possibleAnswer')} />
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
                      <CustomErrorText label={'maxPossibleAnswers'} />
                    ) : null}
                    <TextInput
                      style={[styles.input1, SHADOWS.middle]}
                      value={possibleAnswer}
                      editable={true}
                      placeholder={t('possibleAnswer')}
                      onChangeText={(text) => setPossibleAnswer(text)}
                    />
                  </>
                )}
              </>
            )}
          </KeyboardAvoidingView>
          <View style={containerStyles.bottom}>
            {loading ? (
              <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
            ) : (
              <>
                <CustomButton small={true} label={t('addPossibleAnswer')} onPress={addPossibleAnswer} />
                <CustomButton small={true} label={t('save')} onPress={addQuestionToFirebase} />
              </>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    );
}

export default AddQuestions; 
