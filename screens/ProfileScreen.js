import React, { useEffect , useState} from 'react';
import { View, ScrollView, Text , TouchableOpacity , Modal, TextInput, Button as RNButton} from 'react-native';
import { Avatar, Button, List, Divider, IconButton, Appbar } from 'react-native-paper';
import profileStyle from '../assets/styles/css/profile';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const Profile = ({  user }) => {
   const navigation = useNavigation()
   const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(''); // État pour stocker le nouveau numéro de téléphone

  const handlePress = (item) => {
       
      setIsModalVisible(true); // Afficher la modale lorsque l'utilisateur appuie sur "Modifier"
   
  };

  const handleSubmit = () => {
    // Soumettre le formulaire de modification
    console.log('Nouveau numéro de téléphone :', newPhoneNumber);
    setIsModalVisible(false); // Cacher la modale après la soumission du formulaire
  };


   useEffect(()=>{

   },[])
  return (
    <ScrollView style={profileStyle.container}>
      <View style={profileStyle.avatarContainer}>
        {/* Icône pour changer le thème */}
        <Avatar.Image
          source={require('../assets/images/t3.jpg')}
          size={100}
        />
      </View>

      {/* Nom et prénom */}
      <View style={profileStyle.nameContainer}>
        <Text style={profileStyle.nameText}>Hubert BAMBA</Text>
      </View>

      {/* Numéro de téléphone et bouton "Modifier" */}
      <View style={profileStyle.contactContainer}>
        <Text style={profileStyle.phoneNumber}> +123 456 789</Text>
        <Button mode="contained" style={profileStyle.editButton}>
         <Text style={{color: 'white'}} onPress={()=>handlePress('Modifier')}>Modifier</Text>
        </Button>
      </View>

      {/* Liste des options */}
       <List.Section>
        <TouchableOpacity onPress={() => handlePress('Sécurité')}>
          <List.Item
            title="Sécurité"
            left={() => <List.Icon icon="lock" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Langue')}>
          <List.Item
            title="Langue"
            left={() => <List.Icon icon="earth" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Mes contrats')}>
          <List.Item
            title="Mes contrats"
            left={() => <List.Icon icon="bus" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Mes factures')}>
          <List.Item
            title="Mes factures"
            left={() => <List.Icon icon="file-document" />}
          />
        </TouchableOpacity>
        <Divider />
        {/* Ajoutez d'autres éléments de la liste ci-dessous */}
        <TouchableOpacity onPress={() => handlePress('CGV/CGU')}>
          <List.Item
            title="CGV/CGU"
            left={() => <List.Icon icon="bookmark" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Confidentialité')}>
          <List.Item
            title="Confidentialité"
            left={() => <List.Icon icon="lock" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Archivage')}>
          <List.Item
            title="Archivage"
            left={() => <List.Icon icon="archive" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Se déconnecter')}>
          <List.Item
            title="Se déconnecter"
            left={() => <List.Icon icon="logout" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Supprimer mon compte')}>
          <List.Item
            title="Supprimer mon compte"
            left={() => <List.Icon icon="delete" />}
          />
        </TouchableOpacity>
      </List.Section>





       <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false); // Cacher la modale lorsqu'on appuie sur le bouton de fermeture par exemple
        }}
      >
        <View style={{}}>
          <Text>Modifier le numéro de téléphone :</Text>
          <TextInput
            style={{}}
            placeholder="Nouveau numéro de téléphone"
            onChangeText={(text) => setNewPhoneNumber(text)}
            value={newPhoneNumber}
          />
          <RNButton title="Enregistrer" onPress={handleSubmit} />
          {/* Autres champs de formulaire si nécessaire */}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;
