import React from 'react';
import {AppBar, Toolbar, Button, Avatar, MenuItem, Popper, ClickAwayListener, Paper, MenuList, Drawer, Divider} from '@material-ui/core';
import { Component } from 'react';
import {FaDharmachakra, FaChartLine, FaCoins, FaCaretDown, FaUserAlt, FaBullhorn, FaBalanceScale, FaBars} from 'react-icons/fa'
import styled from 'styled-components';
import { Spring } from 'react-spring/renderprops'
import {isLoggedIn} from '../services/authentication'
import { readyException } from 'jquery';

class NavButton extends Component{
    render(){

        const Wrapper = styled.div`
        display: flex;
        align-items: center;
        margin-left: 20px;
        border-bottom: ${(this.props.selected)?'2px solid #FF4500':'2px solid transparent'};
        &:hover{
            border-bottom: 2px solid #FF4500;
        }
        `
        return(
            <Wrapper>
                
                <Button style={{fontWeight: 600, color: 'hsla(0,0%,100%,.75)', padding: '0', fontSize: '18px'}}>{this.props.icon} {this.props.text}</Button>
            </Wrapper>
        );
    }
}

class NavigationBar extends Component{

    state = {
        profileMenuOpen: false,
        profileMenuAnchor: null,
        sidebar: false,
        sidebarOpen: false
    }

    constructor(){
        super();
    }

    updateDimensions = () => {
        if(window.innerWidth < 900){
            this.setState({sidebar: true});
        }
        else{
            
            this.setState({sidebar: false, sidebarOpen: false});
        }
    }

    componentDidMount(){
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
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
            borderRadius: '0.7rem',
            width: '200px',
            marginTop: '20px'

        }

        const menuListItemStyle1 = {
            color: 'white',
            padding: '20px',
            fontSize: '0.9rem'
        }
        const menuListItemStyle2 = {
            color: 'hsla(0,0%,100%,.6)',
            padding: '1rem',
            fontSize: '0.7rem'
        }

