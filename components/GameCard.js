import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const GameCard = ({image, title, description, item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('GameDetail', {item})}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: image}}
          style={{height: 120, resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#363342',
    flexDirection: 'row',
    marginBottom: 10,
  },
  description: {
    color: 'white',
  },
  imageContainer: {
    flex: 2,
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  title: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
});
