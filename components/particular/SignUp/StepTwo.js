// PrivateDriverDetailsScreen.js

import React  , {useState , useContext} from 'react'

import { View, StyleSheet , Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import MyContext from '../../../contextes/appContext'

const StepTwo = ({ navigation }) => {
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
    const {globalState , setGlobalState} = useContext(MyContext)

  const handleRegister = () => {
    // Handle the registration logic here
      setGlobalState(prevState => ({
              ...prevState,
              connecting: true
       }))

       setTimeout(()=>{
          setGlobalState(prevState => ({
              ...prevState,
              connected: true
       }))
       } , 3000)

  }

  return (
    <View style={styles.container}>
      <TextInput
              style={styles.input}

        label="Noms et prénoms"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
              style={styles.input}

        label="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
              style={styles.input}
        label="Créer mot de passe"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput 
        style={styles.input}
        label="Confirmer mot de passe"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button} >
      <Text style={{color: 'white'}}>
              Créer mon compte

      </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
    input: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary
  },
});

export default StepTwo;
