import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Button mode='contained' onPress={() => navigation.navigate('Home')}>
        LoginScreen
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
