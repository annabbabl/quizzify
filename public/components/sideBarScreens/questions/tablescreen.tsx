import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import { KeyboardAvoidingView } from 'react-native';
import { CustomText } from '../../common/shared/components';
import { useTranslation } from "react-i18next";
import '../../../constants/i18next'
import { FIRESTORE } from '../../../firebaseConfig'
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import RowComponent from './table/rowComponent';
import { PossibleAnswerEdit, QuestionEdit } from '../../../types/localTypes/editTypes';


const TableScreen = ({ editing }: QuestionScreenRouterProps) => {
    const {t} = useTranslation()
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      const questionCollection = FIRESTORE.collection('questions');
    
      const unsubscribe = questionCollection.onSnapshot(async (querySnapshot) => {
        const updatedQuestions = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const questionData = { id: doc.id, ...doc.data() };
            const possibleAnswersDoc = await doc.ref.collection('possibleAnswers').get();
            const possibleAnswers = possibleAnswersDoc.docs.map((answerDoc) => answerDoc.data());
    
            return { ...questionData, possibleAnswers };
          })
        );
    
        setQuestions(updatedQuestions);
      });
    
      return () => {
        unsubscribe();
      };
    }, []);

    const getPossibleAsnwers = (correspondingQuestion: QuestionEdit) => {
      console.log(correspondingQuestion)
      const possibleAnswer = correspondingQuestion.possibleAnswers.length> 0 ? correspondingQuestion.possibleAnswers.map((possibleAnswer: PossibleAnswerEdit)=> possibleAnswer.possibleAnswer): []
      console.log(possibleAnswer)
      return  possibleAnswer}; 

    return (
            <View >
              {questions.length > 0 ? (
                <KeyboardAvoidingView behavior='padding'>
                  {questions.map((question: QuestionEdit) => (
                    editing ? (
                      <RowComponent key={question.id} question={question.question} rightAnswer={question.rightAnswer} trueFalseQuestion={question.trueOrFalseQuestion.toString()}
                        possibleAnswers={getPossibleAsnwers(question)} />
                    ) : (
                      <RowComponent key={question.id}  question={question.question} rightAnswer={question.rightAnswer} trueFalseQuestion={question.trueOrFalseQuestion.toString()}
                        possibleAnswers={getPossibleAsnwers(question)} />
                    )
                  ))}
                </KeyboardAvoidingView>
              ) : (                
                <CustomText label={t('noQuestionsAvailable')} boldFactor={true}/>
              )}
        </View>
    );
}
  

export default TableScreen
