import React from 'react';
import { Component } from 'react';

import NavBar from './navigationbar';
import Roulette from './roulette/roulette';

import axios from 'axios';

import {getToken, getNewAccessToken} from '../services/authentication'

const BACKEND_URL = 'http://192.168.133.155:5000';

class App extends Component{

    state = {
        user: {
            balance: 0,
            loggedIn: false
        }
    }

    constructor(){
        super();
        const app = this;

        getNewAccessToken(function(success){
            if(success){
                app.setState({user: {loggedIn: true}});
            }else{
                app.setState({user: {loggedIn: false}});
            }

        });
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

        window.addEventListener('message', event => {
            localStorage.setItem('jwtToken', event.data.token);
            axios.get(BACKEND_URL + '/auth/refreshToken', {withCredentials: true, headers: {Authorization: 'Bearer ' + getToken()}}).then((res) =>{
                console.log('Refresh token received');
            });

            this.setState({user: {loggedIn: true}});
        });
    }


    render(){
        return (
            <div style={{backgroundColor: '#21252b', minHeight: '100%', width: '100%', position: 'absolute', height: 'auto', backgroundRepeat: 'repeat'}}>

            <NavBar login={this.handleLogin} logout={this.handleLogout} loggedIn={this.state.user.loggedIn}/>
    
            <center>
                <div style={{marginTop: '100px', height: '100%', width: '60%'}}>
                    <Roulette />
                </div>
            </center>
    
        </div>
        )

    }
}

export default App;