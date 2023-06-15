import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  HomeScreen,
  LoginScreen,
  OrchidDetailScreen,
  OrchidListScreen,
} from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='OrchidList' component={OrchidListScreen} />
        <Stack.Screen name='OrchidDetail' component={OrchidDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
