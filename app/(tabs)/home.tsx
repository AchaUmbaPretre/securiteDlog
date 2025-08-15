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
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AgentRetourScreen from '../(screens)/agentRetourScreen';
import AgentSortieScreen from '../(screens)/agentSortieScreen';
import VisiteurEntreeScreen from '../(screens)/visiteurEntreeScreen';
import VisiteurPietonEntree from '../(screens)/visiteurPietonEntree';
import VisiteurPietonSortie from '../(screens)/visiteurPietonSortie';
import VisiteurSortieScreen from '../(screens)/visiteurSortieScreen';

const Home = () => {
  const user = useSelector((state: any) => state.auth?.currentUser);
  const [showModal, setShowModal] = useState(false);
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
      <ScrollView style={styles.container}>
        {/* Header utilisateur */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarCircle}>
              <Image source={Images.logoIcon} style={styles.logoIcon} />
            </View>
          </View>

          <View>
            <Text style={styles.titleApp}>DLOG</Text>
          </View>

          <TouchableOpacity onPress={handleLogout}>
            {loading ? (
              <ActivityIndicator animating size={24} />
            ) : (
              <AntDesign name="ellipsis1" size={24} color="#011481"/>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Salut {user?.nom} 👋</Text>

        {/* Image plein écran */}
        <View style={{
          backgroundColor:'#fff',
          borderRadius: 10,
          marginBottom: 15,
        }}>
          <Image source={Images.backIcon} style={styles.backImage} />
        </View>
        <Text style={styles.titleFirst}>⚙️ Nos options</Text>

        {/* Items */}
        <View style={styles.itemsContainer}>
          <Item icon={Images.sortieIcon} label="Sortie" onPress={() => openModal('sortie')}/>
          <Item icon={Images.retourIcon} label="Retour" onPress={() => openModal('retour')}/>
          <Item icon={Images.retourVisiteurIcon} label="Visiteur" onPress={() => openModal('visiteurEntree')}/>
          <Item icon={Images.sortieVisiteurIcon} label="Sortie Visiteur" onPress={() => openModal('visiteurSortie')}/>
          <Item icon={Images.retourVisiteurPietonIcon} label="Visiteur Piéton" onPress={() => openModal('visiteurPietonEntree')}/>
          <Item icon={Images.sortieVisiteurPietonIcon} label="Sortie Visiteur Piéton" onPress={() => openModal('visiteurPietonSortie')}/>
          <Item icon={Images.sortieAgent} label="Sortie agent" onPress={() => openModal('agentSortie')}/>
          <Item icon={Images.retourAgent} label="Retour agent" onPress={() => openModal('agentRetour')}/>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Bouton de fermeture */}
          <View style={{ alignItems: 'flex-end', padding: 15 }}>
            <TouchableOpacity onPress={closeModal}>
              <Feather name="x" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Contenu du modal */}
          <View style={{ flex: 1 }}>
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
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EDF7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  logoIcon: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  titleApp: {
    fontSize: 22,
    fontWeight: '700',
    color: '#011481',
    fontFamily: 'Inter-Bold',
  },
    title: {
    marginVertical: 15,
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center'
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 13,
    color: '#777',
  },
  logoutIcon: {
    padding: 10,
  },
  titleFirst: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  backImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom:55
  },
});