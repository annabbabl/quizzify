import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { useTranslation } from "react-i18next";
import { ICONSIZE } from "../../constants/theme";
import sideBarItems from "../../constants/sideBarItems";


const Sidebar = ({navigation}) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={sidebarStyles.sidebar}>
      {sideBarItems.map((sideBarItem, index) => (
        <TouchableOpacity onPress={() => navigation.navigate(sideBarItem.screenName)} key={index}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            {sideBarItem.iconType === 'Material' ? (
              <MaterialIcons name={sideBarItem.iconName} size={ICONSIZE} color="black" style={{ marginRight: 10 }} />
            ) : (
              <MaterialCommunityIcons name={sideBarItem.iconName} size={ICONSIZE} color="black" style={{ marginRight: 10 }} />
            )}
            <Text style={sidebarStyles.text}>{t(sideBarItem.name)}</Text>
          </View>
        </TouchableOpacity>
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
  text: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default Sidebar; 