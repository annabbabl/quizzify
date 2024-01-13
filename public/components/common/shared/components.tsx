
import { Text, TextInput, TouchableOpacity, TouchableOpacityProps, StyleSheet, View} from "react-native";
import { styles } from "../../../styles/components.style"
import React, { useState } from "react";
import * as Font from "expo-font";
import { SHADOWS, SIZES } from "../../../constants";


const getFonts = () =>
  Font.loadAsync({
    kumarOne: require("../../../assets/fonts/KumarOne-Regular.ttf"),
});

interface CustomButtonProps extends TouchableOpacityProps {
    label?: string;
    bold?: boolean; 
    img?: string;
    secureTextEntry?: boolean, 
    value?: string, 
    onPress?: () => void;
}

const CustomTitle: React.FC<CustomButtonProps>= ({label, ...rest}) =>{
    return(
        <Text style={styles.title} {...rest}>{label}</Text>
    )
}

const CustomText: React.FC<CustomButtonProps> = ({ label, bold, ...rest }) => {
    return (
      <Text style={bold ? styles.boldText : styles.normalText} {...rest}>
        {label}
      </Text>
    );
  };
  

const CustomButton: React.FC<CustomButtonProps> = ({ label,onPress,  ...rest }) =>{
    return (
        <TouchableOpacity  style={[styles.button, SHADOWS.middle]}{...rest} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomInput: React.FC<CustomButtonProps> = ({ label,value, secureTextEntry=false, ...rest }) =>{
    return (
        <TextInput style={[styles.input, SHADOWS.middle]} value= {value} editable={true} placeholder={label} secureTextEntry={secureTextEntry} {...rest}/>
    )
}
const CustomLink: React.FC<CustomButtonProps> = ({ label,secureTextEntry, onPress, ...rest }) =>{
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.link}>{label}</Text>
        </TouchableOpacity>
    )
}
const Rectangle: React.FC<CustomButtonProps> = ({ label,...rest }) =>{
    return (
    <View style={rectangleStyles.rectangleParent}>
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
        textAlign: "center",
        position: "relative",
        justifyContent: "space-between", 
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
            marginLeft: '18%'
        },
        rectangleParent: {
            width: "100%",
            height: 108,
            alignItems: 'center',
            marginTop: 20,
            textAlign: "center",
            justifyContent: "space-between", 

        }
});

export{
    CustomButton, CustomTitle, CustomInput, CustomLink, Rectangle, CustomText
}