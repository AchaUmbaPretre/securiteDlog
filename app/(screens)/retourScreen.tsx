import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import { getRetourVehicule, postRetourVehicule } from '@/services/charroiService';

type RetourData = {
  id_bande_sortie: number;
  id_vehicule: number;
  id_chauffeur: number;
  id_destination: number;
  id_motif: number;
  id_demandeur: number;
  id_client: number;
  personne_bord: string;
  id_societe: number;
  mouvement_exceptionnel: boolean;
  id_sortie_retour: number;
  autorise_par: string;
  nom_marque: string;
  immatriculation: string;
  nom: string;
  nom_type_vehicule: string;
};

const RetourScreen: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<RetourData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const userId = useSelector((state: RootState) => state.auth?.currentUser?.id_utilisateur);

  const fetchData = async () => {
    try {
      const response = await getRetourVehicule();
      setData(response?.data ?? []);
    } catch (error) {
      console.error('Erreur lors de la récupération des retours:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleValidate = async (d: RetourData) => {
    const payload = {
      id_bande_sortie: d.id_bande_sortie,
      id_vehicule: d.id_vehicule,
      id_chauffeur: d.id_chauffeur,
      id_destination: d.id_destination,
      id_motif: d.id_motif,
      id_demandeur: d.id_demandeur,
      id_client: d.id_client,
      personne_bord: d.personne_bord,
      id_societe: d.id_societe,
      mouvement_exceptionnel: d.mouvement_exceptionnel,
      id_agent: userId,
      autorise_par: d.autorise_par,
      id_sortieRetourParent: d.id_sortie_retour,
    };

    setIsSubmitting(true);

    try {
      await postRetourVehicule(payload);
      Alert.alert('Succès', `Le retour du véhicule ${d.immatriculation} est validé.`);
      fetchData();
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la validation du retour.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Pressable
            android_ripple={{ color: '#a3cfff' }}
            style={styles.rowBtn}
            onPress={() => router.push('/(screens)/retourSansBsScreen')}
          >
            <AntDesign name="pluscircle" size={32} color="#2978f0" />
          </Pressable>
        </View>

        <Text style={styles.title}>RETOUR DU VÉHICULE</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#2978f0" />
        ) : data.length === 0 ? (
          <Text style={{ color: '#888', marginTop: 20 }}>Aucun retour à valider.</Text>
        ) : (
          data.map((d) => (
            <View key={d.id_bande_sortie} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.textTitle}>Marque:</Text>
                <Text style={styles.desc}>{d.nom_marque}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textTitle}>Plaque:</Text>
                <Text style={styles.desc}>{d.immatriculation}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textTitle}>Chauffeur:</Text>
                <Text style={styles.desc}>{d.nom}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textTitle}>Heure actuelle:</Text>
                <Text style={styles.desc}>{moment().format('HH:mm')}</Text>
              </View>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Confirmation',
                    `Valider le retour du véhicule ${d.immatriculation} maintenant ?`,
                    [
                      { text: 'Annuler', style: 'cancel' },
                      { text: 'Valider', onPress: () => handleValidate(d) },
                    ]
                  )
                }
                style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
                disabled={isSubmitting}
              >
                <AntDesign name="checkcircleo" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.btnText}>Valider le retour</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RetourScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  rowBtn: {
    padding: 8,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '900',
    textAlign: 'center',
    color: '#003366',
    fontSize: 22,
    marginBottom: 30,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  textTitle: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    width: '40%',
  },
  desc: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
    width: '60%',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    marginTop: 12,
  },
  btnPressed: {
    opacity: 0.75,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
});
