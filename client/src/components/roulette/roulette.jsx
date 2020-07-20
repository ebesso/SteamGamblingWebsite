import RouletteGame from './rouletteGame'
import RouletteBetting from './rouletteBetting'

import React, { Component } from 'react'

import io from 'socket.io-client'
import { FaChessBishop } from 'react-icons/fa';

import {getToken, getBalance} from '../../services/authentication';

import LoginRequired from '../dialogs/LoginRequired'; 
import InsufficentFunds from '../dialogs/InsufficentFunds';


const ENDPOINT = 'http://localhost:5000/roulette';

class Roulette extends Component{
    
    state = {
        countdown: 0,
        active: true,
        bets: [],
        winningColor: null,
        dialogs: {
            loginRequired: false,
            insufficentFunds: false,
        }
    }

    constructor(){
        super();
    
        this.socket = io(ENDPOINT);

    }

    updateState = (data) => {
        this.setState({countdown: 20 - (new Date().getTime() - new Date(data.countdownStarted).getTime()) / 1000, active: data.active, bets: data.bets});
        this.props.updateBalance();
    }

    roll = (data) => {
        this.setState({winningColor: data.color, active: true, countdown: 0});
    }

    handleLogin = () => {
        this.setState({dialogs: {loginRequired: false}});
        this.props.handleLogin();
    }

    closeLoginRequiredPopup = () => {
        this.setState({dialogs: {loginRequired: false}});
    }
    closeInsufficentFundsPopup = () => {
        this.setState({dialogs: {insufficentFunds: false}});
    }
    placeBet = (data) => {

        if(this.props.user.loggedIn){
            this.socket.emit('placeBet', {
                jwtToken: getToken(),
                amount: data.amount,
                color: data.color
            });
        }else{
            this.setState({dialogs: {loginRequired: true}});
        }

    }

    handleBetResponse = (data) => {
        if(data.success == true){
            this.props.updateBalance(data.balance );
        }else{
            if(data.message == 'Insufficent funds'){
                this.setState({dialogs: {insufficentFunds: true}});
            }
        }
    }

    betPlaced = (data) => {
        this.setState({bets: data});
    }

    componentDidMount(){
        this.socket.on('sync', this.updateState);
        this.socket.on('roll', this.roll);
        this.socket.on('newBet', this.betPlaced);
        this.socket.on('betResponse', this.handleBetResponse);
    }
    componentWillUnmount(){
        this.socket.close();
    }

    render(){

        return (
            <div>
                <LoginRequired open={this.state.dialogs.loginRequired} onClose={this.closeLoginRequiredPopup} login={this.handleLogin}/>
                <InsufficentFunds open={this.state.dialogs.insufficentFunds} onClose={this.closeInsufficentFundsPopup}/>

                <div style={{width: '100%', zIndex: '2'}}>
                    <RouletteGame maskWidth='60%' countdown={this.state.countdown} roll={this.state.active} winningColor={this.state.winningColor}/>
                </div>

                <div style={{width: '100%', marginTop: '20px', zIndex: '2'}}>
                    <RouletteBetting bets={this.state.bets} placeBet={this.placeBet} active={this.state.active} winningColor={this.state.winningColor}/>
                </div>
            </div>
        );
    }

}

export default Roulette;