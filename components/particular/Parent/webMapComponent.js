import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { ref, set } from 'firebase/database';
import { db } from '../../../backend/firebaseConfig';
import { colors } from '../../../assets/styles/colors';
import Br from '../../widgets/br/br';

const Map = ({ user, enfants }) => {
  const [location, setLocation] = useState(null);
  const [prevLocation, setPrevLocation] = useState(null);
  const [prevTime, setPrevTime] = useState(null);
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0); // Nouvel état pour stocker la vitesse
  const [strokeWidth, setstrokeWidth] = useState(4);
  const [strokeColor, setstrokeColor] = useState('red');
  const [ramassage , setRamassage ] = useState();
  const [lieudepot , setLieudepot] = useState();
  const driverId = user.id || user._id;
  const [refused , setRefused] = useState(false)
 
   const accordeAccess = async ()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setRefused(true)
        return 
      }else{
        setRefused(false)
         let location = await Location.getCurrentPositionAsync({})
       if (location) {
        setPrevLocation(location.coords); // Définir la position précédente lors de la première mise à jour
        setPrevTime(new Date()); // Définir le temps précédent lors de la première mise à jour
        sendMyPostion(location.coords);
      }
      setLocation(location.coords);
      }

  }

  
  useEffect(() => {

    accordeAccess()

  }, [refused]);

 

  function sendMyPostion(location) {
    const dataRef = ref(db, 'locations/' + driverId);

    const data = {
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      distance: distance,
      speed: speed // Envoyer la vitesse à Firebase
    };
    console.log('les coordonnées', data);
    set(dataRef, data);
  }

  useEffect(() => {

    if (enfants) {
      const origine = enfants[0]?.ramassage[0];
      const destination = enfants[0]?.lieudepot[0];

      setRamassage({
        latitude: origine.latitude,
        longitude: origine.lontidute
      });
       
       
      setLieudepot({
        latitude: destination.latitude,
        longitude: destination.lontidute
      });


    }
  }, [enfants]);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  useEffect(() => {
    if (location !== null && prevLocation !== null && prevTime !== null) {
      const currentTime = new Date();
      const timeDiffInSeconds = (currentTime - prevTime) / 1000; // Convertir en secondes
      const distance = haversineDistance(
        prevLocation.latitude,
        prevLocation.longitude,
        location.latitude,
        location.longitude
      );
      const speed = distance / timeDiffInSeconds; // Calculer la vitesse en km/h
      setSpeed(speed);
      setPrevLocation(location);
      setPrevTime(currentTime);
      sendMyPostion(location);
    }
  }, [location]);

  useEffect(() => {
    if (location !== null) {
      const coords = [
        { latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) },
        { latitude: parseFloat(ramassage?.latitude), longitude: parseFloat(ramassage?.longitude) },
        {
          latitude: parseFloat(lieudepot?.latitude),
          longitude: parseFloat(lieudepot?.longitude),
        },
      ];
      setRoute(coords);
      let totalDistance = 0;
      for (let i = 0; i < coords.length - 1; i++) {
        const distance = haversineDistance(
          coords[i].latitude,
          coords[i].longitude,
          coords[i + 1].latitude,
          coords[i + 1].longitude
        );
        totalDistance += distance;
      }
      setDistance(totalDistance.toFixed(2));
    }
  }, [location, strokeColor, strokeWidth]);
    if (refused) {
    return  (<View style={styles.actionsButtons}>

                    <Text style={{textAlign: 'center'}}>
                      On a besoin de vos coordonnées géographiques 😞!
                    </Text>
                    <Br size={20}/>
                    <TouchableOpacity  style={styles.signUpBtn} onPress={()=>{
                      accordeAccess()
                    }}  >
                      <Text style={{color: 'white' , textAlign: 'center'}}>
                        Autoriser
                      </Text>
                   </TouchableOpacity>
          </View>)
    
    
  }


  
  if (!location) {
        <Text>Chargement</Text>;

  }else{
     return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          }}
          title='Le chauffeur'
          pinColor="blue"
          icon={()=><Ionicons name='home'  size={50} color={'red'}/>}
          image={require('../../../assets/images/icon-car.png')}
        />
        <Marker
          coordinate={{
          latitude:   parseFloat(ramassage?.latitude),
            longitude: parseFloat( ramassage?.longitude),
          }}
          title='Point de ramassage'
          pinColor="blue"
          image={require('../../../assets/images/icon-student.png')}
        />
        <Marker
          coordinate={{
            latitude: parseFloat(lieudepot?.latitude),
            longitude: parseFloat(lieudepot?.longitude)
          }}
          title='Ecole de Douala'
          pinColor="blue"
          image={require('../../../assets/images/icon-school.png')}
        />
      {route.length > 0 && <Polyline coordinates={route} strokeWidth={strokeWidth} strokeColor={'red'} />}
      </MapView>
    </View>
  );
  }

 
 
};
const {width , height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

   actionsButtons:{
     padding: 20,
     marginTop: 20 ,
     position: 'absolute',
     left: 0, 
     right: 0
   },
   searchBar:{
    width: width*0.75
   },
      signUpBtn: {
    borderRadius: 40, 
    padding: 15, 
    marginVertical: 4, 
    backgroundColor: colors.primary
  },
});

export default Map;
