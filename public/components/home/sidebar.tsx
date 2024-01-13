import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Text style={styles.item}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Profile')}>
        <Text style={styles.item}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Settings')}>
        <Text style={styles.item}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Sidebar;