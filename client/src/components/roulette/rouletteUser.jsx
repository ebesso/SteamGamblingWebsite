import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import {FaCoins} from 'react-icons/fa'

const RouletteUser = (props) => {

    const text = {
        color: 'white',
        fontWeight: 500,
        fontSize: '0.8rem',
    }
    return (

        <div style={{height: '35px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: props.background, borderRadius: '5px'}}>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '6.5px'}}>
                <Avatar alt="Profile Pic" src={props.profilePicture} style={{height: '22px', width: '22px', marginRight: '6px'}}/>
                <span style={text}>{props.username}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginRight: '6.5px'}}>
                <FaCoins style={{color: 'gold', fontSize: '0.8rem', marginRight: '3px'}}/>
                <span style={text}>{props.amount}</span>
            </div>

        </div>

    );

}

export default RouletteUser;