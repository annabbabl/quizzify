import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton, HeaderRectangle } from '../../common/shared/components';
import {containerStyles, imageStyles } from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../../constants";
import '../../../constants/i18next'
import AddQuestions from './addQuestionsScren';
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import TableScreen from './tablescreen';



const QuestionsScreen = ({ navigation, adding: addQuestion, editing}: QuestionScreenRouterProps) => {
    const {t} = useTranslation()
    const [adding, setAdding] = useState(addQuestion);
    
    useEffect(() =>{
      setAdding(addQuestion)
      console.log(adding)
    }, [])

    return (
      <ScrollView contentContainerStyle={containerStyles.container}>
          {!adding ? (
            <ImageBackground source={IMAGES.BACKGROUND} resizeMethod="resize" style={imageStyles.backgroundImage}>
              <HeaderRectangle label={t('questions')} />
              {!editing && (
                <View style={{alignItems:'center'}}>
                  <CustomButton label={t('addQuestion')} onPress={() => (setAdding(true))} />
                </View>
              )}
              <TableScreen adding={false} editing={editing} />
          </ImageBackground>
          ) : (
              <AddQuestions adding={true} editing={false} />
          )}
      </ScrollView>
    );
}
  

export default QuestionsScreen
