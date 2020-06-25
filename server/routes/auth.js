const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const randToken = require('rand-token');
const { generateNewAccessToken, saveRefreshToken, removeRefreshToken } = require('../services/auth');

const router = express.Router();

router.get('/steam', passport.authenticate('steam', {session: false}));

router.get(
    '/steam/return',
    passport.authenticate('steam', {session: false}),
    (req, res) => {
        const token = jwt.sign({user: req.user}, process.env.SECRET_KEY, {
            expiresIn: 60
        });

        res.render("authenticated", {
            jwtToken: token,
            clientUrl: process.env.FRONTEND_URL,
        });
    }
);

router.get('/refreshToken', expressJWT({secret: process.env.SECRET_KEY}), function(req, res){

    const steamid = req.user.user;
    const refreshToken = randToken.uid(256);

    saveRefreshToken(refreshToken, steamid, function(success){
        if(success){
            console.log('Refresh token saved');
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
            });
            res.status(200).send('OK')
        }else{
            res.status(500).send('Failed')
        }
    });
});

router.get('/token', function(req, res){
    const refresh_token = String(req.cookies['refresh_token']);
    if(refresh_token !== undefined){
        generateNewAccessToken(refresh_token, function(token){
            if(token == null){
                console.log('Refresh token is invalid');
                res.status(401).send('Not authorized');
            }
            else{
                res.status(200).send({jwtToken: token});
            }
        });
    }else{
        res.status(401).send('Not authorized');
    }
});

router.get('/logout', function(req, res){
    const refresh_token = String(req.cookies['refresh_token']);

    removeRefreshToken(refresh_token, function(success){

        if(success){
            res.clearCookie('refresh_token');
            res.status(200).send('ok');
        }else{
            res.status(500).send('Failed');
        }

    });


});

module.exports = router;