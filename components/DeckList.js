// TODO: DeckList view showing all decks (name and number of cards each).
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class DeckList extends Component {
  componentDidMount() {
    console.log("DeckList mounted");
  }
  render() {
    return (
      <View>
        <Text>DeckList</Text>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList);
