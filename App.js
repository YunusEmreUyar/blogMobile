import 'react-native-gesture-handler';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import HomeStack from './routes/homeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      '[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!"'
    ]);
    AsyncStorage.getAllKeys()
    .then(val => console.log(val));
  });

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
