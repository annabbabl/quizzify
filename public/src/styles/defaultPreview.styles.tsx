import {  StyleSheet } from 'react-native';
import { BORDERRADIUS, COLORS } from '../constants';

const defaultTemplatePreviewStyle = StyleSheet.create({
    screenTouchable: {
      alignItems: 'center',
      borderWidth: 7,
      borderRadius: BORDERRADIUS,
      borderColor: COLORS.secondaryColor,
      height: 500,
      justifyContent:'flex-start',
      textAlign:'center', 
      width: 400
    },
    questionContainer: {
      marginBottom:10, 
      backgroundColor: COLORS.secondaryColor,
      width: 300,
      paddingBottom: '20%',
      textAlign:'center'
    },
    answerContainerColumn: {
      backgroundColor: COLORS.thirdColor,
      padding: 10, 
      width: 200,
      marginBottom: 10,
      alignItems:'center'
    },
    answerContainerRow: {
      backgroundColor: COLORS.thirdColor,
      padding: 5, 
      width: 100,
      marginBottom: 4,
      marginLeft: 4,
      alignItems:'center'
    },
});

const screenTouchableArray = [
  { property: 'flex', value: 1 },
  { property: 'justifyContent', value: 'center' },
  { property: 'alignItems', value: 'center' },
  { property: 'borderWidth', value: 7 },
  { property: 'borderRadius', value: BORDERRADIUS },
  { property: 'borderColor', value: COLORS.secondaryColor },
  { property: 'width', value: 400 },
  { property: 'padding', value: '20%' },
  { property: 'textAlign', value: 'center' },
  { property: 'marginVertical', value: 7 },
];

const questionContainerStylesArray = [
  { property: 'marginBottom', value: 10 },
  { property: 'backgroundColor', value: COLORS.secondaryColor },
  { property: 'width', value: 300 },
  { property: 'paddingVertical', value: 10 },
  { property: 'textAlign', value: 'center' },
];

const answerContainerStylesArray = [
  { property: 'backgroundColor', value: COLORS.thirdColor },
  { property: 'padding', value: 10 },
  { property: 'width', value: 200 },
  { property: 'marginBottom', value: 10 },
  { property: 'alignItems', value: 'center' },
];

export { 
        defaultTemplatePreviewStyle, 
        screenTouchableArray,
        questionContainerStylesArray,
        answerContainerStylesArray 
      }; 
  