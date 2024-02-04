import { containerStyles } from '../../../styles/components.style';
import bottomBarItems from '../../../constants/barItems/tabButtonsBottomBar';
import { TabElement } from '../../../types/localTypes/uiTypes';
import { COLORS, SIZES } from '../../../constants/theme';
import '../../../constants/i18next';
import { ToggleButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { TemplateScreenProps } from '../../../navigation/routers';
import { useTranslation } from 'react-i18next';
import React from 'react';

const TabBottomBar = ({ setBarItem, 
  upperBarType, 
  setColorPickerViewVisibilty,
  setTextInputFragmentvisibility}: TemplateScreenProps) => 
  {
  const { t } = useTranslation();
  

  const getBarItem = (name:string) =>{
    const bottomBarItem = bottomBarItems.find((bottomBarItem: TabElement ) => bottomBarItem.name === name)
    setBarItem?.((bottomBarItem ? bottomBarItem : {} as TabElement))
    setColorPickerViewVisibilty?.(false)
    setTextInputFragmentvisibility?.(false)
  }

  return (
  <View style={[containerStyles.buttonTabBar, { backgroundColor: COLORS.secondaryColor, paddingTop: SIZES.large, flexDirection: 'row',}]}>
      <ToggleButton.Row
        onValueChange={(name: string) => getBarItem(name)}
        value={(upperBarType ? upperBarType : '')} 
        style={toggleButtonStyle.group} 
      >
        {bottomBarItems.map((bottomBarItem: TabElement, index: number) => (
          <ToggleButton
            iconColor={COLORS.backgroundColor}
            icon={bottomBarItem.iconName}
            value={bottomBarItem.name}
            key={index}
            accessibilityLabel={t(bottomBarItem.name)}
            size={SIZES.xxLarge}
            style={toggleButtonStyle.button}
          />
        ))}
      </ToggleButton.Row>     
    </View>
  );
};

export default TabBottomBar;

const toggleButtonStyle =  
  StyleSheet.create({
    group: {
      backgroundColor: COLORS.secondaryColor, 
      height: SIZES.xxLarge, 
      alignItems:'center', 
      alignContent:'space-between', 
      marginBottom: 20
    },
    button: {
      backgroundColor: COLORS.secondaryColor, 
      marginBottom: 10, 
      marginEnd:10 
    }
  }
)