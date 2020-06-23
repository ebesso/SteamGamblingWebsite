import React, { Component } from 'react'
import {FaCoins} from 'react-icons/fa'
import Player from './rouletteUser'
import {Spring} from 'react-spring/renderprops'
import { findAllByTestId } from '@testing-library/react'

class BetTable extends Component{


    constructor(){
        super();
    }

    render(){

        const headerText = {
            color: 'white',
            margin: '0.5rem',
            fontWeight: '500'
        }

        let value = 0;

        for(var i = 0; i < this.props.bets.length; i++){
            value += this.props.bets[i].amount;
        }

        return (

            <div style={{width: '100%'}}>
                <div style={{width: '100%', height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={headerText}>{this.props.bets.length} Bets</span>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FaCoins style={{color: 'gold', marginRight: '3px'}}/>
                        <Spring
                            to={{number: value}}

                            config={{
                                duration: 200
                            }}

                        >
                            {props => <span style={{fontWeight: '500', color: 'white', marginRight: '0.5rem', marginBottom: '0.5rem', marginTop: '0.5rem'}}>{props.number.toFixed(2)}</span>}
                        </Spring>

                    </div>
                </div>
                <ul style={{margin: 0, padding: 0, listStyleType: 'none'}}>
                    {this.props.bets.map((bet, index) =>

                        <Spring to={{opacity: 1, width: '100%'}} from={{opacity: 0, width: '80%'}} config={{duration: 300}} key={index}>
                            {foo =>
                                <li style={foo} key={index}>
                                    <Player key={index} username={bet.username} profilePicture={bet.profilePicture} amount={bet.amount} background={(index % 2 == 0) ? '#25292f': 'none'}/>
                                </li>
                            }
                        </Spring>

                        )}

                </ul>
            </div>

        );
    }

}

export default BetTable;