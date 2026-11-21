const updateMovesDisplay = function (gameState) {
  const movesElement = document.querySelector('[data-js-moves]')

  movesElement.textContent = `${gameState.moves}`
}

const updatePairsDisplay = function (gameState) {
  const pairsElement = document.querySelector('[data-js-pairs]')

  const matchedCards = gameState.cards.filter((card) => card.isMatched === true)

  const pairs = (matchedCards.length) / 2

  pairsElement.textContent = `${pairs} / ${gameState.cards.length / 2}`
}

export const updateGameStats = function (gameState) {
  updateMovesDisplay(gameState)
  updatePairsDisplay(gameState)
}

