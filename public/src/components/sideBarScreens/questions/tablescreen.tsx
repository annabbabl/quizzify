import React from 'react';
import { View } from "react-native";
import { KeyboardAvoidingView } from 'react-native';
import { useTranslation } from "react-i18next";
import '../../../constants/i18next'
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import RowComponent from './table/rowComponent';
import { NativeBaseProvider, Text } from 'native-base';
import { COLORS } from '../../../constants';
import { PossibleAnswerEdit, QuestionEdit } from '../../../types/localTypes/editTypes';


const TableScreen = ({ editing, questions, categories, setIsFetching }: QuestionScreenRouterProps) => {
    const {t} = useTranslation()
    
    const getPossibleAsnwers = (correspondingQuestion: QuestionEdit) => {
      if(editing){
        setIsFetching?.(true)
      }
      const possibleAnswer = correspondingQuestion?.possibleAnswers  ? correspondingQuestion.possibleAnswers.map((possibleAnswer: PossibleAnswerEdit)=> possibleAnswer.possibleAnswer): []      
      return  possibleAnswer
    }; 

    return (
      <View>
        <NativeBaseProvider>
          {questions ? (
            <KeyboardAvoidingView behavior='padding'>
              <Text 
                fontSize="2xl" 
                bold
              >
                {t('amountOfQuestions') + ': '+ questions.length + (questions.length < 5 ? " " + t('cantPlay') : '')}
              </Text>
              {questions.map((question: QuestionEdit) => (
                editing ? (
                  <React.Fragment key={question.id}>
                    <RowComponent
                      categories={categories}
                      question={question.question ? question.question: ''}
                      rightAnswer={question.rightAnswer ? question.rightAnswer: ''}
                      trueFalseQuestion={question.trueOrFalseQuestion ?  question.trueOrFalseQuestion.toString(): ''}
                      possibleAnswers={question ? getPossibleAsnwers(question) : []}
                    />
                  </React.Fragment>
                ) : (
                  <RowComponent
                    id={question.id}
                    key={question.id}
                    category={question.category}
                    categories={categories}
                    question={question.question ? question.question: ''}
                    rightAnswer={question.rightAnswer ? question.rightAnswer: ''}
                    trueFalseQuestion={question.trueOrFalseQuestion ? question.trueOrFalseQuestion.toString(): ''}
                    possibleAnswers={question ? getPossibleAsnwers(question): []}
                  />
                )
              ))}
            </KeyboardAvoidingView>
          ) : (
            <Text 
              fontSize="3xl" 
              bold 
              color={COLORS.redPrimaryColor}
            >
              {t('noQuestionsAvailable')}
            </Text>
          )}
        </NativeBaseProvider>
        
      </View>
    );
}
  

export default TableScreen
