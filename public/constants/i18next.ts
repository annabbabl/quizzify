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
                    signUpFail: 'Login Failed. Try to reenter your Data',
                    signUpSuccessfull: 'Successfully logged in!', 
                    register: 'Register',
                    registration: "Registration",
                    registrationFail: 'Registration Failed',
                    registeredSuccessfull: 'Successfully Registered', 
                    email: 'Email', 
                    pw: 'Password', 
                    name: 'Name',
                    noAccount: 'You do not have an Account yet? Register here!', 
                    backToLogin: "Back To Login",
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
                    signUpFail: 'Login Gescheitert. Versuche deine Daten erneut einzugeben.',
                    signUpSuccessfull: 'Erfolgreich Eingelogt!', 
                    register: 'Registriere dich',
                    registration: "Registrierung",
                    registrationFail: 'Registrierung gesscheitert',
                    registeredSuccessfull: 'Erfolgreich registriert',
                    email: 'Email',
                    pw: 'Passwort', 
                    name: 'Name', 
                    noAccount: 'Du hast noch keinen Akkount? Registriere dich hier!',
                    backToLogin: "Zurück zum Login",
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
    