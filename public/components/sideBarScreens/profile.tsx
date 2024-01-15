
import { ActivityIndicator, Image, TextInput, View } from "react-native";
import {containerStyles, imageStyles, styles} from "../../styles/components.style";
import '../../constants/i18next'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { updatePassword, updateProfile } from "firebase/auth";
import { CustomButton, CustomLink, CustomText } from "../common/shared/components";
import { COLORS, IMAGES, SHADOWS } from "../../constants";
import { FIREBASE_AUTH, FIRESTORE } from "../../firebaseConfig";
import { User } from '../../types/database'
import { showErrorToast, showSuccessToast } from "../../constants/toasts";


const Profile = ({ navigation, setSettingChange }) => {
    const { t } = useTranslation();
  
    const currentUser = FIREBASE_AUTH.currentUser;
    const usersCollection = FIRESTORE.collection('users');
  
    const [settingChangeLocal, setSettingChangeLocal] = useState(false); // Local state variable
    const [username, setUsername] = useState(currentUser.displayName || "");
    const [email, setEmail] = useState(currentUser.email || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const changeUserSettings = () => {
        setSettingChangeLocal(!settingChangeLocal);
    };
  
    const updateUserSettings = async() => {
      if (currentUser) {
        setLoading(true); 
        updateProfile(currentUser, { displayName: username })
          .then(() => {

            const updatedUserData : User = {
                email: email,
                username: username,
                password: password
            }

            usersCollection.doc(currentUser.uid).update(updatedUserData)
                .then(() => {
                    console.log('Document successfully updated!');
                    showSuccessToast(t('userSettingsupdatedSuccessfully'))
                    setSettingChangeLocal(!settingChangeLocal);
                    setSettingChange(!setSettingChange);
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                    showErrorToast(t('userSettingsUpdateError'))
                }).finally(() => {
                    setLoading(false); 
                });
          })
          .catch((error) => {
            console.error("Error updating user profile:", error.message);
            showErrorToast(t('userSettingsUpdateError'))
          }).finally(() => {
            setLoading(false); 
            setSettingChangeLocal(!settingChangeLocal);
          });
      }
    };

    const changeUserPassword = async () => {
        try {
            if (!currentUser) {
                throw new Error('User not signed in.');
            }
            await updatePassword(currentUser, password);

            const updatedUser : User = {
                id: currentUser.uid,
                email: email,
                username: username,
                loggedIn: true,
                password: password
            }

            usersCollection.doc(currentUser.uid).update(updatedUser)
                .then(() => {
                    console.log('Document successfully updated!');
                    showSuccessToast(t('userPasswordsUpdateSuccess'))
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                    showErrorToast(t('userPasswordUpdateError'))
                });
            setSettingChangeLocal(!settingChangeLocal);
        } catch (error) {
            showErrorToast(t('userPasswordUpdateError'))
            console.error('Error updating password:', error.message);
        }finally{
            setLoading(false); 
        }
      };

      const handleLogout = async () => {
        try{
          setLoading(true); 
          const response = await FIREBASE_AUTH.signOut()
  
          const loggedOutUserData : User = {
            loggedIn: false
          }
      
          usersCollection.doc(currentUser.uid).update(loggedOutUserData)
            .then(() => {
                console.log('Document successfully updated!');
                console.log(response)
                showSuccessToast(t('logoutSuccess'))
            })
            .catch((error) => {
                console.error('Error updating document:', error);
                showErrorToast(t('logoutError'))
            });
        }catch(error: any){
          console.log(error, error)
          showSuccessToast(t('logoutSuccess'))
        }finally{
          setLoading(false); 
        }
      }            

      return (
        <SafeAreaView style={containerStyles.container}>
          {!settingChangeLocal ? (
            <>
                <View style = {{width: '80%'}}>
                    <View style={[containerStyles.horizontalContainer1, SHADOWS.small]}>
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
                <ActivityIndicator size="large" color={COLORS.activityIndicatorColor} />
            ) : (
                <>
                    <CustomText label={(t('name') + ": ")} bold={true} />
                    <TextInput
                        style={[styles.input1, SHADOWS.middle]}
                        value={username}
                        editable={true}
                        placeholder={t('name')}
                        onChangeText={(name) => setUsername(name)}
                    />
                    <CustomText label={(t('email') + ": ")} bold={true} />
                    <TextInput
                        style={[styles.input1, SHADOWS.middle]}
                        value={email}
                        editable={true}
                        placeholder={t('email')}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <CustomButton label={t('update')} onPress={updateUserSettings} />
                    <CustomText label={(t('pw') + ": ")} bold={true} />
                    <TextInput
                        style={[styles.input1, SHADOWS.middle]}
                        editable={true}
                        value={password}
                        placeholder={t('pw')}
                        onChangeText={(pw) => setPassword(pw)}
                        secureTextEntry={true}
                    />
                    <View style={containerStyles.bottom}>
                        <CustomButton label={t('changePW')} onPress={changeUserPassword} />
                    </View>
                </>
              )}
            </View>
          )}
        <CustomButton label={t('logOut')} onPress={handleLogout} />
        </SafeAreaView>
      );
}      
export default Profile; 