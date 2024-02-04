import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import QuestionsScreen from '../components/sideBarScreens/questions/questionsScreen';
import AddQuestions from '../components/sideBarScreens/questions/addQuestionsScren';

type RootStackParamList = {
  QuestionsScreen: undefined;
  AddQuestions: undefined;
};

export type QuestionsScreenNavigatorProps = StackNavigationProp<RootStackParamList, 'QuestionsScreen'>;
export type QuestionsScreenRouteProps = RouteProp<RootStackParamList, 'QuestionsScreen'>;

const Stack = createStackNavigator<RootStackParamList>();

const QuestionsScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="QuestionsScreen">
      <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} />
      <Stack.Screen name="AddQuestions" component={AddQuestions} />
    </Stack.Navigator>
  );
};

export default QuestionsScreenNavigator;