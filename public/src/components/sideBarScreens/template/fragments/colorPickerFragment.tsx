import { useState } from 'react';
import { TemplateFragmentProps } from '../../../../navigation/routers';
import { View } from 'react-native';
import "../../../../constants/i18next"
import { containerStyles } from '../../../../styles/components.style';
import { CustomButtonWithIcon } from '../../../common/shared/components';
import { COLORS, ICONSIZE } from '../../../../constants/theme';
import ColorPicker from 'react-native-wheel-color-picker';
import { updateStyle } from '../../../../appFunctions/utils';
import { Container } from '../../../../types/localTypes/templateTypes';



const ColorPickerFragment = ({ availaibleFunction, touchedContainer, setTouchedContainer,  setColorPickerViewVisibilty}: TemplateFragmentProps) => {
  
  const [color, setColor] = useState('');


  const setColorFragmentValues = () => {
    updateStyle((availaibleFunction &&  availaibleFunction.name ? availaibleFunction.name : ''), color, (touchedContainer ? touchedContainer: {} as Container))
    setTouchedContainer?.(touchedContainer ? touchedContainer: {} as Container);
    setColorPickerViewVisibilty?.(false)
  }
  
  return (
    <View style={containerStyles.center}>
        <ColorPicker
          color={color}
          onColorChange={(color) => setColor(color)}
          thumbSize={30}
          sliderSize={30}
          noSnap={true}
          row={false}
        />
        <View style={[containerStyles.bottomHorizontal, {marginTop: 8}]}>
            <CustomButtonWithIcon  
                onPress={setColorFragmentValues} 
                iconName={'close'}
                iconSize={ICONSIZE.small}
                iconColor={COLORS.backgroundColor}
                color={COLORS.backgroundColor}
            />
            <CustomButtonWithIcon  
                onPress={() => setColorPickerViewVisibilty?.(false)} 
                iconName={'cancel'}
                iconSize={ICONSIZE.small}
                iconColor={COLORS.backgroundColor}
                color={COLORS.backgroundColor}
            />
        </View>
    </View>
  );
};
  

export default ColorPickerFragment; 