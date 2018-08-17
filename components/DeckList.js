// TODO: DeckList view showing all decks (name and number of cards each).
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { AppLoading} from 'expo';

import { retrieveDecks } from '../actions';

import { getDecks } from '../utils/api';
import { gray, white } from '../utils/colors';

import Deck from './Deck';

class DeckList extends Component {
  state = {
    read: false
  };
  componentDidMount() {
    const { dispatchRetrieveDecks } = this.props;

    // fetch decks
    getDecks()
      .then((decks) => {
        // Dispatch decks have been fetched
        return dispatchRetrieveDecks(decks);
      })
      .then(() => this.setState(() => ({ ready: true })))
      .catch((error) => {
        console.log('Error getting decks: ', error);
        alert('Error getting decks');
      })
  }

  renderItem = ({ item }) => {
    const { key, title, questions } = item;

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            console.log('DeckList item pressed');
            return this.props.navigation.navigate(
              'Deck',
              { key }
            )}}
        >
          <Text>{title}</Text>
          <Text>{questions.length} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray
  },
  item: {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 10,
    padding: 20,
    margin: 10,
  }
})

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
