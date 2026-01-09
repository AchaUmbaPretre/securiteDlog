import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
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

const { width } = Dimensions.get('window');

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !fullName) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    // Simuler l'inscription
    setTimeout(() => {
      setLoading(false);
      alert('Inscription réussie');
      router.replace('/login');
    }, 1500);
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
              <Ionicons name="person-add" size={40} color="#007AFF" />
            </View>
          </View>
          <Text style={styles.title}>Créez votre compte 👤</Text>
          <Text style={styles.subtitle}>Rejoignez DLOG en quelques étapes</Text>
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          {/* Champ Nom complet */}
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelRow}>
              <Ionicons name="person-outline" size={18} color="#8E8E93" />
              <Text style={styles.inputLabel}>Nom complet</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'fullName' && styles.inputFocused
              ]}
              placeholder="John Doe"
              placeholderTextColor="#C7C7CC"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              onFocus={() => setFocusedInput('fullName')}
              onBlur={() => setFocusedInput(null)}
              selectionColor="#007AFF"
            />
          </View>

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
            <TextInput
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused
              ]}
              placeholder="Minimum 8 caractères"
              placeholderTextColor="#C7C7CC"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              selectionColor="#007AFF"
            />
            <View style={styles.passwordRules}>
              <Text style={styles.passwordRuleText}>• 8 caractères minimum</Text>
              <Text style={styles.passwordRuleText}>• 1 majuscule</Text>
              <Text style={styles.passwordRuleText}>• 1 chiffre</Text>
            </View>
          </View>

          {/* Champ Confirmation mot de passe */}
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelRow}>
              <Ionicons name="lock-closed-outline" size={18} color="#8E8E93" />
              <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'confirmPassword' && styles.inputFocused
              ]}
              placeholder="Retapez votre mot de passe"
              placeholderTextColor="#C7C7CC"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
              selectionColor="#007AFF"
            />
            {confirmPassword && password !== confirmPassword && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color="#FF3B30" />
                <Text style={styles.errorText}>Les mots de passe ne correspondent pas</Text>
              </View>
            )}
          </View>

          {/* Checkbox Conditions */}
          <TouchableOpacity style={styles.checkboxContainer} activeOpacity={0.7}>
            <View style={styles.checkbox}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.checkboxText}>
              J'accepte les conditions d'utilisation et la politique de confidentialité
            </Text>
          </TouchableOpacity>

          {/* Bouton d'inscription */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              (!email || !password || !confirmPassword || !fullName) && styles.registerButtonDisabled
            ]}
            onPress={handleRegister}
            disabled={!email || !password || !confirmPassword || !fullName || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <View style={styles.loadingContent}>
                <Text style={styles.registerButtonText}>Création du compte...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.registerButtonText}>Créer mon compte</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>

          {/* Séparateur */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Ou</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Autres options */}
          <View style={styles.otherOptions}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text style={styles.socialButtonText}>S'inscrire avec Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-apple" size={20} color="#000000" />
              <Text style={styles.socialButtonText}>S'inscrire avec Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Lien connexion */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
            <TouchableOpacity 
              onPress={() => router.push('/login')}
              activeOpacity={0.7}
            >
              <Text style={styles.loginLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
  passwordRules: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginLeft: 4,
  },
  passwordRuleText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
    marginRight: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#FF3B30',
    fontFamily: 'SF-Pro-Text-Regular',
    marginLeft: 6,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 20,
  },
  registerButton: {
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
  registerButtonDisabled: {
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
    shadowOpacity: 0.1,
  },
  loadingContent: {
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
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
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(142, 142, 147, 0.2)',
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  loginLink: {
    fontSize: 15,
    color: '#007AFF',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  footerDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#C7C7CC',
    marginHorizontal: 8,
  },
});