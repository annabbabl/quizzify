import Profile from "../components/sideBarScreens/profile";

const sideBarItems = [
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
        name: 'editQuestions',
        iconType:'MaterialCommunityIcons',
        iconName:'frequently-asked-questions',
        screenName: 'EditQuestions', 
        component: Profile
    },
];

export default sideBarItems; 
  