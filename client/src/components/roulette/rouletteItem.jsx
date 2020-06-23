import React, { Component } from 'react'

class RouletteItem extends Component{

    state = {}

    constructor(){
        super()
    }

    render(){

        const rect = {
            height: '70px',
            width: '70px',
            backgroundColor: this.props.color,
            borderRadius: '.625rem',
            margin: '2px',
            display: 'inline-block',
            textAlign:'center',
            lineHeight: '70px',
            boxShadow: '',
            overflow: 'hidden'
        };

        if(this.props.color == '#00c74d'){ //Green
            rect.boxShadow = '0 10px 27px 0 rgba(0,255,12,.1),inset 0 2px 0 #35d87b,inset 0 -2px 0 #00913c';
        }else if(this.props.color == '#31353d'){ //Black
            rect.boxShadow = '0 10px 27px 0 rgba(1,10,29,.12),inset 0 2px 0 0 #3b3f47,inset 0 -2px 0 0 #272b33'
        }else{ //Red
            rect.boxShadow = '0 10px 27px 0 rgba(250,1,1,.2),inset 0 2px 0 #e5564b,inset 0 -2px 0 #ad362d';
        }

        const text = {
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '600',
            textShadow: '1px 2px rgba(0,0,0,.35)',

        }

        return (
            <span style={rect} key={this.props.id}><span style={text}>{this.props.number}</span></span>
        );
    }

}

export default RouletteItem;