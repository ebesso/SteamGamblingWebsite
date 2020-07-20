import React from 'react';
import { Component } from 'react';
import io from 'socket.io-client'
import {getToken} from '../../services/authentication';

import Message from './message'
import Input from './input'

const ENDPOINT = 'http://localhost:5000/chat';

class Chat extends Component{

    state = {
        messages: [],
    }

    constructor(){
        super();
        this.socket = io(ENDPOINT);
    }

    sendMessage = (message) => {
        this.socket.emit('sendMessage', {
            message: message,
            jwtToken: getToken()
        });
    }

    newMessage = (messages) => {
        this.setState({messages: messages});
        this.lastMessage.scrollIntoView({behavior: 'smooth'});
    }

    componentDidMount(){
        this.socket.on('newMessage', this.newMessage);
        this.socket.on('syncMessages', this.newMessage);
    }

    componentWillUnmount(){
        this.socket.close();
    }

    render(){

        

        return(
            <div style={{height: 'inherit'}}>
                <ul style={{listStyleType: 'none', padding: '0', margin: '0', overflowY: 'scroll', overflowX: 'hidden', height: window.innerHeight - 120}}>
                    {this.state.messages.map((msg, index) => 
                        <li style={{marginBottom: '7px'}} key={index}><Message username={msg.username} profilePicture={msg.profilePicture} message={msg.message}/></li>
                    )}
                    <li ref={(el) => {this.lastMessage = el;}}></li>
                </ul>
                <Input loggedIn={this.props.loggedIn} sendMessage={this.sendMessage} style={{position: 'absolute', bottom: 0, left: 0}}/>
            </div>
        );
    }

}

export default Chat;
