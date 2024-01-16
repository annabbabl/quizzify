import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton, CustomLink, HeaderRectangle } from '../../common/shared/components';
import {containerStyles, imageStyles } from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { COLORS, IMAGES } from "../../../constants";
import '../../../constants/i18next'
import AddQuestions from './addQuestionsScren';
import { QuestionScreenRouterProps } from '../../../navigation/routers';
import TableScreen from './tablescreen';
import { NativeBaseProvider, Text, Box } from "native-base";



const QuestionsScreen = ({ navigation, adding: addQuestion, editing}: QuestionScreenRouterProps) => {
    const {t} = useTranslation()
    const [adding, setAdding] = useState(addQuestion);
    
    useEffect(() =>{
      setAdding(addQuestion)
      console.log(adding)
    }, [])

    return (
      <NativeBaseProvider>
        <ScrollView contentContainerStyle={containerStyles.container}>
            {!adding ? (
              <View style={{backgroundColor:COLORS.backgroundColor}}>
                <Text fontSize="6xl" bold>{t('questions')}</Text>
                {!editing && (
                  <View style={{alignItems:'center'}}>
                    <CustomButton label={t('addQuestion')} small={true} onPress={() => (setAdding(true))} />
                  </View>
                )}
                <TableScreen adding={false} editing={editing} />
            </View>
            ) : (
                <AddQuestions adding={true} editing={false} />
            )}
        </ScrollView>
      </NativeBaseProvider>

    );
}
  

export default QuestionsScreen
