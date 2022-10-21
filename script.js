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
const final = document.querySelector(".final");
const currentSong = document.querySelector(".currentSong");
const homeButton = document.querySelector(".homeButton")

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

const clickSound = document.getElementById("click")
const basicNotes = document.getElementById("basicNotes")
const littleStar = document.getElementById("littleStar")
const happyBirthday = document.getElementById("happyBirthday")

let song
let play
let playerInput
let computerInput
let current
let answer
let total

const basicSong = ["C", "D", "E", "F", "G", "A", "B"] 

const starSong = ["C","C","G","G", "A","A", "G"] 

const birthdaySong = ["C","C", "D", "C", "F", "E", "C", "C", "D", "C","G", "F"] 

startButton.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
    start.classList.add("hide")
    selection.classList.remove("hide")
  }, 200);
})

basic.addEventListener("click", () => {
  playClickSound()
  song = basicSong
  currentSong.innerHTML = `Basic`
  play = computerInput = playerInput = false
  let delay = setTimeout(() => {
    Start()
  }, 200)
})

star.addEventListener("click", () => {
  playClickSound()
  song = starSong
  currentSong.innerHTML = `Little Star`
  let delay = setTimeout(() => {
    Start()
  }, 200)
})

birthday.addEventListener("click", () => {
  playClickSound()
  currentSong.innerHTML = `Happy Birthday`
  song = birthdaySong
  let delay = setTimeout(() => {
    Start()
  }, 200)

})

playAgain.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
    final.classList.add("hide")
    start.classList.remove("hide")
  }, 200)
})

homeButton.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
      location.assign('https://gimme.sg/activations/dementia/');
    }, 200);
})

function Start() {
  selection.classList.add("hide")
  game.classList.remove("hide")
  current = 1
  play = computerInput = playerInput = false
  Question()
}

keys.forEach(key => {





  
  console.log(key)
  
  /*
  
      try so ur black keys doesn't get added with these event listener because its not used, idk why
      
      the issue just now is because you add the ended listener everytime u click on a note, so there's 
      like probably 10 listeners each time listening for the answer.
      
      so with your timer playing the NPC sound, it might bug out and thats why even when u press the wrong answer,
      it might think thats the right answer. because the NPC sound is still playing while it's still being "ended"
      
      - aden                                                    
   */

  try { 
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.addEventListener('ended', () => {

      key.classList.remove('active')
      if(answer == key.dataset.note && playerInput == true && computerInput == false){
        optional.style.color = "#51777F"
        optional.innerHTML = `
        <img src="./img/right.png">
        <!--<p>Note ${current} Clear!<p>-->
        <p>That's right!<p>`
        current += 1
        computerSong = 0
        playerInput = computerInput = false
        console.log(play)
        Question()
        return
      }
      if(answer != key.dataset.note && playerInput == true && computerInput == false){
        optional.style.color = "#C85B5B"
        optional.innerHTML = `
        <img src="./img/wrong.png">
        <p>Note ${current} Try again!<p>`
        computerSong = 0
        play = playerInput = computerInput = false
        console.log(play)
        Question()
        return
      }
      computerInput = false
      playerInput = false
      play = true
    })
  }
  catch(e)
  {
    
  }

 
  
})

keys.forEach(key => {
  key.addEventListener('click', () => {
    playerInput = true
   
    
    
    playNote(key)}
  
      
  
  
  )
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
    

    /*noteAudio.addEventListener('ended', () => {
      
      key.classList.remove('active')
      if(answer == key.dataset.note && playerInput == true && computerInput == false){
        optional.style.color = "#51777F"
        optional.innerHTML = `
        <img src="./img/right.png">
        <!--<p>Note ${current} Clear!<p>-->
        <p>That's right!<p>`
        current += 1
        computerSong = 0
        playerInput = computerInput = false
        console.log(play)
        Question()
        return
      }
      if(answer != key.dataset.note && playerInput == true && computerInput == false){
        optional.style.color = "#C85B5B"
        optional.innerHTML = `
        <img src="./img/wrong.png">
        <p>Note ${current} Try again!<p>`
        computerSong = 0
        play = playerInput = computerInput = false
        console.log(play)
        Question()
        return
      }
        computerInput = false
        playerInput = false
        play = true
    })*/
  }
}

function playClickSound(){
  console.log(clickSound)
  clickSound.currentTime = 0
  clickSound.play()
}

function Question(){
  if(current == (song.length + 1)){
    play = false
    if(song == basicSong){
      basicNotes.currentTime = 0
      basicNotes.play()
    }
    if(song == starSong){
      littleStar.currentTime = 0
      littleStar.play()
    }
    if(song == birthdaySong){
      happyBirthday.currentTime = 0
      happyBirthday.play()
    }
    notes.innerHTML = `-`
    optional.innerHTML =""
    final.classList.remove("hide")
    return
  }

  answer = song[current - 1]
  score.innerHTML = `${current}/${song.length}`
  let question = document.querySelector(`.${song[current - 1]}`)
  
  let delay = setTimeout(() => {
    optional.innerHTML =""
    play = true
    notes.innerHTML = `${answer}`
    const noteAudio = document.getElementById(question.dataset.note)
    question.classList.add('active')
    let delay = setTimeout(() => {
      question.classList.remove('active')
    }, 1000);
  }, 800);
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });