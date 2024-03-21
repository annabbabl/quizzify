import firebase from 'firebase/compat/app'
import { Container } from './localTypes/templateTypes';
import { QuestionEdit, joinedUser } from './localTypes/editTypes';

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

type QuizInitData = {
    gameCode: string,
    quizName: string, 
    quizCategory? : string, 
    numberOfQuestions: number, 
    createdBy: string, 
    createdAt: Timestamp
    questions: Array<QuestionEdit>, 
    started:boolean, 
    initialized: boolean
    roundInformation?: Array<RoundInformationDatabase>,
    winners? : Array<joinedUser>,
    joinedUsers? : Array<joinedUser>
}



type RoundInformationDatabase = {
    userId: string | undefined, 
    answerStatus: boolean, 
    question : string | undefined, 
    currentRound: number
}

type QuizInit = QuizInitData & {
    id?:string
}


export type { 
    UserAdd, 
    UserDatabase,
    QuestionAdd,
    QuestionDatabase,
    PossibleAnswerAdd, 
    PossibleAnswerDatabase,
    TemplateAdd,
    TemplateDatabase, 
    AddImages, 
    Images, 
    QuizInit,
    QuizInitData,
    RoundInformationDatabase
}