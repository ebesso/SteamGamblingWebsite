const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();

const User = require('../models/user');

router.get('/balance', function(req, res){
    User.getUserBalance(req.user.user, function(balance){
        return res.status(200).send({balance: balance});
    });
});

router.get('/steam', function(req, res){

});

module.exports = router;