import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButtonWithIcon, CustomTitle } from '../../common/shared/components';
import { containerStyles } from "../../../styles/components.style";
import { useTranslation } from "react-i18next";
import { COLORS, } from "../../../constants";
import '../../../constants/i18next'
import AddQuestions from './addQuestionsScren';
import TableScreen from './tablescreen';
import { NativeBaseProvider } from "native-base";
import { QuestionEdit } from '../../../types/localTypes/editTypes';
import { ICONSIZE } from '../../../constants/theme';
import { Filter } from '../../../types/localTypes/uiTypes';
import SetFilterComponent from './filterComponent';
import { Searchbar } from 'react-native-paper';
import { SideBarRouterProps } from '../../../navigation/routers';
import { View } from 'react-native'; 
import { FIRESTORE, FIREBASE_AUTH } from '../../../firebase/firebaseConfig';
import { capitalizeKeys } from '../../../appFunctions/utils';


const QuestionsScreen = ({editing}: SideBarRouterProps) => {
    const questionCollection = FIRESTORE.collection('questions').where('createdBy', '==', FIREBASE_AUTH?.currentUser?.uid);

    const {t} = useTranslation()
    const [adding, setAdding] = useState(false);
    const [filter, setFilter] = useState<Filter>({});
    const [questions, setQuestions] = useState([] as QuestionEdit[]);
    const [categories, setCategories] = useState([] as string[]);
    const [filterModalVisibility, setFilterModalVisibilty] = useState(false);
    const [addModalVisibility, setAddModalVisibilty] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    


    useEffect(() => {
      setAdding(adding ? adding: false);
    
      const unsubscribe = questionCollection.onSnapshot(async (querySnapshot) => {
        const updatedQuestions = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const questionData = { id: doc.id, ...doc.data() };
            console.log(doc.data(), 78781)
            const possibleAnswersDoc = await doc.ref.collection('possibleAnswers').get();
            const possibleAnswers = possibleAnswersDoc.docs.map((answerDoc) => answerDoc.data());
    
            const capitalizedQuestionData = capitalizeKeys(questionData);

            return { ...capitalizedQuestionData, possibleAnswers };
          })
        );
        updatedQuestions.sort((q1: QuestionEdit, q2: QuestionEdit) => (q1 && q1.category ? q1.category: '').localeCompare(q2 && q2.category ? q2.category: ''));
        setQuestions(updatedQuestions);
    
        setCategories(
          updatedQuestions
            ? Array.from(new Set(updatedQuestions.map((question: QuestionEdit) => question.category)))
            : []
        );

        if (searchQuery.trim() !== '') {
          const searchedQuestions = questions.filter(
            (question: QuestionEdit) => { 
              if(question.question && question.question.toLowerCase().includes(searchQuery.toLowerCase())){
                return question; 
              }
            }
          )
          setQuestions(searchedQuestions)
        }

        if (Object.keys(filter).length !== 0) {
          const filteredItems = questions.filter((question: QuestionEdit) => {
            const categoryMatch = filter.category !== '' &&  question.category && question.category.toLowerCase() === filter.category && filter.category.toLowerCase();
            const typeOfQuestionMatch =
              (filter.typeOfQuestion === 'trueFalseQuestion' && question.trueOrFalseQuestion) ||
              (filter.typeOfQuestion === 'text' && !question.trueOrFalseQuestion);
        
            return categoryMatch || typeOfQuestionMatch;
          });
        
          setQuestions(filteredItems);
          setIsFetching(false)
        }
      });
    
      return () => {
        if(isFetching){
          unsubscribe();
        }
      };
    }, [searchQuery, filter]);
    console.log(questions, 78787)
    
    return (
      <NativeBaseProvider>
        {adding ? (
          <AddQuestions 
          categories={categories} 
          adding={adding} 
          setIsFetching={setIsFetching} 
          setAdding={setAdding}
        />
        ):(
        <ScrollView contentContainerStyle={[containerStyles.container, { backgroundColor: COLORS.backgroundColor }]}>
          <View style={{backgroundColor:COLORS.backgroundColor}}>
            <CustomTitle label={t('questions')}/>
            {!editing && (
              <View style={containerStyles.horizontalContainer1}>
                  <Searchbar placeholder="Search" onChangeText={(query)=> setSearchQuery(query)} value={searchQuery} />
                 
                  <CustomButtonWithIcon  
                    onPress={() => (setAdding(true))}
                    iconName={'plus-circle'}
                    iconSize={ICONSIZE.small}
                    iconColor={COLORS.secondaryColor}
                  />
                <View style={{alignItems:'baseline'}}>
                  <CustomButtonWithIcon  
                    onPress={() => (setFilterModalVisibilty(true))}
                    iconName={'filter'}
                    iconSize={ICONSIZE.small}
                    iconColor={COLORS.secondaryColor}
                  />
                </View>

              </View>
            )}
            <TableScreen adding={false}
                editing={editing}
                questions={questions}
                categories={categories} navigation={undefined}                
              />
        </View>

        </ScrollView>
        )}
        

        {filterModalVisibility && 
          <SetFilterComponent 
            setFilter={setFilter} 
            categories={categories} 
            filter={filter} 
            setModalVisibilty={setFilterModalVisibilty} 
          />}
      </NativeBaseProvider>

    );
}
  

export default QuestionsScreen
