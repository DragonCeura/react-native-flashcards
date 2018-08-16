import { AsyncStorage } from 'react-native';
import {
  MOBILE_FLASHCARDS_STORAGE_KEY,
  DECKS_STORAGE_KEY,
  MISCELLANEOUS_KEY,
} from './_deck';

function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return results === null ? {} : JSON.parse(results);
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
      [title]: {
        title
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
