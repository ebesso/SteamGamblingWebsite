const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();

const User = require('../models/user');
const {getSteamProfile} = require('../services/steam');

router.get('/balance', function(req, res){
    User.getUserBalance(req.user.user, function(balance){
        return res.status(200).send({balance: balance});
    });
});

router.get('/bets', function(req, res){
    User.getUserBets(req.user.user, function(err, bets){
        res.status(200).send(bets);
    })

});

router.get('/steam', function(req, res){
    getSteamProfile(req.user.user, function(profile){
        if(profile == null){
            res.status(500).send('Failed');
        }else{
            res.status(200).send(profile);
        }
    })
});

module.exports = router;