import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const R2SScreen = () => {
  const cameroonRegion = {
    latitude: 7.369722, // Latitude approximative du centre du Cameroun
    longitude: 12.354722, // Longitude approximative du centre du Cameroun
    latitudeDelta: 4.5, // Valeur à ajuster pour le niveau de zoom
    longitudeDelta: 4.5, // Valeur à ajuster pour le niveau de zoom
  };

  const cameroonCoordinates = [
    // Un exemple de coordonnées pour une polyline représentant une route (à adapter)
    { latitude: 12, longitude:13},
    // ...
    // Ajoute d'autres coordonnées pour la polyline représentant la route
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={cameroonRegion}>
        {/* Affichage de la polyline représentant une route */}
        <Polyline
          coordinates={cameroonCoordinates}
          strokeWidth={3}
          strokeColor="blue"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default R2SScreen;
