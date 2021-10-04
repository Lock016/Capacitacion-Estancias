import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const GameDetail = ({route, navigation}) => {
  const {item} = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const callAPI = async () => {
    try {
      const response = await fetch(
        'https://www.freetogame.com/api/game?id=' + item.id,
      );
      const json = await response.json();
      setData(json);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  const _carouselItem = ({item, index}) => {
    return (
      <View>
        <Image
          source={{uri: item.image}}
          style={{width: 150, height: 110, resizeMode: 'cover'}}
        />
      </View>
    );
  };

  const RenderGame = () => {
    return (
      <View>
        <View style={styles.imageContainer}>
          <View>
            <Image
              source={{uri: data.thumbnail}}
              style={{width: 150, height: 80}}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.whiteText, styles.gameTitle]}>
              {data.title}
            </Text>
            <Text style={[styles.whiteText, styles.gameDeveloper]}>
              {data.developer}
            </Text>
          </View>
        </View>
        <View>
          {data.status === 'Live' && (
            <View
              style={{
                backgroundColor: 'green',
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignSelf: 'flex-start',
                borderRadius: 20,
                marginBottom: 10,
              }}>
              <Text style={[styles.whiteText, {fontWeight: '700'}]}>
                AVAILABLE
              </Text>
            </View>
          )}
          {data.status !== 'Live' && (
            <View
              style={{
                backgroundColor: 'red',
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignSelf: 'flex-start',
                borderRadius: 20,
                marginBottom: 10,
              }}>
              <Text style={[styles.whiteText, {fontWeight: '700'}]}>
                NOT AVAILABLE
              </Text>
            </View>
          )}
          <Text style={[styles.whiteText, styles.info]}>
            Release date: {data.release_date}
          </Text>
          <Text style={[styles.whiteText, styles.info]}>
            Platform(s): {data.platform}
          </Text>
          <Text style={[styles.whiteText, styles.info]}>
            Genre: {data.genre}
          </Text>
        </View>
        <View style={{marginVertical: 25}}>
          <Carousel
            activeSlideAlignment={'start'}
            containerCustomStyle={{flex: 1}}
            inactiveSlideScale={1}
            slideStyle={{marginHorizontal: 5}}
            data={data.screenshots}
            itemWidth={150}
            sliderWidth={500}
            renderItem={_carouselItem}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.whiteText}>{data.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 25}}>
      {isLoading ? <ActivityIndicator /> : <RenderGame />}

      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.btnStyle}>
        <Text style={[{alignSelf: 'center'}, styles.whiteText]}>Return</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default GameDetail;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: 'green',
    paddingVertical: 20,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#1F1D2C',
    padding: 20,
  },
  descriptionContainer: {
    marginVertical: 20,
    backgroundColor: '#363342',
    padding: 15,
    borderRadius: 15,
  },
  info: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '500',
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 25,
  },
  gameTitle: {
    fontSize: 23,
    textTransform: 'uppercase',
  },
  gameDeveloper: {
    marginTop: 10,
  },
  textContainer: {
    justifyContent: 'center',
    maxWidth: '60%',
    marginHorizontal: 10,
  },
  whiteText: {
    color: '#F9F9F9',
  },
});
