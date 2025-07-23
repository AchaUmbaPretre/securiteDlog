import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import api from '../../services/api';


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', {
        username : email,
        password,
      });

      const token = response.data?.accessToken;
      if (token) {
        dispatch(loginSuccess(token));
        Alert.alert('Succès', 'Connexion réussie !');
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Erreur', 'Token manquant dans la réponse.');
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        Alert.alert('Échec', 'Identifiants incorrects.');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue. Réessayez.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Se connecter" onPress={handleLogin} />
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
