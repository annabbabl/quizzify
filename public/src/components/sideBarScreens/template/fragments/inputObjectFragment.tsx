import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-paper';
import { TemplateFragmentProps } from '../../../../navigation/routers';
import { View } from 'react-native';
import "../../../../constants/i18next"
import { containerStyles } from '../../../../styles/components.style';
import { CustomButtonWithIcon, CustomText } from '../../../common/shared/components';
import { COLORS, ICONSIZE } from '../../../../constants/theme';
import { ChoosenCss, Offset } from '../../../../types/localTypes/uiTypes';
import { Container } from '../../../../types/localTypes/templateTypes';




const TextInputFragment = ({ availaibleFunction, 
  touchedContainer,  
  setTouchedContainer, 
  setTextInputFragmentvisibility}: TemplateFragmentProps) => {

  const getDefaultValue = () => {
    let choosenCss: ChoosenCss | undefined = touchedContainer?.stylesArray.find((style: ChoosenCss) => style.property === 'offset')
    const defaultValue = (typeof choosenCss == 'undefined') ? {x: 0, y:0} as Offset: choosenCss.value as Offset; 
    return defaultValue
  };

  const { t } = useTranslation();
  const [x, setX] = useState(getDefaultValue().x);
  const [y, setY] = useState(getDefaultValue().y);

  const setObjectStyle = () => {
    const choosenStyle: ChoosenCss = {
        property: (availaibleFunction && availaibleFunction.name ? availaibleFunction.name: ''),
        value: {
                    x: x, 
                    y: y 
                }
    };
    touchedContainer?.stylesArray.push(choosenStyle)
    setTouchedContainer?.(touchedContainer ? touchedContainer : {} as Container )
    setTextInputFragmentvisibility?.(false)
  }

  const setValue = (value: string, type: 'X' | 'Y') => {
    const parsedValue = value === "" ? 0 : parseInt(value, 10);
  
    if (type === 'X') {
      setX(parsedValue);
    } else {
      setY(parsedValue);
    }
  };

  return (
    <View style={containerStyles.center}>

        <TextInput
            label={('X')}
            value={x.toString()}
            onChangeText={(x) => setValue(x, 'X')}
            placeholder={'X'}
            defaultValue={x.toString()}
            style={{  marginBottom: 10, width: '100%' }}
        />  
        <TextInput
            label={('Y')}
            value={y.toString()}
            onChangeText={(y) => setValue(y, 'Y')}
            placeholder={'Y'}
            defaultValue={y.toString()}
            style={{  marginBottom: 10, width: '100%' }}
        />  
        <View style={containerStyles.bottomHorizontal}>
            <CustomButtonWithIcon  
                onPress={setObjectStyle} 
                iconName={'check'}
                iconSize={ICONSIZE.small}
                iconColor={COLORS.backgroundColor}
                color={COLORS.thirdColor}
            />
            <CustomButtonWithIcon  
                onPress={() => setTextInputFragmentvisibility?.(false)} 
                iconName={'cancel'}
                iconSize={ICONSIZE.small}
                iconColor={COLORS.backgroundColor}
                color={COLORS.thirdColor}
            />
        </View>
    </View>
  );
};
  

export default TextInputFragment; 