import { RootState } from '@/redux/store'; // Adapte ce chemin si nécessaire
import { getSortieVehicule, postSortieVehicule } from '@/services/charroiService';
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

// Typage des données brutes
interface SortieData {
  id_bande_sortie: number;
  id_vehicule: number;
  id_chauffeur: number;
  id_destination: number;
  id_motif_demande: number;
  id_demandeur: number;
  id_client: number;
  personne_bord: string;
  id_societe: number;
  immatriculation: string;
  nom_marque: string;
  nom: string;
  date_prevue: string;
  personne_signe: string;
  role: string;
}

// Typage après regroupement
interface GroupedSortieData extends Omit<SortieData, 'personne_signe' | 'role'> {
  signataires: {
    nom: string;
    role: string;
  }[];
}

const SortieScreen = () => {
  const router = useRouter();
  const [data, setData] = useState<SortieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const userId = useSelector((state: RootState) => state.auth?.currentUser?.id_utilisateur);

  const fetchData = async (): Promise<void> => {
    try {
      const [sortieData] = await Promise.all([getSortieVehicule()]);
      setData(sortieData.data);
    } catch (error) {
      console.log('Erreur fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupByBandeSortie = (rawData: SortieData[]): GroupedSortieData[] => {
    const grouped: { [key: number]: GroupedSortieData } = {};

    rawData.forEach(item => {
      const id = item.id_bande_sortie;

      if (!grouped[id]) {
        grouped[id] = {
          ...item,
          signataires: []
        };
      }

      grouped[id].signataires.push({
        nom: item.personne_signe,
        role: item.role
      });
    });

    return Object.values(grouped);
  };

  const onFinish = async (d: GroupedSortieData): Promise<void> => {
    const value = {
      id_bande_sortie: d.id_bande_sortie,
      id_vehicule: d.id_vehicule,
      id_chauffeur: d.id_chauffeur,
      id_destination: d.id_destination,
      id_motif: d.id_motif_demande,
      id_demandeur: d.id_demandeur,
      id_client: d.id_client,
      personne_bord: d.personne_bord,
      id_societe: d.id_societe,
      id_agent: userId,
    };

    setIsSubmitting(true);

    try {
      await postSortieVehicule(value);
      Alert.alert("Succès", `Le véhicule N°${d.immatriculation} a été validé.`);
      fetchData();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de valider la sortie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const groupedData = groupByBandeSortie(data);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Pressable
            android_ripple={{ color: '#a3cfff' }}
            style={styles.rowBtn}
            onPress={() => router.push('/(screens)/sortieSansBsScreen')}
          >
            <AntDesign name="pluscircle" size={32} color="#2978f0" />
          </Pressable>
        </View>

        <Text style={styles.title}>SORTIE DU VEHICULE</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2978f0" />
        ) : groupedData.length === 0 ? (
          <Text style={{ color: '#888', marginTop: 20 }}>Aucune demande de sortie disponible.</Text>
        ) : (
          groupedData.map((d) => (
            <View key={d.id_bande_sortie} style={styles.card}>
              <View style={styles.row}><Text style={styles.textTitle}>Marque:</Text><Text style={styles.desc}>{d.nom_marque}</Text></View>
              <View style={styles.row}><Text style={styles.textTitle}>Plaque:</Text><Text style={styles.desc}>{d.immatriculation}</Text></View>
              <View style={styles.row}><Text style={styles.textTitle}>Chauffeur:</Text><Text style={styles.desc}>{d.nom}</Text></View>
              <View style={styles.row}><Text style={styles.textTitle}>Heure prévue:</Text><Text style={styles.desc}>{moment(d.date_prevue).format('HH:mm')}</Text></View>
              <View style={styles.row}>
                <Text style={styles.textTitle}>Signataires:</Text>
                <View style={{ flex: 1 }}>
                  {d.signataires.map((s, i) => (
                    <Text key={i} style={styles.desc}>{s.nom} ({s.role})</Text>
                  ))}
                </View>
              </View>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Confirmation',
                    `Valider la sortie du véhicule maintenant ?`,
                    [
                      { text: 'Annuler', style: 'cancel' },
                      { text: 'Valider', onPress: () => onFinish(d) },
                    ]
                  )
                }
                style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
                disabled={isSubmitting}
              >
                <AntDesign name="checkcircleo" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.btnText}>Valider la sortie</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SortieScreen;

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
