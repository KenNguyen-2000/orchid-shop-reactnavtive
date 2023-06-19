import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavbar from './BottomNavbar';
import { OrchidListScreen } from '../screens';
import ContactScreen from '../screens/ContactScreen';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="contact" component={TabNavigator} /> */}
      <Drawer.Screen name='tab' component={BottomNavbar} />
      <Drawer.Screen name='contact' component={ContactScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});
