import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrchidDetailScreen = ({ route, navigation }) => {
  const { orchid, favourites } = route.params;
  const [isLike, setIsLike] = useState(
    favourites.find((item) => item.id === orchid.id) ? true : false
  );
  const [fontsLoaded] = useFonts({
    'Archivo-Black': require('../../assets/fonts/ArchivoBlack-Regular.ttf'),
    Montserrat: require('../../assets/fonts/Montserrat/Montserrat-Black.ttf'),
  });

  const handleLikeButton = async () => {
    if (favourites.length > 0) {
      const isExist = favourites.find((item) => item.id === orchid.id);
      if (isExist) {
        handleDislike();
      } else {
        await AsyncStorage.setItem(
          'favourites',
          JSON.stringify([...favourites, orchid])
        );
        setIsLike(true);
      }
    } else {
      const emptyList = [];
      emptyList.push(orchid);
      await AsyncStorage.setItem('favourites', JSON.stringify(emptyList));
      setIsLike(true);
    }
  };

  const handleDislike = async () => {
    await AsyncStorage.setItem(
      'favourites',
      JSON.stringify(favourites.filter((item) => item.id !== orchid.id))
    );
    setIsLike(false);
  };

  const showAllertDislike = () => {
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
          onPress: () => handleDislike(),
          style: 'default',
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    onLayoutRootView();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.image__wrapper}>
          <Image
            source={{
              uri: orchid.path,
            }}
            style={styles.detail__image}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 5,
              left: 5,
            }}
          >
            <IconButton
              icon='keyboard-backspace'
              mode='contained'
              iconColor={MD3Colors.primary30}
              size={20}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              icon={isLike ? 'cards-heart' : 'cards-heart-outline'}
              mode='contained'
              iconColor={MD3Colors.error40}
              size={20}
              onPress={isLike ? showAllertDislike : handleLikeButton}
            />
          </View>
        </View>
        <View style={styles.content__wrapper}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.orchid__name}>{orchid.name}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginVertical: 6,
            }}
          >
            <Text
              style={{
                color: '#e73333',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {orchid.price}
            </Text>
            <Text style={{ color: MD3Colors.neutral50, fontSize: 16 }}>/</Text>
            <Text style={{ color: MD3Colors.neutral50, fontSize: 16 }}>
              1pc
            </Text>
          </View>
          <View>
            <Text style={{ color: 'rgb(126, 126, 126);', fontSize: 16 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unkno
            </Text>
          </View>
        </View>
        <Button style={styles.orchid__button} mode='contained'>
          Add to basket
        </Button>
      </View>
      <StatusBar
        barStyle='dark-content'
        animated={true}
        backgroundColor={Platform.OS === 'ios' ? undefined : '#7f7f7f77'}
      />
    </SafeAreaView>
  );
};

export default OrchidDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image__wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    padding: 2,
    position: 'relative',
  },
  detail__image: {
    width: '100%',
    height: 'auto',
    resizeMode: 'contain',
    aspectRatio: 3 / 2,
  },
  content__wrapper: {
    marginTop: 20,
  },
  orchid__name: {
    fontSize: 20,
    fontWeight: 500,
  },
  orchid__button: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 12,
    left: 20,
    right: 20,
  },
});
