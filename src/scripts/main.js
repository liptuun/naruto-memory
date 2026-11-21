import { characters } from "./data/characters.js"
import { createInitialGameState, tryOpenCard, resolveTurn, closeUnmatchedCards,checkWin } from "./game/game.js";
import { updateCardElement, updateBoard, renderBoard, showCardsPreview, hideCardsPreview } from "./ui/board.js";
import { updateGameStats } from "./ui/statistics.js"
import { showVictoryScreen, closeVictoryScreen } from "./ui/victory-screen.js"
import { renderWelcomeScreen,hideWelcomeScreen } from "./ui/welcome-screen.js"
import { playCardClickSound, toggleBackgroundMusic, playSelectedTrack, setBackgroundMusicVolume } from "./audio/sound.js";


let gameState = createInitialGameState(characters)

let showPreviewTimerId = null
let hidePreviewTimerId = null

let mismatchTimerId = null

const cardsListElement = document.querySelector('.cards__list')
renderBoard(cardsListElement, gameState)
renderWelcomeScreen(gameState)

const welcomePlayButtonElement = document.querySelector('.welcome__button--play')

function startGameWithPreview (cardsListElement, gameState) {
  gameState.isLocked = true

  if (showPreviewTimerId !== null) {
    clearTimeout(showPreviewTimerId)
    showPreviewTimerId = null
  }

  if (hidePreviewTimerId !== null) {
    clearTimeout(hidePreviewTimerId)
    hidePreviewTimerId = null
  }

  showPreviewTimerId = setTimeout(() => {
    showCardsPreview(cardsListElement)
    showPreviewTimerId = null
    hidePreviewTimerId = setTimeout(() => {
      hideCardsPreview(cardsListElement)
      gameState.isLocked = false
      hidePreviewTimerId = null
    },1500)
  },700)
}

welcomePlayButtonElement.addEventListener('click', () => {
  hideWelcomeScreen()
  startGameWithPreview(cardsListElement, gameState)
})

cardsListElement.addEventListener('click', (event) => {
  const clickedCardElement = event.target.closest('.card')

  if (clickedCardElement) {
    const clickedCardIndex = Number(clickedCardElement.dataset.cardIndex)

    if(!gameState.isLocked) {
      playCardClickSound()
    }

    const cardObj = tryOpenCard(gameState, clickedCardIndex)
    updateCardElement(clickedCardElement, cardObj)

    const resolved = resolveTurn(gameState)

    if (resolved !== null) {
      updateGameStats(gameState)
    }

    if (resolved === false) {
      mismatchTimerId = setTimeout(() => {
        closeUnmatchedCards(gameState)
        updateBoard(gameState, cardsListElement)
        mismatchTimerId = null
      }, 1000)
    }

    if (resolved === true && checkWin(gameState)) {
      showVictoryScreen(gameState)
    }
  }
})

const victoryCloseButtonElement = document.querySelector('.victory__button--close')

victoryCloseButtonElement.addEventListener('click', () => {
  closeVictoryScreen()
})

function startNewGame (event) {
  if (mismatchTimerId !== null) {
    clearTimeout(mismatchTimerId)
    mismatchTimerId = null
  }
  gameState = createInitialGameState(characters)
  renderBoard(cardsListElement, gameState)
  startGameWithPreview(cardsListElement, gameState)
  updateGameStats(gameState)

  if (event.target.classList.contains('victory__button--refresh')) {
    closeVictoryScreen()
  }
}

const newGameHeaderButtonElement = document.querySelector('.header__button--refresh')
const newGameVictoryWindowButtonElement = document.querySelector('.victory__button--refresh')

newGameHeaderButtonElement.addEventListener('click', startNewGame)
newGameVictoryWindowButtonElement.addEventListener('click', startNewGame)

const volumeHeaderButtonElement = document.querySelector('.header__button--volume')

const trackSelectElement = document.querySelector('[data-js-track-select]')

volumeHeaderButtonElement.addEventListener('click', () => {
  const isPaused = toggleBackgroundMusic()

  volumeHeaderButtonElement.classList.toggle('is-playing', isPaused)
})

trackSelectElement.addEventListener('change', (event) => {
  const index = Number(event.target.value)
  playSelectedTrack(index)
})

document.addEventListener('trackchanged', (event) => {
  trackSelectElement.value = String(event.detail.index)
})

const musicVolumeSliderElement = document.querySelector('[data-js-music-volume]')
const musicVolumeValueElement = document.querySelector('[data-js-music-volume-value]')

musicVolumeSliderElement.addEventListener('input', (event) => {
  const volume = Number(event.target.value) / 100

  setBackgroundMusicVolume(volume)

  musicVolumeValueElement.textContent = `${event.target.value}%`
})









