import { AsyncStorage } from 'react-native';
import {
  MOBILE_FLASHCARDS_STORAGE_KEY,
  DECKS_STORAGE_KEY,
  MISCELLANEOUS_KEY,
} from './_deck';

const sampleDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return results === null ? sampleDecks : JSON.parse(results);
    })
}

function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)[id];
    });
}

// TODO: implement saving the deck title. (Only used when creating a new deck?)
// Only interface for creating a new deck?
function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify(
      {
        key: generateUID(),
        title,
        questions: []
      }
    )
  );
}

function addCardToDeck({ card, deck }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck]: {
      questions:[
        ...questions,
        card
      ]
    }
  }))
}

// TODO: implement to speed up debugging of adding?
function removeCardFromDeck() {}

function clearDecks() {
  AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}

export {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
  removeCardFromDeck,
  clearDecks,
}
