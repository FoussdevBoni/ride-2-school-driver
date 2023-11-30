// RegisterDriverTypeScreen.js
import  React from 'react';
import { View, StyleSheet , Text } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../../assets/styles/colors';

const StepOne = () => {
  const [isPrivateDriver, setIsPrivateDriver] = React.useState(true);
const navigation = useNavigation()

  const handleNext = () => {

      navigation.navigate("Créer un compte/Etape2")
       if (isPrivateDriver) {
      navigation.navigate('Créer un compte/catégorie A');
    } else {
      navigation.navigate('Créer un compte/catégorie B');
    }
    
  };

  return (
    <View style={styles.container}>
      <RadioButton.Group onValueChange={newValue => setIsPrivateDriver(newValue)} value={isPrivateDriver}>
        <View style={styles.input}>
          <RadioButton.Item label="Chauffeur d'entreprise" value={false} />
        </View>
        <View style={styles.input}>
          <RadioButton.Item label="Chauffeur privé" value={true} />
        </View>
      </RadioButton.Group>
      <Button mode="contained" onPress={handleNext} style={styles.button}>
        <Text style={{color: 'white'}}>Suivant</Text>
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

export default StepOne;
