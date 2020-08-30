import React from 'react'
import {Component} from 'react'
import styled from 'styled-components'

import axios from 'axios';

import Item from './item'

import {getToken, getInventory} from '../../services/authentication'

class Trade extends Component{
    constructor(){
        super()
    }

    state = {
        inventory: [],
    }

    componentDidMount(){
        const app = this;

        getInventory(function(success, inv){
            if(success){
                app.setState({inventory: inv});
            }else{  
                console.log('Failed to load inventory');
            }
        });
    }

    state = {
        inventory: [],
        selected: []
    }

    itemClicked = (itemID) => {
        if(this.state.selected.includes(itemID)){
            let selected = this.state.selected;
            let i = selected.indexOf(itemID);
            selected.splice(i, 1);
            this.setState({selected: selected});
        }else{
            let selected = this.state.selected;
            selected.push(itemID);
            this.setState({selected: selected});
        }
    }

    render(){
        if(this.props.loggedIn == false){
            return (<h1 style={{color: 'white', color: 'rgba(255, 255, 255, 0.7)'}}>401</h1>);
        }else{

            var InvList = styled.ul`

                list-style-type: none;
                padding: 0;
                margin: 0;

            `

            var LiItem = styled.li`
                margin-left: 15px;
                margin-bottom: 10px;
            `

            return (
                <React.Fragment>
                    <div style={{display: 'flex', alignItems: 'left'}}>
                        <h1 style={{color: 'hsla(0,0%,100%,.45)', marginLeft: '15px'}}>{this.props.type}</h1>
                    </div>
                    <div style={{display: 'flex', alignItems: 'left'}}>
                        <InvList style={{listStyleType: 'none', padding: 0, margin: 0}}>

                            {this.state.inventory.map(item => 
                                <LiItem style={{float: 'left'}} onClick={() => {this.itemClicked(item.id)}}>
                                    <Item item={item} selected={(this.state.selected.includes(item.id)) ? true : false} key={item.id}/>
                                </LiItem>

                            )}
                        </InvList>
                    </div>
                    <div>

                    </div>


                </React.Fragment>
            )
        }
    }
}

export default Trade;
