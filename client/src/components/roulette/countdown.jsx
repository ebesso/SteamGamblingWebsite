import React, { Component } from 'react'
import RouletteItem from './rouletteItem';
import { Spring } from 'react-spring/renderprops'
import {config} from 'react-spring/'

const Countdown = (props) =>{

    //#region Styles
    const text = {
        color: 'white',
        fontSize: '.875rem',
        display: 'block',

    }

    const clock = {
        color: 'white',
        fontSize: '1.75rem',
        display: 'block',
        lineHeight: 1.1

    }

    const line = {
        backgroundColor: '#00c74d',
        width: '100%',
        height: '100%'
    }
    const lineDone = {
        backgroundColor: '#00c74d',
        width: '0%',
        height: '100%'
    }

    const lineContainer = {
        display: 'block',
        position: 'relative',
        textAlign: 'left',
        width: '100%',
        overflow: 'hidden',
        height: '5px',
        backgroundColor: '#1a1e23',

    }
    //#endregion
    let time = props.time;

    return (
        <div>

            <center>
                <div style={{marginBottom: '10px'}}>
                    <span style={text}>Rolling in</span>
                    <Spring
                        from ={{number: time}}
                        to = {{number: 0}}
                        reset = {true}
                        immediate = {false}
                        config = {{
                            duration: time * 1000
                        }}
                    >
                        {props => <span style={clock} key="countdown">{props.number.toFixed(2)}</span>}
                    </Spring>
                </div>
            </center>

            <div style={lineContainer}>
                <Spring
                    from = {line}
                    to = {lineDone}
                    reset = {true}
                    immediate = {false}
                    config = {{
                        duration: time * 1000
                    }}
                >
                    {props => <div style={props}></div>}


                </Spring>
            </div>
        </div>


        // <Spring
        //     from ={{number: 10}}
        //     to = {{number: 0}}
        //     reset = {true}
        //     immediate = {false}
        //     config = {{
        //         duration: 3000
        //     }}
        // >
        //     {props => <p style={text} key="countdown"><span style={{width:  '700px'}}>{Math.round(props.number)}</span></p>}
        // </Spring>
        
    );
}

export default Countdown;