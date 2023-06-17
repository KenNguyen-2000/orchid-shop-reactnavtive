import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrchidCard = ({ orchid, favourites, setFavourites }) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260',
    sourceColor: '#2926b8',
  });

  const handleLike = async (selectedOrchid) => {
    const existing = favourites.find((item) => item.id === selectedOrchid.id);
    if (existing) {
      setFavourites((prev) =>
        prev.filter((item) => item.id !== selectedOrchid.id)
      );
      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify(
          favourites.filter((item) => item.id !== selectedOrchid.id)
        )
      );
    } else {
      setFavourites((prev) => [...prev, selectedOrchid]);
      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify([...favourites, selectedOrchid])
      );
    }
  };

  // console.warn(orchid.path);

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View
        style={{
          width: '100%',
          height: 100,
          flexGrow: 1,
          backgroundColor: '#333',
        }}
      >
        <Image
          style={{
            height: '100%',
            width: 'auto',
            resizeMode: 'cover',
          }}
          source={{
            uri: orchid.path,
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          gap: 4,
        }}
      >
        <Text>{orchid.name}</Text>

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
            {orchid.price}
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
        onPress={handleLike.bind(null, orchid)}
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
    width: '49%',
    minHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    gap: 16,
    padding: 10,
    borderWidth: 1,
  },
  shadowProp: {
    elevation: 3,
    shadowColor: '#1e1d1d',
    shadowOffset: {
      width: -4,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  discount__wrapper: {
    position: 'absolute',
    right: 10,
    top: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    flexShrink: 0,
  },
  discount__text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 1,
  },
  button: {
    borderRadius: 4,
    width: '100%',
  },
});
