
var userTimer // The timer value set by the user.
var timer // The timer variable.

// Start and Reset Buttons - Start
document.getElementById("startButton").onclick = function () 
{

  do{

    userTimer = prompt("Please enter a valid timer value. ( In Seconds )");

  }
  while(userTimer == null || userTimer == 0 || isNaN == true )
    console.log(typeof(userTimer))
    

    startTimer(userTimer)
    generateGameCards()
    document.getElementById("startButton").hidden = true
    document.getElementById("resetButton").hidden = false
    playBG()

};

document.getElementById("resetButton").onclick = function () 
{

  document.getElementById('clicksText').hidden = false
  document.getElementById('failuresText').hidden = false
  document.getElementById('resultMessage').hidden = true

    do{

      userTimer = prompt("Please enter a valid timer value.");
    }
    while(userTimer == null || userTimer == 0 ||  isNaN == true  )
      

    playBG()

    generateGameCards()
    clearInterval(timer)
    startTimer(userTimer); // Reset Timer
    nFailures = 0; // Reset Failure Count
    nClicks = 0; // Reset Click Count
    updateFailureCount(nFailures); // Reset Failure Count text
    updateClickCount(nClicks); // Reset Click Count text
};

// Start and Reset Buttons - End

// Timer Realted Functions -- Start
function startTimer(timeInSeconds) {
  
    document.getElementById("timerCounter").style.color = "black"
    timer = setInterval(function() {
        document.getElementById("timerCounter").innerHTML = timeInSeconds
        timeInSeconds--
        if(timeInSeconds < 20)
          {
            document.getElementById("timerCounter").style.color = "red"
          }
        if(timeInSeconds < 0)
            {
                clearInterval(timer)
                window.alert("Time is out. Click Reset to Try again!");

                document.getElementById('clicksText').hidden = true
                document.getElementById('failuresText').hidden = true
    
                document.getElementById('resultMessage').style.color = 'red'
                document.getElementById('resultMessage').innerHTML = 'Time is out. You had ' + nFailures + ' failures'
                document.getElementById('resultMessage').hidden = false

                
                return;
            }
        },1000);
  }
// Timer Realted Functions -- End

// Audio Related - Start

let successAudio = new Audio("audio/Success.mp3")
let failAudio = new Audio("audio/Fail.mp3")
let bgAudio = new Audio("audio/bg.mp3")

function playSuccess(){
  successAudio.play()
}
function playFail(){
  failAudio.play()
}

function playBG(){
  bgAudio.volume = 0.3
  if (bgAudio.paused) {
    bgAudio.play();
    }else{
      bgAudio.pause()
      bgAudio.currentTime = 0
    bgAudio.play();

    }
}




// Audio Related - End

// Game Logic -- Start



// ----------------------------------------------------------------

// To Count Clicks -- Start

var nClicks = 0

nClicksElement = document.getElementById("clicksCounter");

nClicksElement.innerHTML = nClicks


// To Count Clicks -- End

// To Count Failures -- Start

var nFailures = 0

nFailuresElement = document.getElementById("failuresCounter");

nFailuresElement.innerHTML = nFailures
// To Count Failures -- End

// ----------------------------------------------------------------


const gameCards = ["🤣","🤣","❤️","❤️","🙌","🙌","😁","😁","😘","😘","😎","😎","🤔","🤔","💯","💯"]



var shuffledGameCards = []

function generateGameCards() {
  
  document.querySelector('.gamebody').innerHTML = '' // Ensures that no cards are already displayed : If there are --> Remove them

  shuffledGameCards = gameCards.sort(() => Math.random() - 0.5);

  for(var i = 0; i < shuffledGameCards.length; i++){

  let gameBox = document.createElement('div')
  gameBox.className = 'gameCard'
  gameBox.innerHTML = shuffledGameCards[i]


  gameBox.addEventListener('click',function () {
    if (document.querySelectorAll('.flippedgameCard').length >= 2) {
      // Don't allow clicks if two cards are already flipped
      return;
    }
    else if (this.classList.contains('resultMatches'))
      {
        // Don't allow clicks if the two cards are already matched.
        return;
      }
    nClicks++
    updateClickCount(nClicks)
    console.log('card clicked!')
    this.classList.add('flippedgameCard')
    checkCards();

  })

  document.querySelector('.gamebody').appendChild(gameBox)
  }

  
}

///


function updateClickCount(nClicks)
{
  nClicksElement.innerHTML = nClicks
}

function updateFailureCount(nFailures)
{
  nFailuresElement.innerHTML = nFailures
}


function checkCards(){
    setTimeout(function () {
      const flippedCards = document.querySelectorAll('.flippedgameCard');
      if (flippedCards.length === 2) {

        // Check for match
        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
          // Match found!
          playSuccess()
          flippedCards.forEach(card => {
            card.classList.add('resultMatches');
       
            card.classList.remove('flippedgameCard');
          });



          if(document.querySelectorAll('.resultMatches').length == gameCards.length) // User Won! 
          {
            window.alert('Congratulations ' + ', ' + 'You win!')
            clearInterval(timer)
            document.getElementById('clicksText').hidden = true
            document.getElementById('failuresText').hidden = true

            document.getElementById('resultMessage').style.color= 'green'
            document.getElementById('resultMessage').innerHTML = 'Congratulations, You only needed ' + nClicks + ' clicks to win!'
            
            document.getElementById('resultMessage').hidden = false


          }
        } else {
          playFail()
          // No match, flip cards back
          flippedCards.forEach(card => card.classList.remove('flippedgameCard'));
          // Increase failure counter (optional)
          nFailures++;

          updateFailureCount(nFailures)
        }
      }
    },500)

}

// Game Logic -- End