import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import Entypo from 'react-native-vector-icons/Entypo';

const OrchidCard = () => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260',
    sourceColor: '#2926b8',
  });
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View
        style={{
          width: '100%',
          height: 100,
          flexGrow: 1,
          backgroundColor: '#333',
        }}
      ></View>
      <View
        style={{
          display: 'flex',
          gap: 4,
        }}
      >
        <Text>Orange</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text
            style={{
              color: '#d92929',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            $2
          </Text>
          <Text style={{ color: theme[colorScheme].neutral, fontSize: 14 }}>
            /
          </Text>
          <Text style={{ color: theme[colorScheme].neutral, fontSize: 14 }}>
            1pc
          </Text>
        </View>
      </View>
      <Button
        style={[styles.button, { backgroundColor: theme[colorScheme].primary }]}
        mode='contained'
      >
        Add to basket
      </Button>
      <Pressable
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      >
        <Entypo name='heart-outlined' size={24} />
      </Pressable>
      <View
        style={{
          ...styles.discount__wrapper,
          backgroundColor: theme[colorScheme].error,
        }}
      >
        <Text style={styles.discount__text}>-30%</Text>
      </View>
    </View>
  );
};

export default OrchidCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 200,
    minHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    gap: 16,
    padding: 10,
  },
  shadowProp: {
    elevation: 3,
    shadowColor: '#1e1d1d',
  },
  discount__wrapper: {
    position: 'absolute',
    right: 10,
    top: 10,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 999,
    flexShrink: 0,
  },
  discount__text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    flexShrink: 1,
  },
  button: {
    borderRadius: 4,
    width: '100%',
  },
});
