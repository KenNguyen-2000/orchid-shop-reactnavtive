import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  useColorScheme,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import SearchInput from '../components/SearchInput';
import { Searchbar } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import flower_bg from '../../assets/flower_bg.png';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import OrchidCard from '../components/OrchidCard';
import datas from '../../src/shared/data.json';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    'Archivo-Black': require('../../assets/fonts/ArchivoBlack-Regular.ttf'),
    Montserrat: require('../../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  });

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260',
    sourceColor: '#3c39df',
  });
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState('');
  const [favourites, setFavourites] = useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    const getFavourites = async () => {
      const datas = JSON.parse(await AsyncStorage.getItem('favourites'));
      if (datas !== null) setFavourites(datas);
    };
    if (isFocused) getFavourites();
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
      <View
        style={{
          paddingBottom: 16,
        }}
      >
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
            marginVertical: 12,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 10,
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <FlatList
            data={datas.orchids}
            numColumns={2}
            horizontal={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => (
              <OrchidCard
                orchid={item}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
          />
          {/* {datas.orchids
            ?.filter((orchid) =>
              orchid.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((orchid, index) => (
              <OrchidCard key={orchid.id} orchid={orchid} />
            ))} */}
        </View>
        <View style={{ height: 20 }}></View>
      </View>
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
