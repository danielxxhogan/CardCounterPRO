const balance = document.getElementById('balanceAmt');
const suggestionDOM = document.getElementById('suggestion');
const countAmt = document.getElementById('countAmt');
const upChevron = document.getElementById('upChevron');
const betAmt = document.getElementById('betAmt');
const downChevron = document.getElementById('downChevron');
const playAgain = document.getElementById('playAgain');
const dealButton = document.getElementById('deal');
const instructions = document.getElementById('instructions');
const playerRow = document.getElementById('playerCardRow');
const dealerRow = document.getElementById('dealerCardRow');
const hitButton = document.getElementById('hit');
const stayButton = document.getElementById('stay');
const splitButton = document.getElementById('split');
const doubleDownButton = document.getElementById('doubleDown');
const bet1000 = document.getElementById('bet1000');
const bet5000 = document.getElementById('bet5000');
const bet50000 = document.getElementById('bet50000');
const bet1000000 = document.getElementById('bet1000000');
const faceDown = document.getElementById('faceDown');
const faceUp = document.getElementById('faceUp');
const potAmt = document.getElementById('potAmt');
const firstCard = document.getElementById('firstCard');
const secondCard = document.getElementById('secondCard');

import { deckF } from "./deck.js";
import { basicStrategyF } from "./basicStrategy.js";
import { deckImagesF } from "./deckImages.js";

let deck = deckF();
let deckArray = Object.keys(deck);
let burnPile = [];
let basicStrategy = basicStrategyF();
let deckImages = deckImagesF();

let count = 0;
let playerTotal = 0;
let playerTotal2 = 0;
let dealerTotal = 0;
let playerBet = 5000;
let pot = 0;
let pot2 = 0;
let playerBalance = 1000000;
let suggestion = "";
let score = "";

let pca = [];
let pca2 = [];
let dca = [];

let split = false;
let hand = 1;

hitButton.disabled = true;
stayButton.disabled = true;
splitButton.disabled = true;
doubleDownButton.disabled = true;
playAgain.disabled = true;
faceDown.classList.add("hidden");
faceUp.classList.add("hidden");
firstCard.classList.add("hidden");
secondCard.classList.add("hidden");

if (playerBalance < 1000) {
    bet1000.disabled = true;
}
if (playerBalance < 5000) {
    bet5000.disabled = true;
}
if (playerBalance < 50000) {
    bet50000.disabled = true;
}
if (playerBalance < 1000000) {
    bet1000000.disabled = true;
}
// ADD FUNCTIONALITY TO THE BET BUTTONS
// ************************************************************************************
upChevron.addEventListener("click", () => {
    playerBet += 1000;
    betAmt.innerHTML = playerBet;
})
downChevron.addEventListener("click", () => {
    if (playerBet >= 1000) {
        playerBet -= 1000;
        betAmt.innerHTML = playerBet;
    }
})
bet1000.addEventListener("click", () => {
    if (playerBalance >= 1000) {
        playerBet = 1000;
        betAmt.innerHTML = playerBet;
    }
})
bet5000.addEventListener("click", () => {
    if (playerBalance >= 5000) {
        playerBet = 5000;
        betAmt.innerHTML = playerBet;
    }
})
bet50000.addEventListener("click", () => {
    if (playerBalance >= 50000) {
        playerBet = 50000;
        betAmt.innerHTML = playerBet;
    }
})
bet1000000.addEventListener("click", () => {
    if (playerBalance >= 1000000) {
        playerBet = 1000000;
        betAmt.innerHTML = playerBet;
    }
})
// INITIAL DEAL
// ************************************************************************************************************************
dealButton.addEventListener('click', () => {
    upChevron.disabled = true;
    downChevron.disabled = true;
    dealButton.disabled = true;
    bet1000.disabled = true;
    bet5000.disabled = true;
    bet50000.disabled = true;
    bet1000000.disabled = true;
    hitButton.disabled = false;
    stayButton.disabled = false;
    doubleDownButton.disabled = false;
    instructions.classList.add("hidden");
    playerRow.classList.remove("hidden");
    dealerRow.classList.remove("hidden");

    // get dealers first card
    deckCheck();
    dca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
    faceDown.innerHTML = deckImages['fd'];
    faceDown.classList.remove("hidden");

    // get dealers second card
    deckCheck();
    dca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
    updateCount(deck[dca[1]].number);
    faceUp.innerHTML = deckImages[dca[1]];
    faceUp.classList.remove("hidden");
    dealerTotal = deck[dca[0]].number + deck[dca[1]].number;

    // get players first card
    deckCheck();
    pca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
    updateCount(deck[pca[0]].number);
    firstCard.innerHTML = deckImages[pca[0]];
    firstCard.classList.remove("hidden");

    // get players second card
    deckCheck();
    pca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
    updateCount(deck[pca[1]].number);
    secondCard.innerHTML = deckImages[pca[1]];
    secondCard.classList.remove("hidden");

    // update the amount for the pot
    pot = playerBet * 2;
    potAmt.innerHTML = pot;
    playerBalance -= playerBet;
    balance.innerHTML = playerBalance;

    // calculate the players score
    calculateScore();
})

