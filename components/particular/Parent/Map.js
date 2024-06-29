import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const PositionEnTempsReel = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distanceParcourue, setDistanceParcourue] = useState(0);
  const [vitesse, setVitesse] = useState(0);
  const [distanceRestante, setDistanceRestante] = useState(0);
  const [tempsEstime, setTempsEstime] = useState(0);
  const [enDeplacement, setEnDeplacement] = useState(false);

  useEffect(() => {
    const calculerDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3; // Rayon de la Terre en mètres
      const φ1 = lat1 * Math.PI / 180; // Conversion en radians
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Distance en mètres
    };

    const obtenirPosition = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation non accordée');
        return;
      }

      Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 1000 }, (newLocation) => {
        // Calculer la vitesse actuelle
        const vitesseEnMetresParSeconde = newLocation.coords.speed || 0; // Vitesse en mètres par seconde
        setVitesse(vitesseEnMetresParSeconde);

        // Mettre à jour l'état de déplacement en fonction de la vitesse et de la précision
        if (vitesseEnMetresParSeconde > 0 && newLocation.coords.accuracy < 20) {
          setEnDeplacement(true);
        } else {
          setEnDeplacement(false);
        }

        // Calculer la distance parcourue
        if (location) {
          const distance = calculerDistance(location.coords.latitude, location.coords.longitude, newLocation.coords.latitude, newLocation.coords.longitude);
          setDistanceParcourue(prevDistance => prevDistance + distance);

          // Calculer la distance restante et le temps estimé (exemple)
          const distanceRestanteEstimee = 1000; // Exemple : 1000 mètres restants
          const tempsEstimeEnSecondes = distanceRestanteEstimee / vitesseEnMetresParSeconde;
          setDistanceRestante(distanceRestanteEstimee);
          setTempsEstime(tempsEstimeEnSecondes);
        }

        setLocation(newLocation);
      });
    };

    obtenirPosition();

    return () => {
      if (location) {
        location.remove(); // Arrêter l'écoute de la position
      }
    };
  }, []);

  return (
    <View>
      <Text>Latitude: {location ? location.coords.latitude : 'Chargement...'}</Text>
      <Text>Longitude: {location ? location.coords.longitude : 'Chargement...'}</Text>
      <Text>{ enDeplacement ? 'Vous êtes en déplacement' : 'Vous êtes arrêté' }</Text>
      <Text>Vitesse de déplacement: {vitesse.toFixed(2)} m/s</Text>
      <Text>Distance parcourue: {distanceParcourue.toFixed(2)} m</Text>
      <Text>Distance restante: {distanceRestante.toFixed(2)} m</Text>
      <Text>Temps estimé pour arriver: {tempsEstime.toFixed(2)} secondes</Text>
      {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
    </View>
  );
};

export default PositionEnTempsReel;
