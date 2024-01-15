import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import { KeyboardAvoidingView } from 'react-native';
import { CustomText } from '../../common/shared/components';
import { useTranslation } from "react-i18next";
import '../../../constants/i18next'
import { FIRESTORE } from '../../../firebaseConfig'
import { Question } from '../../../types/database';
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import RowComponent from './table/rowComponent';


const TableScreen = ({ editing }: QuestionScreenRouterProps) => {
    const {t} = useTranslation()
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      const questionCollection = FIRESTORE.collection('questions');
  
      const unsubscribe = questionCollection.onSnapshot((querySnapshot) => {
        const updatedQuestions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setQuestions(updatedQuestions);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

    return (
            <View >
              {questions.length > 0 ? (
                <KeyboardAvoidingView behavior='padding'>
                  {questions.map((question: Question) => (
                    editing ? (
                      <RowComponent key={question.id} question={question.question} rightAnswer={question.rightAnswer} trueFalseQuestion={question.trueOrFalseQuestion.toString()}
                        possibleAnswers={question.possibleAnswers ? question.possibleAnswers.join(", "): ''} />
                    ) : (
                      <RowComponent key={question.id}  question={question.question} rightAnswer={question.rightAnswer} trueFalseQuestion={question.trueOrFalseQuestion.toString()}
                        possibleAnswers={question.possibleAnswers ? question.possibleAnswers.join(", "): ''} />
                    )
                  ))}
                </KeyboardAvoidingView>
              ) : (                
                <CustomText label={t('noQuestionsAvailable')} bold={true}/>
              )}
        </View>
    );
}
  

export default TableScreen
