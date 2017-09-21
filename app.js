var minutes, seconds, timeZero, setTimer;

minutes = 0;
seconds = 0;
timeZero = "<i class='fa fa-clock-o'></i> Timer " + minutes + ":" + seconds;
$('.timer').html(timeZero);

// Set timer when player begins the game
function startTimer() {
  setTimer = setInterval( function () {
   if (seconds < 59 ) {
     seconds++;
   }
   else {
     seconds = 0;
     minutes ++;
   }
   timeZero = "<i class='fa fa-clock-o'></i> Timer " + minutes + ":" + seconds;
   $('.timer').html(timeZero);
 }, 1000);
}

var timer = $('.timer').html(timeZero);

// Activate the timer with the first click
$('.deck').one( 'click', function() {
  startTimer();
});

// Stop timer function
function stopTimer() {
  clearInterval(setTimer);
}

// Function to reset timer
function resetTimer() {
  minutes = 0;
  seconds = 0;
  timeZero = "<i class='fa fa-clock-o'></i> Timer " + minutes + ":" + seconds;
  $('.timer').html(timeZero);
  startTimer();
};



// Count the player's moves and remove the stars accordingly
var counter, theStar;
counter = 0;
$('.container').find('.moves').html(counter);
var numberOfStars = $('.card').click (function() {
    counter = counter + 1;
    $('.container').find('.moves').html(counter);
    if (counter < 21) {
      theStar = "3 stars"
    }
    if (counter > 20) {
      $('.stars').find('#1').remove();
      theStar = "2 stars"
    }
    if (counter > 30) {
      $('.stars').find('#2').remove();
      theStar = "1 star"
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

  // Array of all cards
  var allCards = [
    'fa fa-diamond',
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-cube',
    'fa fa-bicycle',
    'fa fa-bicycle',
    'fa fa-bomb',
    'fa fa-bomb',
    'fa fa-leaf',
    'fa fa-leaf'
    ];

  // Shuffle the cards and restarts the score and timer by clicking the restart button.
  $('.restart').click (function() {
    allCards = shuffle(allCards); // Shuffle the array
    $('.card').removeClass('open show match animated shake jello').empty(); // Empty out old cards
    counter = 0;
    $('.container').find('.moves').html(counter); // Restart the number of moves made
    var cards = $('.card');
    console.log(cards);
    for (var i = 0; i < cards.length; i++) { // Add newly shuffled cards to the deck
      $(cards[i]).append('<i class="' + allCards[i] + '"></i>');
    }
    $('.stars').empty().append(' <li><i class="fa fa-star" id="1"></i></li><li><i class="fa fa-star" id="2"></i></li><li><i class="fa fa-star" id="3"></i></li> ');
    matchList = []; // Reset match list
    stopTimer();
    resetTimer();
  });

 // Creates lists to store open cards and matched cards
var openList, matchList;
openList = [];
matchList = [];

// Logic of the game
$( ".card" ).click (function() {
    var openCard = $(this).toggleClass('open show').children(); // Opens the card when clicked
    openList.push(openCard); // Add the card opened to the list of open cards
      if ( openList.length > 1) {
        var guess1 = openList[0].attr("class");
        var guess2 = openList[1].attr("class");
        if (guess1 == guess2) { // Cards matching, keep them flipped up
          openList[0].parent().removeClass('open show').addClass('match animated jello');
          openList[1].parent().removeClass('open show').addClass('match animated jello');
          matchList.push( openList[0] ); // Add the matching cards to matching list
          matchList.push( openList[1] );
          console.log("Matched List: " + matchList.length);
          openList = []; // Clear the open cards list
        }
        if (guess1 != guess2) { // Cards not matching, flip them back
          openList[0].parent().addClass('animated shake');
          openList[1].parent().addClass('animated shake');
          setTimeout( function() {
            openList[0].parent().removeClass('open show animted shake');
            openList[1].parent().removeClass('open show animated shake');
            openList = [];
          }, 500);
        }
      }

      // When player wins
      if (matchList.length == 16) {
        stopTimer();
        setTimeout(function() {
          console.log(timer);
          alert('Contratulations, you won! Your time was ' + minutes + ":" + seconds + " and your star rating was " + theStar + "! Click the restart button to play again.");
        }, 800);
      }
});
