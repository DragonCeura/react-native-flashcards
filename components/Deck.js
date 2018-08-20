// TODO: Individual deck view including the following:
// - Option to start a quiz -> routing to the Quiz view
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { black, green, purple, white } from '../utils/colors';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }
  addCard = () => {
    const { navigation, deck } = this.props;
    navigation.navigate('NewCard', { deck });
  }
  startQuiz = () => {
    const { navigation, deck } = this.props;
    if (deck.questions.length > 0){
      navigation.navigate('Quiz', { deck });
    } else {
      alert('Cannot start quiz without cards. Please add cards to this deck to begin.');
    }
  }
  render() {
    const { title, questions } = this.props.deck;

    const numCardsText = (questions && questions.length !== 1)
      ? `${questions.length} cards`
      : `${questions.length} card`;

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{numCardsText}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosAndroidAddCardBtn : styles.AndroidAddCardBtn}
            onPress={this.addCard}>
              <Text style={styles.btnTextDark}>{'Add Card'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosStartQuizBtn : styles.AndroidStartQuizBtn}
            onPress={this.startQuiz}>
              <Text style={styles.btnTextLight}>{'Start Quiz'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  info: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  iosAndroidAddCardBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidAddCardBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosStartQuizBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidStartQuizBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextLight: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  btnTextDark: {
    color: black,
    fontSize: 22,
    textAlign: 'center'
  }
})

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;

  return {
    deck: state[title]
  };
}

// TODO: Option to add a new card/question to the deck -> routing to NewCard view
function mapDispatchToprops() {}

export default connect(mapStateToProps)(Deck);
