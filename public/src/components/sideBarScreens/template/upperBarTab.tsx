import React, { useState } from 'react';
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next';
import { containerStyles } from '../../../styles/components.style';
import { COLORS, ICONSIZE } from '../../../constants/theme';
import Slider from '@mui/material/Slider';
import { CheckIcon, NativeBaseProvider, Select,Text } from 'native-base';
import { TemplateScreenProps } from '../../../navigation/routers';
import { ChoosenCss, FunctionType, Offset, TabElement } from '../../../types/localTypes/uiTypes';
import { Avatar } from 'react-native-paper';
import { CustomButtonWithIcon, CustomSwitch, CustomText } from '../../common/shared/components';
import TextInputFragment from './fragments/inputObjectFragment';
import ColorPickerFragment from './fragments/colorPickerFragment';
import ImageFragment from './fragments/imageFragment';
import { updateStyle } from '../../../appFunctions/utils';
import { Container } from '../../../types/localTypes/templateTypes';

const UpperTabBar = ({ navigation, 
    barItem, 
    availaibleFunctions, 
    colorPickerViewVisibilty, 
    setColorPickerViewVisibilty,
    setTextInputFragmentvisibility, 
    textInputFragmentvisibility,
    setImageFragmentVisibility, 
    imageFragmentVisibility, 
    setTouchedContainer, 
    touchedContainer, 
    setContainerStyle, 
    setImages,
    images,  
    templateID, 
    backgroundImage, 
    setBackgroundImage, 
    direction,
    setDirection
    }: TemplateScreenProps) => {
  const { t } = useTranslation();

  const [toggleStyleValue, setToggleStyleValue] = useState(false);
  
  const [objectProperty, setObjectProperty] = useState({} as FunctionType);
  
  
  const addChoosenStyle = (property: string, styleValue: string | number | {}) => {
    
    updateStyle(property, styleValue, (touchedContainer ? touchedContainer: {} as Container))
    
    setContainerStyle?.((touchedContainer && touchedContainer.style ? touchedContainer.style : {}));
    setTouchedContainer?.((touchedContainer ? touchedContainer : {} as Container));
  };
  const getDefaultValue = (availaibleFunction: FunctionType) => {
    let defaultValue : number | undefined | string | {} | Offset = ""

    let choosenCss: ChoosenCss | undefined = ((touchedContainer ? touchedContainer : {} as Container)).stylesArray.find((style: ChoosenCss) => style.property === availaibleFunction.name)
    
    if(typeof choosenCss == 'undefined'){
      switch (availaibleFunction.type) {
        case 'string':
          defaultValue = ""
          break;
  
        case 'number':
          defaultValue = 0
          break;

        default:
          console.log('Unknown label:', (availaibleFunction.type));
          return;
      }
    }
    else{
      defaultValue = choosenCss.value
    }
      
    return defaultValue
  };


  const getTogglesStyle = (property: string, toggle: boolean) => {
    
    const styleValue = toggle ? 10 : 0;
  
    updateStyle(property, styleValue, ((touchedContainer  ? touchedContainer : {} as Container)))
    
    setContainerStyle?.(((touchedContainer && touchedContainer.style ? touchedContainer.style : {})));
    setTouchedContainer?.(((touchedContainer ? touchedContainer : {} as Container)));
  };

  function clearBackground() {
      throw new Error('Function not implemented.');
  }

  return (
      <NativeBaseProvider>
        <ScrollView
              contentContainerStyle={[containerStyles.buttonTabBar, 
                  { backgroundColor: COLORS.thirdColor, flexDirection: 'column' 
              }]}
          >
          <Avatar.Icon icon={(barItem ? barItem : {} as TabElement).iconName} size={ICONSIZE.small} style={{ marginTop: 5 }}/>
    
          {imageFragmentVisibility ? (
           <ImageFragment 
              touchedContainer={touchedContainer}
              setTouchedContainer={setTouchedContainer}
              setImageFragmentVisibility={setImageFragmentVisibility}
              setImages={setImages}
              templateID={templateID}
              images={images}
              setBackgroundImage={setBackgroundImage}
              backgroundImage={backgroundImage}
           />

          ): textInputFragmentvisibility ? (
            <TextInputFragment
              availaibleFunction={objectProperty}
              touchedContainer={touchedContainer}
              setTextInputFragmentvisibility={setTextInputFragmentvisibility}
              setTouchedContainer={setTouchedContainer}
            />
          ) : colorPickerViewVisibilty ? (
              <ColorPickerFragment
                  availaibleFunction={objectProperty}
                  setColorPickerViewVisibilty={setColorPickerViewVisibilty}
                  setTouchedContainer={setContainerStyle}
                  touchedContainer={touchedContainer}
              />
          ) : (
            <View style={{marginTop: 10}}>
              {availaibleFunctions?.map((availaibleFunction: FunctionType, index: number) => (
                <View key={index}>
                  {availaibleFunction.type === 'string' ? (
                    <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 60}}>
                      <View style={{width:'60%'}}>
                          <CustomText 
                              label={availaibleFunction.screenName ? t(availaibleFunction.screenName) + ': ' : t(availaibleFunction.name) + ': '}
                              boldFactor={false}
                              textColor={COLORS.backgroundColor}
                          />
                      </View>
                      <View style={{width:'40%', flex: 1}}>
                          <Select
                              selectedValue={getDefaultValue((availaibleFunction ? availaibleFunction : {} as FunctionType)).toString()}
                              width={120}
                              accessibilityLabel={t('select')}
                              placeholder={t('select')}
                              _selectedItem={{
                                  bg: "teal.600",
                                  endIcon: <CheckIcon size="5" />,
                              }}
                              mt={1}
                              onValueChange={(style: string) => addChoosenStyle(availaibleFunction.name, style)}
                          >
                                  {availaibleFunction?.assignedValues?.map((value: string, selectionIndex: number) => (
                                      <Select.Item label={value} value={value} key={('selection' + selectionIndex.toString())} />
                                  ))}
                          </Select>
                      </View>
                    </View>
                  ) : availaibleFunction.type === 'number' ? (
                      <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 60}}>
                          <View style={{width:'50%'}}>
                              <CustomText 
                                  label={availaibleFunction.screenName ? t(availaibleFunction.screenName) + ': ' : t(availaibleFunction.name) + ': '}
                                  boldFactor={false}
                                  textColor={COLORS.backgroundColor}
                              />
                          </View>
                          <View style={{width:'50%'}}>
                              <Slider
                                  aria-label={availaibleFunction.screenName ? availaibleFunction.screenName + ': ' : availaibleFunction.name + ': '}
                                  defaultValue={Number(getDefaultValue(availaibleFunction))}
                                  getAriaValueText={(value: number) => String(value)}
                                  step={1}
                                  aria-labelledby={availaibleFunction.screenName ? t(availaibleFunction.screenName) + ': ' : t(availaibleFunction.name) + ': '}
                                  min={0}
                                  max={80}
                                  valueLabelDisplay="auto"
                                  onChange={(event: Event, value: number) => 
                                      addChoosenStyle(availaibleFunction.name, Math.floor(value))
                                  }
                                  color="secondary"
                                  style={{ marginBottom: 10, marginLeft: 11, maxWidth: '80%' }}
                              />
                          </View>
                      </View>
                  ) : availaibleFunction.type === 'boolean' ? (
                    <View style={containerStyles.horizontalContainer1}>
                      <View style={{width:'60%'}}>
                          <CustomText 
                              label={availaibleFunction.screenName ? t(availaibleFunction.screenName) + ': ' : t(availaibleFunction.name) + ': '}
                              boldFactor={false}
                              textColor={COLORS.backgroundColor}
                          />
                      </View>
                      <View style={{width:'50%'}}>
                          <CustomSwitch
                              switchSize="med"
                              key={index}
                              switchValue={toggleStyleValue}
                              onValueChange={(toggle) => {
                                  getTogglesStyle(availaibleFunction.name, toggle);
                              }}
                              style={{ marginBottom: 2 }}
                          />
                      </View>
                    </View>
                  ) : availaibleFunction.type === 'function' ? (
                    <CustomButtonWithIcon
                      key={index}
                      flexDirection='row'
                      onPress={() => (availaibleFunction.name === 'addImage' ? setImageFragmentVisibility?.(true):
                                      availaibleFunction.name ==='buttonAlign' ? setDirection?.(direction === 'column' ? 'row' : 'column')
                                      : clearBackground())}
                      iconName={availaibleFunction.icon}
                      label={availaibleFunction.screenName ? t(availaibleFunction.screenName) + ': ': t(availaibleFunction.name) + ': '}
                      iconSize={ICONSIZE.medium}
                      iconColor={COLORS.backgroundColor}
                      style={{ marginBottom: 2 }}
                      color={COLORS.thirdColor}
                      direction='left'
                    />
                  ) : availaibleFunction.type === 'object' ? (
                    <CustomButtonWithIcon
                      key={index}
                      flexDirection='row'
                      onPress={() => { setTextInputFragmentvisibility?.(true); setObjectProperty(availaibleFunction); }}
                      iconName={availaibleFunction.icon}
                      label={availaibleFunction.screenName ? t(availaibleFunction.screenName) + ': ': t(availaibleFunction.name) + ': '}
                      iconSize={ICONSIZE.medium}
                      iconColor={COLORS.backgroundColor}
                      style={{ marginBottom: 2 }}
                      color={COLORS.thirdColor}
                      direction='left'
                    />
                  ) : availaibleFunction.type === 'color' ? (
                    <CustomButtonWithIcon
                      key={index}
                      label={availaibleFunction.screenName ? t(availaibleFunction.screenName) + ': ' : t(availaibleFunction.name) + ': '}
                      flexDirection='row'
                      onPress={() => {setColorPickerViewVisibilty?.(true); setObjectProperty(availaibleFunction); console.log(colorPickerViewVisibilty, objectProperty, 11113)}}
                      iconName={availaibleFunction.icon}
                      iconSize={ICONSIZE.medium}
                      iconColor={COLORS.backgroundColor}
                      style={{ marginBottom: 2 }}
                      color={COLORS.thirdColor}
                      direction='left'
                    />
                  ) : (
                    <></>
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </NativeBaseProvider>
    );
}

export default UpperTabBar;
