export const renderWelcomeScreen = function (gameState) {
  const welcomePairsTextElement = document.querySelector('[data-js-welcome-pairs]')

  welcomePairsTextElement.textContent = `${gameState.cards.length / 2}`
}

export const hideWelcomeScreen = function () {
  const welcomeScreenElement = document.querySelector('.welcome')

  welcomeScreenElement.classList.add('is-closing')

  function animationEndCallBack (event) {
    if(event.target === welcomeScreenElement && event.animationName === 'welcome-overlay-out') {
      welcomeScreenElement.hidden = true
      welcomeScreenElement.classList.remove('is-closing')
      welcomeScreenElement.removeEventListener('animationend', animationEndCallBack)
    }
  }

  welcomeScreenElement.addEventListener('animationend', animationEndCallBack)
}