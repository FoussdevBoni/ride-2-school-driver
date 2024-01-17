import  React , {useContext , useEffect , useState} from 'react';
import { Button, View, Text ,TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotifications from '../components/particular/PushNotif/PushNotif';
import { colors } from '../assets/styles/colors';
import RatingScreen from '../screens/RatingScreen';
import RidesScreen from '../screens/RidesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHomeScreen from '../screens/UserHomeScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const DrawerScreen = ({user})=>{
  const components = [
    <UserHomeScreen />,
    <R2SScreen />,
    <NotificationsScreen />,
    <ProfileScreen />,

  ]
 const headerStyle = {
    backgroundColor: colors.primary,
  };
  return(
    <NavigationContainer>
      <Tab.Navigator 
        useLegacyImplementation 
        initialRouteName={items[0].route}
        
        drawerContent={props => <DrawerMenu {...props} />}
      >
        {
          items.map((item , index)=>{
            return(
                 <Tab.Screen
        name={item.route}
        
        options={{
          tabBarLabel: item.name,
          tabBarIcon: ({ color }) => (
            <Ionicons name={item.icon}  size={26} color={color}/>
          ),
           headerTitleStyle: { // Style du titre dans l'en-tête
        color: 'white', // Couleur du texte dans l'en-tête
        textAlign: 'center', // Alignement du texte au centre
        flex: 0, // Permet au texte de s'étendre pour être centré
      },
       
           headerStyle: { // Style de l'en-tête
        backgroundColor: colors.primary, // Couleur de fond de l'en-tête
      },
        }}
      >
         {props =>components[index]}

      </Tab.Screen>
            )
          })
        }
      </Tab.Navigator>

    </NavigationContainer>
  )
}

const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};

const StackScreen = ({user}) => {
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
        <Stack.Screen name="Enrégister le gérant de cas" element={<GerantDeCasForm />} />
        <Stack.Screen name="Choisir vos préférences" element={<ChoixPreferenceForm />} />
        {/* Autres écrans de la stack ici */}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function User() {
  const {globalState, setGlobalState} = useContext(MyContext)
  const [driver , setDriver] = useState()
    useEffect(() => {
    const fetchData = async () => {
      try {
                const driverType =  await AsyncStorage.getItem('driverType');

           if (driverType==='person') {
               const dataString = await AsyncStorage.getItem('driverDataB');
               if (dataString !== null) {
                   const data = JSON.parse(dataString);
                  setDriver(data);
            
            } else {
              // Gérer le cas où les données ne sont pas trouvées dans AsyncStorage
              console.log("Les données n'ont pas été trouvées dans AsyncStorage");
         }
       }else{
           const dataString = await AsyncStorage.getItem('driverDataA');
               if (dataString !== null) {
                   const data = JSON.parse(dataString);
                  setDriver(data);
            
            } else {
              // Gérer le cas où les données ne sont pas trouvées dans AsyncStorage
              console.log("Les données n'ont pas été trouvées dans AsyncStorage");
         }
       }
       
      } catch (error) {
        // Gérer les erreurs lors de la récupération des données
        console.error("Une erreur s'est produite lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []); 
  return (
       <View style={{flex: 1}}>
          {
            globalState.isDrawerScreen ?
              <DrawerScreen user={driver}/>
            : <StackScreen user={driver}/>
          }
         
       </View>
  );
}
