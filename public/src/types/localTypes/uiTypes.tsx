type Filter = {
    category?: string, 
    typeOfQuestion?: string; 
}

type FunctionType = {
    name: string, 
    screenName?: string, 
    icon: string, 
    type: 'string' | 'boolean' | 'number' | 'object' | 'function' | 'color', 
    iconType: string, 
    assignedValues? : string[]
    typeOfObject?: Offset | Record<string, any>
}

type TabElement = {
    name: string,
    iconType:'Material' | 'MaterialCommunityIcons',
    iconName: string,
    screenName?: string,
    component?: any, 
    functionsAvailiable?: Array<FunctionType>,
}

type ChoosenCss = {
    property: string, 
    value: string | number | Offset | {}
}

type Offset = {
    x: number, 
    y:number
}

export {Filter, FunctionType, TabElement, ChoosenCss, Offset}