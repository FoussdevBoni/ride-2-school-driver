import * as React from 'react';
import { View, StyleSheet , Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {colors} from '../assets/styles/colors'

const SignInScreen = () => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Implémentez ici la logique de connexion en utilisant les valeurs de l'état
    console.log('Numéro de téléphone:', phone);
    console.log('Mot de passe:', password);
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
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        <Text style={{color: 'white'}}>
                 Se connecter
             </Text>      </Button>
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
    backgroundColor: colors.primary

  },
});

export default SignInScreen;