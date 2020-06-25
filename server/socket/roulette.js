const {getSteamProfile} = require('../services/steam');
const jwt = require("jsonwebtoken");
const User = require('../models/user');

exports = module.exports = function(io){
    const nsp = io.of('/roulette');

    const rouletteState = {
        active: false,
        bets: [],
        countdownStarted: new Date()
    }

    startCountdown();

    function startCountdown(){
        rouletteState.countdownStarted = new Date();
        rouletteState.active = false;
        rouletteState.bets = [];
        nsp.emit('sync', rouletteState);
        setTimeout(roll, 20000);
    }

    function payoutBets(color, multiplier){
        for(var i = 0; i < rouletteState.bets.length; i++){
            var bet = rouletteState.bets[i];
            if(bet.color == color){
                User.addUserBalance(bet.steamid, bet.amount * multiplier);
            }
        }
    }

    function roll(){
        var winningColor = null;
        var multiplier = null;
        Math.floor(Math.random() * 15);

        if(Math.floor(Math.random() * 15) == 0){
            winningColor = 'green';
            multiplier = 14;
        }else if(Math.random() >= 0.5){
            winningColor = 'red';
            multiplier = 2;
        }else{
            winningColor = 'black';
            multiplier = 2;
        }

        payoutBets(winningColor, multiplier);
        consoleq.log(winningColor)
        rouletteState.active = true;
        nsp.emit('roll', {'color': winningColor});
        setTimeout(startCountdown, 13000);
    }

    nsp.on('connection', function(socket){
        socket.emit('sync', rouletteState);

        socket.on('placeBet', function(data){
            if(rouletteState.active == false){

                jwt.verify(data.jwtToken, process.env.SECRET_KEY, function(err, decoded){
                    if(err){//Not logged in
                        socket.emit('betResponse', {message: 'Failed to authenticate', balance: newBalance, success: false});
                    }else{
                        User.removeUserBalance(decoded.user, data.amount, function(success, newBalance){

                            if(success){
                                getSteamProfile(decoded.user, function(profile){
    
                                    var bet = {
                                        amount: data.amount,
                                        color: data.color,
                                        username: profile.nickname,
                                        profilePicture: profile.avatar.small,
                                        steamid: decoded.user
                                    }
                    
                                    rouletteState.bets.push(bet);
                                    rouletteState.bets = rouletteState.bets.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
                                    nsp.emit('newBet', rouletteState.bets);
                                    socket.emit('betResponse', {message: 'Bet Placed', balance: newBalance, success: true});
                                });
                            }else{
                                socket.emit('betResponse', {message: 'Insufficent funds', balance: newBalance, success: false});
                            }
                        });
                    }
                });


            }
        });
    });
}