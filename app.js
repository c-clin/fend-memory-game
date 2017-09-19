/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Logic of the game

var minutes, seconds, timeZero, setTimer;
minutes = 0
seconds = 0
timeZero = "<i class='fa fa-clock-o'></i> Timer " + minutes + ":" + seconds;
$('.timer').html(timeZero);

// Set timer when player begins the game
function startTimer() {
  setTimer = setInterval( function () {
   if (seconds < 59 ) {
     seconds++
     console.log(seconds);
   }
   else {
     seconds = 0
     minutes ++
     console.log(minutes);
   }
   timeZero = "<i class='fa fa-clock-o'></i> Timer " + minutes + ":" + seconds;
   $('.timer').html(timeZero);
 }, 1000);
};

// Activate the timer with the first click
$('.deck').one( 'click', function() {
  startTimer()
});

// Stop timer function
function stopTimer() {
  clearInterval(setTimer);
};

// Function to reset timer
function resetTimer() {
  minutes = 0;
  seconds = 0;
  timeZero = "<i class='fa fa-clock-o'></i> Timer " + minutes + ":" + seconds;
  $('.timer').html(timeZero);
  $('.deck').one( 'click', function() {
    startTimer()
  });
};

 // List of opened cards and matched counts
var openList, matchList
openList = [];
matchList = [];

$( ".card" ).click (function() {
    //console.log('click');
 //   console.log(this);
    var openCard = $(this).toggleClass('open show').children(); // Opens the card when clicked
 //   console.log(openCard);
    openList.push(openCard); // Add the card opened to the list of open cards
 //   console.log(openList);
      if ( openList.length > 1) {
        var guess1 = openList[0].attr("class");
        var guess2 = openList[1].attr("class");

        console.log(openList[0])
        console.log(guess1)

        if (guess1 == guess2) {
          console.log("equal")
          openList[0].parent().removeClass('open show').addClass('match');
          openList[1].parent().removeClass('open show').addClass('match');
          matchList.push( openList[0] )
          matchList.push( openList[1] );
          console.log("Matched List " + matchList.length);
          openList = [];
        }
        if (guess1 != guess2) {
          // Use setTimeout
          openList[0].parent().removeClass('open show');
          openList[1].parent().removeClass('open show');
          openList = [];
        }
      }
      // When player wins
      if ( matchList.length == 16) {
        stopTimer();
        setTimeout(function() {
          alert('Contratulations! You Won!');
      }, 1000
)}
});


// Count the moves and remove the stars accordingly
var counter = 0;
$('.container').find('.moves').html(counter);

$('.card').click (function() {
  counter = counter + 1
  $('.container').find('.moves').html(counter);
  if (counter > 20) {
    $('.stars').find('#1').remove();
  }
  if (counter > 30) {
    $('.stars').find('#2').remove();
  }
  if (counter > 40) {
    $('.stars').find('#3').remove();
  }
});


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


var allCards = [ 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb' ];

// Shuffle the cards and restarts everything by clicking the restart button.
$('.restart').click (function() {
  allCards = shuffle(allCards);
  $('.card').empty().removeClass('open show match');
  counter = 0
  $('.container').find('.moves').html(counter);
  var cards = $('.card');
  console.log(cards)
  for (var i = 0; i < cards.length; i++) {
    $(cards[i]).append('<i class="' + allCards[i] + '"></i>');
  }
  $('.stars').empty().append(' <li><i class="fa fa-star" id="1"></i></li><li><i class="fa fa-star" id="2"></i></li><li><i class="fa fa-star" id="3"></i></li> ')
  matchList = [];
  resetTimer();
});



/* Problem:
1. After resetting the Timer, how do you make it start on the first click instead of automatic?
2. How to move the timer closer to the right in HTML?

*/






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
