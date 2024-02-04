
import {containerStyles } from '../../../styles/components.style';
import '../../../constants/i18next'
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomButtonWithIcon, CustomText } from "../../common/shared/components";
import { CheckIcon, Select, View } from "native-base";
import { RadioButton } from 'react-native-paper';
import { Filter } from '../../../types/localTypes/uiTypes';
import { COLORS, ICONSIZE } from '../../../constants/theme';
import { Modal } from 'react-native';
import { QuestionScreenRouterProps } from '../../../navigation/routers';


const SetFilterComponent = ({ categories, filter, setModalVisibilty,  setFilter }: QuestionScreenRouterProps) => {
  const {t} = useTranslation()

  const [choosenCategory, setChoosenCategory] = useState('');
  const [typeOfQuestion, setTypeOfQuestion] = useState('');

  const setFilers = () => {
    const appliedFilter: Filter = {
        category: choosenCategory, 
        typeOfQuestion: typeOfQuestion
    }
    filter = appliedFilter
    setFilter(filter)

    return appliedFilter; 
  }
  const resetFilers = () => {    
    filter = {}
    setChoosenCategory('')
    setTypeOfQuestion('')
    setFilter(filter)
    console.log(filter)
  }


  return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => setModalVisibilty(false)}
        >
            <View style={containerStyles.modalContainer}>
                <View style={containerStyles.modalContent}>
                    <CustomText boldFactor={true} label={t('typeOfQuestion')} />
                    <RadioButton.Group onValueChange={typeOfQuestion => setTypeOfQuestion(typeOfQuestion)} value={typeOfQuestion}>
                        <RadioButton.Item label={t('trueFalseQuestion')} value="true" />
                        <RadioButton.Item label={t('text')} value="text" />
                        <RadioButton.Item label={t('all')} value="all" />
                    </RadioButton.Group>
                    {categories ? (
                        <Select 
                            selectedValue={t('selectCategory')} 
                            minWidth="200" 
                            accessibilityLabel={t('selectCategory')} 
                            placeholder={t('selectCategory')} 
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                                }}
                            mt={1} 
                            onValueChange={(category: string) => setChoosenCategory(category)}
                            >
                            {categories.map((category: string, index: number)=>
                                <Select.Item 
                                    label={category}
                                    value={category} 
                                    key={index} 
                                />
                            )}
                        </Select>
                    ):(
                        <></>
                    )}
                    <View style={containerStyles.horizontalCentral2}>
                        <View style={{alignItems:'baseline'}}>
                            <CustomButtonWithIcon  
                                onPress={setFilers}
                                iconName={'check'}
                                iconSize={ICONSIZE.small}
                                iconColor={COLORS.primaryIconColor}
                            />
                        </View>
                        <View style={{alignItems:'baseline'}}>
                            <CustomButtonWithIcon  
                                onPress={resetFilers} 
                                iconName={'close'}
                                iconSize={ICONSIZE.small}
                                iconColor={COLORS.primaryIconColor}
                            />
                        </View>
                    </View>
                    <CustomButton label={t('close')} onPress={() => setModalVisibilty(false)} />
                </View>
            </View>
        </Modal>
  );
};
export default SetFilterComponent; 