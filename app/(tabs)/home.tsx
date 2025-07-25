import RetourScreen from '@/app/(screens)/retourScreen';
import SortieScreen from '@/app/(screens)/sortieScreen';
import { Images } from '@/assets/images';
import { Item } from '@/components/Item';
import { logout } from '@/redux/authSlice';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
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

  const handleLogout = async () => {

  dispatch(logout());
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  router.replace('/login');
};


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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header utilisateur */}
        <View style={styles.wrapper}>
          <View style={styles.profileContainer}>
            <Image source={Images.userIcon} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{user?.nom}</Text>
              <Text style={styles.role}>{user?.role}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
            <Feather name="log-out" size={25} color="#d9534f" />
          </TouchableOpacity>
        </View>

        {/* Titre */}
        <Text style={styles.titleFirst}>👋 Bienvenue sur DLOG</Text>

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

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 8,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom:55
  },
});
