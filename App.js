import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  HomeScreen,
  OrchidDetailScreen,
  OrchidListScreen,
} from './src/screens';
import BottomNavbar from './src/components/BottomNavbar';
import DrawerNav from './src/components/DrawerNav';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name='index' component={BottomNavbar} />
        <Stack.Screen name='detail' component={OrchidDetailScreen} />
      </Stack.Navigator> */}
      <DrawerNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
