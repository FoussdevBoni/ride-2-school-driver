import  React , {useContext} from 'react';
import { Button, View, Text ,TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'
import DrawerMenu ,{items}  from '../components/particular/DrawerMenu'
import SlidingComponent from '../components/general/SlidingComponent'
import NotificationsScreen from '../screens/NotificationsScreen'
import IteConfig from '../components/particular/AddChild/IteConfig'
import GerantDeCasForm from '../components/particular/AddChild/GerantDeCasForm'
import ChoixPreferenceForm from '../components/particular/AddChild/ChoixPreferenceForm'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MyContext from '../contextes/appContext'
import UrgenceScreen from '../screens/UrgenceScreen'
import ProfileScreen from '../screens/ProfileScreen'
import HistoMenu from '../screens/Historique'
import HistoTrans from '../components/particular/Historique/histoTrans'
import HistoRide from '../components/particular/Historique/HistoRide'
import CustomHeader from '../components/general/CustomHeader'
import DriverScreen from '../screens/DriverScreen'
import R2SScreen from '../screens/R2SScreen'
import FleetScreen from '../screens/FleetScreen'
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerScreen = ()=>{
  return(
    <NavigationContainer>
      <Drawer.Navigator 
        useLegacyImplementation 
        initialRouteName="Fleet"
        drawerContent={props => <DrawerMenu {...props} />}
      >
        <Drawer.Screen name="Fleet" component={FleetScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Signaler une urgence" component={UrgenceScreen} />
        <Drawer.Screen name="Mon profile" component={ProfileScreen} />
        <Drawer.Screen name="Mes historiques" component={HistoMenu} />
          <Drawer.Screen name="Historique des transactions" component={HistoTrans} />
        <Drawer.Screen name="Historique des déplacements" component={HistoRide} />
         <Drawer.Screen name="Mes conducteurs" component={DriverScreen} />
        <Drawer.Screen name="R2S" component={R2SScreen} />


        {/* Ajoutez d'autres écrans au Drawer ici */}
      </Drawer.Navigator>

    </NavigationContainer>
  )
}

const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};

const StackScreen = () => {
  const {globalState, setGlobalState} = useContext(MyContext)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = {globalState.initialScreen}
        screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS, // ou toute autre transition que vous souhaitez utiliser
        })}
      >
        <Stack.Screen name="Configurer l'itinéraire" component={IteConfig}   screenOptions={{
        header: (props) => <CustomHeader title={"Configurer l'itinéraire"} />,  headerShown: false
      }}/>
        <Stack.Screen name="Enrégister le gérant de cas" component={GerantDeCasForm} />
        <Stack.Screen name="Choisir vos préférences" component={ChoixPreferenceForm} />
        {/* Autres écrans de la stack ici */}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function User() {
  const {globalState, setGlobalState} = useContext(MyContext)
  return (
       <View style={{flex: 1}}>
          {
            globalState.isDrawerScreen ?
              <DrawerScreen />
            : <StackScreen />
          }
         
       </View>
  );
}
