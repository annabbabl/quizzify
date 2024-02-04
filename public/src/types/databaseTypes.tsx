import firebase from 'firebase/compat/app'
import { TemplateBackground, Container } from './localTypes/templateTypes';

type Timestamp = firebase.firestore.Timestamp;

type UserAdd = {
    email: string;
    username: string;
    password: string;
    loggedIn: boolean;
};

type UserDatabase = UserAdd & {
    id: string;
}

type QuestionAdd = {
    category: string, 
    question: string;
    rightAnswer: string;
    trueOrFalseQuestion: boolean;
    createdAt: Timestamp; 
    createdBy: string; 
    possibleAnswers?: Array<PossibleAnswerAdd | PossibleAnswerDatabase>
};

type QuestionDatabase = QuestionAdd & {
    id: string;
    count: number; 
}

type PossibleAnswerAdd = {
    possibleAnswer: string;
    questionID: string;
};

type PossibleAnswerDatabase = PossibleAnswerAdd & {
    count: number; 
}

type TemplateAdd = {
    templateBackground: Container, 
    questionContainer: Container, 
    answerContainer: Container
    images?: Array<Images | AddImages>
    backgroundImage?: string,
    direction: 'row' | 'column'
}

type TemplateDatabase = TemplateAdd & {
    id: string;
}

type AddImages = {
    name?: string,
    uri?: string,
}

type Images = AddImages & {
    id?:string
}

export { 
    UserAdd, 
    UserDatabase,
    QuestionAdd,
    QuestionDatabase,
    PossibleAnswerAdd, 
    PossibleAnswerDatabase,
    TemplateAdd,
    TemplateDatabase, 
    AddImages, 
    Images
}