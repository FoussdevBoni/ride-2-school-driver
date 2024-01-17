import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import MapView, { Marker } from "react-native-maps";
import CustomSearchBar from "../components/general/CustomSearchbar";
import { Appbar, Button, IconButton, Searchbar, Snackbar } from "react-native-paper";
import { colors } from "../assets/styles/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import PushNotifications from "../components/particular/PushNotif/PushNotif";
import { Socket } from "../services/Socket";
import Driver from "../components/particular/Driver/Driver";
import socketIOClient from "socket.io-client";
import { onValue, ref, set } from "firebase/database";
import { db } from "../backend/firebaseConfig";
import Map from "../components/particular/Driver/Map";
import { Provider } from "react-redux";
import { store } from "../store";

const { width, height } = Dimensions.get('window');

const R2SScreen = () => {
   const [regionName, setRegionName] = useState('Douala');
  const [regionCoordinates, setRegionCoordinates] = useState(null);
   const navigation = useNavigation()
 const [markerPosition, setMarkerPosition] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [visible , setVisible] = useState(false)
  const [myLocation, setMyLocation ]= useState(null)
  useEffect(() => {
  
   const dataRef = ref(db, 'location')

   onValue(dataRef, (snapshot)=>{
    const data = snapshot.val()
    if (data) {
    
      setMyLocation(data)
    }
   })


   
  
  }, [regionName]);
   const dataRef = ref(db, 'location')

   const startMovingMarker = () => {
onValue(dataRef, (snapshot)=>{
    const data = snapshot.val()
    if (data) {
        set(
        dataRef, data
      )
      setMyLocation(data)
    }
   })  };
 const [tripStarted, setTripStarted] = useState(false);

  const startTrip = () => {
    Socket.emit('startTrip');
    setTripStarted(true);
  };

    return (
        <View style={{flex: 1}} >  
         <Driver />
         <View style={styles.actionsButtons}>
           <Button
      mode="contained"
      style={styles.signUpBtn}
      labelStyle={styles.label}
      onPress={()=>{startMovingMarker()}}
    >
       Démarrer le trajet
    </Button>
{/*   <PushNotifications />
*/}
       </View>
      <Snackbar
        visible={visible}
        onDismiss={()=>{setVisible(false)}}
        action={{
          label: 'fermer',
          onPress: () => {
            // Do something
          },
        }}>
        Vous venez de démarer un trajet
      </Snackbar> 
  </View>
    )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: height*0.7,
    width: width,
  },
 

 appBarTitle: {
    textAlign: 'center',
  
  },
   searchContainer: {
    paddingVertical: 10,
    marginTop: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  actionsButtons:{
     padding: 20,
     marginTop: 20 ,

   },
   searchBar:{
    width: width*0.75
   },
      signUpBtn: {
    borderRadius: 20, 
    padding: 5, 
    marginVertical: 4, 
    backgroundColor: colors.primary
  },
  signInBtn:{
    marginVertical: 4, 

  },
  label: {
    color: 'white', // Couleur du texte du bouton
  },
});

export default R2SScreen