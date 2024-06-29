import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Modal, Text, ScrollView, TouchableOpacity , FlatList, Dimensions} from 'react-native';
import { IconButton, List, Colors, Avatar , Title} from 'react-native-paper';

import { colors } from '../../../assets/styles/colors';
import AppBarr from '../../general/AppBarr';
import ModalContainer from '../../general/ModalContainer';
const UrgencesComponent = ({user}) => {
  const [emergencyType, setEmergencyType] = useState('');
  const [showModal, setShowModal] = useState(false);


  const [emergencies, setEmergencies] = useState([
    { id: 1, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    { id: 2, type: 'Retard extrême', date: '24/10/2023' },
    { id: 3, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 4, type: 'Maladie de l\'enfant', date: '23/10/2023' },
   { id: 1, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    { id: 2, type: 'Retard extrême', date: '24/10/2023' },
    { id: 3, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 4, type: 'Maladie de l\'enfant', date: '23/10/2023' },
   
  ]);

  const handleEmergencyReport = (type) => {
    setEmergencyType(type);
    setShowModal(true);
  };

  const handleContact = (emergency) => {
    // Logic to handle contacting the driver or school
    console.log('Contacting for emergency:', emergency);
  };

  const UrgencesList = ({limite})=>{
    return (
          <View style={styles.emergenciesContainer}>
            
            {
              emergencies.slice(0, limite).map((item, index)=>{
                   return(
                      <List.Item
                key={index.toString()}
                 title={item.type}
                 titleStyle={{fontSize: 16}}
                description={item.date}
              left={(props) => (
                <Avatar.Icon {...props} icon="alert" style={{ backgroundColor:'white' , color: Colors.red500 , width: 50 , height: 50}} size={50}/>
              )}
              onPress={() => handleContact(item)}
            />
                   )
              })   
            }
         
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     
         <UrgencesList limite={4}/>
       <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => handleEmergencyReport('')} style={styles.button}>
        <Text style={[styles.buttonText , {color: 'black'}]}>Voir tout </Text>
       
      </TouchableOpacity>
       </View>

        <Modal visible={showModal} animationType="slide" transparent>
            <AppBarr title={'Mes urgences'} goBack={()=>{setShowModal(false)}}/>
           <ModalContainer children={<UrgencesList limite={emergencies.length}/>
}/>
      </Modal>
    </ScrollView>
  );
};

const {width , height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  btnContainer:{
     justifyContent: 'center',
     flexDirection: 'row',
    alignItems: 'center'
  },

  button: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: Colors.white,
    width: width*0.6
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emergenciesContainer: {
    marginTop: -10,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
  padding: 10,
  borderRadius: 10,
  flex: 1,
  },
   input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 2
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
  },
  // Vous avez une propriété "animation" dans le style, mais elle n'est pas utilisée dans le composant.
});

export default UrgencesComponent;
