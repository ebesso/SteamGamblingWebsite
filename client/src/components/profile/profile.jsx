import React from 'react';
import {Component} from 'react';
import {Redirect} from 'react-router-dom';

import LoginRequired from '../dialogs/LoginRequired';

class Profile extends Component{

    state = {
        
    }

    constructor(props){
        super(props);
    }

    render(){
        if(this.props.loggedIn == false){
            return (<LoginRequired open={!this.props.loggedIn} login={this.props.login} onClose={() => {}}/>);
        }else{
            return (<p>Welcome</p>);
        }
    }
}

export default Profile;