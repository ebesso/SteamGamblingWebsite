import React from 'react';
import { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'


import NavBar from './navigationbar';
import Roulette from './roulette/roulette';
import Chat from './chat/chat';
import Profile from './profile/profile';

import axios from 'axios';

import {getToken, getNewAccessToken, getSteamProfile, getBalance} from '../services/authentication'

const BACKEND_URL = 'http://192.168.133.155:5000';

const refresh_interval = 600000;

class App extends Component{

    state = {
        user: {
            balance: 0,
            loggedIn: false,
            name: null,
            avatar: null
        },
        hiddenChat: true,
    }

    constructor(){
        super();
        const app = this;

        getNewAccessToken(function(success){
            if(success){
                app.getUserInfo();
            }else{
                app.setState({user: {loggedIn: false}});
            }

        });
    }

    updateBalance = (newBalance = null) => {
        const app = this;
        let user = this.state.user;
        if(newBalance == null){
            getBalance(function(balance){
                user.balance = balance;
                app.setState({user: user});
            });
        }
        else{
            user.balance = newBalance;
            this.setState({user: user});
        }

    }

    getUserInfo = () => {
        const app = this;
        getSteamProfile(function(profile){
            let user = app.state.user;
            user.loggedIn = true;
            user.avatar = profile.avatar.small;
            user.name = profile.nickname;

            getBalance(function(balance){
                user.balance = balance;
                app.setState({user: user});
            })

        })
    }

    handleLogin = () => {
        const popupWindow = window.open(
            BACKEND_URL + '/auth/steam',
            '_blank',
        );
        if(window.focus)popupWindow.focus();
    }

    handleLogout = () => {

        const app = this;
        axios.get(BACKEND_URL + '/auth/logout', {withCredentials: true, headers: {Authorization: 'Bearer ' + getToken()}}).then((res) => {
            localStorage.removeItem('jwtToken');
            app.setState({user: {loggedIn: false}});
        }, (error) => {
            console.log('failed to logout')
        });
    }

    componentDidMount(){

        this.interval = setInterval(() => {
            if(this.state.user.loggedIn){
                getNewAccessToken(function(success){});
            }
        },refresh_interval);

        window.addEventListener('message', event => {
            localStorage.setItem('jwtToken', event.data.token);
            axios.get(BACKEND_URL + '/auth/refreshToken', {withCredentials: true, headers: {Authorization: 'Bearer ' + getToken()}}).then((res) =>{
                console.log('Refresh token received');
            });

            this.getUserInfo();
        });
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount(){
        this.socket.close();
        window.removeEventListener('resize', this.updateDimensions);
    }


    updateDimensions = () => {
        if(window.innerWidth < 1550){
            this.setState({hiddenChat: true});
        }
        else{
            this.setState({hiddenChat: false});
        }
    }

    render(){
        return (
            <BrowserRouter>
                <div style={{backgroundColor: '#21252b', minHeight: '100%', width: '100%', position: 'absolute', height: 'auto', backgroundRepeat: 'repeat', overflow: 'hidden'}}>

                    <NavBar login={this.handleLogin} logout={this.handleLogout} loggedIn={this.state.user.loggedIn} username={this.state.user.name} avatar={this.state.user.avatar} balance={this.state.user.balance}/>
                    <div style={{width: '15%', minWidth: '200px', height: '100%', position: 'fixed', backgroundColor: '#1d2126', marginTop: '70px', display: (this.state.hiddenChat) ? 'none' : 'block'}}>
                        <Chat loggedIn={this.state.user.loggedIn}/>
                    </div>
                    <div style={{marginLeft: (this.state.hiddenChat) ? '0%' : '15%'}}>
                        <center>
                            <div style={{marginTop: '150px', height: '100%', width: (this.state.hiddenChat) ? '90%' : '80%'}}>
                                <Switch>
                                    <Route path='/roll'>
                                        <Roulette user={this.state.user} handleLogin={this.handleLogin} updateBalance={this.updateBalance}/>
                                    </Route>

                                    <Route path='/profile' render={props => (
                                        <Profile loggedIn={this.state.user.loggedIn} login={this.handleLogin}/>
                                    )}/>
                                    <Route exact path='/'>
                                        <Redirect to='/roll'/>
                                    </Route>
                                </Switch>
                            </div>
                        </center>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;