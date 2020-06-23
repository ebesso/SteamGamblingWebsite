const mongoose = require('mongoose');

const roundSchema = mongoose.Schema({
    game: {type: String},
    date: {type: Date},
    bets: [{type: mongoose.Schema.Types.ObjectID, ref: 'Bets'}]
});

const Round = mongoose.model('Rounds', roundSchema);

module.exports = Round;