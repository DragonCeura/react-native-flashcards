import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import { addDeck } from '../actions';
import { addNewDeck } from '../utils/api';

class NewDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const { title } = this.state;
    const { decks, dispatchAddDeck } = this.props;

    if (decks[title] === undefined) {
      const newDeck = {
        title,
        questions: []
      }

      dispatchAddDeck(newDeck);

      // reset state
      this.setState(() => ({
        title: ''
      }));

      // go to the newly created deck
      this.toDeck(newDeck);

      addNewDeck(newDeck);
    } else {
      alert(`Cannot add deck because the deck '${title}' already exists.`);
    }
  }

  toDeck = (newDeck) => {
    const { navigation } = this.props;
    navigation.navigate('DeckList');
    navigation.navigate('Deck', newDeck);
  }

  onChangeTitle = (title) => {
    this.setState({
      title
    });
  }

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="What is your new deck's title?"
            onChangeText={this.onChangeTitle}
            value={title}
          />
        </View>
        <TouchableOpacity
          onPress={this.submit}
          disabled={title === ''}>
            <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

function mapStateToProps(state, { navigation }) {
  return {
    decks: state
  }
}

function mapDispatchToprops(dispatch) {
  return {
    dispatchAddDeck: (title) => dispatch(addDeck(title))
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(NewDeck);
