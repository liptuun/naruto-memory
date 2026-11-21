const createCardInstances = function (charsArray) {
  return charsArray.map((character) => {
    return [
      {
        id: `${character.id}-1`,
        characterId: character.id,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${character.id}-2`,
        characterId: character.id,
        isFlipped: false,
        isMatched: false,
      },
    ]
  }).flat()
}

const getShuffledCards = function(cards) {
  const shuffledCards = [...cards]

  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ shuffledCards[i], shuffledCards[j] ] = [ shuffledCards[j], shuffledCards[i] ]
  }
  return shuffledCards
}

export const createShuffledDeck = function (characters) {
  const createdDeck = createCardInstances(characters)
  return getShuffledCards(createdDeck)
}
