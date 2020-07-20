import React from 'react';
import {Component} from 'react'
import {AppBar, Toolbar, Button, Avatar, MenuItem, Popper, ClickAwayListener, Paper, MenuList, Drawer, Divider} from '@material-ui/core';
import styled from 'styled-components'

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

class NavBar extends Component{

    constructor(){
        super();
    }

    render(){
        return(
            <Toolbar style={{paddingLeft: 0}}>
                <NavButton text='Summary'></NavButton>
                <NavButton text='Bets'></NavButton>
                <NavButton text='Trades'></NavButton>
            </Toolbar>

        )
    }

}

export default NavBar;