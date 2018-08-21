import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
    return {
      title: `${deck.title} Quiz`
    }
  }

  // Keep track of the current score, and where in the questions array we are.
  state = {
    score: 0,
    numQuestionsAnswered: 0,
    showAnswer: false,
    questions: this.props.deck.questions
  }

  componentDidMount() {
    this.shuffleDeck();
  }

  restartQuiz = () => {
    const { deck, navigation } = this.props;

    navigation.navigate('Quiz', deck);

    this.shuffleDeck();

    this.setState({
      score: 0,
      numQuestionsAnswered: 0,
      showAnswer: false
    });
  }

  backToDeck = () => {
    const { deck, navigation } = this.props;
    navigation.navigate('Deck', deck);
  }

  quizCard = () => {
    const { numQuestionsAnswered, showAnswer, questions } = this.state;

    const card = questions[numQuestionsAnswered];
    const currentCardNumber = numQuestionsAnswered + 1;
    const totalCards = questions.length;
    const numCardsRemaining = totalCards - currentCardNumber;

    return (
      <View>
        <View>
          <Text>Card {currentCardNumber} of {totalCards}. {numCardsRemaining} cards remaining.</Text>
        </View>
        {showAnswer
          ? this.showCardAnswer(card)
          : this.showCardQuestion(card)
        }
      </View>
    );
  }

  revealCardAnswer = () => {
    this.setState({
      showAnswer: true
    })
  }

  showCardQuestion = (card) => {
    return (
      <View>
        <Text>{card.question}</Text>
        <TouchableOpacity
          onPress={this.revealCardAnswer}>
          <Text>Show Answer</Text>
        </TouchableOpacity>
      </View>
    )
  }

  showCardAnswer = (card) => {
    return (
      <View>
        <Text>{card.answer}</Text>
        <TouchableOpacity
          onPress={this.answeredCorrectly}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.answeredIncorrectly}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  }

  answeredCorrectly = () => {
    const { score, numQuestionsAnswered } = this.state;

    this.setState({
      score: score + 1,
      numQuestionsAnswered: numQuestionsAnswered + 1,
      showAnswer: false
    })
  }

  answeredIncorrectly = () => {
    const { numQuestionsAnswered } = this.state;

    this.setState({
      numQuestionsAnswered: numQuestionsAnswered + 1,
      showAnswer: false
    })
  }

  quizResults = () => {
    const { deck } = this.props;
    const { questions } = deck;
    const { score } = this.state;

      clearLocalNotification()
        .then(setLocalNotification);

    return (
      <View>
        <Text>Your results</Text>
        <Text>{score}/{questions.length} cards answered correctly.</Text>
        {score === questions.length &&
          <Text>Good job! You aced this quiz!</Text>
        }
        <TouchableOpacity
          onPress={this.restartQuiz}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.backToDeck}>
          <Text>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }

  shuffleDeck = () => {
    let { questions } = this.state;

    const deckSize = questions.length;
    let tempCard, toSwap;
    for (i = deckSize - 1; i > 0; i--) {
         toSwap = Math.floor(Math.random() * i);
         tempCard = questions[i];
         questions[i] = questions[toSwap];
         questions[toSwap] = tempCard;
     }

     this.setState({
       questions
     })
  }

  render() {
    const { deck } = this.props;
    const { score, numQuestionsAnswered } = this.state;

    const numCards = deck.questions.length;

    return (
      <View style={styles.container}>
        {(numQuestionsAnswered < numCards)
          ? this.quizCard()
          : this.quizResults()
        }
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
  const { deck } = navigation.state.params;
  return {
    deck
  };
}

export default connect(mapStateToProps)(Quiz);
