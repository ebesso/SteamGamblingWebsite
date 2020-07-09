const jwt = require('jsonwebtoken');
const {getSteamProfile} = require('../services/steam');

exports = module.exports = function(io){
    const nsp = io.of('/chat');

    messages = [];

    nsp.on('connection', function(socket){

        socket.emit('syncMessages', messages);
        socket.on('sendMessage', function(data){
            jwt.verify(data.jwtToken, process.env.SECRET_KEY, function(err, decoded){
                if(err){
                    console.log(err.message);
                }else{
                    getSteamProfile(decoded.user, function(profile){
                        messages.push({
                            username: profile.nickname,
                            message: data.message,
                            profilePicture: profile.avatar.small,
                        });

                        if(messages.length > 100){
                            messages.shift();
                        }

                        nsp.emit('newMessage', messages);
            
                    });
                }
            });

        });
    })
}