// function to check if the deck is empty and shuffles the deck if so
function deckCheck() {
    if (deckArray.length === 0) {
        deckArray = burnPile;
        burnPile = [];
    }
}

function calculateScore() {
    playerTotal = deck[pca[0]].number + deck[pca[1]].number;

    if (playerTotal === 21) {
        console.log("player was dealt 21");
        twentyOne();

    // check to see if both cards are the same if so use bottom section of basicStrategy
    } else if (deck[pca[0]].value === deck[pca[1]].value) {
        splitButton.disabled = false;
        score = deck[pca[0]].number + "-" + deck[pca[1]].number + "-" + deck[dca[1]].number;
        suggestion = basicStrategy[score];
        suggestionDOM.innerHTML = suggestion;

            // if players first card is an ace
    } else if (deck[pca[0]].value === "ace") {
        if (playerTotal <= 12) {
            suggestion = "Hit";
            suggestionDOM.innerHTML = suggestion;
        } else {
            score = deck[pca[0]].number + "-" + deck[pca[1]].number + "-" + deck[dca[1]].number;
            suggestion = basicStrategy[score];
            suggestionDOM.innerHTML = suggestion;
        }
            // if players second card is an ace
    } else if (deck[pca[1]].value === "ace") {
        if (playerTotal <= 12) {
            suggestion = "Hit";
            suggestionDOM.innerHTML = suggestion;
        } else {
            score = deck[pca[1]].number + "-" + deck[pca[0]].number + "-" + deck[dca[1]].number;
            suggestion = basicStrategy[score];
            suggestionDOM.innerHTML = suggestion;
        }
    // anthing else use the top of the basic strategy chart
    } else {
        score = playerTotal + "-" + deck[dca[1]].number;
        suggestion = basicStrategy[score];
        suggestionDOM.innerHTML = suggestion;
    }
}

