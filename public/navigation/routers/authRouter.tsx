import { NavigationProp } from "@react-navigation/native";

export interface AuthRouterProps {
    navigation: NavigationProp<any, any>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
  