import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import api from '../../services/api';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', {
        username: email,
        password,
      });

      const token = response.data?.accessToken;
      const { accessToken, ...user } = response.data;

      if (token) {
        dispatch(loginSuccess({ token: accessToken, user }));
        Alert.alert('Succès', 'Connexion réussie !');
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Erreur', 'Le token est manquant dans la réponse.');
      }
    } catch (error: any) {
      console.error('Erreur de connexion :', error);
      const message =
        error?.response?.status === 401
          ? 'Identifiants incorrects.'
          : 'Une erreur est survenue. Veuillez réessayer.';
      Alert.alert('Échec de la connexion', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.flex}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      
      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="lock-closed" size={40} color="#007AFF" />
            </View>
          </View>
          <Text style={styles.title}>Bienvenue 👋</Text>
          <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          {/* Champ Email */}
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelRow}>
              <Ionicons name="mail-outline" size={18} color="#8E8E93" />
              <Text style={styles.inputLabel}>Adresse email</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocused
              ]}
              placeholder="votre@email.com"
              placeholderTextColor="#C7C7CC"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              selectionColor="#007AFF"
            />
          </View>

          {/* Champ Mot de passe */}
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelRow}>
              <Ionicons name="lock-closed-outline" size={18} color="#8E8E93" />
              <Text style={styles.inputLabel}>Mot de passe</Text>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  focusedInput === 'password' && styles.inputFocused
                ]}
                placeholder="Votre mot de passe"
                placeholderTextColor="#C7C7CC"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                selectionColor="#007AFF"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                  size={22} 
                  color="#8E8E93" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bouton mot de passe oublié */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          {/* Bouton de connexion */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              (!email || !password) && styles.loginButtonDisabled
            ]}
            onPress={handleLogin}
            disabled={!email || !password || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.loginButtonText}>Se connecter</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>

          {/* Lien inscription */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Vous n'avez pas de compte ? </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.signupLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  flex: { 
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Display-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputLabel: {
    fontSize: 15,
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Text-Medium',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(142, 142, 147, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    fontSize: 17,
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  inputFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#007AFF',
    fontFamily: 'SF-Pro-Text-Medium',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
    marginRight: 8,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorText: {
    marginHorizontal: 16,
    fontSize: 15,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  otherOptions: {
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(142, 142, 147, 0.2)',
    marginBottom: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Text-Medium',
    marginLeft: 12,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 15,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  signupLink: {
    fontSize: 15,
    color: '#007AFF',
    fontFamily: 'SF-Pro-Text-Semibold',
  }
});