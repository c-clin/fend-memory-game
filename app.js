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

 // Creates lists to store open cards and matched cards
var openList, matchList
openList = [];
matchList = [];

$( ".card" ).click (function() {
 //   console.log(this);
    var openCard = $(this).toggleClass('open show').children(); // Opens the card when clicked
    openList.push(openCard); // Add the card opened to the list of open cards
      if ( openList.length > 1) {
        var guess1 = openList[0].attr("class");
        var guess2 = openList[1].attr("class");

        console.log(openList[0])
        console.log(guess1)

        if (guess1 == guess2) {
          console.log("equal")
          openList[0].parent().removeClass('open show').addClass('match animated jello');
          openList[1].parent().removeClass('open show').addClass('match animated jello');
          matchList.push( openList[0] )
          matchList.push( openList[1] );
          console.log("Matched List: " + matchList.length);
          openList = [];
        }
        if (guess1 != guess2) {
          openList[0].parent().addClass('animated shake');
          openList[1].parent().addClass('animated shake');
          setTimeout( function() {
            console.log("working Perfectly");
            openList[0].parent().removeClass('open show animted shake');
            openList[1].parent().removeClass('open show animated shake');
            openList = [];
          }, 800);

        }
      };
      // When player wins
      if ( matchList.length == 16) {
        stopTimer();
        setTimeout(function() {
          alert('Contratulations! You Won!');
      }, 800
)}
});


// Count the player's moves and remove the stars accordingly
var counter = 0;
$('.container').find('.moves').html(counter);
$('.card').click (function() {
  counter = counter + 1
  $('.container').find('.moves').html(counter);
  if (counter > 22) {
    $('.stars').find('#1').remove();
  }
  if (counter > 34) {
    $('.stars').find('#2').remove();
  }
  if (counter > 42) {
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

// Shuffle the cards and restarts everything by clicking the restart button.
$('.restart').click (function() {
  allCards = shuffle(allCards); // Shuffle the array
  $('.card').removeClass('open show match animated shake jello').empty(); // Empty out old cards
  counter = 0
  $('.container').find('.moves').html(counter); // Restart the number of moves made
  var cards = $('.card');
  console.log(cards)
  for (var i = 0; i < cards.length; i++) { // Add newly shuffled cards to the deck
    $(cards[i]).append('<i class="' + allCards[i] + '"></i>');
  }
  $('.stars').empty().append(' <li><i class="fa fa-star" id="1"></i></li><li><i class="fa fa-star" id="2"></i></li><li><i class="fa fa-star" id="3"></i></li> ')
  matchList = []; // Reset match list
  resetTimer(); // Reset timer function
});
