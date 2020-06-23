import React, { Component } from 'react'
import {Spring} from 'react-spring/renderprops'

import RouletteStrip from './rouletteStrip'
import Countdown from './countdown'
import RoulettePrevious from './roulettePrevious'

class RouletteGame extends Component{

    state = {
        previous: [],
        first: true,
    }

    constructor(){
        super();
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.roll != this.props.roll){
            return true;
        }        
        return false;
    }

    render(){

        
        //#region Styles

        let height = '120px';

        const container = {
            width: '100%',
            maxWidth: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            overflow: 'hidden',
            borderRadius: '20px',
            background: 'rgba(0,0,0,.09)',
            
            boxShadow: '0 1px 0 0 hsla(0,0%,100%,.02),inset 0 1px 3px 0 rgba(0,0,0,.1)',
            whiteSpace: 'nowrap',
            zIndex: 3

        };

        const line = {
            position: 'absolute',
            width: '0.1875rem',
            height: '120px',
            background: 'linear-gradient(180deg,transparent,#fff,transparent)',
            opacity: '.8',

            boxShadow: '1px 1px 5px 1px black',
            zIndex: 2
        };

        //#endregion

        return (
            <div>
                <div style={container} id="rouletteGameContainer">
                    <div style={line}></div>

                    <RouletteStrip roll={this.props.roll} winningColor={this.props.winningColor}></RouletteStrip>
                </div>
                <div style={{marginTop: '20px'}}>
                    <Countdown time={this.props.countdown}/>
                </div>
            </div>
        )
    }
}

export default RouletteGame
