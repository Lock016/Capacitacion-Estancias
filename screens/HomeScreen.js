import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GameCard from '../components/GameCard';

const HomeScreen = () => {
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getGames = async () => {
    try {
      const response = await fetch('https://www.freetogame.com/api/games');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Enter your search..."
        value={search}
        onChangeText={setSearch}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        inputContainerStyle={{backgroundColor: '#363342', borderRadius: 30}}
        inputStyle={{backgroundColor: '#363342'}}
      />
      <View style={{marginTop: 20, padding: 10}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 25,
              }}>
              Available Games
            </Text>
            <FlatList
              data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <GameCard
                  title={item.title}
                  image={item.thumbnail}
                  description={item.short_description}
                  item={item}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1D2C',
    padding: 10,
  },
});
