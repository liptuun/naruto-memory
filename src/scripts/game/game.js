import { createShuffledDeck } from "./deck.js";

export const createInitialGameState = function (characters) {
  const cards = createShuffledDeck(characters)
  return {
    cards: cards,
    moves: 0,
    isLocked: false,
  }
}

const getOpenedUnmatchedCards = function (gameState) {
  return gameState.cards.filter((card) => card.isFlipped && !card.isMatched === true)
}

export const tryOpenCard = function (gameState, cardIndex) {
  const clickedCard = gameState.cards[cardIndex]

  if(gameState.isLocked) return clickedCard

  if (!clickedCard.isFlipped && !clickedCard.isMatched) {
    clickedCard.isFlipped = true
  }

  return clickedCard
}

const checkForMatch = function (firstCard, secondCard) {
  return firstCard.characterId === secondCard.characterId
}

export const resolveTurn = function (gameState) {
  let result = null

  if (gameState.isLocked) return result

  const openedCards = getOpenedUnmatchedCards(gameState)

  if (openedCards.length < 2) {
    return result
  }

  if (openedCards.length === 2) {
    gameState.isLocked = true
    gameState.moves++
    const [ firstCard, secondCard ] = openedCards

    if (checkForMatch(firstCard, secondCard)) {
      firstCard.isMatched = true
      secondCard.isMatched = true
      gameState.isLocked = false
      result = true
    } else {
      result = false
    }
    return result
  }
  return result
}

export const closeUnmatchedCards = function (gameState) {
  const openedCards = getOpenedUnmatchedCards(gameState)

  openedCards.forEach((card) => {
    card.isFlipped = false
  })

  gameState.isLocked = false
}

export const checkWin = function (gameState) {
  const isWin = gameState.cards.every((card) => card.isMatched === true)

  return isWin
}