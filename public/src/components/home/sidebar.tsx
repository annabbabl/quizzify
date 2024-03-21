import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import { useTranslation } from "react-i18next";
import { ICONSIZE } from "../../constants/theme";
import { CustomButtonWithIcon } from "../common/shared/components";
import sideBarItems from "../../constants/barItems/sideBarItems";
import { NavigationProp } from "@react-navigation/native";


type SidebarProps = {
  navigation: NavigationProp<any>;
};

const Sidebar = ({ navigation }: SidebarProps) => {
  const { t } = useTranslation();

  const handleNavigation = (screenName: string | undefined) => {
    if (screenName) {
      navigation.navigate(screenName);
    }
  };


  return (
    <SafeAreaView style={sidebarStyles.sidebar}>
      {sideBarItems.map((sideBarItem, index) => (
         <CustomButtonWithIcon  
         key={index} 
         onPress={() => handleNavigation(sideBarItem.screenName)}
         label={t(sideBarItem.name)}
         iconName={sideBarItem.iconName}
         iconType={sideBarItem.iconType}
         iconSize={ICONSIZE.small}
         iconColor={'white'}
         flexDirection="row"
         direction="right"
         color={COLORS.secondaryColor}
         boldFactor={true}
       />
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