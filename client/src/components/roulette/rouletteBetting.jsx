import React, { Component } from 'react'
import {Spring} from 'react-spring/renderprops'
import {FaCoins} from 'react-icons/fa'

import {Button} from '@material-ui/core';

import PlaceBet from './roulettePlaceBet'
import BetTable from './rouletteBetTable'

class RouletteBetting extends Component{

    state = {
        width: 0,
        amount: 1,
    }

    constructor(){
        super();
    }

    addAmount = (amount) =>{
        this.setState({amount: this.state.amount + amount});
    }

    amountChanged = (e) =>{
        if(isNaN(e.target.value) == false){
            this.setState({amount: Math.round(Number(e.target.value) * 100)/100});
        }
    }

    placeBet = (color) => {


        if(isNaN(this.state.amount) || this.state.amount <= 0){
            return;
        }

        let bet = {
            amount: this.state.amount,
            color: color
        }

        this.props.placeBet(bet);
        this.setState({amount: 0});
    }
    updateDimensions = () => {
        if(window.innerWidth < 1250){
            this.setState({width: '100%'})
        }
        else{
            this.setState({width: '32.5%'})
        }
    }
    componentDidMount(){
        if(window.innerWidth < 1250){
            this.setState({width: '100%'});
        }else{
            this.setState({width: '32.5%'});
        }
        window.addEventListener('resize', this.updateDimensions);

    };
    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDimensions);
    }

    render(){
        
        //#region Styles
        const container = {
            display: 'block',
            position: 'relative',
            backgroundColor: '#1a1e23',
            boxShadow: 'inset 0 1px 1px 0 rgba(0,0,0,.1)',
            borderRadius: '6px',
            textAlign: 'left',
            width: '100%',
            height: '50px',
        }

        const betAmount = {
            color: 'hsla(0,0%,100%,.7)',
            position: 'absolute',
            lineHeight: 1,
            margin: '0.3rem',
            fontSize: '0.75rem'
        }

        const betInput = {
            background: 'transparent',
            outline: 'none',
            border: 'none',
            padding: '0',
            margin: '0',
            width: '100%',
            color: '#6a6d70',
            marginLeft: '0.3rem',
            marginTop: '1.4rem',
            display: 'inline',
            position: 'absolute',
            fontSize: '1rem'
        }

        const betButton = {
            backgroundColor: 'rgb(49, 53, 61)',
            height: '100%',
            width: '0.5rem',
            fontSize: '0.75rem',
            color: 'white',
            marginRight: '0.3rem',
        }

        const clearButton = {
            backgroundColor: 'none',
            height: '100%',
            width: '60px',
            fontSize: '0.75rem',
            color: 'white',
            marginRight: '0.3rem',
        }
        
        const betColumn = {
            width: this.state.width,
        }

        //#endregion

        return (
            <div>
                <div style={container}>
                    <span style={betAmount}>Bet Amount</span>
                    <div style={{marginLeft: '0.3rem'}}>
                        <FaCoins style={{color: 'gold', marginTop: '1.5rem', display: 'inline', width: '1rem', height: '1rem'}}/>
                        <input type="text" style={betInput} value={this.state.amount} onChange={this.amountChanged}/>
                    </div>

                    
                    <div style={{position: 'absolute', right: '0', top: '-1px', height: '35px', marginTop: '7.5px', textAlign: 'right', overflow: 'hidden', width: '50%'}}>
                        <Button style={clearButton} onClick={() => this.setState({amount: 0})}>Clear</Button>
                        <Button style={betButton} onClick={() => this.addAmount(0.01)}>+0.01</Button>
                        <Button style={betButton} onClick={() => this.addAmount(0.1)}>+0.1</Button>
                        <Button style={betButton} onClick={() => this.addAmount(1)}>+1</Button>
                        <Button style={betButton} onClick={() => this.addAmount(10)}>+10</Button>
                        <Button style={betButton} onClick={() => this.addAmount(100)}>+100</Button>
                    </div>
                </div>
                <div style={{marginTop: '20px', display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between'}}>
                    <div style={betColumn} key={1}>
                        <PlaceBet color='red' placeBet={() => this.placeBet('red')} active={this.props.active}/>
                        <BetTable bets={this.props.bets.filter(function(element){return element.color == 'red'})}/>

                    </div>
                    <div style={betColumn} key={2}>
                        <PlaceBet color='green' placeBet={() => this.placeBet('green')} active={this.props.active}/>
                        <BetTable bets={this.props.bets.filter(function(element){return element.color == 'green'})}/>
                    </div>
                    <div style={betColumn} key={3}>
                        <PlaceBet color='black' placeBet={() => this.placeBet('black')} active={this.props.active}/>
                        <BetTable bets={this.props.bets.filter(function(element){return element.color == 'black'})}/>
                    </div>
                </div>
            </div>


        )
    }

}


export default RouletteBetting