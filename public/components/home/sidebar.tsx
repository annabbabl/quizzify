import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import { useTranslation } from "react-i18next";
import { ICONSIZE } from "../../constants/theme";
import sideBarItems from "../../constants/sideBarItems";
import { CustomButtonWithIcon } from "../common/shared/components";


const Sidebar = ({navigation}) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={sidebarStyles.sidebar}>
      {sideBarItems.map((sideBarItem, index) => (
        <CustomButtonWithIcon  
          key={index} 
          onPress={() => navigation.navigate(sideBarItem.screenName)} 
          label={t(sideBarItem.name)}
          iconName={sideBarItem.iconName}
          iconType={sideBarItem.iconType}
          iconSize={ICONSIZE.small}
          iconColor={COLORS.primaryIconColor}/>
      ))}
    </SafeAreaView>
  );
};

const sidebarStyles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    padding: 20,
  },
});

export default Sidebar; 