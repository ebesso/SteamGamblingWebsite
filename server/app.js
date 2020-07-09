const express = require('express');
const http = require('http')
const socketIO = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');

const PORT = 5000;

const Bet = require('./models/bet')
const User = require('./models/user')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
    console.log('Database connected');
    User.removeActiveBets(function(){
        console.log('Cleared bets from users');
        Bet.removeActiveBets();
    });

});

const app = express();
app.use(require('cors')({origin: true, credentials: true}));
app.use(cookieParser());

const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

require('./config/steam')(app);

app.use('/auth', require('./routes/auth'));
app.use('/user/get', jwt({secret: process.env.SECRET_KEY}), require('./routes/user'));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.sendStatus(401);
    }else if(err){
        console.log('Error: ' + err.message);
        res.sendStatus(500);
    }
});


const roulette = require('./socket/roulette')(io);
const chat = require('./socket/chat')(io);



server.listen(PORT, () => console.log(`Listening to port ${PORT}...`)); 