import { SafeAreaView } from "react-native-safe-area-context";
import  {NormalCellComponent, EditingCellComponent } from "./cellComponent";
import { containerStyles } from "../../../../styles/components.style";
import { CustomButtonWithIcon } from "../../../common/shared/components";
import { COLORS, ICONSIZE } from "../../../../constants/theme";
import { useTranslation } from "react-i18next";
import { Question } from "../../../../types/database";
import { View } from "react-native";
import { useState } from "react";
import { FIRESTORE } from "../../../../firebaseConfig";
import { showErrorToast, showSuccessToast } from "../../../../constants/toasts";

interface RowComponentProps {
    id?: string;
    question: string;
    rightAnswer: string;
    trueFalseQuestion: string;
    possibleAnswers: string;
}
  
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
    const [changedData, setChangedData] = useState<Array<Question>>([]);
    const [trueFalseQuestionCase, setTrueFalseQuestionCase] = useState(Boolean(trueFalseQuestion));
  
    const addChangedData = (label: string, data: string | boolean) => {
        const dataValue = typeof data == 'boolean' ? data.toString(): data

      const index = changedData.findIndex(
        (item) => Object.keys(item)[0] === label
      );
      let updatedData: Question;
      
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
        showSuccessToast(t('updatedSuccessfully'))

      } catch (error) {
          showErrorToast(t('errorUpdate'))
          console.error('Error updating password:', error.message);
      }
  }
  
    return (
        <SafeAreaView style={containerStyles.borderContainer} key={id}>
            {!editting ? (
              <>
                  <NormalCellComponent  data={question} label={'question'}/>
                  <NormalCellComponent data={rightAnswer} label={'rightAnswer'}/>
                  <NormalCellComponent data={trueFalseQuestion} label={'trueFalseQuestion'}/>
                  <NormalCellComponent data={possibleAnswers} label={'possibleAnswers'} />
                  <CustomButtonWithIcon
                    onPress={() => setEdditing(true)}
                    iconName={'edit'}
                    iconType={'Material'}
                    iconSize={ICONSIZE.small}
                    iconColor={COLORS.primaryIconColor}
                  />
              </>
            ) : (
              <>
                  <EditingCellComponent data={question} label={'question'} editting={true} onChangeText={(text: string)=> addChangedData('question', text)}/>
                  <EditingCellComponent data={rightAnswer} label={'rightAnswer'} editting={true} onChangeText={(text: string)=> addChangedData('rightAnswer', text)}/>
                  <EditingCellComponent data={trueFalseQuestionCase.toString()} label={'trueFalseQuestion'} onValueChange={(value: boolean)=> addChangedData('rightAnswer', value)}/>
                  {!trueFalseQuestionCase ?(
                    <EditingCellComponent data={possibleAnswers} label={'possibleAnswers'} editting={true} onChangeText={(text: string)=> addChangedData('possibleAnswers', text)}/>
                  ): (
                   <>
                   </>
                  )
                }
                <View style={containerStyles.bottom}>
                  <CustomButtonWithIcon
                    onPress={() => {
                      setEdditing(false);
                      editQuestions(
                        id,
                        
                      );
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
    };
    
export default RowComponent;