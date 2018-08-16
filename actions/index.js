const RETRIEVE_DECKS = 'RETRIEVE_DECKS';
const ADD_DECK = 'ADD_DECK';
const ADD_CARD = 'ADD_CARD';

function retrieveDecks(decks) {
  return {
    type: RETRIEVE_DECKS,
    decks
  };
}

/* Example deck to receive?
  {
    title: 'React',
    questions: []
  }
*/
function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  };
}

export {
  RETRIEVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  retrieveDecks,
  addDeck,
  addCard
}
