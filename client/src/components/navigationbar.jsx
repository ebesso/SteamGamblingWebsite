import React from 'react';
import {AppBar, Toolbar, Button} from '@material-ui/core';
import { Component } from 'react';
import {FaDharmachakra, FaChartLine} from 'react-icons/fa'
import {isLoggedIn} from '../services/authentication'

class NavButton extends Component{
    render(){
        return(
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px', borderBottom: (this.props.selected) ? '2px solid #FF4500' : 'none', padding: '5px'}}>
                {this.props.icon}
                <a style={{fontWeight: 600}}>{this.props.text}</a>
            </div>
        );
    }
}

class NavigationBar extends Component{

    constructor(){
        super();
    }

    render(){

        return(
            <AppBar position='static'>
                <Toolbar style={{backgroundColor: '#1d2126', height: '70px'}}>
                    <img src="https://rustsites.com/img/csgoroll-logo.png" alt="Icon" style={{height: '50%'}}/>
    
                    <NavButton text="ROLL" selected={true} icon={<FaDharmachakra style={{marginRight: '2px', color: 'lightgrey'}}/>}/>
                    <NavButton text="CRASH" selected={false} icon={<FaChartLine style={{marginRight: '2px', color: 'lightgrey'}}/>}/>

                    {(this.props.loggedIn) ? 
                    <Button style={{marginLeft: 'auto', color: 'white', backgroundColor: '#00c74d', fontWeight: 600}} onClick={this.props.logout}>Logout</Button>
                    :
                    <Button style={{marginLeft: 'auto', color: 'white', backgroundColor: '#00c74d', fontWeight: 600}} onClick={this.props.login}>Login</Button>
                    }

                </Toolbar>
            </AppBar>
        );
    }
}

export default NavigationBar;