function updateCount(value) {
    if (value <= 6) {
        count += 1;
    } else if (value >= 10) {
        count -= 1;
    }
    countAmt.innerHTML = count;
}
// TWENTY ONE
// ************************************************************************************************************************
function twentyOne() {
    if (split) {
        if (hand === 1) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>You got 21 on your first Hand You win " + pot*1.5 + "! Now you're playing your second hand</h1>";
            balance.innerHTML = playerBalance;
            firstCard.innerHTML = deckImages[pca2[0]];
            secondCard.innerHTML = deckImages[pca2[1]];
            playerRow.innerHTML = "";
            playerRow.appendChild(firstCard)
            playerRow.appendChild(secondCard)
            hand = 2;

            if (deck[pca2[0]].value === "ace") {
                if (playerTotal <= 12) {
                    suggestion = "Hit";
                    suggestionDOM.innerHTML = suggestion;
                } else {
                    score = deck[pca2[0]].number + "-" + deck[pca2[1]].number + "-" + deck[dca[1]].number;
                    suggestion = basicStrategy[score];
                    suggestionDOM.innerHTML = suggestion;
                }
                    // if players second card is an ace
            } else if (deck[pca2[1]].value === "ace") {
                if (playerTotal <= 12) {
                    suggestion = "Hit";
                    suggestionDOM.innerHTML = suggestion;
                } else {
                    score = deck[pca2[1]].number + "-" + deck[pca2[0]].number + "-" + deck[dca[1]].number;
                    suggestion = basicStrategy[score];
                    suggestionDOM.innerHTML = suggestion;
                }
            // anthing else use the top of the basic strategy chart
            } else {
                score = playerTotal2 + "-" + deck[dca[1]].number;
                suggestion = basicStrategy[score];
                suggestionDOM.innerHTML = suggestion;
            }
        } else if (hand === 2) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>You got 21 on your second Hand You win " + playerBet*1.5*2 + "!</h1>";
            faceDown.innerHTML = deckImages[dca[0]];
            updateCount(deck[dca[0]].number);

            splitWinnings();
        }
    } else {
        playAgain.disabled = false;
        hitButton.disabled = true;
        stayButton.disabled = true;
        doubleDownButton.disabled = true;
        suggestionDOM.innerHTML = "";
    
        instructions.classList.remove("hidden");
        instructions.innerHTML = "<h1>You got 21! You win " + playerBet*1.5*2 + "!</h1>";
        playerBalance += playerBet*1.5*2;
        balance.innerHTML = playerBalance;
        faceDown.innerHTML = deckImages[dca[0]];
        updateCount(deck[dca[0]].number);
    
        dca.forEach((card) => {
            burnPile.push(card);
        })
        dca = [];
        pca.forEach((card) => {
            burnPile.push(card);
        })
        pca = [];
    }
}
// HIT
// ************************************************************************************************************************
hitButton.addEventListener("click", () => {
    doubleDownButton.disabled = true;

    if (split) {
//      If hand = 1, pca1 will be used for the players cards
        if (hand === 1) {
            // give the player a new card
            deckCheck();
            pca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
            updateCount(deck[pca[pca.length-1]].number);
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = deckImages[pca[pca.length-1]];;
            playerRow.appendChild(cardDiv);
            playerTotal += deck[pca[pca.length-1]].number;
            score = playerTotal + "-" + deck[dca[1]].number;
            suggestion = basicStrategy[score];
            suggestionDOM.innerHTML = suggestion;

            // now that the player has a new card either they get 21 an automatically win
            if (playerTotal === 21) {
                twentyOne();
                // they go over 21, lose their first hand and switch to the second hand
            } else if (playerTotal > 21) {
                instructions.classList.remove("hidden");
                instructions.innerHTML = "<h1>You Busted On Your First Hand Now You're Playing the Second Hand</h1>";
                firstCard.innerHTML = deckImages[pca2[0]];
                secondCard.innerHTML = deckImages[pca2[1]];
                playerRow.innerHTML = "";
                playerRow.appendChild(firstCard);
                playerRow.appendChild(secondCard);
                playerTotal2 = deck[pca2[0]].number + deck[pca2[1]].number;
                hand = 2;
            
            // anthing else use the top of the basic strategy chart
            } else {
                score = playerTotal + "-" + deck[dca[1]].number;
                suggestion = basicStrategy[score];
                suggestionDOM.innerHTML = suggestion;
            }
        } else if (hand === 2) {
            // get a new card for the player
            deckCheck();
            pca2.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
            updateCount(deck[pca[pca.length-1]].number);
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = deckImages[pca2[pca2.length-1]];;
            playerRow.appendChild(cardDiv);
            playerTotal2 += deck[pca2[pca2.length-1]].number;

            if (playerTotal2 === 21) {
                twentyOne();

            } else if (playerTotal2 > 21) {
                splitWinnings();
            
            } else {
                score = playerTotal2 + "-" + deck[dca[1]].number;
                suggestion = basicStrategy[score];
                suggestionDOM.innerHTML = suggestion;
            }
            hand = 1;
        }

    } else {
        deckCheck();
        pca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
        updateCount(deck[pca[pca.length-1]].number);
        let cardDiv = document.createElement("div");
        cardDiv.innerHTML = deckImages[pca[pca.length-1]];;
        playerRow.appendChild(cardDiv);
        playerTotal += deck[pca[pca.length-1]].number;
        score = playerTotal + "-" + deck[dca[1]].number;
        suggestion = basicStrategy[score];
        suggestionDOM.innerHTML = suggestion;

        if (playerTotal === 21) {
            twentyOne();

        } else if (playerTotal > 21) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>You Busted!</h1>";
            faceDown.innerHTML = deckImages[dca[0]];
            updateCount(deck[dca[0]].number);
            suggestionDOM.innerHTML = "";

            playAgain.disabled = false;
            hitButton.disabled = true;
            stayButton.disabled = true;

            dca.forEach((card) => {
                burnPile.push(card);
            })
            dca = [];
            pca.forEach((card) => {
                burnPile.push(card);
            })
            pca = [];
        }
    }
})
// STAY
// ************************************************************************************************************************
stayButton.addEventListener("click", () => {

    if (split) {
        console.log("dealers cards: " + dca);
        if (hand === 1) {
            // if they player stays on their first hand, switch over to the second hand
            hand = 2;
            instructions.innerHTML = "<h1>You stayed on your first hand. Your now playing your second hand</h1>";
            firstCard.innerHTML = deckImages[pca2[0]];
            secondCard.innerHTML = deckImages[pca2[1]];
            // if they stay on their second hand, both hands are over
        } else if (hand === 2) {
            faceDown.innerHTML = deckImages[dca[0]];
            updateCount(deck[dca[0]].number);

            while(dealerTotal < 17) {
                deckCheck();
                dca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
                updateCount(deck[dca[dca.length-1]].number);
                dealerTotal += deck[dca[dca.length-1]].number;
                let cardDiv = document.createElement("div");
                cardDiv.innerHTML = deckImages[dca[dca.length-1]];
                dealerRow.appendChild(cardDiv);
            }
            splitWinnings();
        }
    } else {
        stayButton.disabled = true;
        hitButton.disabled = true;
        splitButton.disabled = true;
        doubleDownButton.disabled = true;
        playAgain.disabled = false;
        suggestionDOM.innerHTML = "";
        faceDown.innerHTML = deckImages[dca[0]];
        updateCount(deck[dca[0]].number);
        // if split is false and player stays, it is now the dealers turn:
        while(dealerTotal < 17) {
            deckCheck();
            dca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
            updateCount(deck[dca[dca.length-1]].number);
            dealerTotal += deck[dca[dca.length-1]].number;
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = deckImages[dca[dca.length-1]];
            dealerRow.appendChild(cardDiv);
        }
        if (dealerTotal > 21) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>Dealer Busted. You Win!</h1>";
            playerBalance += pot;
            balance.innerHTML = playerBalance;

        } else if (playerTotal > dealerTotal) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>You Win!</h1>";
            playerBalance += pot;
            balance.innerHTML = playerBalance;

        } else if (playerTotal < dealerTotal) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>You Lose!</h1>";

        } else {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>It's A Push!</h1>";
            playerBalance += playerBet;
            balance.innerHTML = playerBalance;
        }
        dca.forEach((card) => {
            burnPile.push(card);
        });
        dca = [];
        pca.forEach((card) => {
            burnPile.push(card);
        });
        pca = [];
    }
})
// SPLIT
// ************************************************************************************************************************
splitButton.addEventListener('click', () => {
    instructions.classList.remove("hidden");
    instructions.innerHTML = "<h1>You split your hands you are now playing the first hand</h1>";
    split = true;
    splitButton.disabled = true;
    doubleDownButton.disabled = true;

    pca2.push(pca.pop());
    deckCheck();
    pca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
    updateCount(deck[pca[0]].number);
    deckCheck();
    pca2.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
    updateCount(deck[pca[0]].number);
    playerTotal = deck[pca[0]].number + deck[pca[1]].number;
    playerTotal2 = deck[pca2[0]].number + deck[pca2[1]].number;
    pot2 = playerBet;
    playerBalance -= playerBet;
    balance.innerHTML = playerBalance;
    secondCard.innerHTML = deckImages[pca[1]];

    if (playerTotal === 21) {
        twentyOne();
    } else if (deck[pca[0]].value === "ace") {
        console.log("first card is an ace");
        ace = true;
        if (playerTotal <= 12) {
            suggestion = "Hit";
            suggestionDOM.innerHTML = suggestion;
        } else {
            score = deck[pca[0]].number + "-" + deck[pca[1]].number + "-" + deck[dca[1]].number;
            suggestion = basicStrategy[score];
            suggestionDOM.innerHTML = suggestion;
        }

    } else if (deck[pca[1]].value === "ace") {
        if (playerTotal <= 12) {
            suggestion = "Hit";
            suggestionDOM.innerHTML = suggestion;
        } else {
            score = deck[pca[1]].number + "-" + deck[pca[0]].number + "-" + deck[dca[1]].number;
            suggestion = basicStrategy[score];
            suggestionDOM.innerHTML = suggestion;
        }

    } else {
        score = playerTotal + "-" + deck[dca[1]].number;
        console.log(score);
        suggestion = basicStrategy[score];
        console.log(suggestion);
        suggestionDOM.innerHTML = suggestion;
    }
})

