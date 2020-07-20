const passport = require('passport');
const {Strategy} = require('passport-steam');
const User = require('../models/user');

const strategyOptions = {
    returnURL: `http://localhost:5000/auth/steam/return`,
    realm: `http://localhost:5000/`,
    apiKey: process.env.STEAM_API_KEY,
};

module.exports = app => {
    passport.use(
        new Strategy(strategyOptions, async(identifier, profile, done) => {
            profile.identifier = identifier;

            let user = await User.findOne({steamid: profile.id});

            if(!user){
                console.log('New user');
                user = await new User({
                    steamid: profile._json.steamid,
                    balance: 0,
                    registerDate: new Date(),
                }).save();
            }

            return done(null, user.steamid);

        }),
    );
    app.use(passport.initialize());
}