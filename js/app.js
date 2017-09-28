let card1 = null;
let card2 = null;
let currentRound = [];
let matchedCards = 0;
let counter = 0;
const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

$(document).ready(placeCards(cards));

function placeCards(cards) {
  cards = shuffle(cards);

  for (let i = 0; i < cards.length; i++) {
    $('.deck').append('<li class="card">');
    $('.deck li:last-child').append("<i></i>");
    $('.deck li:last-child i').addClass(cards[i]);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

$('.deck').on('click', 'li', function() {
    currentCard = $(this);
    showCard(currentCard);
    recordRound(currentCard);
    if (currentRound.length === 2) {
        processRound(currentRound);
    }
});
  
function showCard(card) {
  card.toggleClass('show')
};

function recordRound(card) {
  if (currentRound.length === 0) {
    card1 = card;
    cardType = $(card).children().attr("class");
    currentRound.push(cardType);
  } else {
    card2 = card;
    cardType = $(card).children().attr("class");
    currentRound.push(cardType);
  }
}

function processRound(round) {
  if (currentRound[0] === currentRound[1]) {
    card1.addClass('match');
    card2.addClass('match');
    matchedCards += 2;
  } else {
    card1.toggleClass('show');
    card2.toggleClass('show');
  } 
  currentRound = [];
  card1 = null;
  card2 = null;
  counter++;
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
