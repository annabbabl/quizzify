import { NavigationProp } from "@react-navigation/native";
import { QuestionEdit } from "../types/localTypes/editTypes";
import { QuestionsScreenNavigatorProps } from "./QuestionScreenNavigator";
import { ChoosenCss, Filter, FunctionType, TabElement } from "../types/localTypes/uiTypes";
import { Container } from "../types/localTypes/templateTypes"
import { RouteProp } from '@react-navigation/native';
import { Images } from "../types/databaseTypes";

interface RootLayout {
    questions? : Array<QuestionEdit>; 
    categories? : string[]; 
    quizData?: any; 
    navigation?: NavigationProp<any, any>;
}
interface AuthRouterProps extends RootLayout{
    loggedIn?: boolean;
    setInitiatingQuiz?: React.Dispatch<React.SetStateAction<boolean>>;
    setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
    editing?: boolean;
}

interface SideBarRouterProps extends RootLayout{
    adding?: boolean;
    editing?: boolean;
    loggedIn?: boolean;
    initiatingQuiz?: boolean;
    setSettingChange?: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestions?: React.Dispatch<React.SetStateAction<Array<QuestionEdit>>>;
    setCategories?: React.Dispatch<React.SetStateAction<Array<string>>>;
}

interface SidebarProps extends RootLayout{

}
interface QuestionScreenRouterProps extends RootLayout {
    adding?: boolean; 
    editing?: boolean;
    filter?: Filter; 
    modalVisibility? : boolean
    setModalVisibilty?: React.Dispatch<React.SetStateAction<boolean>>;
    setFilter?: React.Dispatch<React.SetStateAction<Filter>>;
    setIsFetching?:  React.Dispatch<React.SetStateAction<boolean>>,
}
interface TemplateScreenProps  extends RootLayout {
    upperBarType?: string, 
    barItem?: TabElement, 
    clickedObject?: string, 
    touchedContainerName?: string, 
    changeInStyleMade?: boolean, 
    availaibleFunctions? : Array<FunctionType>,
    containers? : Array<Container>,
    touchedContainer? : Container,
    selectedComponent?: React.Component, 
    touchedContainerStyles?: Array<ChoosenCss>; 
    textInputFragmentvisibility?: boolean, 
    imageFragmentVisibility?: boolean, 
    colorPickerViewVisibilty? : boolean, 
    templateCollection?: any; 
    images?: Array<Images>, 
    direction?: 'row' | 'column',
    templateID?: string, 
    backgroundImage?: string, 
    setTextInputFragmentvisibility?: React.Dispatch<React.SetStateAction<boolean>>;
    setImageFragmentVisibility?: React.Dispatch<React.SetStateAction<boolean>>;
    setColorPickerViewVisibilty?: React.Dispatch<React.SetStateAction<boolean>>;
    setBarItem?: React.Dispatch<React.SetStateAction<TabElement>>;
    setChangeInStyleMade?: React.Dispatch<React.SetStateAction<boolean>>;
    setTouchedContainer?: React.Dispatch<React.SetStateAction<Container>>; 
    setContainerStyle?:  React.Dispatch<React.SetStateAction<any>>,
    setImages?:  React.Dispatch<React.SetStateAction<Array<Images>>>,
    setBackgroundImage?:  React.Dispatch<React.SetStateAction<string>>,
    setDirection?:  React.Dispatch<React.SetStateAction<string>>,
}
interface TemplateFragmentProps extends TemplateScreenProps, RootLayout {
    availaibleFunction? : FunctionType,
    visibility?: boolean; 
    setTextInputFragmentvisibility?: React.Dispatch<React.SetStateAction<boolean>>;
    setColorPickerViewVisibilty?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface EnteredQuizData extends RootLayout {
    quizName? : string,
    gameCode? : string,
    setQuizName?: React.Dispatch<React.SetStateAction<string>>;
    quizCategory? : string; 
    setQuizCategory?: React.Dispatch<React.SetStateAction<string>>;
    numberOfQuestions? : number; 
    visibility?: boolean; 
    setInitiatingQuiz?:React.Dispatch<React.SetStateAction<boolean>>;
    setAmountOfQuestions?:React.Dispatch<React.SetStateAction<number>>;
    setQuestions?:React.Dispatch<React.SetStateAction<Array<QuestionEdit>>>;
    setGameCode?:React.Dispatch<React.SetStateAction<string>>;
    setGameStarted?:React.Dispatch<React.SetStateAction<boolean>>;
    initiatingQuiz?:boolean; 
    redirectToCategories?: boolean; 
    gameStarted?:boolean; 
    gameQuestions?: Array<QuestionEdit>


    setTextInputFragmentvisibility?: React.Dispatch<React.SetStateAction<boolean>>;
    setColorPickerViewVisibilty?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface GameNavigatorProps{
    quizName? : string,
    gameCode?: string, 
    gameQuestions?: Array<QuestionEdit>,
    gameStarted?: boolean
    setGameStarted?:React.Dispatch<React.SetStateAction<boolean>>;
}

export { AuthRouterProps, 
        QuestionScreenRouterProps,
        SideBarRouterProps,
        TemplateScreenProps,
        TemplateFragmentProps, 
        EnteredQuizData, 
        GameNavigatorProps
    };
  