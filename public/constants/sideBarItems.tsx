import Home from "../components/home/home";
import Profile from "../components/sideBarScreens/profile";
import QuestionsScreen from "../components/sideBarScreens/questions/questionsScreen";

const sideBarItems = [
    {
        name:'home',
        iconType:'Material',
        iconName:'home', 
        screenName: 'Home',
        component: Home
    },
    {
        name:'profile',
        iconType:'Material',
        iconName:'account-circle', 
        screenName: 'Profile',
        component: Profile
    },
    {
      name: 'lookAtGames',
      iconType: 'Material',
      iconName: 'gamepad',
      screenName: 'GamesStatistic',
      component: Profile
    },
    {
        name: 'editTemplate',
        iconType:'Material',
        iconName:'edit',
        screenName: 'EditTemplate',
        component: Profile
    },
    {
        name: 'questions',
        iconType:'MaterialCommunityIcons',
        iconName:'frequently-asked-questions',
        screenName: 'QuestionsScreen', 
        component: QuestionsScreen
    },
];

export default sideBarItems; 
  