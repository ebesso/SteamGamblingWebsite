const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_API_KEY);

let client = require('redis').createClient(process.env.REDIS_URL);
let Redis = require('ioredis');
let redis = new Redis(process.env.REDIS_URL);

function getSteamProfile(steamid, cb){

    client.get(steamid, (err, rep) => {

        if(err){
            console.log(err.message);
            return (cb(null))
        }
        if(rep != null){
            console.log('Loaded from cache');
            return cb(JSON.parse(rep));
        }else{
            steam.getUserSummary(steamid).then(summary => {
                client.set(steamid, JSON.stringify(summary), (err, res) => {
                    if(err){
                        console.log(err.message);
                    }else{
                        console.log('Updated cache');
                    }
                });
                cb(summary);
            });
        }

    });
}

module.exports = {
    getSteamProfile: getSteamProfile,
}