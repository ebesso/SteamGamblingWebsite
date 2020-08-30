const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_API_KEY);

let client = require('redis').createClient(process.env.REDIS_URL);
let Redis = require('ioredis');
let redis = new Redis(process.env.REDIS_URL);

const User = require('../models/user');

const TradeOfferManager = require('steam-tradeoffer-manager')
const SteamUser = require('steam-user');
const SteamTOTP = require('steam-totp');

const SteamPrice = require('steam-price-api');
const EConfirmationMethod = require('steam-tradeoffer-manager/resources/EConfirmationMethod');
const { InvalidCEGSubmission } = require('steam-tradeoffer-manager/resources/EResult');

const SteamCommunity = require('steamcommunity');
const { ConnectionStates } = require('mongoose');
let community = new SteamCommunity();

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

const AppID = 730

steamClient.logOn(logonOptions);

steamClient.on('loggedOn', function(){
    console.log(`${steamClient.steamID} client connected`);
});

steamClient.on('webSession', (sid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(1000, process.env.STEAM_SHARED_SECRET);
})

function getSteamProfile(steamid, cb){

    client.get(steamid, (err, rep) => {

        if(err){
            console.log(err.message);
            return (cb(null))
        }
        if(rep != null){
            return cb(JSON.parse(rep));
        }else{
            steam.getUserSummary(steamid).then(summary => {
                client.set(steamid, JSON.stringify(summary), (err, res) => {
                    if(err){
                        console.log(err.message);
                    }else{
                    }
                });
                cb(summary);
            });
        }

    });
}

function calculateTradeOfferValue(tradeOffer, offerType, cb){

    items = []
    value = 0

    if(offerType == 'deposit'){
        for(let i = 0; i < tradeOffer.itemsToReceive.length; i++){
            items.push(tradeOffer.itemsToReceive[i].market_hash_name)
        }
    }else if(offerType == 'withdraw'){
        for(let i = 0; i < tradeOffer.itemsToGive.length; i++){
            items.push(tradeOffer.itemsToGive[i].market_hash_name)
        }
    }

    // item_names = items.map(item => item.market_hash_name);

    // client.mget(item_names, function(err, res){
    //     if(err != null)console.log(err.message)
    //     else{
    //         for(let i = 0; i < res.)
    //     }
    // })

    SteamPrice.getprices(AppID, items, '1').then(data => {
        for(let i = 0; i < data; i++){
            value += Number(data[i].median_price)
        }

        return cb(value)
    })
}

function sendTradeOffer(steamid, items, offerType){
    User.findOne({steamid: steamid}, function(err, user){

        var tradeOffer = manager.createOffer(new TradeOfferManager.SteamID(steamid), user.tradeToken)
        
        let ECONItems = []

        if(offerType == 'deposit'){
            manager.getUserInventoryContents(steamid, AppID, 1, true, function(err, inv, currency){
                for(var i = 0; i < inv.length; i++){
                    if(items.includes(inv[i].id)){
                        ECONItems.push(inv[i]);
                    }
                }

            })
            tradeOffer.addTheirItems(ECONItems);
        }

        tradeOffer.send(function(err, status){
            if(err == null){
                print('Sent trade offer: ' + status)

                let trade = new Offer({
                    user: user._id,
                    active: true,
                    offerType: offerType,
                    tradeID: tradeOffer.id,
                    created: new Date()
                })

                user.offers.push(trade)
                user.save();

            }else{
                print('Failed to send trade offer: ' + err.message)                
            }

        })

    });

}

function getSteamInventory(steamid, cb){

    manager.getUserInventoryContents(steamid, AppID, 2, true, function(err, inv, currency){
        if(err)return (false, null)
        items = []

        for(let i = 0; i < inv.length; i++){
            items.push({
                name: inv[i].market_hash_name, 
                id: inv[i].id,
                image: inv[i].getImageURL(),
            })        
        }

        item_names = items.map(item => item.name);
        missing_prices = []
    
        client.mget(item_names, function(err, res){

            for(var i = 0; i < res.length; i++){
                if(res[i] != null){
                    items[i].price = Number(res[i])
                }else{
                    missing_prices.push(item_names[i])
                }
            }
            if(missing_prices.length > 0){
                const pricePromise = new Promise((resolute, reject) => {
                    let count = 0
                    for(let i = 0; i < missing_prices.length; i++){
                        community.getMarketItem(AppID, missing_prices[i], function(err, item){
                            if(err)console.log(err.message)
                            else{
                                items.find(x => x.name == missing_prices[i]).price = Number(item.lowestPrice);
                                client.set(missing_prices[i], item.lowestPrice);
                            }
                            count += 1;
                            if(count == missing_prices.length){
                                resolute()
                            }
                        });
                    }
                })
    
                pricePromise.then(() => {
                    return cb(true, items)
                })
            }else{
                return cb(true, items);
            }


        })
    })
}

module.exports = {
    getSteamProfile: getSteamProfile,
    sendTradeOffer: sendTradeOffer,
    getSteamInventory: getSteamInventory,
}