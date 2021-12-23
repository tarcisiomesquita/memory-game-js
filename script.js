const memoryGame = document.querySelector('#memory-game')

const imgs = [
    "Lana_Del_Ray.png",
    "Born_to_Die.png",
    "Ultraviolence.png",
    "Honeymoon.png",
    "Lust_for_Life.png",
    "Norman_Fucking_Rockwell!.png",
    "Chemtrails_over_the_Country_Club.png",
    "Blue_Banisters.png"
]

let cardHTML = ""

imgs.forEach(img => {
  cardHTML += `<div class="memory-card" data-image="${img}">
                    <img class="front-face" src="images/${img}"/>
                    <img class="back-face" src="images/back-card.jpg">
                </div>`.repeat(2)
})

memoryGame.innerHTML = cardHTML

const cards = document.querySelectorAll('.memory-card')
cards.forEach(card => card.addEventListener('click', flipCard))

let numberOfMatches = 0
let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return
    }

    hasFlippedCard = false
    secondCard = this 

    checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image
    
    if (isMatch) {
        disableCards()
        numberOfMatches++
        hasGameFinished()
        return
    }
    unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard()
}

function unflipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip'),
        resetBoard()
        },1500)   
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

function shuffleCards() {
    cards.forEach(card => {
        let randomInt = Math.floor(Math.random() * 19) 
        card.style.order = randomInt
    })
}

function orderCards() {
    cards.forEach(card => {
        card.style.order = 0
    })
}

function loadMemoryGame() {
    cards.forEach(card => card.classList.add('flip'))
    disableAllCards()
    document.getElementById("stop-watch").innerText = "00:00"
}

let gameStarted = false

function startRestartGame() {
    if (!gameStarted) {
        resetGame()
        setTimeout(() => {
            cards.forEach(card => card.classList.remove('flip')),
            startStop(),
            document.getElementById("start-restart-btn").innerText = "Restart Game",
            enableAllCards()
            },3000) 
        
        gameStarted = true
    }
    else {
        disableAllCards()
        unFlipAllCards()
        setTimeout(() => {
            resetGame()
        }, 1000)
        setTimeout(() => {
            flipAllCards()
        },2000)          
        setTimeout(() => {
            unFlipAllCards(), 
            startStop(),
            enableAllCards()
            },4500) 
    }
}

function flipAllCards() {
    cards.forEach(card => card.classList.add('flip'))
}

function unFlipAllCards() {
    cards.forEach(card => card.classList.remove('flip'))
}

function disableAllCards() {
    cards.forEach(card => card.removeEventListener('click', flipCard))
}

function enableAllCards() {
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function resetGame() {
    lockBoard = false
    numberOfMatches = 0
    disableAllCards()
    shuffleCards()
    resetBoard()
    resetStopWatch()
}

function hasGameFinished() {
    if (numberOfMatches > 7) {
        startStop()
        setTimeout(() => {
            window.alert(`Congratulations, you win!`)
            hasBeatTheFastestTime()
            },1500) 
    }    
}

function hasBeatTheFastestTime() {
    let timeTaken = minutes * 60 + seconds
    if (fastestTime === 0) {
        fastestTime = timeTaken
        fastestTimeHTML.innerHTML = displayMinutes + ":" + displaySeconds
    } else if (timeTaken < fastestTime) {
        fastestTime = timeTaken
        fastestTimeHTML.innerHTML = displayMinutes + ":" + displaySeconds
    }
}

function showFastestTime() {
    if (fastestTime > 0) {
        if (fastestTimeHTML.style.display == "") {
            fastestTimeHTML.style.display = "block"
        } else {
            fastestTimeHTML.style.display = ""
        }
    } else {
        window.alert("Sorry, no one won the game yet!")
    }
}

let stopWatchHTML = document.getElementById("stop-watch")
let fastestTimeHTML = document.getElementById("fastest-time")

let seconds, minutes, displaySeconds, displayMinutes, fastestTime 
seconds = minutes = displaySeconds = displayMinutes = fastestTime = 0

let interval = null
let status = "stopped"

function stopWatch(){
    seconds++

    if(seconds / 60 === 1){
        seconds = 0
        minutes++
    }

    displaySeconds = seconds < 10 ? "0" + seconds.toString() : seconds
    displayMinutes =  minutes < 10 ? "0" + minutes.toString() : minutes
   
    stopWatchHTML.innerHTML = displayMinutes + ":" + displaySeconds
}

function startStop(){
    if(status === "stopped"){
        interval = window.setInterval(stopWatch, 1000)
        status = "started"

    } else{
        window.clearInterval(interval)
        status = "stopped"
    }
}

function resetStopWatch(){
    window.clearInterval(interval);
    [seconds, minutes] = [0, 0]
    stopWatchHTML.innerText = "00:00"
    status = "stopped"
}