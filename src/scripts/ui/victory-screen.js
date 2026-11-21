export const showVictoryScreen = function (gameState) {
  const victoryScreenElement = document.querySelector('.victory')

  victoryScreenElement.hidden = false

  const victoryPairsCount = document.querySelector('[data-js-victory-pairs]')
  const victoryMovesCount = document.querySelector('[data-js-victory-moves]')

  victoryPairsCount.textContent = `${gameState.cards.length / 2}`
  victoryMovesCount.textContent = `${gameState.moves}`
}

export const closeVictoryScreen = function () {
  const victoryScreenElement = document.querySelector('.victory')

  victoryScreenElement.classList.add('is-closing')

  function animationEndCallBack (event) {
    if(event.target === victoryScreenElement && event.animationName === 'victory-overlay-out') {
      victoryScreenElement.hidden = true
      victoryScreenElement.classList.remove('is-closing')
      victoryScreenElement.removeEventListener('animationend', animationEndCallBack)
    }
  }

  victoryScreenElement.addEventListener('animationend', animationEndCallBack)
}