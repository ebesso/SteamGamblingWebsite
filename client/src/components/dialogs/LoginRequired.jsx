import React, { Component } from 'react'
import {Dialog, DialogTitle, DialogContent, Button} from '@material-ui/core'

class LoginRequiredPopup extends Component{

    constructor(){
        super();
    }

    render(){

        const container = {
            backgroundColor: '#21252b',
            boxShadow: '0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)',
            borderRadius: '0.75rem !important',
        }
        return(
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle style={{color: 'white', backgroundColor: '#21252b'}}><center>LOGIN</center></DialogTitle>

                <DialogContent style={container}>
                    <center>
                        <p style={{color: 'hsla(0,0%,100%,.7)'}}>Please login to start playing</p>
                        <img src="https://cdn.hellcase.com/hellcase/img/csgo/weapons/attackcase.png" style={{maxWidth: '100%', maxHeight: '100%'}}></img>
                        <Button style={{marginLeft: 'auto', color: 'white', backgroundColor: '#00c74d', fontWeight: 600, marginBottom: '10px', padding: '10px 20px 10px 20px'}} onClick={this.props.login}>Login</Button>
                    </center>
                    
                </DialogContent>
            </Dialog>
        )
    }

}

export default LoginRequiredPopup;
