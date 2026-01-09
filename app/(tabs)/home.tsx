import RetourScreen from '@/app/(screens)/retourScreen';
import SortieScreen from '@/app/(screens)/sortieScreen';
import { Images } from '@/assets/images';
import { Item } from '@/components/Item';
import { logout } from '@/redux/authSlice';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { useDispatch } from 'react-redux';
import AgentRetourScreen from '../(screens)/agentRetourScreen';
import AgentSortieScreen from '../(screens)/agentSortieScreen';
import VisiteurEntreeScreen from '../(screens)/visiteurEntreeScreen';
import VisiteurPietonEntree from '../(screens)/visiteurPietonEntree';
import VisiteurPietonSortie from '../(screens)/visiteurPietonSortie';
import VisiteurSortieScreen from '../(screens)/visiteurSortieScreen';

const Home = () => {
/*   const user = useSelector((state: any) => state.auth?.currentUser);
 */  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Oui, déconnecter',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              dispatch(logout());
              await AsyncStorage.multiRemove(['token', 'user']);
              router.replace('/login');
            } catch (error) {
              console.error('Erreur lors de la déconnexion :', error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'sortie':
        return <SortieScreen />;
      case 'retour':
        return <RetourScreen />;
      case 'visiteurEntree':
        return <VisiteurEntreeScreen />;
      case 'visiteurSortie':
        return <VisiteurSortieScreen />;
      case 'visiteurPietonEntree':
        return <VisiteurPietonEntree />;
      case 'visiteurPietonSortie':
        return <VisiteurPietonSortie />;
      case 'agentSortie':
        return <AgentSortieScreen />;
      case 'agentRetour':
        return <AgentRetourScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header avec gradient iOS moderne */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarCircle}>
              <Image source={Images.logoIcon} style={styles.logoIcon} />
              {/* Badge online */}
              <View style={styles.onlineBadge} />
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleApp}>DLOG</Text>
            <Text style={styles.subtitle}>Gestion Logistique</Text>
          </View>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator animating size={24} color="#FFFFFF" />
            ) : (
              <AntDesign name="ellipsis1" size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>

        {/* Carousel avec design iOS moderne */}
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            autoplayTimeout={4}
            showsPagination
            dotStyle={styles.swiperDot}
            activeDotStyle={styles.swiperActiveDot}
            paginationStyle={styles.swiperPagination}
            containerStyle={styles.swiperContainer}
          >
            <View style={styles.slide}>
              <Image source={Images.slider1} style={styles.backImage} />
              <View style={styles.slideOverlay}>
                <Text style={styles.slideTitle}>Suivi en Temps Réel</Text>
                <Text style={styles.slideSubtitle}>Optimisez vos opérations</Text>
              </View>
            </View>
            <View style={styles.slide}>
              <Image source={Images.backIcon} style={styles.backImage} />
              <View style={styles.slideOverlay}>
                <Text style={styles.slideTitle}>Suivi en Temps Réel</Text>
                <Text style={styles.slideSubtitle}>Données intelligentes</Text>
              </View>
            </View>
            <View style={styles.slide}>
              <Image source={Images.slider2} style={styles.backImage} />
              <View style={styles.slideOverlay}>
                <Text style={styles.slideTitle}>Suivi en Temps Réel</Text>
                <Text style={styles.slideSubtitle}>Optimisez vos opérations</Text>
              </View>
            </View>
          </Swiper>
        </View>

        {/* Section Options avec design iOS */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>⚡</Text>
            </View>
            <Text style={styles.titleFirst}>Nos options</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Accédez rapidement à toutes les fonctionnalités
          </Text>
        </View>

        {/* Grille d'items avec design iOS 2026 */}
        <View style={styles.itemsContainer}>
          <Item 
            icon={Images.sortieIcon} 
            label="Sortie" 
            color="#007AFF"
            variant="ios"
            onPress={() => openModal('sortie')}
          />
          <Item 
            icon={Images.retourIcon} 
            label="Retour" 
            color="#34C759"
            variant="ios"
            onPress={() => openModal('retour')}
          />
          <Item 
            icon={Images.retourVisiteurIcon} 
            label="Visiteur" 
            color="#FF9500"
            variant="ios"
            onPress={() => openModal('visiteurEntree')}
          />
          <Item 
            icon={Images.sortieVisiteurIcon} 
            label="Sortie Visiteur" 
            color="#FF3B30"
            variant="ios"
            onPress={() => openModal('visiteurSortie')}
          />
          <Item 
            icon={Images.retourVisiteurPietonIcon} 
            label="Visiteur Piéton" 
            color="#AF52DE"
            variant="ios"
            onPress={() => openModal('visiteurPietonEntree')}
          />
          <Item 
            icon={Images.sortieVisiteurPietonIcon} 
            label="Sortie Visiteur Piéton" 
            color="#FF2D55"
            variant="ios"
            onPress={() => openModal('visiteurPietonSortie')}
          />
          <Item 
            icon={Images.sortieAgent} 
            label="Sortie agent" 
            color="#5856D6"
            variant="ios"
            onPress={() => openModal('agentSortie')}
          />
          <Item 
            icon={Images.retourAgent} 
            label="Retour agent" 
            color="#5AC8FA"
            variant="ios"
            onPress={() => openModal('agentRetour')}
          />
        </View>

        {/* Pied de page iOS style */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>Version 4.2.0</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.footerText}>DLOG Systems</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.footerText}>© 2026</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal avec design iOS 2026 */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Header modal iOS style */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderGradient}>
              <View style={styles.modalHeaderContent}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>
                    {modalType ? modalType.charAt(0).toUpperCase() + modalType.slice(1) : ''}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={closeModal}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Contenu du modal */}
          <View style={styles.modalContent}>
            {renderModalContent()}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 34,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  logoIcon: {
    width: '95%',
    height: '95%',
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  titleApp: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'SF-Pro-Display-Bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'SF-Pro-Text-Regular',
    marginTop: 2,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    marginTop: -16,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    backgroundColor: '#FFFFFF',
  },
  swiperContainer: {
    borderRadius: 20,
  },
  slide: {
    flex: 1,
    position: 'relative',
  },
  backImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slideOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  slideTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  slideSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  swiperDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  swiperActiveDot: {
    backgroundColor: '#FFFFFF',
    width: 20,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  swiperPagination: {
    bottom: 12,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 15,
  },
  titleFirst: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1D1F',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  sectionDescription: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 20,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerText: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#C7C7CC',
    marginHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  modalHeader: {
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeaderGradient: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
});