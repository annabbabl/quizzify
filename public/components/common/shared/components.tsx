
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet, View, Switch, TextProps, SwitchProps, ViewStyle} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { containerStyles, styles, textStyles } from "../../../styles/components.style"
import React from "react";
import * as Font from "expo-font";
import { COLORS, SHADOWS } from "../../../constants";

interface CustomTexProps extends TextProps{
    label?: string;
    bold?: boolean; 
}
interface CustomSwithProps extends SwitchProps{
    switchValue?: boolean;
    onValueChange?: (value: boolean) => void;
}
interface CustomButtonProps extends TouchableOpacityProps {
    label?: string;
    value?: string;
    small?: boolean; 
}
interface CustomIconTouchable extends CustomButtonProps{
    iconType?: string,
    iconName?: string,
    iconSize?: number,
    iconColor?: string,
}
    

const CustomTitle: React.FC<CustomTexProps>= ({label, ...rest}) =>{
    return(
        <Text style={[textStyles.normalText, {marginTop: 50,marginBottom: 10}]} {...rest}>{label}</Text>
    )
}

const CustomText: React.FC<CustomTexProps> = ({ label, bold, ...rest }) => {
    return (
      <Text style={bold ? textStyles.boldText : textStyles.normalText} {...rest}>
        {label}
      </Text>
    );
};
  
const CustomErrorText: React.FC<CustomTexProps> = ({ label, ...rest }) => {
    return (
      <Text style={textStyles.errorStyle} {...rest}>
        {label}
      </Text>
    );
};
  

const CustomButton: React.FC<CustomButtonProps> = ({ label,small,  ...rest }) =>{
    return (
        <TouchableOpacity  style={[styles.button, SHADOWS.middle]}{...rest}>
            <Text style={small ? styles.buttonTextXS: styles.buttonTextXL}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomButtonWithIcon: React.FC<CustomIconTouchable> = ({ label, iconType, iconName, iconSize, iconColor,  ...rest }) =>{
    return (
        <TouchableOpacity {...rest}>           
            {label ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                {iconType === 'Material' ? (
                    <MaterialIcons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                    <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor}style={{ marginRight: 10 }} />
                    )}
                <Text style={textStyles.smallIconsText}>{label}</Text>
            </View>
            ) : (
            <View style={containerStyles.iconButtonCotainer}>
                {iconType === 'Material' ? (
                    <MaterialIcons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                    <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
                    )}
            </View>
            )}
        </TouchableOpacity>
    )
}

const CustomLink: React.FC<CustomButtonProps> = ({ label, ...rest }) =>{
    return (
        <TouchableOpacity {...rest}>
            <Text style={styles.link}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomSwitch: React.FC<CustomSwithProps> = ({ switchValue, onValueChange, ...rest }) =>{
    return (
    <Switch
        trackColor={{ false: COLORS.redPrimaryColor, true:  COLORS.greenPrimaryColor }}
        thumbColor={switchValue ? COLORS.redPrimaryColor : COLORS.greenSecondaryColor}
        onValueChange={onValueChange}
        value={switchValue} {...rest}
    />
    );
};
const HeaderRectangle: React.FC<CustomTexProps> = ({ label,...rest }) =>{
    return (
    <View style={rectangleStyles.rectangleParent} {...rest}>
        <View style={rectangleStyles.groupChild} />
        <Text style={rectangleStyles.text}>{label}</Text>
    </View>
    );
};

const rectangleStyles = StyleSheet.create({
    groupChild: {
        backgroundColor: "#061ef3",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 4,
            height: 6
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        width: 293,
        height: 108,
        textAlign: "auto",
        position: "relative",
        justifyContent: "space-between", 
        alignItems:'center',
        alignSelf:'auto'
        },
        text: {
            top: 26,
            left: 17,
            fontSize: 38,
            fontFamily: "KumarOne-Regular",
            color: "#fff",
            textAlign: "center",
            width: 259,
            height: 67,
            position: "absolute", 
            justifyContent: "center", 
            marginLeft: '18%',
            alignContent:'center',
            alignSelf:'center'
        },
        rectangleParent: {
            width: "100%",
            height: 108,
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
            textAlign: "center",
            justifyContent: "space-between", 
            alignContent:'center',
            alignSelf:'center'
        }
});

export{
    CustomButton, 
    CustomButtonWithIcon, 
    CustomTitle,
    CustomErrorText,
    CustomText, 
    CustomLink, 
    HeaderRectangle, 
    CustomSwitch,
}