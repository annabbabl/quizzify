import i18next from 'i18next'
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLocales } from 'expo-localization'

const deviceLanguage = getLocales()[0].languageCode

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        compatibilityJSON: 'v3',
        debug: true, 
        lng: deviceLanguage,
        fallbackLng: 'de', 
        resources: {
            en: {
                translation: {
                    //App name
                    quizzify: 'Quizzify',

                    //common
                    clickMe: 'Click Me', 
                    continue: 'Continue',
                    update: 'Update',
                    
                    //auth
                    welcome: 'Welcome!',
                    welcometoQ: 'Welcome zu Quizzify!',
                    login: 'Login', 
                    signUpFail: 'Login Failed. Try to reenter your Data',
                    signUpSuccessfull: 'Successfully logged in!', 
                    register: 'Register',
                    registration: 'Registration',
                    registrationFail: 'Registration Failed',
                    registeredSuccessfull: 'Successfully Registered', 
                    missingData: 'The username is missing. Please add the username.', 
                    noAccount: 'You do not have an Account yet? Register here!', 
                    backToLogin: 'Back To Login',
                    
                    //home screen
                    startGame: 'Start Game',
                    joynGame: 'Joyn Game',
                    welcomeName: 'Welcome ',

                    //profile
                    email: 'Email', 
                    pw: 'Password', 
                    name: 'Name',
                    changeUserSettings: 'Change User Settings',
                    userSettingsupdatedSuccessfully: 'Updated Successfully',
                    userSettingsUpdateError: 'Error updating user Settings', 
                    changePW: 'Passwort Ändern',
                    userPasswordsUpdateSuccess: 'Successfully Updated Password',
                    userPasswordUpdateError: 'Error Updating Password',
                    
                    //side bar
                    lookAtGames: 'Games Statistics', 
                    profile: 'Profile', 
                    editTemplate: 'Edit Template', 
                    editQuestions: 'Edit Questions', 
                    backToHome: 'Back To Homepage'

                }
            },
            de: {
                translation: {
                    //app name
                    quizzify: 'Quizzify',

                    //common
                    clickMe: 'Klick Mich', 
                    continue: 'Weiter',
                    settings: 'Einstellungen',
                    update: 'Update', 

                    //home screen
                    startGame: 'Starte Spiel',
                    joynGame: 'Trette Spiel Bei',
                    welcomeName: 'Welcome ',
                    
                    //auth
                    login: 'Login', 
                    signUpFail: 'Login Gescheitert. Versuche deine Daten erneut einzugeben.',
                    signUpSuccessfull: 'Erfolgreich Eingelogt!', 
                    register: 'Registriere dich',
                    registration: 'Registrierung',
                    registrationFail: 'Registrierung gesscheitert',
                    registeredSuccessfull: 'Erfolgreich registriert',
                    missingData: 'Der Benutzername fehlt. Bitte vervolständige deinen Benutzernamen.', 
                    noAccount: 'Du hast noch keinen Akkount? Registriere dich hier!',
                    backToLogin: 'Zurück zum Login',
                    welcome: 'Willkommen!',
                    welcometoQ: 'Willkommen zu Quizzify!',
                    
                    //profile
                    email: 'Email',
                    pw: 'Passwort', 
                    name: 'Name', 
                    changeUserSettings: 'Profileinstellungen Ändern',
                    userSettingsupdatedSuccessfully: 'Profileinstellungen erfolgreich Geupdate',
                    userSettingsUpdateError: 'Ein Fehler ist bei dem Update der Profileinstellungen aufgetretten', 
                    changePW: 'Passwort Ändern',
                    userPasswordsUpdateSuccess: 'Erfolgreich Password Geändert',
                    userPasswordUpdateError: 'Ein Fehler ist bei dem Update des Passworts aufgetretten',
                    
                    //side bar
                    lookAtGames: 'Spiele Statistik',
                    profile: 'Profile',
                    editTemplate: 'Template Bearbeiten', 
                    editQuestions: 'Fragen Bearbeiten',
                    backToHome: 'Zurück zur Homepage'
                    
                }
            }
        },
        interpolation: {
            escapeValue: false , 
            skipOnVariables: false
          },
          react: {
            useSuspense:false,
         }
    })
    