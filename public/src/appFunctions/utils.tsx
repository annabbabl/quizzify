import { QuestionEdit } from "../types/localTypes/editTypes";
import { Container } from "../types/localTypes/templateTypes";
import { ChoosenCss, Offset } from "../types/localTypes/uiTypes";
import { StyleSheet } from 'react-native';

const convertStylesToStyleSheet = (styles: Array<ChoosenCss> = []): Record<string, number | string | Offset> => {
    const styleObject: Record<string, any> = {};
    styles.forEach((style) => {
      styleObject[style.property] = style.value;
    });
  
    return StyleSheet.create({
      generatedStyles: styleObject,
    }).generatedStyles;

};

const convertStyleSheetToStyles = (styleSheet: Record<string, any>): ChoosenCss[] => {
  const styles: ChoosenCss[] = [];

  for (const property in styleSheet) {
    if (styleSheet.hasOwnProperty(property)) {
      const value = styleSheet[property];
      styles.push({ property, value });
    }
  }
  return styles;
};

const convertStyleSheetToForStyles = (styleSheet: Record<string, any>): ChoosenCss[] => {
  const styles: ChoosenCss[] = [];

  for (const property in styleSheet) {
    if (styleSheet.hasOwnProperty(property)) {
      const css: ChoosenCss = styleSheet[property];
      const convertedProperty: ChoosenCss = {
        property: css.property, 
        value: css.value
      }
      styles.push(convertedProperty);
    }
  }
  return styles;
};


const updateContainers = (newContainer: Container, containersArray: Array<Container>) => {
  const updatedContainers = containersArray.map(container => {
    if (container.name === newContainer.name) {
      return newContainer;
    }
    return container;
  });

  return updatedContainers; 

};

const removeDuplicateObjects = (array: Array<any>) => {
  const uniqueObjects = new Set();
  
  return array.filter(obj => {
    const objectString = JSON.stringify(obj);

    if (!uniqueObjects.has(objectString)) {
      uniqueObjects.add(objectString);
      return true;
    }

    return false;
  });
};

const updateStyle = (property: string, styleValue: string | number | {}, touchedContainer: Container) => {
  
  const choosenStyle: ChoosenCss = {
    property: property,
    value: styleValue,
  };

  const existingIndex = touchedContainer.stylesArray.findIndex(
    (choosenStyle: ChoosenCss) => choosenStyle.property === property);

  if (existingIndex > -1) {
    touchedContainer.stylesArray[existingIndex] = choosenStyle;
  } else {
    touchedContainer.stylesArray.push(choosenStyle);
  }

  touchedContainer.style = {... touchedContainer.style, [property]: styleValue}
}

const generateGameCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

const getRandomQuestions = (arr: Array<QuestionEdit>, numElements: number) =>{
  const randomIndices = [];
  const selectedElements = [];

  while (randomIndices.length < numElements) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  // Use random indices to select elements
  randomIndices.forEach((index) => {
    selectedElements.push(arr[index]);
  });

  return selectedElements;
}

const capitalizeFirstLetter = (word: string) =>  {
  if (word.length === 0) {
    return word; // Return the original word if it's an empty string
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const capitalizeKeys = (object: any) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const capitalizedObject: any = {};

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (typeof value === 'string') {
        if (['question', 'category', 'rightAnswer'].includes(key)) {
          capitalizedObject[key] = capitalizeFirstLetter(value);
        } else {
          capitalizedObject[key] = value;
        }
      } else {
        capitalizedObject[key] = capitalizeKeys(value);
      }
    }
  }

  return capitalizedObject;
}


export {
  convertStylesToStyleSheet, 
  convertStyleSheetToStyles, 
  convertStyleSheetToForStyles, 
  removeDuplicateObjects, 
  updateStyle, 
  generateGameCode, 
  getRandomQuestions, 
  capitalizeFirstLetter, 
  capitalizeKeys
};  