function splitWinnings() {
    instructions.classList.remove("hidden");

    if (playerTotal === 21) {
        if (playerTotal2 === 21) {
            instructions.innerHTML = "<h1>Both hands got 21!</h1>";
            playerBalance += pot*1.5*2;
        } else if (playerTotal2 > 21) {
            instructions.innerHTML = "<h1>First hand was 21! Second hand busted!</h1>";
            playerBalance += pot*1.5;
        } else if (dealerTotal > 21) {
            instructions.innerHTML = "<h1>First hand was 21! Dealer busted!</h1>";
            playerBalance += pot*2.5
        } else if (playerTotal2 > dealerTotal) {
            instructions.innerHTML = "<h1>First hand was 21! Second hand beat the dealer</h1>";
            playerBalance += pot*2.5;
        } else if (playerTotal2 < dealerTotal) {
            instructions.innerHTML = "<h1>First hand was 21! Second hand lost to the dealer</h1>";
            playerBalance += pot*1.5;
        } else {
            instructions.innerHTML = "<h1>First hand was 21! Second hand was a push</h1>";
            playerBalance += pot*1.5 + playerBet;
        }

    } else if (playerTotal > 21) {
        if (playerTotal2 === 21) {
            instructions.innerHTML = "<h1>First hand was a bust! Second hand was 21!</h1>";
            playerBalance += pot*1.5;
        } else if (playerTotal2 > 21) {
            instructions.innerHTML = "<h1>Both hands were a bust!</h1>";
        } else if(dealerTotal > 21) {
            instructions.innerHTML = "<h1>First hand was a bust! Dealer busted!</h1>";
            playerBalance += pot;
        } else if (playerTotal2 > dealerTotal) {
            instructions.innerHTML = "<h1>First hand was a bust! Second hand beat dealer!</h1>";
            playerBalance += pot;
        } else if (playerTotal2 < dealerTotal) {
            instructions.innerHTML = "<h1>First hand was a bust! Second hand lost to dealer!</h1>";
        } else {
            instructions.innerHTML = "<h1>First hand was a bust! Second was a push!</h1>";
            playerBalance += playerBet;
        }
    } else if (dealerTotal > 21) {
        if (playerTotal2 > 21) {
            instructions.innerHTML = "<h1>Dealer busted! Second hand busted!</h1>";
            playerBalance += pot;
        } else {
            instructions.innerHTML = "<h1>Dealer busted! You win both hands</h1>";
            playerBalance += pot*2;
        }
    } 
    else if (playerTotal > dealerTotal) {
        if (playerTotal2 === 21) {
            instructions.innerHTML = "<h1>First hand beat dealer! Second was 21!</h1>";
            playerBalance += pot*2.5
        } else if (playerTotal2 > 21) {
            instructions.innerHTML = "<h1>First hand beat dealer! Second was busted!</h1>";
            playerBalance += pot
        } else if (playerTotal2 > dealerTotal) {
            instructions.innerHTML = "<h1>Both hands beat dealer!</h1>";
            playerBalance += pot*2;
        } else if (playerTotal2 < dealerTotal) {
            instructions.innerHTML = "<h1>First hand beat dealer! Second hand lost to dealer</h1>";
            playerBalance += pot;
        } else {
            instructions.innerHTML = "<h1>First hand beat dealer! Second hand was a push</h1>";
            playerBalance += pot + playerBet;
        }

    } else if (playerTotal < dealerTotal) {
        if (playerTotal2 === 21) {
            instructions.innerHTML = "<h1>First hand lost to dealer! Second hand was 21!</h1>";
            playerBalance += pot*1.5;
        } else if (playerTotal2 > 21) {
            instructions.innerHTML = "<h1>First hand lost to dealer! Second hand busted!</h1>";
        } else if (playerTotal2 > dealerTotal) {
            instructions.innerHTML = "<h1>First hand lost to dealer! Second hand beat dealer!</h1>";
            playerBalance += pot;
        } else if (playerTotal2 < dealerTotal) {
            instructions.innerHTML = "<h1>Both hands lost to dealer!</h1>";
        } else {
            instructions.innerHTML = "<h1>First hand lost to dealer! Second hand was a push!</h1>";
            playerBalance += playerBet;
        }

    } else {
        if (playerTotal2 === 21) {
            instructions.innerHTML = "<h1>First hand was a push! Second hand was 21!</h1>";
            playerBalance += pot*1.5 + playerBet;
        } else if (playerTotal2 > 21) {
            instructions.innerHTML = "<h1>First hand was a push! Second hand was a bust!</h1>";
            playerBalance += playerBet;
        } else if (playerTotal2 > dealerTotal) {
            instructions.innerHTML = "<h1>First hand was a push! Second hand beat dealer!</h1>";
            playerBalance += playerBet + pot;
        } else if (playerTotal2 < dealerTotal) {
            instructions.innerHTML = "<h1>First hand was a push! Second hand lost to dealer!</h1>";
            playerBalance += playerBet;
        } else {
            instructions.innerHTML = "<h1>Both hands were a push!</h1>";
            playerBalance += playerBet*2;
        }
    }
    playAgain.disabled = false;
    hitButton.disabled = true;
    stayButton.disabled = true;

    pca.forEach((card) => {
        burnPile.push(card);
    })
    pca = [];

    pca2.forEach((card) => {
        burnPile.push(card);
    })
    pca2 = [];

    dca.forEach((card) => {
        burnPile.push(card);
    })
    dca = [];
    split = false;
    hand = 1;
}
// DOUBLE DOWN
// ************************************************************************************************************************
doubleDownButton.addEventListener("click", () => {
    playAgain.disabled = false;
    doubleDownButton.disabled = true;
    splitButton.disabled = true;
    hitButton.disabled = true;
    stayButton.disabled = true;
    pot += playerBet;
    potAmt.innerHTML = pot;
    playerBalance -= playerBet*0.5;
    balance.innerHTML = playerBalance;
    playerBet = playerBet*1.5;
    betAmt.innerHTML = playerBet;
    faceDown.innerHTML = deckImages[dca[0]];
    updateCount(deck[dca[0]].number);
    deckCheck();
    pca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
    updateCount(deck[pca[pca.length-1]].number);
    let cardDiv = document.createElement("div");
    cardDiv.innerHTML = deckImages[pca[pca.length-1]];
    playerRow.appendChild(cardDiv);
    playerTotal += deck[pca[pca.length-1]].number;
    suggestionDOM.innerHTML = "";

    if (playerTotal > 21) {
        instructions.classList.remove("hidden");
        instructions.innerHTML = "<h1>You Busted!</h1>";
        suggestionDOM.innerHTML = "";

    } else if (playerTotal === 21) {
        twentyOne();
    
    } else {
        while(dealerTotal < 18) {
            deckCheck();
            dca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
            updateCount(deck[dca[dca.length-1]].number);
            dealerTotal += deck[dca[dca.length-1]].number
            cardDiv = document.createElement("div");
            cardDiv.innerHTML = deckImages[dca[dca.length-1]];
            dealerRow.appendChild(cardDiv);
        }
        if (dealerTotal > 21) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>Dealer Busted! You Win!</h1>";
            playerBet += pot;
            balance.innerHTML = playerBalance;

        } else if (playerTotal > dealerTotal) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>You Win!</h1>";
            playerBalance += pot;
            balance.innerHTML = playerBalance;

        } else if (playerTotal < dealerTotal) {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>You Lose!</h1>";

        } else {
            instructions.classList.remove("hidden");
            instructions.innerHTML = "<h1>It's A Push!</h1>";
            playerBalance += playerBet;
            balance.innerHTML = playerBalance;
        }
    }
    dca.forEach((card) => {
        burnPile.push(card);
    })
    dca = [];

    pca.forEach((card) => {
        burnPile.push(card);
    })
    pca = [];
})
// PLAY AGAIN 
// ************************************************************************************************************************
playAgain.addEventListener("click", () => {
    playAgain.disabled = true;
    upChevron.disabled = false;
    downChevron.disabled = false;
    dealButton.disabled = false;
    bet1000.disabled = false;
    bet5000.disabled = false;
    bet50000.disabled = false;
    bet1000000.disabled = false;

    dealerRow.innerHTML = "";
    dealerRow.appendChild(faceDown);
    dealerRow.appendChild(faceUp);
    dealerRow.classList.add("hidden");

    playerRow.innerHTML = "";
    playerRow.appendChild(firstCard);
    playerRow.appendChild(secondCard);
    playerRow.classList.add("hidden");

    instructions.innerHTML = "<h1>Place Your Bet</h1>";
})