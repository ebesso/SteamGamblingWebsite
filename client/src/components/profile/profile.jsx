import React from 'react';
import {Component} from 'react';
import {Divider} from '@material-ui/core';


import LoginRequired from '../dialogs/LoginRequired';
import NavBar from './navbar';
import BetTable from './betTable';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'


class Profile extends Component{

    state = {
        
    }

    constructor(props){
        super(props);
    }

    render(){

        console.log(this.props.bets);

        if(this.props.loggedIn == false){
            return (<h1 style={{color: 'white'}}>401</h1>);
        }else{
            return (
                <BrowserRouter>

                    <div style={{backgroundColor: '#1d2126', height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                        <NavBar/>
                        <Divider></Divider>
                            <Route path={`${this.props.url}/bets`} render={props => (
                                <BetTable bets={this.props.bets}/>
                            )}/>
                    </div>
                </BrowserRouter>


                
            );
        }
    }
}

export default Profile;