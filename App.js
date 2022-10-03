import React from "react";
import { View } from 'react-native'
import { useFonts } from 'expo-font'
import Header from "./components/Header"
import GameBoard from "./components/GameBoard";
import Gameboard2 from "./components/Gameboard2";
import Footer from "./components/Footer"
import styles from './style/style'

export default function App() {

  const [loaded] = useFonts({
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf')
  })
  
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header/>
      <GameBoard/>
      <Footer/>
    </View>
  );
}
