const { values } = require("./setup")

module.exports.enablePlayAgainButton = () => {
    values.playAgainEnabled = "action=/playAgain method=post";
}
module.exports.enableDealButton = () => {
    values.dealEnabled = "action=/deal method=post";
}
module.exports.enableHitButton = () => {
    values.hitEnabled = "action=/hit method=post";
}
module.exports.enableStayButton = () => {
    values.stayEnabled = "action=/stay method=post";
}
module.exports.enableSplitButton = () => {
    values.splitEnabled = "action=/split method=post";
}
module.exports.enableDoubleDownButton = () => {
    values.doubleDownEnabled = "action=/doubleDown method=post";
}
module.exports.enableBet1000Button = () => {
    values.bet1000Enabled = "action=/bet1000 method=post";
}
module.exports.enableBet5000Button = () => {
    values.bet5000Enabled = "action=/bet5000 method=post";
}
module.exports.enableBet50000Button = () => {
    values.bet50000Enabled = "action=/bet50000 method=post";
}
module.exports.enableBet1000000Button = () => {
    values.bet1000000Enabled = "action=/bet1000000 method=post";
}