import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card, List, Text, TextInput } from 'react-native-paper';
import { containerStyles } from "../../../../styles/components.style";
import { CustomButtonWithIcon } from "../../../common/shared/components";
import { COLORS, ICONSIZE } from "../../../../constants/theme";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useState } from "react";
import { FIRESTORE } from "../../../../firebaseConfig";
import { QuestionEdit } from "../../../../types/localTypes/editTypes";
import  EditingCellComponent  from "./cellComponent";

interface RowComponentProps {
    id?: string;
    question: string;
    rightAnswer: string;
    trueFalseQuestion: string;
    possibleAnswers: string[];
}
const LeftContent = props => <Avatar.Icon {...props} icon="jjj" />


const RowComponent: React.FC<RowComponentProps> = ({
    id,
    question,
    rightAnswer,
    trueFalseQuestion,
    possibleAnswers,
  }) => {
    const { t } = useTranslation();
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
  
  return (
    <SafeAreaView key={id} style={{ backgroundColor: COLORS.backgroundColor }}>
      {!editting ? (
        <>
          <Card contentStyle={{ backgroundColor: COLORS.backgroundColor }}>
            <Card.Title title={t('question')} left={LeftContent} />
            <Card.Content>
              <Text variant="titleLarge">{question}</Text>
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
              </List.Section>
              <CustomButtonWithIcon
                    onPress={() => setEdditing(true)}
                    iconName={'edit'}
                    iconType={'Material'}
                    iconSize={ICONSIZE.small}
                    iconColor={COLORS.primaryIconColor}
              />
            </Card.Content>
          </Card>
        </>
      ) : (
        <>
        <Card contentStyle={{ backgroundColor: COLORS.backgroundColor }}>
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
                editQuestions(id); // Assuming editQuestions function takes id and changedData as arguments
                setChangedData([]);
              }}
              iconName={'save'}
              iconType={'Material'}
              iconSize={ICONSIZE.small}
              iconColor={COLORS.primaryIconColor}
            />
            <CustomButtonWithIcon
              onPress={() => setEdditing(false)}
              iconName={'cancel'}
              iconType={'Material'}
              iconSize={ICONSIZE.small}
              iconColor={COLORS.primaryIconColor}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default RowComponent; 