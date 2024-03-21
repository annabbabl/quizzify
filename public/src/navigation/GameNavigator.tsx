import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameNavigatorProps } from "./routers";
import GameScreen from "../components/game/gameScreen";
import JoinGameScreen from "components/game/joinGameScreen";
import { QuizInitData } from "types/databaseTypes";
import WaitingScreen from "components/game/waitingScreen";
import EndScreen from "components/game/endScreen";
import { RouteProp, useRoute } from "@react-navigation/native";

const GameNavigator = createNativeStackNavigator();

interface GameScreenParams {
  gc: string; 
}

const GameNavigatorScreens = ({ navigation }: GameNavigatorProps) =>{
  const route = useRoute<RouteProp<{ params: GameScreenParams }, 'params'>>();
  const { gc } = route.params;
  const [gameCode, setGameCode] = useState(gc);
  const [waitingScreen, setWaitingScreen] = useState(false);
  const [endScreen, setEndScreen] = useState(false);
  const [gameData, setGame] = useState<QuizInitData>({} as QuizInitData);
  const [gameId, setGameId] = useState("");

  console.log(gameCode, gc,  78787)
  return (
    <GameNavigator.Navigator>
         <GameNavigator.Screen
          name="JoinGameScreen"
          options={{ headerShown: false }}
        >
            {(props) => (
                <JoinGameScreen 
                  {...props} 
                  navigation={navigation} 
                  gameCode={gameCode}
                  setGameCode={setGameCode}
                  setGame={setGame}
                />
            )}
        </GameNavigator.Screen>
         <GameNavigator.Screen
          name="GameScreen"
          options={{ headerShown: false }}
        >
            {(props) => (
                <GameScreen 
                  {...props} 
                  navigation={navigation}
                  gameCode={gameCode}
                  setEndScreen={setEndScreen}
                  setGameId={setGameId}
                />
            )}
        </GameNavigator.Screen>
         <GameNavigator.Screen
          name="WaitingScreen"
          options={{ headerShown: false }}
        >
            {(props) => (
                <WaitingScreen 
                  {...props} 
                  gameCode={gameCode}
                  setWaitingScreen={setWaitingScreen}
                />
            )}
        </GameNavigator.Screen>
        <GameNavigator.Screen
          name="EndScreen"
          options={{ headerShown: false }}
        >
            {(props) => (
                <EndScreen 
                  {...props} 
                  gameId = {gameId}
                />
            )}
        </GameNavigator.Screen>
    
    </GameNavigator.Navigator>
  );
}
export default GameNavigatorScreens; 