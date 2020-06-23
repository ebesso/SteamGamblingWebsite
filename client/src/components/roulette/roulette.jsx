import RouletteGame from './rouletteGame'
import RouletteBetting from './rouletteBetting'

import React, { Component } from 'react'

import io from 'socket.io-client'
import { FaChessBishop } from 'react-icons/fa';

import {getToken, getBalance} from '../../services/authentication';

const ENDPOINT = '192.168.133.155:5000/roulette';

class Roulette extends Component{
    
    state = {
        countdown: 0,
        active: true,
        bets: [],
        winningColor: null
    }

    constructor(){
        super();
    
        this.socket = io(ENDPOINT);

    }

    updateState = (data) => {
        this.setState({countdown: 20 - (new Date().getTime() - new Date(data.countdownStarted).getTime()) / 1000, active: data.active, bets: data.bets});
    }

    roll = (data) => {
        this.setState({winningColor: data.color, active: true, countdown: 0});
    }

    placeBet = (data) => {

        getBalance();

        this.socket.emit('placeBet', {
            jwtToken: getToken(),
            amount: data.amount,
            color: data.color
        });
    }

    betPlaced = (data) => {
        this.setState({bets: data});
    }

    componentDidMount(){
        this.socket.on('sync', this.updateState)
        this.socket.on('roll', this.roll);

        this.socket.on('newBet', this.betPlaced);
    }
    componentWillUnmount(){
        this.socket.close();
    }

    render(){
        return (
            <div>
                <div style={{width: '100%', zIndex: '2'}}>
                    <RouletteGame maskWidth='60%' countdown={this.state.countdown} roll={this.state.active} winningColor={this.state.winningColor}/>
                </div>

                <div style={{width: '100%', marginTop: '20px', zIndex: '2'}}>
                    <RouletteBetting bets={this.state.bets} placeBet={this.placeBet} active={this.state.active}/>
                </div>
            </div>
        );
    }

}

export default Roulette;