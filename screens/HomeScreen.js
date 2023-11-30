import * as React from 'react';
import { View,  StyleSheet, Image , Text } from 'react-native';
import { Button } from 'react-native-paper';
import {colors} from '../assets/styles/colors'
import { useNavigation } from '@react-navigation/native';

export default   HomeScreen = ({navigation})=> {
  return (
     <View>
         <View>
      <Image   style={{ width: 500, height: 500 }}source={require('../assets/images/banniarImage.jpg')} />
    </View>


    <View style={styles.container}>
       <Text style={styles.message}>
          Les trajets éducatifs confortables et sûrs
       </Text>

       <View style={styles.actionsButtons}>
           <Button
      mode="contained"
      onPress={() => navigation.navigate('Créer un compte/Etape1')}
      style={styles.signUpBtn}
      labelStyle={styles.label}
    >
      Inscription
    </Button>
        <Button
      mode=""
      onPress={() => navigation.navigate('Se connecter')}
      style={styles.signInBtn}
      labelStyle={{color:  '#3498db'}}
    >
      Connexion
    </Button>
       </View>
    </View>
     </View>
  );
}



const styles = StyleSheet.create({
  container:{
    marginTop: 30, 
    padding: 10
  },
   message: {
     fontWeight: '900',
     textAlign: 'center',
     fontSize: 30, 
     opacity: 0.6

   }, 
   actionsButtons:{
     padding: 20
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
