import React, { Component } from 'react'

import Button from '@material-ui/core/Button';


class PlaceBet extends Component {

    render(){

        //#region Styles

        const container = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            backgroundColor: 'rgb(26, 30, 35)',
            boxShadow: 'inset 0 1px 1px 0 rgba(0,0,0,.1)',
            borderRadius: '6px',
            width: '100%',
            height: '60px',
        }

        const text = {
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'hsla(0,0%,100%,.7)',
            marginLeft: '2rem',
        }

        let placeBtn = {
            color: 'white',
            float: 'right',
            height: '40px',
            width: '50%',
            marginRight: '0.5rem',
            fontWeight: '600',
            fontSize: '0.7rem',
            boxShadow: ''

        };

        //#endregion
        let winText = '';

        if(this.props.color == 'green'){
            placeBtn.backgroundColor = 'rgb(0, 199, 77)';
            placeBtn.boxShadow = '0 10px 27px 0 rgba(0,255,12,.1),inset 0 2px 0 #35d87b,inset 0 -2px 0 #00913c'

            winText = 'Win 14x'
        }
        else if(this.props.color == 'red'){
            placeBtn.backgroundColor = 'rgb(222, 76, 65)';
            placeBtn.boxShadow = '0 10px 27px 0 rgba(250,1,1,.2),inset 0 2px 0 #e5564b,inset 0 -2px 0 #ad362d'

            winText = 'Win 2x'
        }
        else if(this.props.color == 'black'){
            placeBtn.backgroundColor = 'rgb(49, 53, 61)';
            placeBtn.boxShadow = '0 10px 27px 0 rgba(1,10,29,.12),inset 0 2px 0 0 #3b3f47,inset 0 -2px 0 0 #272b33'

            winText = 'Win 2x'
        }

        return (

            <div style={container}>
                <span style={text}>{winText}</span>
                <Button style={placeBtn} onClick={this.props.placeBet} disabled={this.props.active}>Place bet</Button>
            </div>

        )

    }

}

export default PlaceBet;