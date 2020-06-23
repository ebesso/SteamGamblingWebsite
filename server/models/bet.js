const mongoose = require('mongoose');

const betSchema = mongoose.Schema({
    amount: {type: Number},
    date: {type: Date},
    payout: {type: Number}
});

const Bet = mongoose.model('Bets', betSchema);

module.exports = Bet;