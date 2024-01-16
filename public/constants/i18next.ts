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
                    save: "Save",
                    true: 'True', 
                    false: 'False', 
                    cancel: 'Cancel',
                    errorUpdate: 'Error occurd while Updating',
                    updatedSuccessfully: 'Successfully Updated!',
                    
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

                    //side bar
                    lookAtGames: 'Games Statistics', 
                    profile: 'Profile', 
                    editTemplate: 'Edit Template', 
                    questions: 'Edit Questions', 
                    backToHome: 'Back To Homepage',
                    home: 'Home Screen', 

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
                    logOut: 'Log Out', 
                    logoutSuccess:'Successfully Logged Out', 
                    logoutError:'Eoor Logging Out', 

                    //Questions Screen
                    id: 'ID',
                    question: 'Question', 
                    rightAnswer: 'Right Answer', 
                    trueFalseQuestion: 'True or False Question', 
                    possibleAnswers: 'Possible Answers', 
                    possibleAnswer: 'Possible Answer', 
                    createdAt: 'Created At',          
                    addQuestion: 'Add a Question', 
                    editQuestion: 'Edit Questions', 

                    // Add Qeustion
                    questionAddedSuccessfully: 'Question Added Successfully',
                    errorWhileAddingQuestion: 'Error While Adding Question',
                    addPossibleAnswer: 'Add Possible Answer', 
                    possibleAnswerAdded: 'Possible Answer Added',
                    missingAnswers: 'Aqq more Answer Possibilities', 
                    noQuestionsAvailiable: 'You have not added any questions Yet',
                    maxPossibleAnswers: 'You have reached the maximum possible Possible Answers. Please save Your questions.',
                    possibleAnswerDeleted: 'Possible Answer Deleted', 


                    // Edit Qeustion
                    questionsEditedSuccessfully: 'Questions Edited Successfully',
                    questionEditedSuccessfully: 'Question Edited Successfully', 
                    errorWhileEditingQuestions: 'Error While Editing the Questions',
                    errorWhileEditingQuestion: 'Error While Editing the Question'
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
                    save: "Speichern",
                    true: 'Wahr', 
                    false: 'Falsch', 
                    cancel: 'Abbrechen',
                    errorUpdate: 'Ein Fehler ist beim Update Passiert',
                    updatedSuccessfully: 'Erfolgreich Upgedated!',

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

                    //side bar
                    lookAtGames: 'Spiele Statistik',
                    profile: 'Profile',
                    editTemplate: 'Template Bearbeiten', 
                    editQuestions: 'Fragen Bearbeiten',
                    backToHome: 'Zurück zur Homepage',
                    home: 'Home Screen', 
                    
                    //profile
                    email: 'Email',
                    pw: 'Passwort', 
                    name: 'Name', 
                    password: 'Passwort',
                    changeUserSettings: 'Profileinstellungen Ändern',
                    userSettingsupdatedSuccessfully: 'Profileinstellungen erfolgreich Geupdate',
                    userSettingsUpdateError: 'Ein Fehler ist bei dem Update der Profileinstellungen aufgetretten', 
                    changePW: 'Passwort Ändern',
                    userPasswordsUpdateSuccess: 'Erfolgreich Password Geändert',
                    userPasswordUpdateError: 'Ein Fehler ist bei dem Update des Passworts aufgetretten',
                    logOut: 'Abmelden', 
                    logoutSuccess:'Erfolgreich Abgemeldet', 
                    logoutError:'Fehler bei der Abmeldeung', 
                    
                    //Questions Screen
                    id: 'ID',
                    question: 'Frage', 
                    rightAnswer: 'Richtige Antwort',
                    trueFalseQuestion: 'Wahr/Falsch Frage', 
                    possibleAnswers: 'Mögliche Antworten', 
                    possibleAnswer: 'Mögliche Antwort', 
                    createdAt: 'Hinzugefügt am',  
                    addQuestion: 'Frage Hinzufügen', 
                    editQuestion: 'Fragen Bearbeiten', 
                    noQuestionsAvailiable: 'Noch hast Du Keine Fragen Hinzugefügt',

                    // Add Qeustion
                    questionAddedSuccessfully: 'Frage erfolgreich hinzugefügt',
                    errorWhileAddingQuestion: 'Fehler beim einfügen der Frage',
                    addPossibleAnswer: 'Antwortmöglichkeit Hinzufügen', 
                    possibleAnswerAdded: 'Mögliche Antwort Hinzugefügt',
                    missingAnswers: 'Füge mehr Antwortmöglichkeiten hinzu', 
                    maxPossibleAnswers: 'Du hast die maxmal Mögliche Antwortanzhal erreicht. Bitte Speichere deine Frage',
                    possibleAnswerDeleted: 'Antwortmöglichkeit Entfernt', 


                    //Edit Questions
                    questionsEditedSuccessfully: 'Fragen wurden Erfolgreich bearbeitet',
                    questionEditedSuccessfully: 'Frage wurden Erfolgreich bearbeitet', 
                    errorWhileEditingQuestions: 'Fehler beim bearbeiten der Fragen',
                    errorWhileEditingQuestion: 'Fehler beim bearbeiten der Frage'
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
    