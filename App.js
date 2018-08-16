import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import reducer from './reducers';

import { purple } from './utils/colors';

import DeckList from './components/DeckList';

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    console.log("App mounted");
  }

  // TODO: Render a list of created decks (DeckList component)
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <CustomStatusBar backgroundColor={purple} barStyle='light-content'/>
          <DeckList />
        </View>
      </Provider>
    );
  }
}
