import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

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
    showAnswer: false
  }

  // TODO: Score card result.
  // When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
  // When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
  // Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.
  restartQuiz = () => {
    const { deck, navigation } = this.props;

    navigation.navigate('Quiz', deck);

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

  // TODO: Main view while completing the quiz.
  // The view displays the number of questions remaining.

  // TODO: Individual cards being shown during the quiz.
  // The question is displayed, along with a button to show the answer.
  // Pressing the 'Show Answer' button displays the answer.
  quizCard = () => {
    const { deck } = this.props;
    const { questions } = deck;
    const { numQuestionsAnswered, showAnswer } = this.state;

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

  // TODO: Show answer view
  // Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
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

  // TODO: Shuffle the deck to randomize each time the user takes the quiz.
  shuffleDeck = (deck) => {

  }

  render() {
    const { deck } = this.props;
    const { score, numQuestionsAnswered } = this.state;

    const numCards = deck.questions.length;

    return (
      <View>
        {(numQuestionsAnswered < numCards)
          ? this.quizCard()
          : this.quizResults()
        }
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

export default connect(mapStateToProps)(Quiz);
