import React from 'react';
import { View, StyleSheet, FlatList, Animated, Easing } from 'react-native';
import NotificationItem from '../components/particular/NotificationItem';
import { enableScreens } from 'react-native-screens';
import { useFocusEffect } from '@react-navigation/native';

enableScreens();

const notifications = [
  { id: '1', text: 'Nouveau message reçu', date: '10/24/2023' },
  { id: '2', text: 'Vous avez une nouvelle demande d\'ami', date: '10/23/2023' },
  { id: '3', text: 'Votre publication a reçu un nouveau commentaire', date: '10/22/2023' },
  { id: '4', text: 'Quelqu\'un a aimé votre photo', date: '10/21/2023' },
  { id: '5', text: 'Vous avez été mentionné dans un commentaire', date: '10/20/2023' },
    { id: '1', text: 'Nouveau message reçu', date: '10/24/2023' },
  { id: '2', text: 'Vous avez une nouvelle demande d\'ami', date: '10/23/2023' },
  { id: '3', text: 'Votre publication a reçu un nouveau commentaire', date: '10/22/2023' },
  { id: '4', text: 'Quelqu\'un a aimé votre photo', date: '10/21/2023' },
  { id: '5', text: 'Vous avez été mentionné dans un commentaire', date: '10/20/2023' },
    { id: '1', text: 'Nouveau message reçu', date: '10/24/2023' },
  { id: '2', text: 'Vous avez une nouvelle demande d\'ami', date: '10/23/2023' },
  { id: '3', text: 'Votre publication a reçu un nouveau commentaire', date: '10/22/2023' },
  { id: '4', text: 'Quelqu\'un a aimé votre photo', date: '10/21/2023' },
  { id: '5', text: 'Vous avez été mentionné dans un commentaire', date: '10/20/2023' },
];

const NotificationsScreen = () => {
  const positionX = React.useRef(new Animated.Value(1000)).current;

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = {
    transform: [{ translateX: positionX }],
  };

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(positionX, {
        toValue: 0,
        duration: config.duration,
        easing: config.easing,
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(positionX, {
          toValue: 1000,
          duration: config.duration,
          easing: config.easing,
          useNativeDriver: true,
        }).start();
      };
    }, [positionX, config])
  );

  return (
    <Animated.View style={[styles.container, style]}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem text={item.text} date={item.date} />}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default NotificationsScreen;
