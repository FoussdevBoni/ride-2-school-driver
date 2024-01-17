import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { items } from '../components/particular/DrawerMenu';
import MyContext from '../contextes/appContext';
import { colors } from '../assets/styles/colors';

const SignInScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()
  const {globalState , setGlobalState} =useContext(MyContext)
   console.log(axios)
  const handleLogin = async () => {
    setLoading(true);
    const userData = {
      username: phone, // Remplacez par le nom d'utilisateur saisi par l'utilisateur
      password: password, // Remplacez par le mot de passe saisi par l'utilisateur
      // Ajoutez d'autres champs nécessaires pour l'inscription
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription' );

      }

      const data = await response.json();
      console.log('Utilisateur inscrit avec succès :', data);
      // Traitez la réponse ou effectuez des actions supplémentaires ici après l'inscription réussie
          setLoading(false);

    } catch (error) {
     
       setGlobalState(prevState => ({
          ...prevState,
          connected: true,
        }));

       setTimeout(() => {
               navigation.navigate(items[0].route)

       }, 5000);
    }
  
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Numéro de téléphone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
      />
      <TextInput
        label="Mot de passe"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button} disabled={loading}>
        <Text style={{ color: 'white' }}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
   borderRadius: 20, 
    padding: 5, 
    marginVertical: 4, 
    backgroundColor: colors.primary  },
});

export default SignInScreen;
