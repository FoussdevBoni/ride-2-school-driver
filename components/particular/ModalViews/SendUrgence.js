import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Modal, Text, ScrollView, TouchableOpacity , FlatList} from 'react-native';
import { IconButton, List, Colors, Avatar , Title} from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';
import LottieView from 'lottie-react-native'; // Assurez-vous que le nom du package est correct
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../assets/styles/colors';
import AppBarr from '../../general/AppBarr';
import ModalContainer from '../../general/ModalContainer';
const SendUrgence = ({user}) => {
  const [emergencyType, setEmergencyType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(true);

  const possibilities  = [
    
     { id: 5, type: 'Retard extrême', date: '24/10/2023' },
    { id: 6, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 7, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    { id: 8, type: 'Retard extrême', date: '24/10/2023' },
    { id: 9, type: 'Absence du chauffeur', date: '25/10/2023' },
   { id: 9, type: 'Autre cause', date: '25/10/2023' }

  ]

  const handleContact = (emergency) => {
    // Logic to handle contacting the driver or school
     setEmergencyType(emergency.type)
    console.log('Contacting for emergency:', emergency);
  };


   const UrgenceForm = ()=>{
    return (
    <View style={{flex: 1}}>
            <TextInput
           style={styles.input}
           placeholder="Type d'urgence"
           value={emergencyType}
        onChange={(e)=>{
            setEmergencyType(e.target.value)
        }}
      />
        <TextInput
         style={[styles.input, { height: 100 }]}
         placeholder="Détails d'urgence"
         multiline
       />
       <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
         <Text style={styles.buttonText}>Envoyer</Text>
       </TouchableOpacity>
    </View>
    )
   }



  return (
    <ScrollView style={styles.container}>
               {
            possibilities.map((item) => {
              return(
                <TouchableOpacity onPress={()=>
                
                   {
                   handleContact(item) 
                   setShowModal(true)

                    }}>
                  <List.Item
                  key={item.id.toString()} // Ajout de la clé unique
                  title={item.type}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="phone"
                      color={Colors.green500}
                     
                    />
                  )}
                />
                </TouchableOpacity>
              );
            })
          }
       
           
        

      <Modal visible={showModal} animationType="slide" transparent>
            <AppBarr title={'Rapporter une urgence'} goBack={()=>{setShowModal(false)}}/>
           <ModalContainer children={<UrgenceForm />}/>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    display: 'flex'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emergenciesContainer: {
    marginTop: 20,
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

export default SendUrgence;
