const jwt = require('jsonwebtoken');

let client = require('redis').createClient(process.env.REDIS_URL);
let Redis = require('ioredis');
let redis = new Redis(process.env.REDIS_URL);

function saveRefreshToken(refreshToken, steamid, cb){
    client.set(refreshToken, JSON.stringify(steamid), (err, res) => {
        if(err){
            console.log(err.message);
            return cb(false)
        }else{
            cb(true);
        }
    });
}

function removeRefreshToken(refreshToken, cb){
    client.del(refreshToken, function(err, res){
        if(err){
            console.log(err.message);
            return cb(false);
        }else{
            return cb(true);
        }

    });
}

function generateNewAccessToken(refreshToken, cb){
    client.get(refreshToken, (err, rep) => {
        if(err){
            console.log(err.message);
        }
        if(rep){
            let steamid = JSON.parse(rep);
            const token = jwt.sign({user: steamid}, process.env.SECRET_KEY, {
                expiresIn: 60
            });
            return cb(token);
        }else{
            return cb(null);
        }

    });
}

module.exports = {
    saveRefreshToken: saveRefreshToken,
    generateNewAccessToken: generateNewAccessToken,
    removeRefreshToken: removeRefreshToken,


}