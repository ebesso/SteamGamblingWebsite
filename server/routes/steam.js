const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();

const User = require('../models/user');
const {sendTradeOffer, getSteamInventory} = require('../services/steam');


router.post('/deposit', function(req, res){
    res.send(200);
});

router.get('/inventory', function(req, res){
    getSteamInventory(req.user.user, function(success, inv){
        if(success){
            res.send(JSON.stringify(inv));
        }
        else{
            res.send(500);
        }
    })
});


module.exports = router;