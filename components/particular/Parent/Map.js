import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { ref, set } from 'firebase/database';
import { db } from '../../../backend/firebaseConfig';

const Map = ({user , enfants}) => {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [strokeWidth, setstrokeWidth] = useState(4);
  const [strokeColor, setstrokeColor] = useState('red');
  const [ramassage , setRamassage ] = useState()
  const [lieudepot , setLieudepot] = useState()
        const driverId = user.id ||user._id

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(()=>{
    function sendMyPostion() {
    enfants.forEach(enfant => {
        const data = {
         diver: driverId ,
         receiver: enfant.parentId,
         enfant: enfant._id,
         location: {
          latitude: location.latitude,
          longitude: location.longitude
         } ,
         distance: distance
        }
     const dataRef = ref(db, 'locations/'+driverId+'/'+enfant?.parentId)

    set(dataRef , data)

    });
  }
   if (location) {
      sendMyPostion()
   }
  },[enfants , user , location , distance])

   
   useEffect(()=>{
     if (enfants) {
      const origine = enfants[0]?.ramassage[0]
      const destination = enfants[0]?.lieudepot[0]
      console.log('Les enfants',enfants[0]?.ramassage[0])
      setRamassage({
        latitude: origine.latitude ,
        longitude: origine.lontidute
      })
      setLieudepot({
         latitude: destination.latitude ,
        longitude: destination.lontidute
      })
     }
   },[enfants])


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
    if (location !== null) {
      const coords = [
        { latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) },
        { latitude: parseFloat(ramassage.latitude), longitude: parseFloat(ramassage.longitude) },
        {
          latitude: parseFloat(lieudepot.latitude),
          longitude: parseFloat(lieudepot.longitude),
        },
      ];
       console.log(coords)
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

      console.log(
        'Distance totale entre les marqueurs:',
        totalDistance.toFixed(2),
        'km'
      );
      setDistance(totalDistance.toFixed(2));
    }
  }, [location, strokeColor, strokeWidth]);


  if (!location) {
    return <Text>Chargement</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      ref={mapRef}
      
          // onRegionChange={(region)=>console.log(region)}
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
            longitude: parseFloat( ramassage.longitude),
          }}
          title='Point de ramassage'
          pinColor="blue"
         image={require('../../../assets/images/icon-student.png')}
        />
      
          <Marker
          coordinate={{
            latitude: parseFloat(lieudepot.latitude),
            longitude: parseFloat(lieudepot.longitude)
          }}
         title='Ecole de Douala'
          pinColor="blue"
          image={require('../../../assets/images/icon-school.png')}

         />
         
        { route.length >0 && <Polyline coordinates={route}  strokeWidth={strokeWidth} 
        strokeColor= {'red'} />}
      </MapView>
    </View>
  );
};

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
});

export default Map;
