import {  TemplateBackground, Container } from './templateTypes';

type UserEdit = {
    id?: string, 
    email?: string;
    username?: string;
    password?: string;
    loggedIn?: boolean;
};
type QuestionEdit = {
    id?: string, 
    category?: string, 
    question?: string;
    rightAnswer?: string;
    trueOrFalseQuestion?: boolean;
    possibleAnswers?: Array<PossibleAnswerEdit>
    count?: number; 
};


type PossibleAnswerEdit = {
    possibleAnswer?: string;
    count?: number; 
};

type ImagesEdit = {
    id?:string
    name?: string,
    uri?: string,
}

type TemplateEdit = {
    id?:string
    templateBackground?: Container, 
    questionContainer?: Container, 
    answerContainer?: Container
    images?: Array<ImagesEdit>
    backgroundImage?:string,
    direction?: 'row' | 'column'
}

type QuizInitDataEdit = {
    quizName?: string, 
    quizCategory? : string, 
    numberOfQuestions?: number, 
    questions: Array<QuestionEdit>
}

export {
    ImagesEdit,
    UserEdit, 
    QuestionEdit, 
    PossibleAnswerEdit,
    TemplateEdit,
    QuizInitDataEdit
}