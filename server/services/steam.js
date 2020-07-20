const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_API_KEY);

let client = require('redis').createClient(process.env.REDIS_URL);
let Redis = require('ioredis');
let redis = new Redis(process.env.REDIS_URL);

const TradeOfferManager = require('steam-tradeoffer-manager')
const SteamUser = require('steam-user');
const SteamTOTP = require('steam-totp');

let steamClient = new SteamUser();
let manager = new TradeOfferManager({

    'steam': steamClient,
    'domain': 'http://google.com',
    'language': 'en'

});

let logonOptions = {
    'accountName': process.env.STEAM_USERNAME,
    'password': process.env.STEAM_PASSWORD,
    'twoFactorCode': SteamTOTP.getAuthCode(process.env.STEAM_SHARED_SECRET) 
}

steamClient.logOn(logonOptions);

steamClient.on('loggedOn', function(){
    console.log(`${steamClient.steamID} connected`);
});

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

function sendTradeOffer(){

}

module.exports = {
    getSteamProfile: getSteamProfile,
    sendTradeOffer: sendTradeOffer,
}