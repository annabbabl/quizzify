import i18next from 'i18next'
import { initReactI18next } from "react-i18next";
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
                    quizzify: 'Quizzify',
                    clickMe: 'Click Me', 
                    welcome: 'Welcome!',
                    welcometoQ: 'Willkommen zu Quizzify!', 
                    continue: 'Continue',
                    startGame: 'Start Game',
                    joynGame: 'Joyn Game',
                    login: 'Login', 
                    register: 'Register',
                    email: 'Email', 
                    pw: 'Password', 
                    name: 'Name',
                    noAccount: 'You do not have an Account yet? Register here!', 
                    backToLogin: "Back To Login",
                    registration: "Regestration"
                }
            },
            de: {
                translation: {
                    quizzify: 'Quizzify',
                    clickMe: 'Klick Mich', 
                    welcome: 'Willkommen!',
                    welcometoQ: 'Willkommen zu Quizzify!',
                    continue: 'Weiter',
                    startGame: 'Starte Spiel',
                    joynGame: 'Trette Spiel Bei',
                    login: 'Login', 
                    register: 'Registriere dich',
                    email: 'Email',
                    pw: 'Passwort', 
                    name: 'Name', 
                    noAccount: 'Du hast noch keinen Akkount? Registriere dich hier!',
                    backToLogin: "Zurück zum Login",
                    registration: "Regestration"
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
    