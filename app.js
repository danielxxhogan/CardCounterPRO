const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const v = require(__dirname + "/setup");
const values = v.values;

const bs = require(__dirname + "/basicStrategy");
const basicStrategy = bs.basicStrategy;

const d = require(__dirname + "/deck");
const deck = d.deck;
let deckArray = Object.keys(deck);

const di = require(__dirname + "/deckImages");
const deckImages = di.deckImages;

const dis = require(__dirname + "/disablers");
dis.disableBet1000Button();

const en = require(__dirname + "/enablers");
en.enablePlayAgainButton();
en.enableHitButton();

let dca = [];
dca.push(deckArray.splice(Math.floor(Math.random()*deckArray.length), 1));
values.firstCard = deckImages[dca[0]];

app.get("/", (req, res) => {
    res.render("index", {values});
})

app.post("/playAgain", (req, res) => {
    res.send("you hit play again");
});

app.post("/deal", (req, res) => {
    res.send("you hit deal");
});

app.post("/hit", (req, res) => {
    res.send("you hit it");
});
app.post("/stay", (req, res) => {
    res.send("you hit it");
});
app.post("/split", (req, res) => {
    res.send("you hit it");
});
app.post("/doubleDown", (req, res) => {
    res.send("you hit it");
});
app.post("/bet1000", (req, res) => {
    values.playerBet = 1000;
    res.redirect("/");
});

app.post("/upChevron", (req, res) => {
    if (values.balance - 5000 > 0) {
        values.playerBet += 5000;
    }
    res.redirect("/");
});

app.post("/downChevron", (req, res) => {
    if (values.playerBet > 5000) {
        values.playerBet -= 5000;
    }
    res.redirect("/");
});


app.post("/bet5000", (req, res) => {
    values.playerBet = 5000;
    res.redirect("/");
});


app.post("/bet50000", (req, res) => {
    values.playerBet = 50000;
    res.redirect("/");
});

app.post("/bet1000000", (req, res) => {
    values.playerBet = 1000000;
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})