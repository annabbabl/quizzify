import firebase from 'firebase/compat/app'
import { QuestionContainer, TemplateBackground, AnswerContainer, Container } from './localTypes/templateTypes';

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
type QuestionCollectionAdd = {
    name: string, 
    createdBy: string;
    question: QuestionDatabase; 
}
type QuestionCollectionDatabase = QuestionCollectionAdd &{
    id: string;
}

type QuestionAdd = {
    question: string;
    rightAnswer: string;
    trueOrFalseQuestion: boolean;
    createdAt: Timestamp; 
    possibleAnswers?: Array<PossibleAnswerAdd | PossibleAnswerDatabase>
};

type QuestionDatabase = QuestionAdd & {
    id: string;
}

type PossibleAnswerAdd = {
    questionID: string;
    possibleAnswer: string;
};

type PossibleAnswerDatabase = PossibleAnswerAdd & {
    id: string;
}

type TemplateAdd = QuestionContainer & TemplateBackground & AnswerContainer &{
    logo?: string, 
    titleText?: Text,
    titleContainerEnable?: boolean, 
    titleContainer?: Container, 
}

type TemplateDatabase = TemplateAdd & {
    id: string;
}



export { UserAdd, 
        UserDatabase,
        QuestionAdd,
        QuestionDatabase,
        PossibleAnswerAdd, 
        PossibleAnswerDatabase,
        TemplateAdd,
        TemplateDatabase, 
        QuestionCollectionAdd 
    }