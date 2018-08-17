// TODO: DeckList view showing all decks (name and number of cards each).
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { AppLoading} from 'expo';

import { retrieveDecks } from '../actions';

import { getDecks } from '../utils/api';

class DeckList extends Component {
  state = {
    read: false
  };
  componentDidMount() {
    console.log("DeckList mounted");
    const { dispatchRetrieveDecks } = this.props;

    // fetch decks
    getDecks()
      .then((decks) => {
        console.log('decks: ', decks);
        // Dispatch decks have been fetched
        return dispatchRetrieveDecks(decks);
      })
      .then(() => this.setState(() => ({ ready: true })))
      .catch((error) => {
        console.log('Error getting decks: ', error);
        alert('Error getting decks');
      })
  }
  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Text>DeckList</Text>
        <Text>{JSON.stringify(decks)}</Text>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}

function mapDispatchToprops(dispatch) {
  return {
    dispatchRetrieveDecks: (decks) => dispatch(retrieveDecks(decks))
  };
}

export default connect(mapStateToProps, mapDispatchToprops)(DeckList);
