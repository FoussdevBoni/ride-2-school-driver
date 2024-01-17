import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import UrgencesComponent from '../components/particular/Urgences/Urgences';
import { Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Links from '../components/particular/Links/Links';
import DriverRide from '../components/particular/Driver/Driver';

function UserHomeScreen(props) {
    alert('Helle')
    return (
        <ScrollView style={{flex: 1}} horizontal={false}>

        <View style={styles.title}>
                <Title>
                Les urgences récentes
            </Title>
            </View>
            <UrgencesComponent />


             <View style={styles.title}>
                <Title>
                Les liens importants
            </Title>
            </View>
                        <Links />


        </ScrollView>
    );
}

const styles = StyleSheet.create({
  title:{
     padding: 20
  }
});
export default UserHomeScreen;


