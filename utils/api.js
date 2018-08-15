import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:decks'

function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
}

function getDeck(id) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
    .then((decks) => {
      return decks[id];
    });
}

// TODO: implement saving the deck title. (Only used when creating a new deck?)
function saveDeckTitle(title) {}

function addCardToDeck({ card, title }) {
  return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: card
  }))
}

export {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck
}
