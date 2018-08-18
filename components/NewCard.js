// TODO: Form for:
// 1) a question
// 2) an answer
// 3) a submit button
import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import { addCard } from '../actions';
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
    const card = { question, answer } = this.state;
    const { deck, dispatchAddCard } = this.props;

    console.log('card to add: ', card);
    console.log(this.props);

    console.log(deck.questions);
    deck.questions.push(card);
    dispatchAddCard(deck);

    // reset state
    this.setState(() => ({
      question: '',
      answer: ''
    }));

    // go back
    this.toDeck();

    addCardToDeck({ deck });
  }

  toDeck = () => {
    const { deck } = this.props;
    this.props.navigation.navigate('Deck', deck);
  }

  onChangeQuestion = (question) => {
    this.setState({
      question
    });
  }

  onChangeAnswer = (answer) => {
    this.setState({
      answer
    });
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder='Add your new question here'
            onChangeText={this.onChangeQuestion}
          />
          <TextInput
            placeholder='Add your new answer here'
            onChangeText={this.onChangeAnswer}
          />
        </View>
        <TouchableOpacity
          onPress={this.submit}
          disabled={question === '' || answer === ''}>
            <Text>{'Submit'}</Text>
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
})

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    deck
  };
}

function mapDispatchToprops(dispatch) {
  return {
    dispatchAddCard: (deck) => dispatch(addCard(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(NewCard);
