
import { ActivityIndicator, View } from "react-native";
import { NativeBaseProvider, Text } from "native-base";
import {containerStyles } from "../../styles/components.style";
import '../../constants/i18next'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { updatePassword, updateProfile } from "firebase/auth";
import { CustomButton } from "../common/shared/components";
import { COLORS } from "../../constants";
import { UserEdit } from "../../types/localTypes/editTypes";
import { Avatar, Card, TextInput } from "react-native-paper";
import { FIREBASE_AUTH, FIRESTORE } from "../../firebase/firebaseConfig";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="account" />

const Profile = ({ }) => {
    const { t } = useTranslation();
  
    const currentUser = FIREBASE_AUTH.currentUser;
    const usersCollection = FIRESTORE.collection('users');
  
    const [settingChangeLocal, setSettingChangeLocal] = useState(false); // Local state variable
    const [username, setUsername] = useState(currentUser?.displayName || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const updateUserSettings = async() => {
      if (currentUser) {
        setLoading(true); 
        updateProfile(currentUser, { displayName: username })
          .then(() => {

            const updatedUserData : UserEdit = {
                email: email,
                username: username,
                password: password
            }

            usersCollection.doc(currentUser.uid).update(updatedUserData)
                .then(() => {
                    console.log('Document successfully updated!');
                    console.log(t('userSettingsupdatedSuccessfully'))
                    setSettingChangeLocal(!settingChangeLocal);
                    setSettingChangeLocal?.(!settingChangeLocal);
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                    console.log(t('userSettingsUpdateError'))
                }).finally(() => {
                    setLoading(false); 
                });
          })
          .catch((error) => {
            console.error("Error updating user profile:", error.message);
            console.log(t('userSettingsUpdateError'))
          }).finally(() => {
            setLoading(false); 
            setSettingChangeLocal(false)
          });
      }
    };

    const changeUserPassword = async () => {
        try {
            if (!currentUser) {
                throw new Error('User not signed in.');
            }
            await updatePassword(currentUser, password);

            const updatedUser : UserEdit = {
                id: currentUser.uid,
                email: email,
                username: username,
                loggedIn: true,
                password: password
            }

            usersCollection.doc(currentUser.uid).update(updatedUser)
                .then(() => {
                    console.log('Document successfully updated!');
                    console.log(t('userPasswordsUpdateSuccess'))
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                    console.log(t('userPasswordUpdateError'))
                });
            setSettingChangeLocal(!settingChangeLocal);
        } catch (error: any) {
          console.log(t('userPasswordUpdateError'))
            console.error('Error updating password:', error.message);
        }finally{
            setLoading(false); 
            setSettingChangeLocal(false)
        }
      };

      const handleLogout = async () => {
        try{
          setLoading(true); 
          const response = await FIREBASE_AUTH.signOut()
  
          const loggedOutUserData : UserEdit = {
            loggedIn: false
          }
      
          usersCollection.doc(currentUser?.uid).update(loggedOutUserData)
            .then(() => {
                console.log('Document successfully updated!');
                console.log(response)
                console.log(t('logoutSuccess'))
            })
            .catch((error) => {
                console.error('Error updating document:', error);
                console.log(t('logoutError'))
            });
        }catch(error: any){
          console.log(error, error)
          console.log(t('logoutSuccess'))
        }finally{
          setLoading(false); 
          setSettingChangeLocal(false)
        }
      }            

      return (
        <SafeAreaView style={containerStyles.container}>
          <NativeBaseProvider>
          {!settingChangeLocal ? (
            <>
             <Text fontSize="6xl" bold>{t('profile')}</Text>
              <Card contentStyle={{ backgroundColor: 'white' }}>
                <Card.Title title={currentUser?.displayName} left={LeftContent} />
                <Card.Content>
                <View style={containerStyles.horizontalContainer1}>
                      <Text fontSize="2xl" bold>{t('name') + ": "}</Text>
                      <Text fontSize="2xl" bold>{currentUser?.displayName}</Text>
                  </View>
                  <View style={containerStyles.horizontalContainer1}>
                      <Text fontSize="2xl" bold>{t('email') + ": "}</Text>
                      <Text fontSize="2xl" bold>{currentUser?.email}</Text>
                  </View>
                </Card.Content>
              </Card>
            </>
          ) : (
            <View style={containerStyles.container}>
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.activityIndicatorColor} />
            ) : (
                <>
                    <TextInput
                      label={(t('name'))}
                      value={username}
                      right={<TextInput.Icon icon="account" />}
                      onChangeText={(username) => setUsername(username)}
                      placeholder={(currentUser?.displayName ? currentUser.displayName : '')}
                    />
                    <TextInput
                      value={email}
                      label={(t('email'))}
                      right={<TextInput.Icon icon="email" />}
                      onChangeText={(email) => setEmail(email)}
                      placeholder={(currentUser?.email ? currentUser.email : '')}
                    />
                    <TextInput
                      label={(t('pw'))}
                      value={password}
                      secureTextEntry
                      editable={true}
                      right={<TextInput.Icon icon="email" />}
                      onChangeText={(pw) => setPassword(pw)}
                      placeholder={t('pw')}
                    />
                    <View style={containerStyles.bottom}>
                        <CustomButton label={t('update')} onPress={updateUserSettings} />
                        <CustomButton label={t('changePW')} onPress={changeUserPassword} />
                    </View>
                </>
              )}
            </View>
          )}
          {!settingChangeLocal ? (
              <View style={containerStyles.bottom}>
                <CustomButton label={t('changeUserSettings')} onPress={() =>setSettingChangeLocal(true)} />
                <CustomButton label={t('logOut')} onPress={handleLogout} />
              </View>
            ):(<>
            </>)
          }
          </NativeBaseProvider>
        </SafeAreaView>
      );
}      
export default Profile; 