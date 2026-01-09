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
      toValue: 0.92,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 100,
    }).start();
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDark ? '#8E8E93' : '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          fontFamily: 'SF-Pro-Text-Semibold',
          marginTop: 4,
          letterSpacing: 0.2,
        },
        tabBarStyle: {
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
          backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 0.5,
          borderTopColor: isDark ? 'rgba(60, 60, 67, 0.36)' : 'rgba(60, 60, 67, 0.29)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          elevation: 8,
          position: 'absolute',
          // Effet glass pour iOS
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      {/* Accueil */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View style={{
              transform: [{
                scale: focused ? 1.1 : 1
              }],
              marginBottom: focused ? 2 : 0,
            }}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={26}
                color={color}
              />
              {focused && (
                <Animated.View style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#007AFF',
                  alignSelf: 'center',
                  marginTop: 4,
                }} />
              )}
            </Animated.View>
          ),
        }}
      />

      {/* Bouton central flottant - Version iOS 2026 */}
      <Tabs.Screen
        name="plus"
        options={{
          title: '',
          tabBarIcon: () => (
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center',
                top: -28,
              }}
            >
              {/* Effet de halo */}
              <Animated.View
                style={{
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#007AFF',
                  opacity: 0.15,
                  transform: [{ scale: scaleAnim }],
                }}
              />
              
              {/* Bouton principal */}
              <Animated.View
                style={{
                  transform: [{ scale: scaleAnim }],
                  width: 68,
                  height: 68,
                  borderRadius: 34,
                  backgroundColor: '#007AFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#007AFF',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 12,
                  // Gradient subtle
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Ionicons name="add" size={30} color="#fff" />
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
            <Animated.View style={{
              transform: [{
                scale: focused ? 1.1 : 1
              }],
              marginBottom: focused ? 2 : 0,
            }}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={26}
                color={color}
              />
              {focused && (
                <Animated.View style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#007AFF',
                  alignSelf: 'center',
                  marginTop: 4,
                }} />
              )}
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}