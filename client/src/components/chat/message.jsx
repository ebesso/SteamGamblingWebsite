import React from 'react'
import {Component} from 'react';
import {Avatar} from '@material-ui/core'

class Message extends Component{

    constructor(){
        super();
    }

    render(){

        const text = {
            color: 'white',
            fontWeight: 500,
            fontSize: '0.9rem',
        }

        return (
            <div style={{display: 'flex', marginLeft: '6.5px'}}>
                <Avatar alt="Profile Pic" src={this.props.profilePicture} style={{height: '18px', width: '18px', marginRight: '3px'}}/>
                <span><span style={text}>{this.props.username}:</span> <span style={{color: 'hsla(0,0%,100%,.75)', fontWeight: 400, fontSize: '0.8rem'}}>{this.props.message}</span></span>
            </div>
        );
    }

}

export default Message;
