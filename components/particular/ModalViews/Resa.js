// App.js
import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import EnfantCard from '../../items/User/Resa/EnfantCard';
import { Divider, Title } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { colors } from '../../../assets/styles/colors';

const Resa = ({user}) => {
  const [enfants, setEnfants] = useState(user?.enfants||[]);

const handleSwitchChange = (id, newValue) => {
  setEnfants((prevEnfants) =>
    prevEnfants.map((enfant) =>
      enfant.id === id ? { ...enfant, isChecked: newValue } : enfant
    )
  );
};

const enfantsAffiches = enfants?.filter((enfant) => !enfant.isChecked);
  const selectedEnfants = enfants?.filter((enfant) => enfant.isChecked);

return (
  <View style={{ flex: 1, marginTop:0 }}>
     {
        selectedEnfants.length>0&&(
                <Title style={{marginVertical: 38}}>Enfants présents</Title>

        )
      }
    <ScrollView horizontal>
      {selectedEnfants.map((enfant) => (
        <Image
          key={enfant.id}
          source={{ uri: enfant.photoUrl }}
          style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
        />
      ))}
    </ScrollView>
    <ScrollView>
      {
        enfantsAffiches.length>0&&(
                <Title style={{marginTop: 8}}>Enfants à transporter</Title>

        )
      }
      {enfantsAffiches.map((enfant) => (
        <View key={enfant.id}>
          <EnfantCard enfant={enfant} onSwitchChange={handleSwitchChange} />
          <Divider />
        </View>
      ))}
      
    </ScrollView>
   
  </View>
);

}

export default Resa;


const {height, width} = Dimensions.get('screen')

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
     position: 'absolute',
     bottom: 0, 
     left: 0, 
     right: 0
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