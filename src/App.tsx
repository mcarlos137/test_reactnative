//PRINCIPAL
import * as React from 'react';
//NAVIGATION
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//STORES
import { store as persistentStore } from './stores/persistent';
//SCREENS
import WelcomeScreen from './screens/Welcome';
import ProfileStep1Screen from './screens/ProfileStep1';
import ProfileStep2Screen from './screens/ProfileStep2';

const RootStack = createNativeStackNavigator({
  screens: {
    Welcome: {
      screen: WelcomeScreen,
      if() {
          return persistentStore.getState().user.id === ''
      },
      options: {
        headerShown: true,
        headerShadowVisible: false,

      },
    },
    ProfileStep1: {
      screen: ProfileStep1Screen,
      options: {
        headerShown: true,
        headerShadowVisible: false,
        title: ''
      },
    },
    ProfileStep2: {
      screen: ProfileStep2Screen,
      options: {
        headerShown: true,
        headerShadowVisible: false,
        title: ''
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Navigation />
  )
}