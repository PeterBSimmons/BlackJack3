'use strict';
var drawCount = 0;
var value = 0;
var playerValue = 0;
var houseValue = 0;
var playerLost = false;
var houseLost = false;


var deck = []; //Array for playing deck
var cardValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cardSuit = ["hearts", "diamonds", "spades", "clubs"];
var drawn = []; //Array for already drawn cards

//Create deck by pairing values and suits to form an array of 52 cards
function createDeck() {
    //Go through the four different suits
    for (var i = 0; i < cardSuit.length; i++) {
        //Go through the 13 different values
        for (var n = 0; n < cardValue.length; n++) {
            //Pair a suit with a value
            var card = {Value: cardValue[n], Suit: cardSuit[i] };
            //push the two values into the deck
            deck.push(card);
        }
    }
    return deck;
}





//Switch  function to pair cards with their value
function cc(card) {
    switch (card) {
        case "2":
            value += 2;
            break;
        case "3":
            value += 3;
            break;
        case "4":
            value += 4;
            break;
        case "5":
            value += 5;
            break;
        case "6":
            value += 6;
            break;
        case "7":
            value += 7;
            break;
        case "8":
            value += 8;
            break;
        case "9":
            value += 9;
            break;
        case "10":
            value += 10;
            break;
        case "J":
            value += 10;
            break;
        case "Q":
            value += 10;
            break;
        case "K":
            value += 10;
            break;
        case "A":
            if (value <= 10) {
                value += 11;
            }
            else {
                value++;
            }
            break;
    }

    return "Card drawn: " + card + " | Current value: " + value
 }



function drawcard() {
    
    //Count number of cards drawn
    drawCount++;

    //Find the random position of the card in the deck array
    var cardPos = Math.floor(Math.random() * deck.length);

    //Find the actual card in the deck array, looking only at the "Value" object in the array, using the randomn position of "cardPos"
    var newCard = deck[cardPos].Value;
    //console.log("Card drawn: " + newCard);

    //Run the Card counting fuction to determine next move
    var go = cc(newCard);

    //Remove the card from the deck array and place it in temp array "cardRemoved"
    var cardRemoved = deck.splice(cardPos, 1);
    //console.log("Card removed " + cardRemoved);

    //Move the card from the temp array "cardRemoved" to the drawn cards array "drawn"
    drawn.unshift(cardRemoved[0]);
    "Card placed in the drawn pile: " + drawn;

    //Clear up the temp array "cardRemoved" before next runthrough
    cardRemoved.shift();

    return go;
    return drawCount;
}

function runGame() {
    for (var i = 0; i < 6; i++) {
        if (value < 17 && drawCount < 5) {
            console.log(drawcard());
        }
        else if (drawCount == 5) {
            console.log("Congratulations, you drew five cards and stayed below 21!");
        }

        else if (value < 22) { // <---------- MISSING: Check if 5 cards has been drawn or if value is blackjack!!
            if (value == 21) {
                console.log("Congratulations, you got Blackjack!");
            }
            else {
                console.log("Player final value: " + value);
            }
            playerValue = value; //Save the total value in a player value variable, before we reset it
            value = 0; //Reset value counter before house draws
            break;
        }
        else {
            console.log("You exceeded 21, better luck next time!");
            playerLost = true; //Keeping track if the player exceeded 21
            playerValue = value;
            value = 0;
            break;
        }
  
    }

    if (playerValue < 21 && drawCount < 5) {
        for (var i = 0; i < 5; i++) {
            if (value <= playerValue && playerLost == false) { //Checks if value is less than or equal to what the play drew
                console.log(drawcard());
            }
            else if (value < 22 && playerLost == false) {
                console.log("House final value: " + value);
                houseValue = value;
                value = 0; //Reset value counter before future second round (to be implemented)
                break;
            }
            else {
                console.log("House exceeded 21, player wins!");
                houseLost = true;
                break;
            }
        }
    }
    else {

    }


    if (playerValue >= houseValue && playerLost == false) {
        console.log("Congratulations, you win!");
    }
    else {
        console.log("Sorry, the house wins. Better luck next time!");
    }

    playerLost == false;
    houseLost == false;
    drawCount = 0;
}

deck = createDeck();
runGame();
console.log("");
console.log("Cards placed in the discard pile:");
console.log(drawn);


//Prevent consol from shutting down
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

var answer = "";
rl.question("Type in your name: ", function(answer) {
    console.log("Good job, " + answer);
    rl.question("Press [Enter] to exit " + answer, function () {
        process.exit();
    });
});



    
