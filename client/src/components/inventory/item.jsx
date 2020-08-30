import React from 'react'
import {Component} from 'react'
import styled from 'styled-components'
import {FaCoins} from 'react-icons/fa'

class Item extends Component{
    constructor(){
        super()
    }

    render(){

        const Wrapper = styled.div`
            background-color: #2f333a;
            position: relative;
            height: 190px;
            width: 175px;
            border-radius: 20px;
            border: ${(this.props.selected)? '3px solid rgb(0, 199, 77)' : '3px solid transparent'};
            &:hover{
                border: rgb(0, 199, 77) 3px dashed;
            }

        `

        return (
            
            <Wrapper>
                <img src={this.props.item.image} alt='Item image' style={{width: '70%', marginTop: '20px'}}/>
                <div style={{width: '85%'}}>
                    <div style={{display: 'flex', alignContent: 'left'}}>
                        <span style={{color: 'hsla(0,0%,100%,.7)', fontSize: '0.7rem', display: 'block'}}>{this.props.item.name}</span>
                    </div>
                    <div style={{position: 'absolute', bottom: 0, display: 'flex', marginBottom: '20px', justifyContent: 'center'}}>
                        <FaCoins style={{color: 'gold', marginRight: '5px'}}/><span style={{color: 'white', display: 'block', fontWeight: 500}}>{this.props.item.price}</span>
                    </div>
                </div>


            </Wrapper>

        )
    }
}

export default Item;