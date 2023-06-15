import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import SearchInput from '../components/SearchInput';
import { Searchbar } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import flower_bg from '../../assets/flower_bg.png';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import OrchidCard from '../components/OrchidCard';

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    'Archivo-Black': require('../../assets/fonts/ArchivoBlack-Regular.ttf'),
    Montserrat: require('../../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  });

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260',
    sourceColor: '#3c39df',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme[colorScheme].background,
      }}
      onLayout={onLayoutRootView}
    >
      <ScrollView>
        <Searchbar
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          elevation={1}
        />
        <ImageBackground
          source={flower_bg}
          resizeMode='cover'
          imageStyle={{
            opacity: 0.7,
          }}
          style={{
            ...styles.banner,
            backgroundColor: theme[colorScheme].primary,
          }}
        >
          <View style={styles.banner__heading__wrapper}>
            <Text style={styles.banner__heading__text}>50% Off</Text>
          </View>
          <View
            style={{
              display: 'flex',
              paddingLeft: 30,
            }}
          >
            <Text style={styles.banner__heading__script}>
              All orchid products
            </Text>
            <Text style={styles.banner__heading__script}>
              after 9PM everyday
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            marginTop: 20,
            paddingVertical: 20,
          }}
        >
          <OrchidCard />
        </View>
      </ScrollView>
      <StatusBar animated={true} backgroundColor={'#7f7f7f77'} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    marginVertical: 10,
    borderRadius: 12,
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  banner__heading__wrapper: {
    backgroundColor: 'rgba(8, 9, 96, 0.4)',
    height: 60,
    width: '55%',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  banner__heading__text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '500',
    fontFamily: 'Archivo-Black',
  },
  banner__heading__script: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat',
  },
});
