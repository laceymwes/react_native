import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadiing: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    };
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  handleUpdateLocation = (city) => {
    if (!city) return;

    this.setSate({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationId);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  render() {
    return (
      const { loading, error, location, weather, temperature } = this.state;

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather('Clear')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
              {!loading && (
                <View>
                  {error && (
                    <Text style={[styles.smallText, styles.textStyle]}>
                      Could not Load weather, please try a different city.
                    </Text>
                  )}
                </View>
              )}
            <SearchInput
              placeholder="Search any city"
              onSubmit="this.handleUpdateLocation"
            />
          </ View>
        </ ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.os === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
