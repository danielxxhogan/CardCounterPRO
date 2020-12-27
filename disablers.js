const { values } = require("./setup")

module.exports.disablePlayAgainButton = () => {
    values.playAgainEnabled = "";
}
module.exports.disableDealButton = () => {
    values.dealEnabled = "";
}
module.exports.disableHitButton = () => {
    values.hitEnabled = "";
}
module.exports.disableStayButton = () => {
    values.stayEnabled = "";
}
module.exports.disableSplitButton = () => {
    values.splitEnabled = "";
}
module.exports.disableDoubleDownButton = () => {
    values.doubleDownEnabled = "";
}
module.exports.disableBet1000Button = () => {
    values.bet1000Enabled = "";
}
module.exports.disableBet5000Button = () => {
    values.bet5000Enabled = "";
}
module.exports.disableBet50000Button = () => {
    values.bet50000Enabled = "";
}
module.exports.disableBet1000000Button = () => {
    values.bet1000000Enabled = "";
}