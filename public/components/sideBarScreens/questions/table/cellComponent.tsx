import { useTranslation } from "react-i18next";
import { TextInput, TextInputProps, View , Text} from "react-native";
import { containerStyles, styles } from "../../../../styles/components.style";
import { SHADOWS, SIZES } from "../../../../constants";
import { CustomSwitch, CustomText } from "../../../common/shared/components";
import React from "react";


interface NormalCellComponentProps extends TextInputProps{
    label: string, 
    data: string, 
}
interface EditingCellComponentProps extends TextInputProps{
    label: string, 
    data: string, 
    editting?: boolean, 
    onChangeText?: (text: string) => void;
    onValueChange?: (text: boolean) => void;
}

const NormalCellComponent: React.FC<NormalCellComponentProps> = ({ data, label = 'id' || 'question' || 'rightAnswer' || 'trueFalseQuestion' || 'possibleAnswers' || 'createdAt' }) => {
  const { t } = useTranslation();

  return (
    <>
      <CustomText bold={true} label={`${t(label)}: `} />
      <View style={{alignItems:"center"}}>
        {label === 'possibleAnswers' ? (
          <View style={containerStyles.container}>
            <CustomText label={data} />
          </View>
        ) : (
          <Text style={{fontSize: SIZES.xLarge}}>{data}</Text>
        )}
      </View>
    </>
  );
};

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
        <CustomText label={t(label)} />
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
          <CustomSwitch switchValue={Boolean(data)} onValueChange={onValueChange}/>
        ): (
          <TextInput
            style={[styles.input1, SHADOWS.middle]}
            placeholder={data}
            editable={editting}
            onChangeText={onChangeText}
          />
        )}
      </View>
    </View>
  );
};

export { NormalCellComponent, EditingCellComponent };