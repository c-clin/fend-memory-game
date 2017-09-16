/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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



// Logic of the game

 // List of opened cards and matched counts

var openList, matchList

openList = [];
matchList = [];

$( ".card" ).click (function() {
    //console.log('click');
    console.log(this);
    var openCard = $(this).toggleClass('open show').children(); // Opens the card when clicked
    console.log(openCard);
    openList.push(openCard); // Add the card opened to the list of open cards
    console.log(openList);
      if ( openList.length > 1) {
        var guess1 = openList[0];
        var guess2 = openList[1];
        console.log(guess1);
        console.log(guess2);
        if (guess1 == guess2) {
          openList[0].removeClass('open show').addClass('match').parent;
          openList[1].removeClass('open show').addClass('match').parent;
          matchList.push( openList[0] && openList[1] );
          console.log(matchList);
          openList = [];
        }
        if (guess1 != guess2) {
          openList[0].removeClass('open show').parent;
          openList[1].removeClass('open show').parent;
          openList = [];
        }
      }
    });


/*if matchCnt === 8; wins

/*
var guess1, guess2


// If cards match, lock them in open position
1. If first guess = second guess, remove 'open show' add 'match' to $('.card').
2. Else, remove 'open show' from $('.card')

if guess1 = guess2 {
  $('.card').removeClass('.open show').addClass('match')
}
else {
  $('.card').removeClass('open show')
}
*/






var allCards = [ 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb' ];

// Shuffle the cards by clicking the restart button.
$('.restart').click (function() {
  console.log('click');
  allCards = shuffle(allCards);
  $('.card').empty();
  for (var i = 0; i < allCards.length; i++) {
    var card = $( 'deck' ).find('card');
    card.append( $("<i class='" + allCards[i] + "'></i>") );
    card = card.next();
  }
});




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
