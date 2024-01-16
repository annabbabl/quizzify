import { QuestionContainer, TemplateBackground, AnswerContainer, Container } from '../localTypes/templateTypes';

type UserEdit = {
    email?: string;
    username?: string;
    password?: string;
    loggedIn?: boolean;
};
type QuestionEdit = {
    id?: string;
    question?: string;
    rightAnswer?: string;
    trueOrFalseQuestion?: boolean;
    possibleAnswers?: Array<PossibleAnswerEdit>
};

type QuestionCollectionAdd = {
    name?: string, 
    question: QuestionEdit; 
}

type PossibleAnswerEdit = {
    possibleAnswer?: string;
};

type TemplateEdit = QuestionContainer & TemplateBackground & AnswerContainer &{
    titleText?: Text,
    titleContainerEnable?: boolean, 
    titleContainer?: Container, 
}


export { UserEdit, 
        QuestionEdit, 
        PossibleAnswerEdit,
        TemplateEdit,
        QuestionCollectionAdd }