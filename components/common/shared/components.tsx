
import { Text, TextInput, TouchableOpacity, TouchableOpacityProps, StyleSheet} from "react-native";
import {styles} from "./components.style";
import React, { useState } from "react";
import * as Font from "expo-font";
import { SHADOWS } from "../../../constants";


const getFonts = () =>
  Font.loadAsync({
    kumarOne: require("../../../assets/fonts/KumarOne-Regular.ttf"),
});

interface CustomButtonProps extends TouchableOpacityProps {
    label?: string;
    img?: string;
    secureTextEntry?: boolean
    onPress?: () => void;
}

const CustomTitle: React.FC<CustomButtonProps>= ({label, ...rest}) =>{
    return(
        <Text style={styles.title} {...rest}>{label}</Text>
    )
}

const CustomButton: React.FC<CustomButtonProps> = ({ label,onPress,  ...rest }) =>{
    return (
        <TouchableOpacity  style={[styles.button, SHADOWS.middle]}{...rest} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomInput: React.FC<CustomButtonProps> = ({ label,secureTextEntry, onPress, ...rest }) =>{
    return (
        <TextInput style={[styles.input, SHADOWS.middle]} placeholder={label} secureTextEntry={secureTextEntry} {...rest} />
    )
}
const CustomLink: React.FC<CustomButtonProps> = ({ label,secureTextEntry, onPress, ...rest }) =>{
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.link}>{label}</Text>
        </TouchableOpacity>
    )
}


export{
    CustomButton, CustomTitle, CustomInput, CustomLink
}