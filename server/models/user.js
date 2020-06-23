const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    steamid: {type: String},
    balance: {type: Number},
    registerDate: {type: Date},
    bets: [{type: mongoose.Schema.Types.ObjectID, ref: 'Bets'}]
});

userSchema.statics.getUserBalance = function getUserBalance(steamid, cb){
    mongoose.model('Users').findOne({steamid: steamid}, function(err, user){
        return cb(user.balance);
    });
}

const User = mongoose.model('Users', userSchema);

module.exports = User;