
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, View, Switch, TextProps, SwitchProps, Text as NT, Animated} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { containerStyles, styles, textStyles } from "../../../styles/components.style"
import React from "react";
import * as Font from "expo-font";
import { COLORS, SHADOWS } from "../../../constants";
import { NativeBaseProvider, Text } from "native-base";
import { Avatar } from "react-native-paper";

interface CustomTexProps extends TextProps{
    label?: string;
    boldFactor?: boolean; 
    textColor?: string
}
interface CustomSwitchProps extends SwitchProps{
    switchValue?: boolean;
    onValueChange?: (value: boolean) => void;
    switchSize: string; 
}
interface CustomButtonProps extends TouchableOpacityProps {
    label?: string;
    value?: string;
    small?: boolean; 
}
interface CustomIconTouchable extends CustomButtonProps{
    iconType?: string,
    iconName: string,
    iconSize: number,
    iconColor: string,
    textColor?: string, 
    flexDirection? : 'row' | 'column', 
    color? : string, 
    direction?: 'left' | 'right'
    boldFactor?: boolean, 
}
    
const LeftContent = props => <Avatar.Icon {...props} icon="account" />

const CustomTitle: React.FC<CustomTexProps>= ({label, ...rest}) =>{
    return(
        <NativeBaseProvider>
            <Text
              fontSize="6xl" 
              bold 
              color={COLORS.secondaryColor} 
              {...rest}
            >
              {label}
            </Text>
        </NativeBaseProvider>
    )
}

const CustomSubTitle: React.FC<CustomTexProps>= ({label, ...rest}) =>{
    return(
        <NativeBaseProvider>
            <Text fontSize="4xl" bold color={COLORS.secondaryColor} {...rest}>{label}</Text>
        </NativeBaseProvider>
    )
}

const CustomText: React.FC<CustomTexProps> = ({ label, boldFactor, textColor,  ...rest }) => {
    return (
        <NativeBaseProvider>

        {boldFactor ? (
            <Text fontSize="2xl" bold color={textColor}>{label}</Text>
        ): (
            <Text fontSize="2xl" color={textColor}>{label}</Text>
        )}
        </NativeBaseProvider>
    );
};

var scaleValue = new Animated.Value(0); 



const CustomButton: React.FC<CustomButtonProps> = ({ label, small, ...rest }) => {
    const scaleValue = new Animated.Value(1);
  
    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };
  
    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };
  
    return (
      <TouchableOpacity
        style={[styles.button, SHADOWS.middle]}
        {...rest}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleValue }],
          }}
        >
          <NT style={small ? styles.buttonTextXS : styles.buttonTextXL} >{label}</NT>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  
  const CustomButtonWithIcon: React.FC<CustomIconTouchable> = ({
    label,
    iconType,
    iconName,
    iconSize,
    iconColor,
    flexDirection, 
    direction,
    boldFactor = true, 
    color = COLORS.backgroundColor,
    textColor= COLORS.backgroundColor,
    ...rest
  }) => {
    const scaleValue = new Animated.Value(1);
  
    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };
  
    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40, 
        useNativeDriver: true,
      }).start();
    };


    return (
      <TouchableOpacity {...rest} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {label ? (
          <View style={{ flexDirection: flexDirection, alignItems: 'center', marginVertical: 10, backgroundColor: color }}>
            {direction === 'left' ? (
              <View style={{width:'60%', backgroundColor: color}}>
                {boldFactor? (
                  <NT style={[textStyles.smallIconsText, {fontWeight:'bold', color: textColor}]}>{label}</NT>
                ): (
                  <NT style={[textStyles.smallIconsText, {color: textColor}]}>{label}</NT>
                )}
              </View>
              ):(
                <></>
              )
            }
            <View style={{width:'40%', backgroundColor: color}}>
              <Animated.View
                style={{
                  transform: [{ scale: scaleValue }],
                }}
              >
                {iconType === 'Material' ? (
                  <MaterialIcons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
                ) : (
                  <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
                )}
              </Animated.View>
            </View>

            {direction === 'right' ? (
              <>
                {boldFactor? (
                  <NT style={[textStyles.smallIconsText, {fontWeight:'bold'}]}>{label}</NT>
                ): (
                  <NT style={textStyles.smallIconsText}>{label}</NT>
                )}
              </>
              ):(
                <></>
              )
            }
          </View>
        ) : (
          <Animated.View
            style={{
              transform: [{ scale: scaleValue }], backgroundColor: color
            }}
          >
            <View style={containerStyles.iconButtonCotainer}>
              {iconType === 'Material' ? (
                <MaterialIcons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
              ) : (
                <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
              )}
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
};

const CustomLink: React.FC<CustomButtonProps> = ({ label,onPress,  ...rest }) =>{
    return (
        <TouchableOpacity {...rest} onPress={onPress}>
            <NT style={textStyles.boldText}>{label}</NT>
        </TouchableOpacity>
    )
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
    switchValue,
    onValueChange,
    switchSize = 'sm' || 'med' || 'large',
    ...rest
  }) => {
    const actualSize: number = switchSize === 'sm' ? 5 : switchSize === 'med' ? 8 : 12;
  
    return (
      <Switch
        trackColor={{ false: COLORS.redPrimaryColor, true: COLORS.greenPrimaryColor }}
        thumbColor={switchValue ? COLORS.redPrimaryColor : COLORS.greenSecondaryColor}
        onValueChange={onValueChange}
        style={{ transform: [{ scaleX: (actualSize/ 10) }, { scaleY: (actualSize / 10) }] }}
        value={switchValue}
        {...rest}
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
    LeftContent,
    CustomButton, 
    CustomButtonWithIcon, 
    CustomTitle,
    CustomSubTitle,
    CustomText, 
    CustomLink, 
    HeaderRectangle, 
    CustomSwitch,
}