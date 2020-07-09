const mongoose = require('mongoose');
const Bet = require('./bet');


const userSchema = new mongoose.Schema({
    steamid: {type: String},
    balance: {type: Number},
    registerDate: {type: Date},
    bets: [{type: mongoose.Schema.Types.ObjectID, ref: 'Bets'}]
});

function calculateBalance(steamid, cb){
    User.findOne({steamid: steamid}).populate('bets').exec(function(err, user){
        if(err){
            console.log(err.message);
        }
        let value = 0;
        for(var i = 0; i < user.bets.length; i++){
            if(user.bets[i].active == true){
                value+=user.bets[i].amount;
            }
        }
        let balance = user.balance - value;

        cb(balance);

    });
}

userSchema.statics.getUserBalance = function getUserBalance(steamid, cb){
    calculateBalance(steamid, cb);
}

userSchema.statics.removeActiveBets = (cb) => {
    mongoose.model('Users').find({}).populate('bets').exec(function(err, users){
        for(var i = 0; i < users.length; i++){
            let user = users[i];
            let objectIds = [];
            for(var x = 0; x < user.bets.length; x++){
                if(user.bets[x].active == true){
                    objectIds.push(user.bets[x]._id);
                }
            }
            mongoose.model('Users').updateOne(user[i], {$pull: {bets: {$in: objectIds}}}, function(err){
                if(err)console.log(err.message);
                else console.log('Removed active bets from user: ' + user.steamid);
                
                if(i == users.length){
                    return cb();
                }
            })
        }
    });
}

userSchema.statics.bet = function bet(steamid, amount, gamemode, cb){
    mongoose.model('Users').findOne({steamid: steamid},function(err, user){
        calculateBalance(steamid, function(actualBalance){
            if(actualBalance >= amount){

                let bet = new Bet({
                    amount: amount,
                    gamemode: gamemode,
                    date: new Date(),
                    active: true,
                    owner: user._id
                });

                bet.save(function(err){

                    user.bets.push(bet);
                    user.save(function(err){
                        return cb(true, bet, actualBalance - amount);
                    })

                });
                
            }else{
                return cb(false, null, null)

            }
        });
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