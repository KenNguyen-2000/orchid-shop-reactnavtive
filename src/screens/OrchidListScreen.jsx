import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { Searchbar } from 'react-native-paper';
import OrchidCard from '../components/OrchidCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const OrchidListScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme[colorScheme].background,
      }}
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
            data={favourites}
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
        </View>
        <View style={{ height: 20 }}></View>
      </View>
      <StatusBar animated={true} backgroundColor={'#7f7f7f77'} />
    </SafeAreaView>
  );
};

export default OrchidListScreen;

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
