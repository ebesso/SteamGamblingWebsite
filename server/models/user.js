const mongoose = require('mongoose');
const { fchown } = require('fs');

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

userSchema.statics.removeUserBalance = function removeUserBalance(steamid, balance, cb){
    mongoose.model('Users').findOne({steamid: steamid},function(err, user){
        if(user.balance >= balance){
            user.balance -= balance;
            user.save(function(err, newUser){
                if(err) return cb(false, null);
                return cb(true, newUser.balance);
            });
        }else{
            return cb(false, null);
        }
    });
}

userSchema.statics.addUserBalance = function addUserBalance(steamid, balance){
    mongoose.model('Users').findOne({steamid: steamid}, function(err, user){
        user.balance += balance;
        user.save(function(err, newUser){});
    });
}

const User = mongoose.model('Users', userSchema);

module.exports = User;