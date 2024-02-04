import { SafeAreaView } from "react-native-safe-area-context";
import { Card, List } from 'react-native-paper';
import { containerStyles } from "../../../../styles/components.style";
import { CustomButtonWithIcon, CustomText, LeftContent } from "../../../common/shared/components";
import { COLORS, ICONSIZE } from "../../../../constants/theme";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { useState } from "react";
import { QuestionEdit } from "../../../../types/localTypes/editTypes";
import  EditingCellComponent  from "./cellComponent";
import { CheckIcon, Select } from "native-base";
import React from "react";
import { FIRESTORE } from "../../../../../firebaseConfig";

interface RowComponentProps {
    id?: string;
    category?: string;
    categories?: string[];
    question: string;
    rightAnswer: string;
    trueFalseQuestion: string;
    possibleAnswers: string[];
}

const RowComponent: React.FC<RowComponentProps> = ({
    id,
    question,
    rightAnswer,
    trueFalseQuestion,
    possibleAnswers,
    category,
    categories, 
  }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false)
    const questionCollection = FIRESTORE.collection('questions'); 
    const [editting, setEdditing] = useState(false);
    const [changedData, setChangedData] = useState<Array<QuestionEdit>>([]);
    const [trueFalseQuestionCase, setTrueFalseQuestionCase] = useState(Boolean(trueFalseQuestion));
  
    const addChangedData = (label: string, data: string | boolean) => {
        const dataValue = typeof data == 'boolean' ? data.toString(): data

      const index = changedData.findIndex(
        (item) => Object.keys(item)[0] === label
      );
      let updatedData: QuestionEdit;
      
      switch (label) {
        case 'question':
          updatedData = { question: dataValue };
          break;
  
        case 'rightAnswer':
          updatedData = { rightAnswer: dataValue };
          break;
  
        case 'trueFalseQuestion':
          updatedData = { trueOrFalseQuestion: Boolean(data) };
          setTrueFalseQuestionCase(Boolean(data))
          break;
  
        case 'possibleAnswers':
          updatedData = { possibleAnswers: [{ possibleAnswer: dataValue }] };
          break;

        case 'category':
          updatedData = { category: category};
          break;
        default:
          console.log('Unknown label:', label);
          return;
      }
  
      if (index !== -1) {
        changedData[index] = updatedData;
      } else {
        changedData.push(updatedData);
      }
  
      setChangedData([...changedData]);
    };


    const editQuestions = async (questionId: string) => {
      try {  
        const batch = FIRESTORE.batch();
        changedData.forEach((update) => {
          const documentRef = questionCollection.doc(questionId);
          batch.update(documentRef, update);
        });

        await batch.commit();
        console.log(t('updatedSuccessfully'))

      } catch (error) {
        console.log(t('errorUpdate'))
        console.error('Error updating password:', error.message);
      }
    }

  const deleteQuestion = async (id: string) => {
    try {
      setLoading(true)

      if (id === '' || typeof id === 'undefined'){
        throw Error(t('missingAnswers'))
      }

      await FIRESTORE.collection('questions').doc(id).delete();
      console.log('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }finally{
      setLoading(false)
    }
  };

  
  return (
    <SafeAreaView key={id} style={{ backgroundColor: COLORS.backgroundColor }}>
      {!editting ? (
        <>
          <Card contentStyle={{ backgroundColor: COLORS.backgroundColor, borderWidth: 2, borderColor: COLORS.secondaryColor, elevation: 1 }}>
            <Card.Title title={category} left={LeftContent} />
            <Card.Content>
              <CustomText label={question}/>
              <List.Section>
                <List.Item title={rightAnswer} left={() => <List.Icon icon="check" color={COLORS.greenPrimaryColor} />} />
                {possibleAnswers.length > 0 ? (
                  possibleAnswers.map((possibleAnswer: string, index: number) => (
                    <List.Item
                      key={index}
                      title={possibleAnswer}
                      left={() => <List.Icon color={COLORS.redPrimaryColor} icon="close" />}
                    />
                  ))
                ) : (
                  <></>
                )}
              {loading ? (
                <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
                ) : (
                  <View style={containerStyles.horizontalCentral2}>
                    <CustomButtonWithIcon
                          onPress={() => setEdditing(true)}
                          iconName={'edit'}
                          iconSize={ICONSIZE.small}
                          iconColor={COLORS.secondaryColor}
                      />
                    <CustomButtonWithIcon  
                        onPress={() => {deleteQuestion(id ? id : '')}}
                        iconName={'delete'}
                        iconSize={ICONSIZE.small}
                        iconColor={COLORS.secondaryColor}  
                    />
                  </View> 
                  )}
              </List.Section>
            </Card.Content>
          </Card>
        </>
      ) : (
        <>
        <Card contentStyle={{ backgroundColor: COLORS.backgroundColor }}>
          {categories ? (
             <Select 
                selectedValue={t('selectCategory')} 
                minWidth="200" accessibilityLabel={t('selectCategory')}         
                placeholder=  {t('selectCategory')} 
                defaultValue={category}
              _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={(category: string) => addChangedData('category', category)}>
                {categories?.map((category: string)=>
                  <Select.Item label={category} value={category} />
                )}           
             </Select>

          ): (
            <></>
          )}
          <Card.Content>
              <EditingCellComponent
                data={question}
                label={'question'}
                editting={true}
                onChangeText={(text: string) => addChangedData('question', text)}
            />
            <EditingCellComponent
              data={rightAnswer}
              label={'rightAnswer'}
              editting={true}
              onChangeText={(text: string) => addChangedData('rightAnswer', text)}
            />
            <EditingCellComponent
              data={trueFalseQuestionCase.toString()}
              label={'trueFalseQuestion'}
              onValueChange={(value: boolean) => addChangedData('trueFalseQuestion', value)}
            />
            {possibleAnswers.length > 0 ? (
              possibleAnswers.map((possibleAnswer: string, index: number) => (
                <EditingCellComponent
                  key={index}
                  data={possibleAnswer}
                  label={((index+1).toString()+ ": ")}
                  editting={true}
                  onChangeText={(text: string) => addChangedData('possibleAnswers', text)}
                />
              ))
            ) : (
              <></>
            )}
          </Card.Content>
        </Card>
          
          <View style={containerStyles.bottomHorizontal}>
            <CustomButtonWithIcon
              onPress={() => {
                setEdditing(false);
                editQuestions(id ? id: ''); // Assuming editQuestions function takes id and changedData as arguments
                setChangedData([]);
              }}
              iconName={'save'}
              iconType={'Material'}
              iconSize={ICONSIZE.small}
              iconColor={COLORS.secondaryColor}
            />
            <CustomButtonWithIcon
              onPress={() => setEdditing(false)}
              iconName={'cancel'}
              iconSize={ICONSIZE.small}
              iconColor={COLORS.secondaryColor}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default RowComponent; 