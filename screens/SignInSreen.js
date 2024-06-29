import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { colors } from '../assets/styles/colors';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import Br from '../components/widgets/br/br';
import { ActivityIndicator, Switch } from 'react-native-paper';
import axios from 'axios';
import { singIn } from '../utils/api';
import { useDispatch } from 'react-redux';
import { isConected, login } from '../redurcer/userSlice';

export default function Login() {
  const navigation = useNavigation();
 
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordHidden , setPasswordHidden] = useState(true)
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch()
   const [isAgreed, setIsAgreed] = useState(false);
  const [btnopacity, setBtnopacity] = useState(0.5);
  function registerScreen() {
    navigation.navigate('inscription', { formData: form });
  }

  function forgotPasswordScreen() {
    navigation.navigate('MotDePasseOublie');
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    // Au moins 6 caractères
    if (password.length < 6) {
      return false;
    }

    // Au moins un chiffre
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      return false;
    }

    // Au moins un caractère spécial
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    if (!hasSpecialCharacter) {
      return false;
    }

    // Au moins une lettre majuscule
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      return false;
    }

    return true;
  }

  async function handleLogin() {
    const { email, password } = form;

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Adresse e-mail invalide');
    } else {
      setEmailError('');
    }

    // Validate password
    if (validatePassword(password)) {
      setPasswordError('Mot de passe invalide');
    } else {
      setPasswordError('');
    }

    if (validateEmail(email) && !validatePassword(password)) {
       setLoading(true);
       try {
        const response = await axios.post(singIn, form);
        const data = response.data;
        dispatch(login(data));
        console.log(data)
        dispatch(isConected());
        setLoading(false);
       } catch (error) {
          setLoading(false);
          console.log(error);
          alert('Connexion échouée');
       }
    }
  }

  return (
    <ImageBackground 
      source={require('../assets/images/bg.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.headerBack}>
              <Ionicons
                color={'white'}
                name="chevron-back-outline"
                size={30} />
            </TouchableOpacity>

            <Text style={styles.title}>
                Se connecter
            </Text>
          </View>

          <View style={styles.form}>
            <View style={[styles.input, emailError && styles.inputError]}>
              <Ionicons name="mail-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="Adresse email"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={form.email} />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
             <Br size={10}/>
            <View style={[styles.input, passwordError && styles.inputError]}>
              <Ionicons name="lock-closed-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="Mot de passe"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                secureTextEntry={passwordHidden}
                value={form.password} />
              <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
                <Ionicons name={passwordHidden ? "eye-off-outline" : "eye-outline"} size={25} color="#ffffff" style={styles.inputIcon} />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity onPress={forgotPasswordScreen}>
              <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
                <View style={styles.switchContainer}>
      <Switch
        value={isAgreed}
        onValueChange={() => {
          setIsAgreed(!isAgreed)
         setBtnopacity(isAgreed ? 0.5 : 1);

        }}
      />
      <Text style={styles.switchText}>
        J'accepte les règles de la <Text style={{color: 'white' , fontWeight: 'bold'}}
        onPress={()=>{
          navigation.navigate("charte de la communauté Ride 2 School")
        }}
        >
          charte de la communauté Ride 2 School
        </Text>
      </Text>
    </View>

            <Br size={10}/>
            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>
                     {loading ? (<ActivityIndicator size={30} color={colors.primary} />): 'Se connecter'}
                  </Text>
                </View>
              </TouchableOpacity>
                
            </View>
          </View>
        </View>
    </ImageBackground>
  );
}
const {width , height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3498db',
    opacity: 0.8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 24
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
    marginLeft: 8
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row'
  },
  headerBack: {
    padding: 8,
    paddingTop: 15,
    position: 'relative',
    marginLeft: -16,
    marginBottom: 6,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputControl: {
    flex: 1,
    height: 50,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0)', 
    marginLeft: 5
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: colors.primary,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  secondaryBtnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: 'white',
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'right',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
    switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchText: {
    marginLeft: 0,
    fontSize: 16,
    padding: 10, 
    width: width*0.8,
    color: 'white'
  },
});
