const mongoose = require('mongoose');
const { resolve } = require('path');
const { reject } = require('async');

const betSchema = mongoose.Schema({
    amount: {type: Number},
    date: {type: Date},
    payout: {type: Number},
    active: {type: Boolean},
    gamemode: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
});

betSchema.statics.removeActiveBets = function removeActiveBets(){
    mongoose.model('Bets').deleteMany({active: true}, function(err, bets){
        console.log('Removed active bets');
    });
}

betSchema.methods.finish = function chargeBet(multiplier, cb){
    return new Promise((resolve, reject) => {
        let bet = this;
        success = false;
        mongoose.model('Bets').findOne(this).populate('owner').exec(function(err, populatedBet){
            var user = populatedBet.owner;
            user.balance -= bet.amount;
            user.balance += bet.amount * multiplier;
            user.save((err) => {
                if(err){
                    console.log(err.message);
                    resolve(false);
                }
                else{
                    bet.active = false;
                    if(multiplier > 0){
                        bet.payout = bet.amount * multiplier;
                    }else{
                        bet.payout = 0;
                    }
                    bet.save((err) => {
                        if(err) console.log(err.message);
                        resolve(true);
                    })
                }
            });
    
        });
    });

}


module.exports = mongoose.model('Bets', betSchema);