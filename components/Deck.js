// TODO: Individual deck view including the following:
// - Option to start a quiz -> routing to the Quiz view
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { black, green, purple, white } from '../utils/colors';

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

function Btn({ onPress, btnStyle = {}, textStyle = {}, text }) {
  return (
    <TouchableOpacity style={btnStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

function AddCard() {
  return (
    <Btn
      btnStyle={Platform.OS === 'ios' ? styles.iosAndroidAddCardBtn : styles.AndroidAddCardBtn}
      textStyle={styles.btnTextDark}
      text={'Add Card'}
    />
  )
}

function StartQuiz() {
  return (
    <Btn
      btnStyle={Platform.OS === 'ios' ? styles.iosStartQuizBtn : styles.AndroidStartQuizBtn}
      textStyle={styles.btnTextLight}
      text={'Start Quiz'}
    />
  )
}

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }
  render() {
    const { deck } = this.props;
    console.log('deck: ', deck);
    const { title, questions } = deck;
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
          <AddCard />
          <StartQuiz />
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
  }
}

// TODO: Option to add a new card/question to the deck -> routing to NewCard view
function mapDispatchToprops() {}

export default connect(mapStateToProps)(Deck);
