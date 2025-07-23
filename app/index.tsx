import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // ✅ Token présent → on redirige vers la Home
          router.replace('/(tabs)/home');
        } else {
          // ❌ Pas de token → on redirige vers Login
          router.replace('/login');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View >
      <Text >Accueil (non connecté)</Text>
      <Button title="Aller à Login" onPress={() => router.push('/login')} />
    </View>
  );
}
