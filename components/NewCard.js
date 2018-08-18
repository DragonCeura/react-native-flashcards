// TODO: Form for:
// 1) a question
// 2) an answer
// 3) a submit button
import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import { addCardToDeck } from '../utils/api';

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add a New Card'
    }
  }

  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const card = this.state;
    const { deck } = this.props;

    // dispatch adding

    // return home

    // addCardToDeck({ card, deck });
  }

  render() {
    return (
      <View>
        <View>
          <TextInput
            placeholder='Add your new question here'
          />
          <TextInput
            placeholder='Add your new answer here'
          />
        </View>
        <TouchableOpacity>
            <Text>{'Submit'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    deck
  };
}

export default connect(mapStateToProps)(NewCard);
