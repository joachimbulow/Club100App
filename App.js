/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import MainMenu from './src/screens/MainMenu.js'
import PlaylistPicker from './src/screens/PlaylistPicker.js'
import Settings from './src/screens/Settings.js'
import SettingsConfirm from './src/screens/SettingsConfirm.js'
import Game from './src/screens/Game.js'
import Authorization from './src/screens/Authorization.js'
import HowToPlay from './src/screens/HowToPlay.js'
import About from './src/screens/About.js'

const App: () => React$Node = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
          marginRight: 50
        }
      }}
        initialRouteName="MainMenu">


        {/* Screen declaration for navigation */}
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{
            title: '',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center',
            }
          }}
        />
        <Stack.Screen
          name="Authorization"
          component={Authorization}
          options={{
            title: 'Authorize with spotify',
          }}
        />
        <Stack.Screen
          name="PlaylistPicker"
          component={PlaylistPicker}
          options={{
            title: 'Pick playlist',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Choose your game settings',
          }}
        />
        <Stack.Screen
          name="SettingsConfirm"
          component={SettingsConfirm}
          options={{
            title: 'Record your sounds',
          }}
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{
            title: 'Club 100',
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: 'About',
          }}
        />
        <Stack.Screen
          name="HowToPlay"
          component={HowToPlay}
          options={{
            title: 'How to play',
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
