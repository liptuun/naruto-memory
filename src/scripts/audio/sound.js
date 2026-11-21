import clickSound from "../../assets/sounds/effects/click.mp3"
import blueBirdOST from "../../assets/sounds/music/blue_bird.mp3"
import heroOST from "../../assets/sounds/music/hero.mp3"
import sadnessOST from "../../assets/sounds/music/sadness.mp3"

const cardClickAudio = new Audio(clickSound)
cardClickAudio.volume = 0.25

export const playCardClickSound = function () {
  cardClickAudio.currentTime = 0

  cardClickAudio.play()
}

const tracks = [
  {
    name: 'Blue Bird',
    src: blueBirdOST,
  },
  {
    name: 'Hero',
    src: heroOST,
  },
  {
    name: 'Sadness into Kindness',
    src: sadnessOST,
  }
]

let currentTrackIndex = 0

const backgroundMusic = new Audio(tracks[currentTrackIndex].src)
backgroundMusic.volume = 0.4

export const toggleBackgroundMusic = function () {
  const isPaused = backgroundMusic.paused

  if (isPaused) {
    backgroundMusic.play()
  } else {
    backgroundMusic.pause()
  }
  return isPaused
}

const playNextTrack = function () {
  currentTrackIndex++

  if(currentTrackIndex >= tracks.length){
    currentTrackIndex = 0
  }
  backgroundMusic.src = tracks[currentTrackIndex].src
  backgroundMusic.play()
  document.dispatchEvent(new CustomEvent('trackchanged', {
    detail: {
      index: currentTrackIndex
    },
  }))
}

backgroundMusic.addEventListener('ended', playNextTrack)


export const playSelectedTrack = function (index) {
  const isPaused = backgroundMusic.paused
  backgroundMusic.pause()
  currentTrackIndex = index
  backgroundMusic.src = tracks[currentTrackIndex].src
  backgroundMusic.currentTime = 0
  if (!isPaused) {
    backgroundMusic.play()
  }
}

export const setBackgroundMusicVolume = function (volume) {
  backgroundMusic.volume = volume
}