import { User } from 'firebase/auth';
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
    possibleAnswer?: string | boolean;
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
    images?: Array<string>
    backgroundImage?:string,
    direction?: 'row' | 'column'
}

type QuizInitDataEdit = {
    id?:string, 
    createdBy?: string
    quizName?: string, 
    quizCategory? : string, 
    numberOfQuestions?: number, 
    questions?: Array<QuestionEdit>,
    roundInformation?: Array<RoundInformation>,
    winners? : Array<joinedUser>,
    started?: boolean, 
    initialized?: boolean,
    joinedUsers? : Array<joinedUser>
}

type GameEdit = QuizInitDataEdit & {
    started?: boolean
}

type joinedUser = {
    id: string | undefined, 
    username: string | undefined | null, 
    currentPoints: number | undefined,
}
type RoundInformation = {
    userId: string | undefined, 
    username: string | undefined | null, 
    answerStatus: boolean, 
    question : string | undefined, 
    currentRound: number
}

export type {
    ImagesEdit,
    UserEdit, 
    QuestionEdit, 
    PossibleAnswerEdit,
    TemplateEdit,
    QuizInitDataEdit,
    GameEdit, 
    RoundInformation, 
    joinedUser 
}