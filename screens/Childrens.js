// App.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Divider, Title } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { colors } from '../assets/styles/colors';
import EnfantCard from '../components/items/User/Resa/EnfantCard';
import { useNavigation } from '@react-navigation/native';
import Br from '../components/widgets/br/br';
import axios from 'axios';
import { childrenApi } from '../utils/api';
import { ref, set } from 'firebase/database';
import { db } from '../backend/firebaseConfig';
import { Text } from 'react-native';

const ChildrenScreen = ({user}) => {
  const getPrenomOnly = (fullName)=>{
    const noms  = fullName?.split(' ')
    return noms[0]
  }
  const [enfants, setEnfants] = useState(user.enfants||[]);

       const driverId = user.id ||user._id

console.log(user)
const handleSwitchChange = (id, newValue) => {
  setEnfants((prevEnfants) =>
    prevEnfants.map((enfant) =>
      enfant._id === id ? { ...enfant, isChecked: newValue } : enfant
    )
  );
};
const startTravel = ()=>{
  const receivers = enfants.map((enfant , index)=>(
    enfant?.parentId
  ))

  const notification = {
    date: new Date(),
    body: ' Le chauffeur de votre enfant a commencé un trajet',
    sender: driverId,
    receivers: receivers
  }

  const dataRef = ref(db, 'notifications')

  set(dataRef , notification)
}
const enfantsAffiches = enfants.filter((enfant) => !enfant.isChecked);

const selectedEnfants = enfants.filter((enfant) => enfant.isChecked);
   const navigation = useNavigation()
 if (enfantsAffiches.length>0||selectedEnfants.length>0) {
   return (
  <View style={{ flex: 1, marginTop:0 , paddingHorizontal: 20 }}>
     {
        selectedEnfants.length>0&&(
               <View>
                 <Title style={{marginVertical: 38 , textAlign: 'start'}}>Enfants présents</Title>
                  <ScrollView horizontal>
      {selectedEnfants.map((child) =>{
        return(
             (
            <TouchableOpacity onPress={()=>{
                       navigation.navigate('child-details' , {child})

            }}>
                 <Image
        
                  key={child?._id}
                       source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1lSk9ZYpmspvSKua-n3RJkH7xDv-ySL7xQhhQaqWwiw&s' }}
                    style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
                  />
                  <Text>
                     {getPrenomOnly(child.nom)}
                  </Text>
        </TouchableOpacity>
      )
      )})}
    </ScrollView>
   </View>

        )
      }
    

    <ScrollView style={{marginTop: 20}}>
      {
        enfantsAffiches.length>0&&(
                <Title style={{textAlign: 'start'}}>Enfants à transporter</Title>

        )
      }
      {enfantsAffiches.map((child) => (
        <View key={child._id}>
          <EnfantCard child={child} onSwitchChange={()=>{handleSwitchChange(child._id , child)}} />
          <Divider />
        </View>
      ))}
      <Br size={15}/>
    </ScrollView>
     <View style={{padding: 10}}>
       {
        selectedEnfants.length>0&&(
           <TouchableOpacity  style={styles.signUpBtn}onPress={()=>{
            startTravel()
            navigation.navigate('R2S' , {selectedEnfants})
        }}>
       <Text style={{color: 'white' , textAlign: 'center' , fontSize: 16}}>
         Démarrer mon trajet
       </Text>
    </TouchableOpacity>
        )
       }
     </View>
  </View>
);
 }else{
   return <View style={{flex: 1 , justifyContent:'center' , alignItems:'center'}}>
   <ActivityIndicator color={colors.primary} size={30}/>
   </View>
 }

}

export default ChildrenScreen;


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
    borderRadius: 100, 
    padding: 12, 
    marginVertical: 4, 
    backgroundColor: colors.primary
  },
  signInBtn:{
    marginVertical: 4, 
       borderRadius: 20, 

  },
  label: {
    color: 'white', // Couleur du texte du bouton
  },
});