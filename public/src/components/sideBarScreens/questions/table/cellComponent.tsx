import { useTranslation } from "react-i18next";
import { TextInputProps, View } from "react-native";
import { containerStyles, styles } from "../../../../styles/components.style";
import { SHADOWS } from "../../../../constants";
import { CustomSwitch, CustomText } from "../../../common/shared/components";
import React from "react";
import { TextInput } from "react-native-paper";


interface EditingCellComponentProps extends TextInputProps{
    label: string, 
    data: string, 
    editting?: boolean, 
    onChangeText?: (text: string) => void;
    onValueChange?: (text: boolean) => void;
}

const EditingCellComponent: React.FC<EditingCellComponentProps> = ({
  onChangeText,
  onValueChange,
  editting,
  data,
  label = 'id' || 'question' || 'rightAnswer' || 'trueFalseQuestion' || 'possibleAnswers' || 'createdAt',
}) => {
  const { t } = useTranslation();

  return (
    <View style={containerStyles.horizontalContainer2}>
      <View style={{ width: '40%' }}>
        <CustomText label={t('label')} />
      </View>
      <View style={{ width: '60%' }}>
        {label === 'possibleAnswers' ? (
          data.split(', ').map((possibleAnswer: string, index: number) => (
            <View style={containerStyles.container} key={index}>
              <TextInput
                style={[styles.input1, SHADOWS.middle]}
                placeholder={possibleAnswer} 
                editable={editting}
                onChangeText={onChangeText} 
              />
          </View>))
        ): label === 'trueFalseQuestion' ? (
          <CustomSwitch 
            switchValue={Boolean(data)} 
            switchSize="med"
            onValueChange={onValueChange}
          />
        ): (
            <TextInput
                placeholder={data}
                style={{ marginBottom: 20}}
            />   
        )}
      </View>
    </View>
  );
};

export default EditingCellComponent