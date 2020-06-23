const {getSteamProfile} = require('../services/steam');
const jwt = require("jsonwebtoken");

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

    function roll(){
        var winningColor = ['red', 'black', 'green'][Math.floor(Math.random() * 3)];
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
                        console.log(err.message);
                        return;
                    }
                    getSteamProfile(decoded.user, function(profile){

                        var bet = {
                            amount: data.amount,
                            color: data.color,
                            username: profile.nickname,
                            profilePicture: profile.avatar.small
                        }
        
                        rouletteState.bets.push(bet);
                        rouletteState.bets = rouletteState.bets.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
                        nsp.emit('newBet', rouletteState.bets);
                    });

                });


            }
        });
    });
}