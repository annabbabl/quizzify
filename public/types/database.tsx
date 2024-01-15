import firebase from 'firebase/compat/app'

type Timestamp = firebase.firestore.Timestamp;

type User = {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    loggedIn?: boolean;
};
type Question = {
    id?: string;
    question?: string;
    rightAnswer?: string;
    trueOrFalseQuestion?: boolean;
    createdAt?: Timestamp;
    createdBy?: string;
    possibleAnswers?: Array<PossibleAnswer>
};
type PossibleAnswer = {
    id?: string;
    questionID?: string;
    possibleAnswer?: string;
};



type Template = QuestionContainer & TemplateBackground & AnswerContainer &{
    titleText?: Text,
    titleContainer?: 
}

type TemplateBackground = Border & Shadow & Text & {
    primaryColor?: string,
    secondaryColor?: string,
    backgroundPattern?: string,
    backgroundimage?: string,
}

type QuestionContainer = Border & Shadow & {
    primaryColor?: string,
    secondaryColor?: string,
    backgroundPattern?: string,
    questionText: Text
}

type AnswerContainer = Border & Shadow & Text & {
    primaryColor?: string,
    secondaryColor?: string,
    backgroundPattern?: string,
    asnwer?: Text
}

type ofset = {
    width: number,
    height: number
}

type Shadow = {
    shadowColor: string,
    shadowOffset: ofset,
    shadowOpacity: number,
    shadowRadius: number,
    elevation: number
}

type Text = {
    weight: string, 
    size: string,
    fontFamily: string
}

type Border = {
    containerBorder?: boolean,
    containerBorderRadius?: number,
    containerBorderColor?: string,
    containerBorderWidth?: number,
}


export { User, Question, PossibleAnswer, Template }