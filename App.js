import  { useRef , useEffect , useState , useContext} from 'react';
import { Text, SafeAreaView, StyleSheet , ScrollView , View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyContext ,  {MyProvider} from './contextes/appContext'
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import StartScreen from './screens/StartScreen'
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/HomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import SignInScreen from './screens/SignInSreen'
// or any files within the Snack
import AssetExample from './components/AssetExample';
import Visitor from './navigation/Visitor'
import User from './navigation/User'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import {colors} from './assets/styles/colors'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
     surface: 'white' // Modifiez cette couleur pour votre couleur préférée
  },
};


const Navigation = ()=>{
    const {globalState , setGlobalState} = useContext(MyContext)
     if(!globalState.connected){
        return (
       <Visitor />
        )
     }else{
        return (
       <User />
     )
     }
}
export default function App() {
  

  return (
 <PaperProvider theme={theme}>
   <MyProvider>
    <StatusBar style="light" backgroundColor={''}/>
       <Navigation />
   </MyProvider>
  </PaperProvider>

  );
}


