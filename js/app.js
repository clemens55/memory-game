/*
 * Create a list that holds all of your cards
 */
var cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb'
            ];

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//

function initGame() {
    var deck = document.querySelector('.deck');
    var cardHTML = shuffle(cards).map(function(card){
        return generateCard(card);
    });
   
    deck.innerHTML = cardHTML.join('');
}
initGame();


//Declare variables
var allCards = document.querySelectorAll('.card');
var openCards = [];
let count = 0;
var move = 0;

//count function for the timer
var clicked = false;
var sec = 0;

//FlippingCards
allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        //start Timer
        startClock();
        
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            
            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');
                    
                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');
                    
                    openCards = [];
                    count += 1;
                    move += 1;
                    increseMove();
                    star();
                    
                    //Finish Game
                    if (count === 8) {
                        endGame(); 
                    }    
                    
                } else {
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                    });
                    
                    move += 1;
                    increseMove();
                    star();
                    openCards = [];
                    
                }, 500);
            }       
                
            }
        } 
    });
});

//set up moves
function increseMove() {
    document.getElementById('moves').innerHTML = move;
}

//star rating
function star() {
    if (move === 15) {
        document.getElementById('star-3').className = "fa fa-star-o";
    } else if (move === 20) {
        document.getElementById('star-2').className = "fa fa-star-o";
    } else if (move === 25) {
        document.getElementById('star-1').className = "fa fa-star-o";
    }
}

//timer

function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 1000);
        clicked = true;
    }
    else if (clicked === true) {
    }
}

function stopWatch() {
    sec++;
    document.getElementById("timer").innerHTML = sec;
}

function stopClock() {
    window.clearInterval(clock);
    document.getElementById("timer").innerHTML=sec;
    clicked = false;
}

//reload
function reload() {
    location.reload();
};  

//finish game
function endGame() {
    const stars = document.getElementsByClassName('fa fa-star');
    var txt;
    if (confirm(`Congrats! You just won the game in ${sec} seconds with ${stars.length}/3 star rating. Do you want to play again?`)) {
        reload();
    } else {
        txt = "You pressed Cancel!";
        stopClock();
    }
}