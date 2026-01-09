import { logout } from '@/redux/authSlice';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';

interface User {
  nom: string;
  email: string;
  role:string
}

const Profil = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingProfile(true);
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoadingProfile(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loadingProfile) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loadingProfile]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(async () => {
      dispatch(logout());
      await AsyncStorage.multiRemove(['token', 'user']);
      router.replace('/login');
    }, 1000);
  };

  if (loadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Chargement du profil...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header avec avatar */}
      <Animated.View 
        style={[
          styles.headerSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBackground}>
            <FontAwesome5 
              name="user-circle" 
              size={100} 
              color="#007AFF" 
            />
          </View>
          {/* Badge online */}
          <View style={styles.onlineBadge} />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.nom || 'Utilisateur'}</Text>
          <Text style={styles.email}>{user?.email || 'utilisateur@email.com'}</Text>
        </View>

        <View style={styles.memberSince}>
          <Ionicons name="time-outline" size={16} color="#8E8E93" />
        </View>
      </Animated.View>

      {/* Section informations */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Informations</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={22} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email || 'Non spécifié'}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={22} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nom complet</Text>
              <Text style={styles.infoValue}>{user?.nom || 'Non spécifié'}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Ionicons name="briefcase-outline" size={22} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Rôle</Text>
              <Text style={styles.infoValue}>{user?.role || 'Non spécifié'}</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Menu options */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
      </Animated.View>

      {/* Bouton déconnexion */}
      <Animated.View 
        style={[
          styles.logoutSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <Pressable 
          style={({ pressed }) => [
            styles.logoutBtn,
            pressed && styles.logoutBtnPressed
          ]} 
          onPress={handleLogout} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <View style={styles.btnContent}>
              <AntDesign name="logout" size={20} color="#fff" />
              <Text style={styles.logoutText}>Se déconnecter</Text>
            </View>
          )}
        </Pressable>
        
        <Text style={styles.versionText}>DLOG v4.2.0 • © 2026</Text>
      </Animated.View>
    </ScrollView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(142, 142, 147, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  memberSinceText: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Medium',
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 16,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 17,
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(142, 142, 147, 0.2)',
    marginVertical: 4,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 17,
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  logoutSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutBtn: {
    backgroundColor: '#FF3B30',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 28,
  },
  logoutBtnPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
});