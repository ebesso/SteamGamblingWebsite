const {getSteamProfile} = require('../services/steam');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Round = require('../models/round')
const { UV_FS_O_FILEMAP } = require('constants');

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

    async function handleBets(color, multiplier){
        for(var i = 0; i < rouletteState.bets.length; i++){
            let bet = rouletteState.bets[i];
            if(bet.color == color){
                await bet.bet.finish(multiplier, (success) => {});
            }else{
                await bet.bet.finish(0, (success) => {});
            }
        }
    }

    function roll(){
        var winningColor = 'red';
        var multiplier = 2;
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

        handleBets(winningColor, multiplier);

        let round = new Round({
            gamemode: 'roulette',
            bets: rouletteState.bets.map(b => b.bet._id),
            outcome: winningColor,
            date: new Date()
        });
        round.save(function(err){
            console.log('Rolling: ' + winningColor);
            rouletteState.active = true;
            nsp.emit('roll', {'color': winningColor});
            setTimeout(startCountdown, 13000);
        });
 
    }

    nsp.on('connection', function(socket){
        socket.emit('sync', rouletteState);

        socket.on('placeBet', function(data){
            if(rouletteState.active == false){

                jwt.verify(data.jwtToken, process.env.SECRET_KEY, function(err, decoded){
                    if(err){//Not logged in
                        socket.emit('betResponse', {message: 'Failed to authenticate', balance: null, success: false});
                    }else{
                        User.bet(decoded.user, data.amount, 'roulette', function(success, newBet, newBalance){
                            if(success){
                                getSteamProfile(decoded.user, function(profile){
                                    var bet = {
                                        amount: data.amount,
                                        color: data.color,
                                        username: profile.nickname,
                                        profilePicture: profile.avatar.small,
                                        steamid: decoded.user,
                                        bet: newBet
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