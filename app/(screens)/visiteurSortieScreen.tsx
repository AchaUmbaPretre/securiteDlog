import { getSortieVisiteur, putSortieVisiteur } from '@/services/charroiService';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
import VisiteurEntreeScreen from './visiteurEntreeScreen';

// ✅ Typage des données d'un visiteur
interface Visiteur {
  id_visiteur: number;
  id_registre_visiteur: number;
  nom_chauffeur: string;
  immatriculation: string;
  date_entree: string;
}

const VisiteurSortieScreen: React.FC = () => {
  const [data, setData] = useState<Visiteur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await getSortieVisiteur();
      setData(response.data);
    } catch (error) {
      console.error('Erreur de chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortie = async (id: number): Promise<void> => {
    setIsSubmitting(true);
    try {
      await putSortieVisiteur(id);
      Alert.alert('Succès', 'Le visiteur est sorti.');
      fetchData();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de valider la sortie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>🔁 Sortie du visiteur</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <AntDesign name="pluscircle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1a73e8" style={styles.loader} />
      ) : data.length === 0 ? (
        <Text style={styles.emptyText}>Aucun visiteur trouvé.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id_registre_visiteur.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph><Text style={styles.label}>Chauffeur:</Text> {item.nom_chauffeur}</Paragraph>
                <Paragraph><Text style={styles.label}>Plaque:</Text> {item.immatriculation}</Paragraph>
                <Paragraph><Text style={styles.label}>Heure d'entrée:</Text> {moment(item.date_entree).format('HH:mm')}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => handleSortie(item.id_registre_visiteur)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Valider le retour
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <VisiteurEntreeScreen
        />
      </Modal>
    </View>
  );
};

export default VisiteurSortieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 30,
  },
  emptyText: {
    marginTop: 50,
    textAlign: 'center',
    color: '#999',
  },
  card: {
    marginBottom: 12,
    padding: 10
  },
  label: {
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#1a73e8',
    padding: 10,
    borderRadius: 50,
  },
});

