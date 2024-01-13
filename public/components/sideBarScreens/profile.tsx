
import { ActivityIndicator, Image, TextInput, View } from "react-native";
import {containerStyles, imageStyles, styles} from "../../styles/components.style";
import '../../constants/i18next'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { updatePassword, updateProfile } from "firebase/auth";
import { CustomButton, CustomLink, CustomText } from "../common/shared/components";
import { COLORS, IMAGES, SHADOWS } from "../../constants";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import Toast from "react-native-toast-message";

const Profile = ({ navigation }) => {
    const auth = FIREBASE_AUTH;
    const { t } = useTranslation();
  
    const currentUser = auth.currentUser;
  
    const [settingChange, setSettingChange] = useState(false);
    const [username, setUsername] = useState(currentUser.displayName || "");
    const [email, setEmail] = useState(currentUser.email || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const changeUserSettings = () => {
      setSettingChange(!settingChange);
    };
  
    const updateUserSettings = async() => {
      if (currentUser) {
        setLoading(true); 
        updateProfile(currentUser, { displayName: username })
          .then(() => {
            console.log("User profile updated successfully!");
            Toast.show({
                type: 'success',
                text1:  (('userSettingsupdatedSuccessfully')),
            });
            setLoading(false); 
            setSettingChange(!settingChange);
          })
          .catch((error) => {
            console.error("Error updating user profile:", error.message);
            Toast.show({
                type: 'error',
                text1:  (('userSettingsUpdateError')),
            });
            setLoading(false); 
          });
      }
    };

    const changeUserPassword = async () => {
        try {
            if (!currentUser) {
                throw new Error('User not signed in.');
            }
            await updatePassword(currentUser, password);
            Toast.show({
                type: 'success',
                text1:  (('userPasswordsUpdateSuccess')),
            });
            setLoading(false); 
            setSettingChange(!settingChange);
            
        } catch (error) {
            Toast.show({
                type: 'error',
                text1:  (('userPasswordUpdateError')),
            });
            console.error('Error updating password:', error.message);
        }
      };
      return (
        <SafeAreaView style={containerStyles.container}>
          {!settingChange ? (
            <>
                <View style = {{width: '80%'}}>
                    <View style={[containerStyles.horizontalContainer1, SHADOWS.middle]}>
                        <CustomText label={(t('name') + ": ")} bold={true} />
                        <CustomText label={currentUser.displayName} bold={false} />
                    </View>
                    <View style={[containerStyles.horizontalContainer1, SHADOWS.middle]}>
                        <CustomText label={(t('email') + ": ")} bold={true} />
                        <CustomText label={currentUser.email} bold={false} />
                    </View>
                </View>
                <View style={containerStyles.bottom}>
                    <Image source={IMAGES.LOGO} style={imageStyles.image1}/>
                    <CustomButton label={t('changeUserSettings')} onPress={changeUserSettings} />
                </View>
            </>
          ) : (
            <View style={containerStyles.container}>
              {loading ? (
                <ActivityIndicator size='large' color={COLORS.activityIndicatorColor} />
              ) : (
                <>
                <View style = {{width: '100%', alignItems: "center"}}>
                  <View style={containerStyles.horizontalContainer2}>
                    <CustomText label={(t('name') + ": ")} bold={true} />
                    <TextInput
                      style={[styles.input, SHADOWS.middle]}
                      value={username}
                      editable={true}
                      placeholder={t('name')}
                      onChangeText={(name) => setUsername(name)}
                    />
                  </View>
                  <View style={containerStyles.horizontalContainer2}>
                    <CustomText label={(t('email') + ": ")} bold={true} />
                    <TextInput
                      style={[styles.input, SHADOWS.middle]}
                      value={email}
                      editable={true}
                      placeholder={t('email')}
                      onChangeText={(email) => setEmail(email)}
                    />
                  </View>
                  <CustomButton label={t('update')} onPress={updateUserSettings} />
                  <View style={containerStyles.horizontalContainer2}>
                    <CustomText label={(t('pw') + ": ")} bold={true} />
                    <TextInput
                      style={[styles.input, SHADOWS.middle]}
                      editable={true}
                      value={password}
                      placeholder={t('pw')}
                      onChangeText={(pw) => setPassword(pw)}
                      secureTextEntry={true}
                    />
                  </View>
                  <CustomButton label={t('changePW')} onPress={changeUserPassword} />
                  </View>

                </>
              )}
            </View>
          )}
        <CustomLink label={t('backToHome')} onPress={()=>{navigation.navigate("Home")}}/>
        </SafeAreaView>
      );
}      
export default Profile; 