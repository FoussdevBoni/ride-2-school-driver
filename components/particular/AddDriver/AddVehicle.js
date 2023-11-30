import React, { useState } from 'react';
import { View, Button , StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper'
import {colors} from '../../../assets/styles/colors'

const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [insurerName, setInsurerName] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [insuranceValidity, setInsuranceValidity] = useState('');
  const [insurancePDF, setInsurancePDF] = useState('');
  const [lastTechnicalVisitDate, setLastTechnicalVisitDate] = useState('');
  const [technicalVisitPDF, setTechnicalVisitPDF] = useState('');

  const handleSave = () => {
    // Ajoutez la logique pour soumettre le formulaire ici
  };

  return (
    <View>
      <TextInput
              style={styles.input}

        label="Nom officiel du véhicule"
        value={vehicleName}
        onChangeText={setVehicleName}
      />
      <TextInput
              style={styles.input}

        label="Modèle"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
              style={styles.input}

        label="Numéro de carte grise"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />
      <TextInput
              style={styles.input}

        label="Nom de l'assureur"
        value={insurerName}
        onChangeText={setInsurerName}
      />
      <TextInput
              style={styles.input}

        label="Numéro d'assurance"
        value={insuranceNumber}
        onChangeText={setInsuranceNumber}
      />
      <TextInput
              style={styles.input}

        label="Validité de l'assurance"
        value={insuranceValidity}
        onChangeText={setInsuranceValidity}
      />
      <TextInput
              style={styles.input}

        label="Pdf de l'assurance"
        value={insurancePDF}
        onChangeText={setInsurancePDF}
      />
      <TextInput
              style={styles.input}

        label="Date de la dernière visite technique"
        value={lastTechnicalVisitDate}
        onChangeText={setLastTechnicalVisitDate}
      />
      <TextInput
        placeholder="Pdf de la visite technique"
        value={technicalVisitPDF}
        onChangeText={setTechnicalVisitPDF}
      />
      <Button title="Ajouter Photo arrière du véhicule" onPress={() => {}} style={styles.button}/>
      <Button title="Ajouter Photo intérieur du véhicule" onPress={() => {}} style={styles.button}/>
      <Button title="Ajouter Photo côté du véhicule" onPress={() => {}} style={styles.button}/>
      <Button title="Ajouter Photo avant du véhicule" onPress={() => {}} style={styles.button}/>
      <Button title="Soumettre" onPress={handleSave} style={styles.button}/>
    </View>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
    input: {
    marginVertical: 5,
     width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#333',
    backgroundColor: 'white',
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary
  },
});
