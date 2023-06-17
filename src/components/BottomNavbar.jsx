import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen, OrchidDetailScreen, OrchidListScreen } from '../screens';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const OrchidStack = createNativeStackNavigator();
const FavouriteStack = createNativeStackNavigator();

function OrchidStackScreen() {
  return (
    <OrchidStack.Navigator>
      <OrchidStack.Screen name='home' component={HomeScreen} />
      <OrchidStack.Screen name='detail' component={OrchidDetailScreen} />
    </OrchidStack.Navigator>
  );
}

function FavouriteStackScreen() {
  return (
    <FavouriteStack.Navigator>
      <FavouriteStack.Screen name='favourite' component={OrchidListScreen} />
      <FavouriteStack.Screen name='detail' component={OrchidDetailScreen} />
    </FavouriteStack.Navigator>
  );
}

const BottomNavbar = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260',
    sourceColor: '#1a1970',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme[colorScheme].primary,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name='OrchidStack'
        component={OrchidStackScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='home' size={32} style={styles.icon} />
          ),
        }}
      />

      <Tab.Screen
        name='FavourtieStack'
        component={FavouriteStackScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='class' size={32} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({
  homeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: 65,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#fff',
    bottom: 34,
  },
  icon: {
    color: '#fff',
  },
});
