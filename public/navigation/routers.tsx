import { NavigationProp } from "@react-navigation/native";

interface AuthRouterProps {
    navigation: NavigationProp<any, any>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
interface QuestionScreenRouterProps {
    navigation?: NavigationProp<any, any>;
    adding: boolean;
    editing: boolean;
    setAdding?: React.Dispatch<React.SetStateAction<boolean>>;
}

export {AuthRouterProps, QuestionScreenRouterProps}
  