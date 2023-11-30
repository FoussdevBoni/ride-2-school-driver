import * as React from 'react';
import { Button, View, Text ,TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'


export const items = [
   {
  icon: 'person-add',
  route: 'Fleet'
   },
    {
  icon: 'map',
  route: 'R2S'
   }, 
      {
  icon: 'people',
  route: 'Résa'
   }, 
      {
  icon: 'warning',
  route: 'Urgences'
   }, 
      {
  icon: 'notifications',
  route: 'Notifications'
   }, 
      {
  icon: 'time',
  route: 'Mes historiques'
   },
         {
  icon: 'cash',
  route: 'Gas',
  
   },
      {
  icon: 'person',
  route: 'Mon profile'
   },
]


const DrawerMenu = ({ navigation }) => {
  return (
  <View style={{ marginTop: 50 }}>
    
      {
        items.map((item)=>{
          return(
              <View>
               <TouchableOpacity onPress={() => navigation.navigate(item.route)} style={{ flexDirection: 'row', alignItems: 'center',    marginTop: 20, marginLeft: 20 }}>
                <Ionicons name={item.icon} size={24} color="black" />
                 <Text style={{ marginLeft: 10 }} >{item.route}</Text>
               </TouchableOpacity>
                <View style={{marginTop: 10}}>
                
                </View>
               <Divider />
              </View>
          )
        })
      }
    </View>
  );
};
 

export default DrawerMenu