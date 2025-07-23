import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const RetourScreen = () => {
  const router = useRouter();
  
  const renderCard = () => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.textTitle}>Véhicule :</Text>
        <Text style={styles.desc}>6BCD1</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textTitle}>Chauffeur :</Text>
        <Text style={styles.desc}>Jean Dupont</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textTitle}>Heure prévue :</Text>
        <Text style={styles.desc}>14:35</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textTitle}>Signataires :</Text>
        <Text style={styles.desc}>Tite (Dr.Dlog)</Text>
      </View>

      <Pressable style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}>
        <AntDesign name="checkcircleo" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.btnText}>Valider le retour</Text>
      </Pressable>
    </View>
  );

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

        <Text style={styles.title}>RETOUR DU VEHICULE</Text>

        {renderCard()}
        {renderCard()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RetourScreen;

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
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 30,

    // Ombrage iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Ombrage Android
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  textTitle: {
    fontSize: 16,
    color: '#555',
  },
  desc: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#4CAF50', // vert pro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
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
  }
});