        return(
            <React.Fragment>
                <AppBar position='fixed' style={{zIndex: '7'}}>
                    <Toolbar style={{backgroundColor: '#1d2126', height: '70px'}}>
                        {(this.state.sidebar == false) ? 
                            <img src="https://rustsites.com/img/csgoroll-logo.png" alt="Icon" style={{height: '50%'}}/>
                            :
                            <FaBars style={{color: 'white', fontSize: '32px', fontWeight: '200'}} onClick={() => this.setState({sidebarOpen: (this.state.sidebarOpen) ? false : true})}/>
                        }
                        
                        {(this.state.sidebar == false) ? 
                            <React.Fragment>
                                <NavButton text="ROLL" selected={true} icon={<FaDharmachakra style={{marginRight: '2px', color: 'lightgrey'}}/>}/>
                                <NavButton text="Crash (Coming soon)" selected={false} icon={<FaChartLine style={{marginRight: '2px', color: 'lightgrey'}}/>}/>

                            </React.Fragment>
                        :
                        <React.Fragment></React.Fragment>
                        }



                        {(this.props.loggedIn) ?
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                            {(this.state.sidebar == false) ? 
                                <React.Fragment>
                                    <NavButton style={{marginLeft: 'auto', marginRight: '1rem'}} text='Withdraw'/>
                                    <NavButton style={{marginLeft: 'auto', marginRight: '1rem'}} text='Deposit'/>

                                    <Button style={{fontSize: '18px', marginRight: '1rem', marginLeft: '20px', padding: '5px'}}>
                                        <FaCoins style={{color: 'gold', marginRight: '0.2rem'}}/>
                                        <Spring
                                            to={{number: this.props.balance}}
                                            config = {{duration: 400}}
                                        >
                                            {props => <span style={{fontWeight: '600', marginRight: '0.5rem', color: 'white'}}>{props.number.toFixed(2)}</span>}
                                        </Spring>
                                        
                                    </Button>
                                </React.Fragment>
                                :
                                <React.Fragment></React.Fragment>
                            }
                            <div>
                                <Button style={{marginLeft: 'auto', color: 'white', backgroundColor: '#262a30', fontWeight: 400}} onClick={this.openProfileMenu}>
                                    <Avatar src={this.props.avatar} style={{height: '2rem', width: '2rem'}}/>
                                    <FaCaretDown style={{marginLeft: '0.5rem', fontSize: '1.5rem'}}/>
                                </Button>
                                <Popper style={profileMenuStyle} open={this.state.profileMenuOpen} anchorEl={this.state.profileMenuAnchor}>
                                        <Paper style={{width: '100%', backgroundColor: '#262a30', borderRadius: '0.7rem',}}>
                                            <ClickAwayListener onClickAway={this.closeProfileMenu}>
                                                <MenuList>
                                                    <MenuItem style={menuListItemStyle1}><FaUserAlt style={{marginRight: '0.5rem'}}/>{this.props.username}</MenuItem>
                                                    <MenuItem style={menuListItemStyle1}><FaBullhorn style={{marginRight: '0.5rem'}}/>Affiliate</MenuItem>
                                                    <MenuItem style={menuListItemStyle1}><FaBalanceScale style={{marginRight: '0.5rem'}}/>Fairness</MenuItem>


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
                <Drawer anchor='left' open={this.state.sidebarOpen} onClose={()=> {this.setState({sidebarOpen: false})}} style={{zIndex: 6}}>
                    <Paper style={{width: '100%', height: '100%', backgroundColor: '#21252b'}}>
                        {(this.props.loggedIn) ? 
                        <div style={{marginTop: '90px', display: 'flex', justifyContent: 'space-between', width: '300px'}}>
                                <Button style={{fontSize: '0.95rem', color: 'white', marginLeft: '10px'}}><FaCoins style={{color: 'gold', marginRight: '0.4rem'}}/>{this.props.balance}</Button>
                                <Button style={{color: 'white', boxShadow: '0 10px 27px 0 rgba(0,255,12,.1),inset 0 2px 0 #35d87b,inset 0 -2px 0 #00913c', backgroundColor: 'rgb(0, 199, 77)',fontWeight: 600, fontSize: '0.95rem'}} onClick={this.props.deposit}>Deposit</Button>
                                <Button style={{color: 'hsla(0,0%,100%,.75)', fontWeight: 600, fontSize: '0.95rem', marginRight: '10px'}} onClick={this.props.withdraw}>Withdraw</Button>
                        </div>
                        :
                        <Button style={{color: 'white', boxShadow: '0 10px 27px 0 rgba(0,255,12,.1),inset 0 2px 0 #35d87b,inset 0 -2px 0 #00913c', backgroundColor: 'rgb(0, 199, 77)',fontWeight: 600, fontSize: '0.95rem', marginTop: '90px', marginLeft: '100px', marginRight: '100px', width: '100px'}} onClick={this.props.login}>Login</Button>

                        }

                        
                        <Divider style={{marginTop: '10px', marginBottom: '5px'}}/>

                        <MenuList style={{marginLeft: '10px', padding: 0}}>
                            <MenuItem style={{padding: 0}}>
                                <div style={{display: 'flex', alignItems: 'center', padding: '5px', fontSize: '1.5rem', color: 'hsla(0,0%,100%,.75)'}}>
                                    <FaDharmachakra/>
                                    <a style={{fontWeight: 600, marginLeft: '5px'}}>ROLL</a>
                                </div>
                            </MenuItem>
                            <MenuItem style={{padding: 0}}>
                                <div style={{display: 'flex', alignItems: 'center', padding: '5px', fontSize: '1.5rem', color: 'hsla(0,0%,100%,.75)'}}>
                                    <FaChartLine/>
                                    <a style={{fontWeight: 600, marginLeft: '5px'}}>Crash</a>
                                </div>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Drawer>
            </React.Fragment>

        );
    }
}

export default NavigationBar;