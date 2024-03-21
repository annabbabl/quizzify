
import { Pressable, PressableProps, View, Switch, TextProps, SwitchProps, Text as NText, Animated} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { containerStyles, styles, textStyles } from "../../../styles/components.style"
import React from "react";
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
interface CustomButtonProps extends PressableProps {
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
    
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="account" />
const LeftGameContent = (props: any) => <Avatar.Icon {...props} icon="gamepad" />

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
      <Pressable
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
          <NText style={small ? styles.buttonTextXS : styles.buttonTextXL} >{label}</NText>
        </Animated.View>
      </Pressable>
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
      <Pressable {...rest} onPressIn={handlePressIn} onPressOut={handlePressOut} >
        {label ? (
          <View style={{ flexDirection: flexDirection, alignItems: 'center', marginVertical: 10, backgroundColor: color }}>
            {direction === 'left' ? (
              <View style={{width:'60%', backgroundColor: color}}>
                {boldFactor? (
                  <NText style={[textStyles.smallIconsText, {fontWeight:'bold', color: textColor}]}>{label}</NText>
                ): (
                  <NText style={[textStyles.smallIconsText, {color: textColor}]}>{label}</NText>
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
                  <NText style={[textStyles.smallIconsText, {fontWeight:'bold'}]}>{label}</NText>
                ): (
                  <NText style={textStyles.smallIconsText}>{label}</NText>
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
      </Pressable>
    );
};

const CustomLink: React.FC<CustomButtonProps> = ({ label,onPress,  ...rest }) =>{
    return (
        <Pressable {...rest} onPress={onPress}>
            <NText style={textStyles.boldText}>{label}</NText>
        </Pressable>
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



export{
    LeftContent,
    LeftGameContent,
    CustomButton, 
    CustomButtonWithIcon, 
    CustomTitle,
    CustomSubTitle,
    CustomText, 
    CustomLink, 
    CustomSwitch,
}