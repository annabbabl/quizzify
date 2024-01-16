
type TemplateBackground = Container & {
    backgroundimage?: string,
}

type QuestionContainer = Container & {
    questionText?: Text
}

type AnswerContainer = Container & {
    answerText?: Text
}

type Container = Border & Shadow & Color & Animation &{
    backgroundPattern?: string,
}

type Shadow = {
    shadowColor: string,
    shadowOffset: offset,
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

type Color = {
    primaryColor?: string,
    secondaryColor?: string,
    opacity: number
}

type offset = {
    width: number,
    height: number
}

type Animation = {
    
}


export {TemplateBackground, QuestionContainer, AnswerContainer, Container }