import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, View } from 'react-native';
import firebase from 'firebase/compat/app'
import { CustomButton, CustomSwitch, CustomText } from '../../common/shared/components';
import {containerStyles } from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid'; 
import { COLORS } from "../../../constants";
import '../../../constants/i18next'
import { PossibleAnswerAdd,  QuestionAdd } from '../../../types/databaseTypes'
import { ScrollView } from 'react-native-gesture-handler';
import { CheckIcon, NativeBaseProvider, Select, Text} from 'native-base';
import { List, TextInput } from 'react-native-paper';
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import { FIREBASE_AUTH, FIRESTORE } from '../../../firebase/firebaseConfig';


const AddQuestions = ({categories, adding, setModalVisibilty, setIsFetching}: QuestionScreenRouterProps) => {
    const {t} = useTranslation()
    const questionCollection = FIRESTORE.collection('questions'); 
   
    const [loading, setLoading] = useState(false)
    const [, setAdding] = useState(adding)
    const [switchVisibility, setSwitchVisibility] = useState(true)

    const [question, setQuestion] = useState('');
    const [choosenCategory, setChoosenCategory] = useState('');
    const [rightAnswer, setRightAnswer] = useState('');
    const [rightAnswerBoolean, setRightAnswerBoolean] = useState(true);
    const [trueOrFalseQuestion, setTrueOrFalseQuestion] = useState(false);
    const [possibleAnswer, setPossibleAnswer] = useState('');
    const [possibleAnswers, setPossibleAnswers] = useState([]);
    
    const createdAt = firebase.firestore.Timestamp.now()
    const createdBy = FIREBASE_AUTH?.currentUser?.uid

    const topMarhinCategoryInput = categories ? 10: 0

    useEffect(() => {
      setAdding(adding);
    }, [adding]);
    
    
    const addQuestionToFirebase = async () =>{
        try {
          setLoading(true)
          const newQuestionUUID = uuidv4();

          const actualRightAnswer = trueOrFalseQuestion ? rightAnswerBoolean.toString(): rightAnswer; 
          
          if(question === '' || actualRightAnswer === '' || choosenCategory === ''){
            console.log(t('emptyData'))
            throw Error(t('missingAnswers'))
          }

          const questionData: QuestionAdd = {
            category: choosenCategory, 
            question: question, 
            rightAnswer: actualRightAnswer,
            trueOrFalseQuestion: trueOrFalseQuestion, 
            createdAt: createdAt, 
            createdBy: createdBy ? createdBy: '' , 
          }

          if(!questionData.trueOrFalseQuestion && (possibleAnswers.length < 1  && possibleAnswer.length<1)){
            throw Error(t('missingAnswers'))
          }

          await questionCollection.doc(newQuestionUUID).set(questionData);
           
          try{
              const answers = questionData.trueOrFalseQuestion ? [!Boolean(questionData.rightAnswer)] : possibleAnswers

              const batch = FIRESTORE.batch();
              const possibleAnswersCollection = questionCollection.doc(newQuestionUUID).collection('possibleAnswers'); 
      
              answers.forEach((possibleAnswer:any) => {
                const answerData: PossibleAnswerAdd = {
                  possibleAnswer: possibleAnswer, 
                  questionID: newQuestionUUID
                }
                const documentRef = possibleAnswersCollection.doc(uuidv4());
                batch.set(documentRef, { possibleAnswer });
              });
              setModalVisibilty?.(false)
              await batch.commit();
            }catch(error){
              console.log(t('error'))
          }
            
          console.log('Question added successfully!');
          console.log(t('questionAddedSuccessfully'))
          setAdding(false)
          setIsFetching?.(true)
        } catch (error) {
          console.error('Error adding question:', error.message);
          console.log(t('errorWhileAddingQuestion'))
        }
        finally{
          setLoading(false)
        }
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
      <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => setModalVisibilty?.(false)}
    >
        <View style={containerStyles.modalContainer}>
          <View style={containerStyles.modalContent}>
          <ScrollView contentContainerStyle={containerStyles.container}>
            <KeyboardAvoidingView >
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
                <CustomText boldFactor={true} label={t('category')} />
                  {categories  ? (
                      <Select selectedValue={t('selectCategory')} minWidth="200" accessibilityLabel={t('selectCategory')} placeholder={t('selectCategory')} _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={(category: string) => setChoosenCategory(category)}>
                        {categories.map((category: string)=>
                          <Select.Item label={category} value={category} />
                        )}
                      </Select>
                  ):(
                    <></>
                  )}
                  <TextInput
                      label={t('typeInCategory')}
                      value={choosenCategory}
                      right={<TextInput.Icon icon="align-vertical-distribute" />}
                      onChangeText={(text) => setChoosenCategory(text)}
                      placeholder={t('typeInCategory')}
                      style={{marginBottom: 20, marginTop: topMarhinCategoryInput}}
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
                      <CustomText boldFactor={true} label={t('possibleAnswers')} />
                      {possibleAnswers.length > 0 && possibleAnswers.length < 5 ? (
                        <List.Section>
                          {possibleAnswers.map((possibleAnswer: string, index: number) => (
                            <List.Item title={possibleAnswer}/>
                          ))}
                        </List.Section>
                      ) : possibleAnswers.length === 4 ? (
                        <>
                          <NativeBaseProvider>
                            <CustomText label={t('maxPossibleAnswers')} />
                          </NativeBaseProvider>
                        </>
                      ) : null}
                      <TextInput
                          label={t('possibleAnswer')}
                          value={possibleAnswer}
                          right={<TextInput.Icon icon="close"/>}
                          onChangeText={(text) => {setPossibleAnswer(text)}}
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
              <>
                {!trueOrFalseQuestion ? (
                  <CustomButton small={true} label={t('addPossibleAnswer')} onPress={addPossibleAnswer} />
                ) : null}
                <CustomButton small={true} label={t('save')} onPress={addQuestionToFirebase} /> 
                <CustomButton label={t('close')} onPress={() => setModalVisibilty?.(false)} />
              </>
            )}
          </ScrollView>
          </View>
        </View>
      </Modal>
    );
}

export default AddQuestions; 
