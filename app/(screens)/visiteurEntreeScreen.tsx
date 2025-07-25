import { getCatVehicule, getMotif, getVisiteurVehiculeSearch, postVisiteurVehicule } from '@/services/charroiService';
import { AntDesign } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
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
import { Button, IconButton, Switch } from 'react-native-paper';
import { useSelector } from 'react-redux';

type Motif = {
  id_motif_demande: string;
  nom_motif_demande: string;
};

type Categorie = {
  id_cat_vehicule: string;
  nom_cat: string;
};

type SuggestionItem = {
  value: string;
  label: string;
  item: {
    immatriculation: string;
    nom_chauffeur: string;
    type_vehicule: string;
    entreprise: string;
    id_motif: string;
    proprietaire: string;
    vehicule_connu: boolean;
  };
};

const VisiteurEntreeScreen = () => {
  const [immatriculation, setImmatriculation] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [chauffeur, setChauffeur] = useState('');
  const [typeVehicule, setTypeVehicule] = useState('');
  const [proprietaire, setProprietaire] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [idMotif, setIdMotif] = useState('');
  const [vehiculeConnu, setVehiculeConnu] = useState(false);
  const [motifs, setMotifs] = useState<Motif[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userId = useSelector((state: any) => state.auth?.currentUser?.id_utilisateur);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [motifData, catData] = await Promise.all([
          getMotif(),
          getCatVehicule(),
        ]);
        setMotifs(motifData.data);
        setCategories(catData.data);
      } catch (error) {
        console.error('Erreur chargement data:', error);
      }
    };
    fetchData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const fetchPlaques = async (value: string) => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const { data } = await getVisiteurVehiculeSearch(value);
      const formatted: SuggestionItem[] = data.map((item: any) => ({
        value: item.immatriculation,
        label: `${item.immatriculation} (${item.nom_chauffeur || 'Inconnu'})`,
        item,
      }));
      setSuggestions(formatted);
    } catch (error) {
      console.error('Erreur lors de la recherche de plaques :', error);
    }
  };

  const handleSelectSuggestion = (item: SuggestionItem['item']) => {
    setImmatriculation(item.immatriculation);
    setChauffeur(item.nom_chauffeur);
    setTypeVehicule(item.type_vehicule);
    setEntreprise(item.entreprise);
    setIdMotif(item.id_motif);
    setProprietaire(item.proprietaire);
    setVehiculeConnu(item.vehicule_connu);
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    if (!immatriculation || !chauffeur || !proprietaire || !idMotif) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires.');
      return;
    }

    const formData = new FormData();
    formData.append('immatriculation', immatriculation);
    formData.append('type_vehicule', typeVehicule);
    formData.append('nom_chauffeur', chauffeur);
    formData.append('proprietaire', proprietaire);
    formData.append('id_motif', idMotif);
    formData.append('entreprise', entreprise);
    formData.append('vehicule_connu', vehiculeConnu ? '1' : '0');
    formData.append('user_cr', userId);

    if (image) {
      formData.append('img', {
        uri: image.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);
    }
    
    try {
      setLoading(true);
      await postVisiteurVehicule(formData);
      Alert.alert('Succès', 'Visiteur enregistré avec succès.');
      // Reset
      router.push('/(tabs)/home')
      setImmatriculation('');
      setChauffeur('');
      setTypeVehicule('');
      setProprietaire('');
      setEntreprise('');
      setIdMotif('');
      setVehiculeConnu(false);
      setImage(null);
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Échec de l\'enregistrement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        {/* <Pressable style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#007AFF" />
        </Pressable> */}
          <Text style={styles.title}>Formulaire Visiteur</Text>

          <TextInput
            style={styles.input}
            placeholder="Immatriculation*"
            value={immatriculation}
            onChangeText={(text) => {
              setImmatriculation(text);
              fetchPlaques(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Nom du chauffeur*"
            value={chauffeur}
            onChangeText={setChauffeur}
          />

          <Picker selectedValue={typeVehicule} onValueChange={setTypeVehicule}>
            <Picker.Item label="Type véhicule" value="" />
            {categories.map((cat) => (
              <Picker.Item
                key={cat.id_cat_vehicule}
                label={cat.nom_cat}
                value={cat.id_cat_vehicule}
              />
            ))}
          </Picker>

          <Picker selectedValue={proprietaire} onValueChange={setProprietaire}>
            <Picker.Item label="Propriétaire*" value="" />
            <Picker.Item label="GTM" value="GTM" />
            <Picker.Item label="Visiteur GTM" value="Visiteur GTM" />
            <Picker.Item label="Visiteur Externe" value="Visiteur Externe" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Entreprise"
            value={entreprise}
            onChangeText={setEntreprise}
          />

          <Picker selectedValue={idMotif} onValueChange={setIdMotif}>
            <Picker.Item label="Motif*" value="" />
            {motifs.map((m) => (
              <Picker.Item key={m.id_motif_demande} label={m.nom_motif_demande} value={m.id_motif_demande} />
            ))}
          </Picker>

          <IconButton
          icon={image ? 'image-edit' : 'image-plus'}
          size={28}
          onPress={pickImage}
          mode="contained"
        />
        <Text>{image ? 'Modifier image' : 'Ajouter image'}</Text>
        {image && <Image source={{ uri: image.uri }} style={styles.image} /> }

          <View style={styles.switchRow}>
            <Text>Véhicule connu ?</Text>
            <Switch value={vehiculeConnu} onValueChange={setVehiculeConnu} />
          </View>

          <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={loading}>
            Enregistrer
          </Button>
        </ScrollView>
                {suggestions.length > 0 && (
            <FlatList
              style={styles.suggestionsContainer}
              data={suggestions}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectSuggestion(item.item)}
                  style={styles.suggestionItem}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          )}
    </KeyboardAvoidingView>
  );
};

export default VisiteurEntreeScreen;

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 16,
    marginTop: 10,
    paddingLeft: 4,
    alignSelf: "flex-start",
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
    safeArea: {
      flex: 1,
      backgroundColor: "#f7f9fc",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 95, // Ajuste selon ton champ
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    zIndex: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginBottom: 2,
    borderRadius: 5,
  },
});
