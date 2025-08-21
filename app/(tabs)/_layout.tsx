import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useRef } from 'react';
import { Animated, Pressable, useColorScheme } from 'react-native';

export default function HomeTabsLayout() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  // Animation pour le bouton central
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDark ? '#999' : '#777',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          letterSpacing: 0.2,
        },
        tabBarStyle: {
          height: 72,
          paddingBottom: 10,
          paddingTop: 6,
          backgroundColor: isDark ? '#1C1C1E' : '#fff',
          borderTopWidth: 0.5,
          borderTopColor: isDark ? '#333' : '#e6e6e6',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.07,
          shadowRadius: 6,
          elevation: 6,
          position: 'absolute',
        },
      }}
    >
      {/* Accueil */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* Bouton central flottant */}
      <Tabs.Screen
        name="plus"
        options={{
          title: '',
          tabBarIcon: () => (
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Animated.View
                style={{
                  transform: [{ scale: scaleAnim }],
                  width: 66,
                  height: 66,
                  borderRadius: 33,
                  backgroundColor: '#007AFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 32,
                  shadowColor: '#007AFF',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.25,
                  shadowRadius: 10,
                  elevation: 8,
                }}
              >
                <Ionicons name="add" size={32} color="#fff" />
              </Animated.View>
            </Pressable>
          ),
        }}
      />

      {/* Profil */}
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}