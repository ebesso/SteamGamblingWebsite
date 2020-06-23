import React, { Component } from 'react'
import RouletteItem from './rouletteItem';
import {Spring} from 'react-spring/renderprops'

import {config} from 'react-spring/'
import { FaGrinTongueSquint } from 'react-icons/fa';

class RouletteStrip extends Component{


    state = {
        redMargin: 14500,
        blackMargin: 14644,
        greenMargin: 14932,

        items: [],
    }

    constructor(){
        super();


    }

    componentDidMount(){
        if(this.state.items.length == 0){
            this.generateItems();
        }
    }

    generateItems = () => {
        const length = 220;
        let items = [];


        for(var i = 0; i < length; i++){
            if(i % 14 == 0){
                items.push(<RouletteItem color="#00c74d" key={i} id={i} number={0}/>)
    
            }
            else if(i % 2 == 0){
                items.push(<RouletteItem color="#31353d" key={i} id={i} number={Math.floor(Math.random() * 14) + 1}/>)
            }else{
                items.push(<RouletteItem color="#de4c41" key={i} id={i} number={Math.floor(Math.random() * 14) + 1}/>)
    
            }
        }

        this.setState({items: items});
    
    }

    render(){
        
        const roll = {mass: 200,friction: 600, tension: 330, clamp: true}
        const reset = {duration: 500, clamp: true}

        var marginLeft;

        if(this.props.winningColor == 'green'){
            marginLeft = this.state.greenMargin - Math.floor(Math.random() * 70) - 50

        }else if(this.props.winningColor == 'black'){
            marginLeft = this.state.blackMargin - Math.floor(Math.random() * 70) - 50

        }else{
            marginLeft = this.state.redMargin - Math.floor(Math.random() * 70) - 50
        }

        return (
            <Spring
            from = {{marginLeft: (this.props.roll) ? 0 : -marginLeft}}
            to = {{marginLeft: (this.props.roll) ? -marginLeft : 0}}
            reset = {false}
            immediate = {false}
            delay = {0}
            config = {(this.props.roll) ? roll : reset}
            
            >
            {props => <div style={props}>{this.state.items.map(item => item)}</div>}

            </Spring>
        );
    }



}

export default RouletteStrip; 