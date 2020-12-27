module.exports.values = {
    
    balance: 1000000,
    suggestion: "",
    count: 0,
    playerBet: 5000,
    playAgainEnabled: "",
    dealEnabled: "action=/deal method=post",
    instructions: "Place Your Bet",
    faceDown: "face-down",
    fdHidden: "class=hidden",
    faceUp: "ace-spades",
    fuHidden: "class=hidden",
    pot: "#",
    firstCard: "king-spades",
    fcHidden: "class=hidden",
    secondCard: "queen-spades",
    scHidden: "class=hidden" ,
    hitEnabled: "",
    stayEnabled: "",
    splitEnabled: "",
    doubleDownEnabled: "",
    bet1000Enabled: "action=/bet1000 method=post",
    bet5000Enabled: "action=/bet5000 method=post",
    bet50000Enabled: "action=/bet50000 method=post",
    bet1000000Enabled: "action=/bet1000000 method=post"
    // I need to add disablers and enablers for the chevron buttons
    // at this point i can update the screen, disable and enable buttons
    // I still need to add the for loop to ejs for rendering all the divs
    // necessary to render all the cards.

    // Once thats done I think its time to start rewriting the logic.


    // anything else that needs to be hidden at any point needs one of these
    // and I need to add the ejs to the index file
    // now i have functionality to all my buttons, can disable/enable them
    // and I can update all the values on the screen that i need to.
    // the next thing I need to do is add a for loop to index
    // i will need to have dca and pca in values and be able to pass those arrays to index
    // then index will loop over the arrays and create the appropriate number of divs for that array
}
