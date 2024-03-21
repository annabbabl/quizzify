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
                    text: 'Text',   
                    cancel: 'Cancel',
                    errorUpdate: 'Error occurd while Updating',
                    updatedSuccessfully: 'Successfully Updated!',
                    missingData: 'Data Is Missing', 
                    all: 'All',
                    close: 'Close',
                    select: 'Select',
                    selected: 'Selected', 
                    element: 'Element', 
                    answers:'Answers',
                    back:'Back',
                    availiable:'availiable', 
                    missingInformation: 'Informationen is Missing',


                    
                    //auth
                    welcome: 'Welcome!',
                    welcometoQ: 'Wilkommen zu Quizzify!',
                    login: 'Login', 
                    signUpFail: 'Login Failed. Try to reenter your Data',
                    signUpSuccessfull: 'Successfully logged in!', 
                    register: 'Register',
                    registration: 'Registration',
                    registrationFail: 'Registration Failed',
                    registeredSuccessfull: 'Successfully Registered', 
                    noAccount: 'You do not have an Account yet? Register here!', 
                    backToLogin: 'Back To Login',
                    username: "Username",

                    
                    //home screen
                    startGame: 'Start Game',
                    joynGame: 'Join Game',
                    welcomeName: 'Welcome ',

                    //side bar
                    lookAtGames: 'Games Statistics', 
                    profile: 'Profile', 
                    editTemplate: 'Edit Template', 
                    questions: 'Questions', 
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
                    addCollection: 'Add Collection',
                    collection : 'Question Collection',
                    amountOfQuestions: 'Amount of Questions',
                    noQuestionsAvailable: 'No Questions Available',
                    category: 'Category', 
                    typeOfQuestion: 'Question Type', 
                    cantPlay: "You do not have any questions yet", 
                    otherAnswers: "Further Answers",
                    QuestionsScreen: " Questions",


 

                    // Add Qeustion
                    questionAddedSuccessfully: 'Question Added Successfully',
                    errorWhileAddingQuestion: 'Error While Adding Question',
                    addPossibleAnswer: 'Add Possible Answer', 
                    possibleAnswerAdded: 'Possible Answer Added',
                    missingAnswers: 'Add more Answer Possibilities', 
                    noQuestionsAvailiable: 'You have not added any questions Yet',
                    maxPossibleAnswers: 'You have reached the maximum possible Possible Answers. Please save Your questions.',
                    possibleAnswerDeleted: 'Possible Answer Deleted', 
                    selectCategory: 'Select Category', 
                    typeInCategory: 'Type In Your Category',
                    


                    // Edit Qeustion
                    questionsEditedSuccessfully: 'Questions Edited Successfully',
                    questionEditedSuccessfully: 'Question Edited Successfully', 
                    errorWhileEditingQuestions: 'Error While Editing the Questions',
                    errorWhileEditingQuestion: 'Error While Editing the Question',

                    //Template Screen

                    //Template Bottom Buttons 
                    common: 'Common', 
                    shadow: 'Shadow',
                    image: 'Image',
                    background: 'Background', 
                    noQuestionsAvailaible:'No Questions Availiable',
                    dummyQuestion: 'What is the capital of Germany?',
                    dummyRightAnswer: 'Berlin',
                    dummypossibleAnswer1: 'Copenhagen',         
                    dummypossibleAnswer2: 'Rome',         
                    dummypossibleAnswer3: 'Munich',
                    dummypossibleAnswer4: 'Heilbronn',                           
                    
                    //Template Bottom Subfunctions
                    color: 'Color', 
                    opacity:'Opacity', 
                    radius: 'Radius', 
                    size:'Size', 
                    elevation: 'Elevation', 
                    border:'Border', 
                    textDecoration: 'Text Decoration', 
                    fontFamily:'Font Family',
                    shadowColor: 'Shadow Color', 
                    width: 'Width', 
                    addImage: 'Add Image',
                    deleteImage: 'Delete Image',
                    type: 'Type', 
                    direction: 'Direction', 
                    clearBackground: 'Clear Background', 
                    textDecorationLine: 'Text Decoration Line',
                    none: 'None',
                    underline: 'Underline',
                    overline: 'Overline',
                    lineThrough: 'Line Through',
                    Arial: 'Arial',
                    Helvetica: 'Helvetica',
                    sansSerif: 'Sans-serif',
                    monospace: 'Monospace',
                    cursive: 'Cursive',
                    fantasy: 'Fantasy',
                    systemUI: 'System UI',
                    uppercase: 'Uppercase',
                    lowercase: 'Lowercase',
                    capitalize: 'Capitalize',
                    fullWidth: 'Full Width',
                    left: 'Left',
                    right: 'Right',
                    center: 'Center',
                    justify: 'Justify',
                    start: 'Start',
                    end: 'End',
                    matchParent: 'Match Parent',
                    solid: 'Solid',
                    dashed: 'Dashed',
                    dotted: 'Dotted',
                    double: 'Double',
                    groove: 'Groove',
                    ridge: 'Ridge',
                    inset: 'Inset',
                    outset: 'Outset',
                    underlineLineThrough: 'Underline Line Through',
                    offset: 'Offset',
                    transform: 'Transform',
                    decorationLine: 'Decoration Line', 
                    textDecorationStyle: 'Decoration Line Style',
                    textDecorationColor: 'Decoration Line Color',
                    borderStyle: 'Border Style', 
                    pleaseSelectAContainer: 'Please select a Container',
                    templateUpdatedSuccessfully: 'Template Updated Successfully',
                    buttonAlign:'Button Align',
                    textAlign: "Text Align",
                    align: "Align",

                    //imageFragment
                    noImagesAvailable: 'No images available', 
                    imgUploadedSuccessfully: 'Image Uploaded successfully', 
                    enterImageFirst: 'Pick an Image First',


                    //initialize game
                    noTemplate: 'No Template availiable',
                    wantToContinue:'Do you want to Continue', 
                    enterQuizName:'Enter Quizname',
                    enterAmountOfQuestions: 'Enter amount Of Questions', 
                    forThis:'for this', 
                    youCanSelect:'You Can Select', 
                    quizInitSucc: 'Quiz initalized',
                    quizInitError: 'Error while initializing the Quiz', 
                    startsIn: 'Start in', 
                    gameCode: 'Game Code', 
                    quizCodeNotInit: 'Quiz Not Initialized', 

                    //EnterGameScreen
                    enterGameCode: "Enter the Game Code", 
                    waitForNextGame: "Wait for next game",
                    gamesStatistic : "Games Statistic",

                    //Games Statistics
                    noGamesStitisticsAvaliable: "No Games Statistics available",
                    theWinneris: "The winner is ",
                    with: "with ", 
                    skipTime: "Skip time",
                    congratilation: "Congratulations",
                    remainingTime: "Remaining Time: ",
                    sek: "sek."
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
                    text: 'Text',  
                    cancel: 'Abbrechen',
                    errorUpdate: 'Ein Fehler ist beim Update Passiert',
                    updatedSuccessfully: 'Erfolgreich Upgedated!',
                    missingData: 'Daten Fehlen.', 
                    all: 'Alle',
                    close: 'Schließen',
                    select: 'Wähle',
                    selected: 'Ausgewählter', 
                    element: 'Element',
                    answers:'Antworten',
                    availiable:'verfügbar', 
                    missingInformation: 'Informationen fehlen', 


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
                    noAccount: 'Du hast noch keinen Account? Registriere dich hier!',
                    backToLogin: 'Zurück zum Login',
                    welcome: 'Willkommen!',
                    welcometoQ: 'Willkommen zu Quizzify!',
                    otherAnswers: "Weitere Antwortmöglichkeiten",

                    //side bar
                    lookAtGames: 'Spiele Statistik',
                    profile: 'Profile',
                    editTemplate: 'Template Bearbeiten', 
                    editQuestions: 'Fragen Bearbeiten',
                    backToHome: 'Zurück zur Homepage',
                    home: 'Home Screen', 
                    back:'Zurück',

                    
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
                    amountOfQuestions: 'Anzahl der Fragen',
                    category: 'Kategorie', 
                    typeOfQuestion: 'Fragen Typ', 
                    username: "Benutzername",
                    cantPlay: "Du hast noch keine Fragen",
                    questions: "Fragen", 


                    // Add Question
                    questionAddedSuccessfully: 'Frage erfolgreich hinzugefügt',
                    errorWhileAddingQuestion: 'Fehler beim einfügen der Frage',
                    addPossibleAnswer: 'Antwortmöglichkeit Hinzufügen', 
                    possibleAnswerAdded: 'Mögliche Antwort Hinzugefügt',
                    missingAnswers: 'Füge mehr Antwortmöglichkeiten hinzu', 
                    maxPossibleAnswers: 'Du hast die maxmal Mögliche Antwortanzhal erreicht. Bitte Speichere deine Frage',
                    possibleAnswerDeleted: 'Antwortmöglichkeit Entfernt', 
                    emptyAnswer: 'Die Antwortmöglichekeit ist leer bitte füge eine Antwort hinzu .',
                    selectCategory: 'Wähle eine Kategorie aus',
                    typeInCategory: 'Füge eine Kategorie Hinzu',


                    //Edit Questions
                    questionsEditedSuccessfully: 'Fragen wurden Erfolgreich bearbeitet',
                    questionEditedSuccessfully: 'Frage wurden Erfolgreich bearbeitet', 
                    errorWhileEditingQuestions: 'Fehler beim bearbeiten der Fragen',
                    errorWhileEditingQuestion: 'Fehler beim bearbeiten der Frage',

                    common: 'Common', 
                    shadow: 'Schattem',
                    image: 'Bild',
                    background: 'Hintergrund',          
                    
                    //Template Screen
                    noQuestionsAvailaible:'No Questions Availiable',
                    dummyQuestion: 'Was ist die Hauptstadt von Deutschland?',
                    dummyRightAnswer: 'Berlin',
                    dummypossibleAnswer1: 'Kopenhagen',         
                    dummypossibleAnswer2: 'Rom',         
                    dummypossibleAnswer3: 'München',         
                    dummypossibleAnswer4: 'Heilbronn',         
                    
                    //Template Bottom Subfunctions
                    color: 'Farbe', 
                    opacity:'Durchsicht', 
                    radius: 'Radius', 
                    size:'Größe', 
                    elevation: 'Erhebung', 
                    border:'Rand', 
                    textDecoration: 'Text Art', 
                    fontFamily:'Textstil',
                    shadowColor: 'Schatten Farbe', 
                    width: 'Weite', 
                    addImage: 'Bild Hinzufügen',
                    deleteImage: 'Bild Löschen',
                    type: 'Typ', 
                    direction: 'Ausrichtung', 
                    clearBackground: 'Hintergund Leeren',
                    none: 'Keine',
                    underline: 'Unterstrichen',
                    overline: 'Überstrichen',
                    lineThrough: 'Durchgestrichen',
                    Arial: 'Arial',
                    Helvetica: 'Helvetica',
                    sansSerif: 'Sans-serif',
                    monospace: 'Monospace',
                    cursive: 'Kursiv',
                    fantasy: 'Fantasy',
                    systemUI: 'System UI',
                    uppercase: 'Großbuchstaben',
                    lowercase: 'Kleinbuchstaben',
                    capitalize: 'Erster Buchstabe groß',
                    fullWidth: 'Vollbreite',
                    left: 'Links',
                    right: 'Rechts',
                    center: 'Zentriert',
                    justify: 'Blocksatz',
                    start: 'Start',
                    end: 'Ende',
                    matchParent: 'Eltern anpassen',
                    solid: 'Durchgezogen',
                    dashed: 'Gestrichelt',
                    dotted: 'Gepunktet',
                    double: 'Doppelt',
                    groove: 'Vertieft',
                    ridge: 'Erhöht',
                    inset: 'Eingesetzt',
                    outset: 'Hervorstehend',
                    underlineLineThrough: 'Unterstrichen Durchgestrichen',
                    offset: 'Offset',
                    transform: 'Rotieren',
                    decorationLine: 'Text Linie', 
                    textDecorationStyle: 'Linienstil', 
                    textDecorationColor: 'Decoration Line Color',
                    borderStyle: 'Rand Stil', 
                    pleaseSelectAContainer: 'Bitte Klick auf ein Element',
                    templateUpdatedSuccessfully: 'Template Erfolgreich Geupdated',
                    buttonAlign:'Ausrichtung Knöpfe',
                    textAlign: "Textausrichtung",
                    align: "Ausrichting",
                    QuestionsScreen: "Fragen",



                    //image fragment 
                    noImagesUploaded: 'Keine Bilder hochgeladen', 
                    imgUploadedSuccessfully: 'Bild Erfolgreich hochgeladen', 
                    enterImageFirst: 'Bitte lade ein Bild hochladen',


                    //initialize game
                    noTemplate: 'Du hast noch kein eigenes Template erstellt.',
                    wantToContinue:' Willst du weiterfahren?', 
                    enterQuizName:'Quizname eigeben',
                    enterAmountOfQuestions: 'Wie viele Fragen soll das Quiz beinhalten?', 
                    forThis:'Für', 
                    youCanSelect:'Kannst du ', 
                    quizInitSucc: 'Quiz initiiert',
                    quizInitError: 'Fehler beim initiieren des Quizzes',
                    startsIn: 'Startet In', 
                    gameCode: 'Spielecode', 
                    quizCodeNotInit: 'Quiz Wurde nicht initialisiert',

                    //EnterGameScreen
                    enterGameCode: "Gib den Spielecode ein",
                    waitForNextGame: "Warte auf das nächste Spiel",
                    gamesStatistic : "Spiele Statistic",

                    //Games Statistics
                    noGamesStitisticsAvaliable: "Keine Spielestatistik verfügbar",
                    theWinneris: "Der Gewinner ist ",
                    with: "mit ",
                    skipTime: "Zeit überspringen",
                    congratilation: "Herzlichen Glückwunsch",
                    remainingTime: "Du hast noch: ",
                    sek: "sek."
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
    