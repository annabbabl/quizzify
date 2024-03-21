import { FunctionType, Offset, TabElement } from "../../types/localTypes/uiTypes";
import { backgroundValues, cssStyles } from "../selectStyleValues";


const functions: Record<any, Array<FunctionType>> = {
    common: [
        {name: 'backGroundColor', screenName: 'color', icon: 'invert-colors', type: 'color',iconType:'MaterialCommunityIcons'} ,
        {name: 'opacity', icon: 'circle-opacity', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'radius',  icon: 'radius', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'size', icon: 'move-resize', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'elevation', icon: 'elevator', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'border', icon: 'border-all', type: 'boolean',iconType:'MaterialCommunityIcons'} ,
    ], 
    shadow:[ 
        {name: 'shadowColor',icon: 'invert-colors', type: 'color',iconType:'MaterialCommunityIcons'} ,
        {name: 'shadowOffset',screenName: 'offset', icon: 'elevation-rise', type: 'object',iconType:'MaterialCommunityIcons', typeOfObject: { x: 2, y: 2 } as Offset } ,
        {name: 'shadowOpacity',screenName: 'opacity', icon: 'circle-opacity', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'shadowRadius',screenName: 'radius', icon: 'radius', type: 'number',iconType:'MaterialCommunityIcons'} ,
    ],
    text: [
        {name: 'textDecorationColor', icon: 'invert-colors', type: 'color',iconType:'MaterialCommunityIcons', assignedValues: cssStyles.textDecoration} ,
        {name: 'textDecorationLine', screenName:'decorationLine', icon: 'format-underline', type: 'string',iconType:'MaterialCommunityIcons' , assignedValues: cssStyles.textDecoration} ,
        {name: 'fontFamily', icon: '', type: 'string',iconType:'MaterialCommunityIcons', assignedValues: cssStyles.fontFamily} ,
        {name: 'fontSize',screenName: 'size', icon: 'format-size', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'color', icon: 'invert-colors', type: 'color',iconType:'MaterialCommunityIcons'} ,
        {name: 'textShadowColor',screenName: 'shadowColor', icon: 'text-shadow', type: 'color',iconType:'MaterialCommunityIcons'} ,
        {name: 'textShadowOffset',screenName: 'offset', icon: 'elevation-rise', type: 'object',iconType:'MaterialCommunityIcons', typeOfObject: { x: 2, y: 2 } as Offset } ,
        {name: 'textShadowRadius',screenName: 'opacity', icon: 'circle-opacity', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'textShadowRadius',screenName: 'radius', icon: 'radius', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'textTransform',screenName: 'transform', icon: 'format-letter-case', type: 'string',iconType:'MaterialCommunityIcons', assignedValues: cssStyles.textTransform} ,
        {name: 'textAlign',screenName: 'align', icon: 'format-letter-case', type: 'string',iconType:'MaterialCommunityIcons', assignedValues: cssStyles.textAlign} ,
    ], 
    border:[ 
        {name: 'borderWidth', screenName: 'border', icon: 'border-all', type: 'boolean',iconType:'MaterialCommunityIcons'} ,
        {name: 'borderStyle',screenName: 'borderStyle', icon: 'border-outside', type: 'string',iconType:'MaterialCommunityIcons' , assignedValues: cssStyles.borderStyle} ,
        {name: 'borderRadius',screenName: 'radius', icon: '', type: 'number',iconType:'MaterialCommunityIcons'} ,
        {name: 'borderColor',screenName: 'color', icon: 'invert-colors', type: 'color',iconType:'MaterialCommunityIcons'} ,
        {name: 'borderWidth',screenName: 'width', icon: 'panorama-wide-angle-outline', type: 'number',iconType:'MaterialCommunityIcons'} ,
    ],
    image:[ 
        {name: 'addImage', icon: 'plus-circle', type: 'function',iconType:'MaterialCommunityIcons'} ,
        {name: 'deleteImage', icon: 'close', type: 'function',iconType:'MaterialCommunityIcons'} ,
    ],
    background:[ 
        {name: 'border', icon: 'border-all', type: 'boolean',iconType:'MaterialCommunityIcons'} ,
        {name: 'color', icon: 'invert-colors', type: 'color',iconType:'MaterialCommunityIcons'} ,
        {name: 'type', icon: 'ev-plug-type1', type: 'string', assignedValues: backgroundValues.type,iconType:'MaterialCommunityIcons'} ,
        {name: 'direction', icon: 'directions-fork', iconType:'MaterialCommunityIcons',type: 'string', assignedValues: backgroundValues.diagonalDirections || backgroundValues.stripeDirections } ,
        {name: 'clearBackground', icon: 'cancel', type: 'function',iconType:'MaterialCommunityIcons'} ,
        {name: 'buttonAlign', icon: 'gesture-tap-button', type: 'function',iconType:'MaterialCommunityIcons'} ,
    ]
}

const bottomBarItems: Array<TabElement> = [
    {
        name:'shadow',
        iconType:'MaterialCommunityIcons',
        iconName:'box-shadow', 
        functionsAvailiable: functions.shadow
    },
    {
        name:'text',
        iconType:'MaterialCommunityIcons',
        iconName:'format-text', 
        functionsAvailiable: functions.text
    },
    {
      name: 'border',
      iconType: 'MaterialCommunityIcons',
      iconName: 'border-all',
      functionsAvailiable: functions.border
    },
    {
        name: 'image',
        iconType:'MaterialCommunityIcons',
        iconName:'image',
        functionsAvailiable: functions.image
    },
    // {
    //     name: 'background',
    //     iconType:'MaterialCommunityIcons',
    //     iconName:'arrange-send-backward',
    //     functionsAvailiable : functions.background
    // },
];


export default bottomBarItems; 
  