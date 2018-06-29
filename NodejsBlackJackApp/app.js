'use strict';
var count = 0;
var drawCount = 0;
var value = 0;
var playerValue = 0;
var houseValue = 0;
var playerLost = false;
var houseLost = false;

//Create card deck of 52 cards in an array
var deck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10,
    10, 10, 10, "J", "J", "J", "J", "Q", "Q", "Q", "Q", "K", "K", "K", "K", "A", "A", "A", "A"];

//This is a test for the branch repositories

//Testdeck
//var deck = ["A", "A", "A", "A", "J", "J", "J", "J"];

//Array for already drawn cards
var drawn = [];

function cc(card) {
    switch (card) {
        case 2:
            count++;
            value += 2;
            break;
        case 3:
            count++;
            value += 3;
            break;
        case 4:
            count++;
            value += 4;
            break;
        case 5:
            count++;
            value += 5;
            break;
        case 6:
            count++;
            value += 6;
            break;
        case 7:
            value += 7;
            break;
        case 8:
            value += 8;
            break;
        case 9:
            value += 9;
            break;
        case 10:
            count--;
            value += 10;
            break;
        case "J":
            count--;
            value += 10;
            break;
        case "Q":
            count--;
            value += 10;
            break;
        case "K":
            count--;
            value += 10;
            break;
        case "A":
            count -= 1;
            if (value <= 10) {
                value += 11;
            }
            else {
                value++;
            }
            break;
    }

    return "Card drawn: " + card + " | Current value: " + value

    /*if (value <= 21) {
        if (count > 0) {
            return "Card drawn: " + card + " | Current value: " + value + " | Current count: " + count + " Bet";
        }
        else {
            return "Card drawn: " + card + " | Current value: " + value + " | Current count: " + count + " Hold";
        }
    }
    else if (value > 21) {
        return "YOU LOSE!"
    }*/

 }



function drawcard() {
    
    //Count number of cards drawn
    drawCount++;

    //Find the position of the card in the deck array
    var cardPos = Math.floor(Math.random() * deck.length);

    //Find the actual card in the deck array
    var newCard = deck[cardPos];
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


    //console.log("Total player value: " + playerValue);
    //console.log("Total house value: " + houseValue);

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

runGame();



/*//Draw up to five random cards from the deck if the current value of cards drawn is less than 17 and place the card in the drawn array
for (var i = 0; i < 5; i++) {
    if (value < 17) {

        //Find the position of the card in the deck array
        var cardPos = Math.floor(Math.random() * deck.length);

        //Find the actual card in the deck array
        var newCard = deck[cardPos];
        //console.log("Card drawn: " + newCard);

        //Run the Card counting fuction to determine next move
        console.log(cc(newCard));

        //Remove the card from the deck array and place it in temp array "cardRemoved"
        var cardRemoved = deck.splice(cardPos, 1);
        //console.log("Card removed " + cardRemoved);
        
        //Move the card from the temp array "cardRemoved" to the drawn cards array "drawn"
        drawn.unshift(cardRemoved[0]);
        console.log("Card placed in the drawn pile: " + drawn);

        //Clear up the temp array "cardRemoved" before next runthrough
        cardRemoved.shift();
    }
    else {
        console.log("Final value: " + value);
        value = playValue;
        value = 0;
        break;
    }
}*/

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



    
