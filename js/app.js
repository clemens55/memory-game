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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function initGame() {
    var deck = document.querySelector(".deck");
    var cardHTML = shuffle(cards).map(function(card){
        return generateCard(card);
    });
   
    deck.innerHTML = cardHTML.join('');
}
initGame();

var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves = document.getElementById('moves').textContent;
let hours = 0;
let minutes = 0;
let seconds = 0;

allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
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
                    
                } else {
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                    });
                    
                    openCards = [];
                }, 500);
            }       
                //incrementMove();
                
            }
        }
    });
});


/*function incrementMove(){
    moves += 1;
}; */

//count function for the timer
var clicked = false;
var sec = 0;

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
    sec = 0;
    document.getElementById("timer").innerHTML=0;
    clicked = false;
}
