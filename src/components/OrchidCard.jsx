import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrchidCard = ({
  orchid,
  favourites,
  setFavourites,
  navigation,
  isFavourite,
}) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260',
    sourceColor: '#2926b8',
  });

  const handleLike = async (selectedOrchid) => {
    const existing = favourites.find((item) => item.id === selectedOrchid.id);
    if (existing) {
      handleDislike(selectedOrchid);
    } else {
      setFavourites((prev) => [...prev, selectedOrchid]);
      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify([...favourites, selectedOrchid])
      );
    }
  };

  const handleDislike = async (selectedOrchid) => {
    setFavourites((prev) =>
      prev.filter((item) => item.id !== selectedOrchid.id)
    );
    await AsyncStorage.setItem(
      'favourites',
      JSON.stringify(favourites.filter((item) => item.id !== selectedOrchid.id))
    );
  };

  const handleShowDetail = (selctedOrchid) => {
    navigation.navigate('detail', {
      orchid: selctedOrchid,
      favourites: favourites,
    });
  };

  const showAllertDislike = (selectedOrchid) => {
    Alert.alert(
      'Remove from favourites',
      'Are you sure? This action cannot revert!',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => handleDislike(selectedOrchid),
          style: 'default',
        },
      ]
    );
  };

  // console.warn(orchid.path);

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Pressable
        style={{
          width: '100%',
          height: 100,
          flexGrow: 1,
          backgroundColor: '#fff',
        }}
        onPress={handleShowDetail.bind(null, orchid)}
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
      </Pressable>
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
      {/* <Pressable
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
        }}
        onPress={handleLike.bind(null, orchid)}
      >
        <Entypo name='heart-outlined' size={24} />
      </Pressable> */}
      <IconButton
        icon={
          favourites.find((item) => item.id === orchid.id)
            ? 'cards-heart'
            : 'cards-heart-outline'
        }
        mode='contained'
        iconColor={MD3Colors.error40}
        size={16}
        onPress={
          favourites.find((item) => item.id === orchid.id)
            ? showAllertDislike.bind(null, orchid)
            : handleLike.bind(null, orchid)
        }
        style={{
          position: 'absolute',
        }}
        animated={true}
      />
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
