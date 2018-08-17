import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import reducer from './reducers';

import { purple, white } from './utils/colors';

import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// TODO: TabNavigator for DeckList and NewDeck screens.
const routeConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <IonIcons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}

const tabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS ==='ios' ? purple : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = Platform.OS === 'ios'
  ? createBottomTabNavigator(routeConfigs, tabNavigatorConfig)
  : createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig);

export default class App extends React.Component {
  componentDidMount() {
    console.log("App mounted");
  }

  // TODO: Render a list of created decks (DeckList component)
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={purple} barStyle='light-content'/>
          <Tabs />
        </View>
      </Provider>
    );
  }
}
