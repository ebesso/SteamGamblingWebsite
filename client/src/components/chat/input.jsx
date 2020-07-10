import React from 'react';
import {Component} from 'react'
import {TextField} from '@material-ui/core'
import {FaPaperPlane} from 'react-icons/fa'

class Input extends Component{
    state = {
        message: ''
    }

    constructor(){
        super();
    }

    messageChanged = (e) => {
        this.setState({message: e.target.value})
    }

    sendMessage = (e) =>{
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    }

    render(){
        return (

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
                {(this.props.loggedIn) ? 
                <form onSubmit={this.sendMessage}>
                    <input style={{width: '80%', background: 'none', color: 'rgb(106, 109, 112)', fontSize: '1rem', border: 'none', outline: 'none'}} placeholder='Say something...' value={this.state.message} onChange={this.messageChanged}/>
                    <button style={{background: 'none', border: 'none'}} type='submit'><FaPaperPlane style={{color: 'rgb(106, 109, 112)', fontSize: '1rem'}}/></button>
                </form>

                :
                    <span style={{color: 'rgb(106, 109, 112)'}}>Log in to chat</span>
                }

            </div>
        )
    }
}

export default Input;
