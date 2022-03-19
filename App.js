import 'react-native-gesture-handler';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import HomeStack from './routes/homeStack';

export default function App() {

  const [isReady, setIsReady] = useState(false);

  const fetchFonts = async () => {
    await Font.loadAsync({
      "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf")
    });
  };

    if (!isReady) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setIsReady(true)}
          onError={() => {}}
        />
      );
    } else {
      return (
        <HomeStack />
    );  
  }
  
}
