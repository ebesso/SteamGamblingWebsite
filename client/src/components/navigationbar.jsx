import React from 'react';
import {AppBar, Toolbar, Button, Avatar, MenuItem, Popper, ClickAwayListener, Paper, MenuList} from '@material-ui/core';
import { Component } from 'react';
import {FaDharmachakra, FaChartLine, FaCoins, FaCaretDown, FaUserAlt, FaBullhorn} from 'react-icons/fa'
import { Spring } from 'react-spring/renderprops'
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

    state = {
        profileMenuOpen: false,
        profileMenuAnchor: null
    }

    constructor(){
        super();
    }

    closeProfileMenu = () =>{
        this.setState({profileMenuOpen: false, profileMenuAnchor: null});
    }

    openProfileMenu = (event) =>{

        this.setState({profileMenuOpen: true, profileMenuAnchor: event.currentTarget});
    }

    render(){


        const profileMenuStyle = {
            backgroundColor: '#262a30',
            borderRadius: '0.7rem'
        }

        const menuListItemStyle1 = {
            color: 'white',
            padding: '1rem',
            fontSize: '1rem'
        }
        const menuListItemStyle2 = {
            color: 'hsla(0,0%,100%,.6)',
            padding: '1rem',
            fontSize: '0.7rem'
        }

        return(
            <AppBar position='fixed'>
                <Toolbar style={{backgroundColor: '#1d2126', height: '70px'}}>
                    <img src="https://rustsites.com/img/csgoroll-logo.png" alt="Icon" style={{height: '50%'}}/>

                    <NavButton text="ROLL" selected={true} icon={<FaDharmachakra style={{marginRight: '2px', color: 'lightgrey'}}/>}/>
                    <NavButton text="CRASH" selected={false} icon={<FaChartLine style={{marginRight: '2px', color: 'lightgrey'}}/>}/>

                    {(this.props.loggedIn) ?
                    <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                        <Button style={{marginLeft: 'auto', color: 'hsla(0,0%,100%,.75)', fontWeight: 600, marginRight: '1rem'}} onClick={this.props.logout}>Withdraw</Button>
                        <Button style={{marginLeft: 'auto', color: 'hsla(0,0%,100%,.75)', fontWeight: 600, marginRight: '1rem'}} onClick={this.props.logout}>Deposit</Button>
                        <Button style={{fontSize: '1rem', marginRight: '1rem'}}>
                            <FaCoins style={{color: 'gold', marginRight: '0.2rem'}}/>
                            <Spring
                                to={{number: this.props.balance}}
                                config = {{duration: 400}}
                            >
                                {props => <span style={{fontWeight: '600', marginRight: '0.5rem', color: 'white'}}>{props.number.toFixed(2)}</span>}
                            </Spring>
                            
                        </Button>
                        <div>
                            <Button style={{marginLeft: 'auto', color: 'white', backgroundColor: '#262a30', fontWeight: 400}} onClick={this.openProfileMenu}>
                                <Avatar src={this.props.avatar} style={{height: '2rem', width: '2rem'}}/>
                                <FaCaretDown style={{marginLeft: '0.5rem', fontSize: '1.5rem'}}/>
                            </Button>
                            <Popper style={profileMenuStyle} open={this.state.profileMenuOpen} anchorEl={this.state.profileMenuAnchor}>
                                    <Paper style={profileMenuStyle}>
                                        <ClickAwayListener onClickAway={this.closeProfileMenu}>
                                            <MenuList>
                                                <MenuItem style={menuListItemStyle1}><FaUserAlt style={{marginRight: '0.5rem'}}/>{this.props.username}</MenuItem>
                                                <MenuItem style={menuListItemStyle1}><FaBullhorn style={{marginRight: '0.5rem'}}/>Affiliate</MenuItem>

                                                <MenuItem style={menuListItemStyle2}>FAQ</MenuItem>
                                                <MenuItem style={menuListItemStyle2} onClick={this.props.logout}>Logout</MenuItem>

                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                            </Popper>
                        </div>

                    </div>
                    :
                    <Button style={{marginLeft: 'auto', color: 'white', backgroundColor: '#00c74d', fontWeight: 600}} onClick={this.props.login}>Login</Button>
                    }

                </Toolbar>
            </AppBar>
        );
    }
}

export default NavigationBar;