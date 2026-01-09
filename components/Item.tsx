import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type ItemProps = {
  icon: number;
  label: string;
  onPress?: () => void;
  color?: string; // Ajoutez cette ligne
  variant?: 'default' | 'ios'; // Ajoutez cette ligne
};

export const Item: React.FC<ItemProps> = ({ 
  icon, 
  label, 
  onPress, 
  color = '#007AFF', // Valeur par défaut
  variant = 'default' // Valeur par défaut
}) => {
  // Appliquez la couleur si le variant est 'ios'
  const iconStyle = variant === 'ios' 
    ? [styles.icon, { tintColor: color }]
    : styles.icon;

  const containerStyle = variant === 'ios' 
    ? styles.itemIOS
    : styles.item;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.8 },
      ]}
    >
      <Image source={icon} style={iconStyle} />
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '48%',
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  itemIOS: {
    width: '48%',
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});