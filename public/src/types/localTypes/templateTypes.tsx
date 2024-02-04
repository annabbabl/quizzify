import { ChoosenCss } from "./uiTypes"

type TemplateBackground = {
    container: Container
    backgroundimage?: string,
}

type ContainerStyles = Border & Shadow & Color & Animation & Other &{ 

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

type Color = {
    primaryColor?: string,
    secondaryColor?: string,
    opacity: number
}

type offset = {
    width?: number,
    height?: number
}

type Animation = {
    
}


export {
    TemplateBackground,
    Container, 
    Shadow,
    Border, 
    Text, 
    Other
}