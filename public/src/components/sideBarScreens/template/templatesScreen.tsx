import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import {containerStyles } from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import '../../../constants/i18next'
import { v4 as uuidv4 } from 'uuid'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import TabBottomBar from './buttonTab';
import { NativeBaseProvider } from 'native-base';
import { COLORS } from '../../../constants';
import UpperTabBar from './upperBarTab';
import { TabElement } from '../../../types/localTypes/uiTypes';
import { TemplateScreenProps } from '../../../navigation/routers';
import { Container } from '../../../types/localTypes/templateTypes';
import TemplateViewComponent from './templatePreviewScreen';
import { defaultTemplatePreviewStyle, answerContainerStylesArray, questionContainerStylesArray, screenTouchableArray } from '../../../styles/defaultPreview.styles';
import { CustomButtonWithIcon } from '../../common/shared/components';
import { ICONSIZE } from '../../../constants/theme';
import { TemplateEdit } from '../../../types/localTypes/editTypes';
import { FIRESTORE, FIREBASE_AUTH } from '../../../firebase/firebaseConfig';


const TemplateScreen = ({ }: TemplateScreenProps) => {
  const { t } = useTranslation();

  const templateCollection = FIRESTORE.collection("users").doc(FIREBASE_AUTH?.currentUser?.uid).collection("templates");
  const [newTemplateUUID, ] = useState(uuidv4());


  const [template, setTemplate] = useState<TemplateEdit>({} as TemplateEdit);
  const [direction, setDirection] = useState('column');
  const [emptyTemplate, setEmptyTemplate] = useState(Object.keys(template).length < 1); 
  
  const [upperBarType, ] = useState('');
  const [barItem, setBarItem] = useState({} as TabElement);
  const [textInputFragmentvisibility, setTextInputFragmentvisibility] = useState(false);
  const [colorPickerViewVisibilty, setColorPickerViewVisibilty] = useState(false); 
  const [imageFragmentVisibility, setImageFragmentVisibility] = useState(false); 
  const [loading, setLoading] = useState(true)

  const [touchedContainer, setTouchedContainer] = useState<Container>({
    name: '',
    style: defaultTemplatePreviewStyle.screenTouchable, // Accessing style by its name
    stylesArray: []
  });

  const [containerStyle, setContainerStyle] = useState(touchedContainer.style);

  const [images, setImages] = useState<Array<string>>([]); 
  const [backgroundImage, setBackgroundImage] = useState(''); 

  const [templateID,setTemplateID] = useState(newTemplateUUID); 

  const [containers, setContainers] = useState<Array<Container>>(
    [
      {
        name:'Background',
        style: defaultTemplatePreviewStyle.screenTouchable,
        stylesArray: screenTouchableArray,
      }, 
      {
        name:'Question', 
        style:defaultTemplatePreviewStyle.questionContainer,
        stylesArray:  questionContainerStylesArray,
      }, 
      {
        name:'Answers', 
        style: defaultTemplatePreviewStyle.answerContainerColumn,
        stylesArray: answerContainerStylesArray,
      }
    ]
  )

  const loadData = async () => {
    try {
      const querySnapshot = await templateCollection.get();
      const newTemplateObject: any = {};
  
      for (const doc of querySnapshot.docs) {
        const templateData = doc.data();
        const templateId = doc.id;
  
        if (templateData) {
          const images = templateData.images || [];
          newTemplateObject[templateId] = { id: templateId, ...templateData, images };
        } else {
          console.warn(`Document with ID ${templateId} has no data.`);
        }
      }
      
      const templateIds = Object.keys(newTemplateObject);
  
      if (templateIds.length > 0) {
        setTemplate(newTemplateObject);
        
        const firstTemplateImages = newTemplateObject[templateIds[0]].images || [];
        setImages(firstTemplateImages); 
        const firstTemplateBackgroundImage = newTemplateObject[templateIds[0]].backgroundImage || '';
        setBackgroundImage(firstTemplateBackgroundImage); 
  
        setDirection(newTemplateObject[templateIds[0]].direction);
  
        setContainers([
          {
            name: 'Background',
            style: newTemplateObject[templateIds[0]].templateBackground?.style || {},
            stylesArray: newTemplateObject[templateIds[0]].templateBackground?.stylesArray || [],
          },
          {
            name: 'Question',
            style: newTemplateObject[templateIds[0]].questionContainer?.style || {},
            stylesArray: newTemplateObject[templateIds[0]].questionContainer?.stylesArray || [],
          },
          {
            name: 'Answers',
            style: newTemplateObject[templateIds[0]].answerContainer?.style || {},
            stylesArray: newTemplateObject[templateIds[0]].answerContainer?.stylesArray || [],
          },
        ]);
  
        setTemplateID(templateIds[0]);
  
        setEmptyTemplate(templateIds.length === 0);
      } else {
        console.warn("No templates found.");
        setEmptyTemplate(true);
      }
  
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if(loading){
      loadData();
    }
  }, [template]);

  useEffect(() => {  
    const newContainer: Container = {
      name:  touchedContainer.name,
      stylesArray: touchedContainer.stylesArray, 
      style: touchedContainer.style,
    }

    const existingIndex = containers.findIndex((container:Container) => container.name === newContainer.name);
    
    if (existingIndex > -1) {
      const updatedContainers = [...containers];
      updatedContainers[existingIndex] = newContainer;
      setContainers(updatedContainers);
    }

    setBarItem(barItem)

  }, [barItem, touchedContainer, containerStyle, setContainers, setBarItem, backgroundImage]);

  const saveTemplate = async () => {
    try {
      setLoading(true);
  
      const templateData: TemplateEdit = {
        templateBackground: containers[0],
        questionContainer: containers[1],
        answerContainer: containers[2],
        backgroundImage: backgroundImage ? backgroundImage : "",
        direction: direction === 'row' || direction === 'column' ? direction : undefined
      }; 

      if (emptyTemplate) {
        const newTemplateRef = templateCollection.doc(newTemplateUUID);
        await newTemplateRef.set(templateData); 
  
        console.log(t('templateAddedSuccessfully'));

      } else {
        setTemplate(templateData)

        await templateCollection.doc(templateID).update(templateData);
        console.log(t('templateUpdatedSuccessfully'));
      }
    } catch (error) {
      console.error(error);
      console.log(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={containerStyles.container}>
        {!loading ? (
          <>
            {touchedContainer.name.length > 0 ? (
              <View style={containerStyles.horizontalCentral2}>
                <Text>
                  {t('selected') + ' ' + t('element') + ': ' + t(touchedContainer.name.toLowerCase())}
                </Text>
                <CustomButtonWithIcon
                  iconName={'content-save'}
                  iconSize={ICONSIZE.small}
                  onPress={saveTemplate}
                  iconColor={COLORS.secondaryColor}
                  color={COLORS.backgroundColor}
                />
              </View>
            ) : (
              <Text style={{ marginTop: 4 }}>{t('pleaseSelectAContainer')}</Text>
            )}
              <TemplateViewComponent
                containers={containers}
                setTouchedContainer={setTouchedContainer}
                setContainerStyle={setContainerStyle}
                backgroundImage={backgroundImage}
                direction={direction === 'row' || direction === 'column' ? direction : undefined}
              />
            <View style={[containerStyles.bottom, { marginBottom: 0 }]}>
              <View style={templateStyle.barContainer}>
                {Object.keys(barItem).length !== 0 ? (
                  <View style={{ height: 170, backgroundColor: COLORS.thirdColor, width: '100%', alignItems: 'center' }}>
                    <UpperTabBar
                      barItem={barItem}
                      availaibleFunctions={barItem.functionsAvailiable}
                      setColorPickerViewVisibilty={setColorPickerViewVisibilty}
                      colorPickerViewVisibilty={colorPickerViewVisibilty}
                      setTextInputFragmentvisibility={setTextInputFragmentvisibility}
                      textInputFragmentvisibility={textInputFragmentvisibility}
                      setTouchedContainer={setTouchedContainer}
                      touchedContainer={touchedContainer}
                      setContainerStyle={setContainerStyle}
                      setImageFragmentVisibility={setImageFragmentVisibility}
                      imageFragmentVisibility={imageFragmentVisibility}
                      setImages={setImages}
                      templateID={templateID}
                      images={images}
                      setBackgroundImage={setBackgroundImage}
                      backgroundImage={backgroundImage} 
                      direction={direction === 'row' || direction === 'column' ? direction : undefined}
                      setDirection={setDirection}                    
                    />
                  </View>
                ) : (
                  <></>
                )}
                <View style={{ backgroundColor: COLORS.secondaryColor, width: '100%' }}>
                  <TabBottomBar
                    upperBarType={upperBarType}
                    setBarItem={setBarItem}
                    setColorPickerViewVisibilty={setColorPickerViewVisibilty}
                    setTextInputFragmentvisibility={setTextInputFragmentvisibility}
                  />
                </View>
              </View>
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" color={COLORS.activityIndicatorColor} />
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
 
export default TemplateScreen; 

const templateStyle =  
  StyleSheet.create({
    barContainer: {
      width: 500, 
      alignItems: 'center', 
      justifyContent:'center', 
    },
})