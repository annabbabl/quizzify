import { ChoosenCss } from "./uiTypes"

type TemplateBackground = {
    container: Container
    backgroundimage?: string,
}

type Container =  &{
    name: 
        'Background' | 
        'Question' | 
        'Answers' | 
        '',
    style:any, 
    stylesArray: Array<ChoosenCss>
}

type ImportedImage = {
    name: string, 
    xCoordinate?: number,  
    yCoordinate?: number,  
}

type Other = {
    backgroundPattern?: string,
    image?: ImportedImage
}

type Shadow = {
    shadowColor?: string,
    shadowOffset?: offset,
    shadowOpacity?: number,
    shadowRadius?: number,
    elevation?: number
}

type Text = {
    textDecoration?: string, 
    size?: string,
    fontFamily?: string
}

type Border = {
    border?: boolean,
    borderRadius?: number,
    borderColor?: string,
    borderWidth?: number,
}


type offset = {
    width?: number,
    height?: number
}

export type {
    TemplateBackground,
    Container, 
    Shadow,
    Border, 
    Text, 
    Other
}