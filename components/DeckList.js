// TODO: DeckList view showing all decks (name and number of cards each).
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { AppLoading} from 'expo';

import { retrieveDecks } from '../actions';

import { getDecks, clearDecks } from '../utils/api';
import { gray, orange, white } from '../utils/colors';

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
      });
  }

  resetDecks = () => {
    clearDecks();
  }

  renderItem = ({ item }) => {
    const { title, questions } = item;
    const numCardsText = (questions && questions.length !== 1)
      ? `${questions.length} cards`
      : `${questions.length} card`;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.navigation.navigate(
            'Deck',
            { title }
          )}
      >
        <Text>{title}</Text>
        <Text>{numCardsText}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props;
    console.log('DeckList decks: ', decks);
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        />
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={this.resetDecks}
        >
          <Text>Reset Decks</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 10,
    padding: 20,
    margin: 10,
  },
  resetBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: orange,
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
