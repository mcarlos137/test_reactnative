//PRINCIPAL
import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from 'react-native-config';
//NAVIGATION
import { NavigationContext } from "@react-navigation/native";
//REDUX
import { compose } from 'redux';
//COMPONENTS
import Body from '../components/Body';
//HOC
import { withPersistentStore } from '../hoc';
//TOOLS
import { start as startHttpMockedServer } from '../tools/httpMockedServer';

const WelcomeScreen = () => {

  const navigation = useContext(NavigationContext);

  useEffect(() => {
    if(Config.USE_MOCK_API){
      startHttpMockedServer(AsyncStorage)
    }
  }, []);

  const onPress = () => {
    navigation?.reset({
      index: 0,
      routes: [{ name: 'ProfileStep1' }]
    })
  }

  useEffect(() => {
    navigation?.setOptions({
      headerTitle: () => (<Image source={require('../assets/images/logo.png')} style={styles.imageLogo} />),
      headerStyle: {
        backgroundColor: '#2C91CF',
      },
    })
  }, []);

  return (
    <Body children={
      <View style={styles.viewBlock}>
        <View style={styles.viewImage}>
          <Image
            source={require('../assets/images/dotted_line.png')}
            style={styles.imageDot}
            resizeMode='cover'
          />
        </View>
        <Text style={styles.text1}>WELCOME TO THE</Text>
        <Text style={styles.text2} >Gateway JFK Connection!</Text>
      </View>
    }
      reverseColor={false}
      buttonText='Continue'
      buttonOnPress={onPress}
    />
  );
}

export default React.memo(compose(withPersistentStore)(WelcomeScreen))

const styles = StyleSheet.create({
  viewBlock: {
    height: 360,
  },
  viewImage: {
    width: Dimensions.get('window').width,
    marginTop: 20,
    marginBottom: 30,
  },
  text1: {
    fontWeight: 400, 
    fontSize: 14, 
    color: 'white', 
    textAlign: 'center',
    fontFamily: 'Rubik',
    marginBottom: 20
  },
  text2: {
    fontWeight: 700, 
    fontSize: 39, 
    color: 'white', 
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  imageDot: {
    marginLeft: Dimensions.get('window').width / 2 - 45,
    height: 80,
    width: Dimensions.get('window').width / 2 + 45
  },
  imageLogo: {
    tintColor: '#ffffff',
    width: 80,
    height: 20
  },
});