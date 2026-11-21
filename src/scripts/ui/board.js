import { characters } from "../data/characters.js";
import {createInitialGameState} from "../game/game.js";

export const createCardElement = function (card, index) {
  const cardItemElement = document.createElement('li')

  cardItemElement.classList.add('cards__item')

  const cardElement = document.createElement('button')

  cardElement.classList.add('card')
  cardElement.type = 'button'
  cardElement.dataset.cardIndex = index

  const character = characters.find((item) => item.id === card.characterId)

  const cardInnerElement = document.createElement('span')

  cardInnerElement.classList.add('card__inner')

  const cardBackElement = document.createElement('span')

  cardBackElement.classList.add('card__face', 'card__face--back')

  const cardFrontElement = document.createElement('span')

  cardFrontElement.classList.add('card__face', 'card__face--front')

  const cardImageElement = document.createElement('img')

  cardImageElement.src = character.image
  cardImageElement.width = 736
  cardImageElement.height = 736
  cardImageElement.loading = "lazy"

  cardFrontElement.appendChild(cardImageElement)

  cardInnerElement.append(cardBackElement, cardFrontElement)

  cardElement.appendChild(cardInnerElement)

  cardItemElement.appendChild(cardElement)

  return cardItemElement
}

export const updateCardElement = function (cardElement, cardObj) {
  cardElement.classList.toggle('card--is-flipped', cardObj.isFlipped)
}

export const showCardsPreview = function (cardsListElement) {
  const buttonElements = cardsListElement.querySelectorAll('.card')
  buttonElements.forEach((button) => {
    button.classList.add('card--preview')
  })
}

export const hideCardsPreview = function (cardsListElement) {
  const buttonElements = cardsListElement.querySelectorAll('.card')
  buttonElements.forEach((button) => {
    button.classList.remove('card--preview')
  })
}

export const updateBoard = function (gameState, cardsListElement) {
  const cardElements = cardsListElement.querySelectorAll('.card')

  cardElements.forEach((cardElement) => {
    const cardIndex = Number(cardElement.dataset.cardIndex)
    const card = gameState.cards[cardIndex]

    updateCardElement(cardElement, card)
  })
}

export const renderBoard = function (cardsListElement, gameState) {
  cardsListElement.replaceChildren()

  gameState.cards.forEach((card, index) => {
    cardsListElement.appendChild(createCardElement(card, index))
  })
}
