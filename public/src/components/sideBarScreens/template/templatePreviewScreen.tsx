import { useState } from 'react';
import { Pressable, View, Text, Image, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';
import { PossibleAnswerEdit, QuestionEdit } from '../../../types/localTypes/editTypes';
import { COLORS, SIZES } from '../../../constants/theme';
import { CustomText } from '../../common/shared/components';
import { TemplateScreenProps } from '../../../navigation/routers';
import { imageStyles } from '../../../styles/components.style';
import { ChoosenCss } from '../../../types/localTypes/uiTypes';
import { convertStylesToStyleSheet } from '../../../appFunctions/utils';
import { Container } from '../../../types/localTypes/templateTypes';

const TemplateViewComponent = ({ 
  setTouchedContainer, 
  containers,
  setContainerStyle, 
  backgroundImage, 
  direction
  }: TemplateScreenProps) => {
  const { t } = useTranslation();
 
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const dummyQuestion: QuestionEdit = {
    question: t('dummyQuestion'), 
    rightAnswer: t('dummyRightAnswer'),
    possibleAnswers: [
      {possibleAnswer: t('dummypossibleAnswer1')}, 
      {possibleAnswer: t('dummypossibleAnswer2')}, 
      {possibleAnswer: t('dummypossibleAnswer3')}, 
      {possibleAnswer: t('dummypossibleAnswer4')}, 
    ]
  }

  const calculateWidth = (stylesArray: ChoosenCss[]) => {
    const widthStyle = stylesArray.find((style) => style.property === 'width');
    if (widthStyle && typeof widthStyle.value === 'number') {
      return widthStyle.value / 2;
    }
    return 200; // Return undefined if the width style is not found
  };

  const checkForPropery = (property: string, containerNumber: number, defaultValue: string | number) => {
    const searchedValue: any = 
          containers && containers[containerNumber].stylesArray && containers[containerNumber]  && containers[containerNumber].stylesArray.find(css => css.property === property)?.value ?
          containers[containerNumber].stylesArray.find(css => css.property === property)?.value : defaultValue 
    return searchedValue
  }

  const renderItem = ({ item, index }: { item: PossibleAnswerEdit; index: number }) => {
    const calculatedWidth = calculateWidth((containers && containers[2].stylesArray && containers[2] ? containers[2].stylesArray : []));  
    return (
      <View 
        key={index}
        style={
            {
              ...convertStylesToStyleSheet((containers && containers[2].stylesArray && containers[2] ? containers[2].stylesArray : [])),
              width: calculatedWidth,
              marginLeft:4
            }
          }
        >
        <Pressable
          onPress={() => {
            setTouchedContainer?.((containers && containers[2] && containers[2] ? containers[2] : {} as Container));
            setTooltipVisible(false);
            setContainerStyle?.((containers && containers[2].style && containers[2] ? containers[2].style : {}));
          }}
        >
          <Text
            style={{
              color: checkForPropery('color', 1, COLORS.backgroundColor), 
              textAlign: checkForPropery('textAlign', 1, 'center'), 
            }}
          >
            {item.possibleAnswer}
          </Text>
        </Pressable>
      </View>
    );
  };


  return (
    <View style={{ borderWidth: 7, borderColor: 'black' }}>
      <Tooltip
        isVisible={tooltipVisible}
        content={
          <CustomText
            label={t('pleaseSelectAContainer')}
            textColor={'black'}
            boldFactor={true}
          />
          }
        onClose={() => setTooltipVisible(false)}
      >
        <Pressable
          onPress={() => {
            setTouchedContainer?.((containers && containers[0] ? containers[0] : {} as Container));
            setContainerStyle?.((containers && containers[0] && containers[0].style ? containers[0].style : {} ));
            setTooltipVisible(false);
          }}
          style={{ ...convertStylesToStyleSheet((containers && containers[0] && containers[0].stylesArray ? containers[0].stylesArray : [] )) }}
        >
          {backgroundImage && direction === 'column' ? (
            <Image source={{ uri: backgroundImage }} style={imageStyles.backgroundImageTemplate} />
          ) : (
            <></>
          )}
          
          <View style={{...convertStylesToStyleSheet((containers && containers[1] && containers[1].stylesArray ? containers[1].stylesArray : [] ))}}>
            <Pressable
              onPress={() => {
                setTouchedContainer?.((containers && containers[1] ? containers[1] : {} as Container ));
                setTooltipVisible(false);
                setContainerStyle?.((containers && containers[1] && containers[1].style ? containers[1].style : {} ));
              }}
            >
              <Text
                style={{
                  color:  checkForPropery('color', 1, COLORS.backgroundColor),
                  fontSize:  checkForPropery('fontSize', 1, SIZES.large),
                  marginTop: 20,
                  textAlign: checkForPropery('textAlign', 1, 'center'), 
                }}
              >
                {dummyQuestion.question}
              </Text>
            </Pressable>
          </View>
          { backgroundImage && direction === 'row' ? (
            <Image source={{ uri: backgroundImage }} style={imageStyles.backgroundImageTemplate} />
          ) : (
            <></>
          )}
          {direction === 'row' ? (
             <FlatList
              data={dummyQuestion.possibleAnswers}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2} 
           />
          ) : (
            <>
              {dummyQuestion?.possibleAnswers?.map((possibleAnswer: PossibleAnswerEdit, index: number) => (
                <View key={index} style={{...convertStylesToStyleSheet((containers && containers[2] && containers[2].stylesArray ? containers[2].stylesArray : [] ))}}>
                  <Pressable
                    onPress={() => {
                      setTouchedContainer?.((containers && containers[2] ? containers[2]: {} as Container ));
                      setTooltipVisible(false);
                      setContainerStyle?.((containers && containers[2] && containers[2].style ? containers[2].style : {} ));
                    }}
                  >
                    <Text
                      style={{
                        color:checkForPropery('color', 2, COLORS.backgroundColor),
                    }}
                    >
                      {possibleAnswer.possibleAnswer}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </>
          )}
         
        </Pressable>
      </Tooltip>
    </View>
  );  
};

export default TemplateViewComponent;

