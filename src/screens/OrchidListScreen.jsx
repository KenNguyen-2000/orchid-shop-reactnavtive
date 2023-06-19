import {
  Alert,
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
import {
  ActivityIndicator,
  IconButton,
  MD3Colors,
  Searchbar,
} from 'react-native-paper';
import OrchidCard from '../components/OrchidCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Categories from '../components/Categories';

const OrchidListScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: '#3E8260',
    sourceColor: '#3c39df',
  });
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleDeleteAll = async () => {
    setFavourites([]);
    await AsyncStorage.setItem('favourites', JSON.stringify([]));
  };

  const showAlertDeleteAll = () => {
    Alert.alert(
      'Delete all favourite orchids',
      'Are you sure? This action cannot revert!',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => handleDeleteAll(),
          style: 'default',
        },
      ]
    );
  };

  useEffect(() => {
    const getFavourites = async () => {
      setLoading(true);
      const datas = JSON.parse(await AsyncStorage.getItem('favourites'));
      if (datas !== null) setFavourites(datas);
      setLoading(false);
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
      <View style={styles.wrapper}>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            size='large'
            color={MD3Colors.primary50}
            animating={true}
          />
        ) : (
          <>
            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Searchbar
                placeholder='Search'
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                elevation={1}
              />
              {/* <Categories list={favourites} setList={setFavourites} /> */}
              <View
                style={{
                  marginTop: 12,
                  flex: 1,
                  flexGrow: 1,
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
                  renderItem={({ item, index, separators }) => (
                    <OrchidCard
                      orchid={item}
                      favourites={favourites}
                      setFavourites={setFavourites}
                      onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={true}
                />
              </View>
              <View style={{ height: 20 }}></View>
            </View>
            <IconButton
              icon='trash-can'
              mode='contained'
              iconColor={MD3Colors.error60}
              size={32}
              style={styles.floating__button}
              onPress={showAlertDeleteAll}
            />
          </>
        )}
      </View>
      <StatusBar
        barStyle='dark-content'
        animated={true}
        backgroundColor={Platform.OS === 'ios' ? undefined : '#7f7f7f77'}
      />
    </SafeAreaView>
  );
};

export default OrchidListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
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
  floating__button: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
