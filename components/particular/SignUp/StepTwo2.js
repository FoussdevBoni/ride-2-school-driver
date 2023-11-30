// Importez les composants et modules nécessaires
import React  , {useState , useContext} from 'react';


import { View, StyleSheet , Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import MyContext from '../../../contextes/appContext'

const StepTwo2 = () => {
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
    const {globalState , setGlobalState} = useContext(MyContext)


  const [companyName, setCompanyName] = React.useState('');
  const [registrationNumber, setRegistrationNumber] = React.useState('');

  const handleRegister = () => {
    // Vérifiez ici si l'entreprise est enregistrée dans la base de données ou via une API
    // Supposons que vous avez une fonction de validation de l'entreprise
    const isCompanyValid = validateCompany(companyName, registrationNumber);
    
    if (isCompanyValid) {
      // Continuer avec le processus d'inscription
      // ... Votre logique de création de compte ici ...
      // Après la création du compte, naviguez vers l'écran suivant
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
    } else {
      // Afficher une alerte ou un message indiquant que l'entreprise n'est pas enregistrée
      Alert.alert('Erreur', 'Entreprise non enregistrée. Veuillez vérifier les détails et réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nom de l'entreprise"
        value={companyName}
        onChangeText={text => setCompanyName(text)}
      />
      <TextInput
        label="Immatriculation à charge"
        value={registrationNumber}
        onChangeText={text => setRegistrationNumber(text)}
      />
      <TextInput
        label="Noms et prénoms"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        label="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        label="Créer mot de passe"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label="Confirmer mot de passe"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister}>
        Créer mon compte
      </Button>
    </View>
  );
};

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

// Exportez le composant
export default StepTwo2;

// Supposons que vous avez une fonction de validation de l'entreprise
const validateCompany = (companyName, registrationNumber) => {
  // Vous pouvez remplacer cette logique par une vérification de base de données ou une vérification via une API
  // Pour cet exemple, nous supposons que la validation est réussie si les champs ne sont pas vides
  if (companyName && registrationNumber) {
    return true;
  } else {
    return false;
  }
};
