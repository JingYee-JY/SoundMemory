const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const selection = document.querySelector(".selection")
const basic = document.querySelector(".easy")
const star = document.querySelector(".normal")
const birthday = document.querySelector(".hard")
const game = document.querySelector(".game")
const score =  document.querySelector(".score")
const notes =  document.querySelector(".notes")
const optional =  document.querySelector(".optional")
const playAgain = document.querySelector(".againButton")
const home = document.querySelector(".homeButton")
const final = document.querySelector(".final");

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

let song
let play
let playerInput
let computerInput
let current
let answer
let total

const basicSong = ["C", "D", "E", "F", "G", "A", "B"] 

startButton.addEventListener("click", () => {
  start.classList.add("hide")
  selection.classList.remove("hide")
})

basic.addEventListener("click", () => {
  selection.classList.add("hide")
  game.classList.remove("hide")
  song = basicSong
  current = 1
  play = computerInput = playerInput = false
  Question()
})

playAgain.addEventListener("click", () => {
  final.classList.add("hide")
  current = 1
  play = computerInput = playerInput = false
  Question()
})

home.addEventListener("click", () => {
  final.classList.add("hide")
  selection.classList.remove("hide")
})

keys.forEach(key => {
  key.addEventListener('click', () => {
    playerInput = true
    playNote(key)})
})

document.addEventListener('keydown', e => {
  if (e.repeat) return
  playerInput = true
  const key = e.key
  const whiteKeyIndex = WHITE_KEYS.indexOf(key)
  const blackKeyIndex = BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

function playNote(key) {
  if(play == false){return}
  if(play == true){
    play = false
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add('active')
    noteAudio.addEventListener('ended', () => {
      key.classList.remove('active')
      if(answer == key.dataset.note && playerInput == true && computerInput == false){
        optional.style.color = "#51777F"
        optional.innerHTML = `
        <img src="./img/right.png">
        <p>Note ${current} Clear!<p>`
        current += 1
        play = playerInput = computerInput = false
        console.log(play)
        Question()
        return
      }
      if(answer != key.dataset.note && playerInput == true && computerInput == false){
        optional.style.color = "#C85B5B"
        optional.innerHTML = `
        <img src="./img/wrong.png">
        <p>Note ${current} Try again!<p>`
        play = playerInput = computerInput = false
        console.log(play)
        Question()
        return
      }
      else{
        computerInput = false
        playerInput = false
        play = true
      }
    })
  }
}

function Question(){
  if(current == (song.length + 1)){
    play = false
    notes.innerHTML = `-`
    optional.innerHTML =""
    final.classList.remove("hide")
    return
  }
  answer = song[current - 1]
  score.innerHTML = `${current}/${song.length}`
  let question = document.querySelector(`.${song[current - 1]}`)
  
  console.log(question)
  let delay = setTimeout(() => {
    optional.innerHTML =""
    computerInput = true
    play = true
    notes.innerHTML = `${answer}`
    playNote(question)
  }, 500);
}