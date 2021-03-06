let card1 = null;
let card2 = null;
let currentRound = [];
let matchedCards = 0;
let turns = 0;
let pass = true;
const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

$(document).ready(placeCards(cards));

function placeCards(cards) {
  cards = shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    $('.deck').append('<li class="card">');
    $('.deck li:last-child').addClass('a' + i);
    $('.deck li:last-child').append("<i></i>");
    $('.deck li:last-child i').addClass(cards[i]);
  }
  $('.stars').html("Turns: 0");
}

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

$('.restart').click(function() {
  $('.card').remove();
  card1 = null;
  card2 = null;
  currentRound = [];
  matchedCards = 0;
  turns = 0;
  pass = true;
  placeCards(cards);
});

$('.deck').on('click', 'li', function() {
  currentCard = $(this);
  recordRound(currentCard);
  if (pass === true) {
      showCard(currentCard);
  } else {
      pass = true;
  }
  if (currentRound.length === 2) {
    processRound(currentRound);
  }
});
  
function showCard(card) {
  card.toggleClass('show')
};

function recordRound(card) {
  let cardType = null;
  if (currentRound.length === 0) {
    card1 = card;
    cardType = $(card).children().attr("class");
    currentRound.push(cardType);
  } else {
    if (card.attr('class') === card1.attr('class')) {
        $('.stars').html("Turns: " + turns + " Invalid Choice");
      setTimeout(function() {
        $('.stars').html("Turns: " + turns);
      }, 1500);
      pass = false;
    } else {
      card2 = card;
      cardType = $(card).children().attr("class");
      currentRound.push(cardType);
    }
  }
}


function processRound(round) {
  if (currentRound[0] === currentRound[1]) {
    card1.addClass('match animated pulse');
    card2.addClass('match animated pulse');
    matchedCards += 2;
    match();
  } else {
    card1.addClass('animated ' + 'shake');
    card2.addClass('animated ' + 'shake');
    misMatch();
  } 
  currentRound = [];
  card1 = null;
  card2 = null;
  turns++;
  updateState();
}

function updateState() {
  $('.stars').html("Turns: " + turns);
  $('.stars').prepend('<span class=".stats"></span>');
  $('.stars').append('<span class=".stats"></span>');
  if (matchedCards === 16) {
    displayVictoryStars();
  }
}

function match() {
  setTimeout(function() {
    card1.removeClass('animated ' + 'pulse');
    card2.removeClass('animated ' + 'pulse');
  }, 2000);
};

function misMatch() {
  setTimeout(function() {
    card1.removeClass('animated ' + 'shake');
    card2.removeClass('animated ' + 'shake');
    card1.toggleClass('show');
    card2.toggleClass('show');
  }, 2000);
};
  
function displayVictoryStars() {
  let stars = 0;
  if (turns < 11) {
      stars = 3;
  } else if (turns < 16) {
      stars = 2;
  } else if (turns < 21) {
      stars = 1;
  }
  for (let i = 0; i < stars; i++) {
    $('.stars').append('<li class="card">');
    $('.stars li:last-child').append("<i></i>");
    $('.stars li:last-child i').addClass('fa fa-star');
  }
  $('.restart').prepend('<span class=".stats">Well Done!</span><span class=".stats">Play Again?</span><span class=".stats"></span>');
}