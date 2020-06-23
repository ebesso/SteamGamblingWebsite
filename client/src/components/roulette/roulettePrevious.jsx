import React, { Component } from 'react'
import {Spring} from 'react-spring/renderprops'

const RoulettePrevious = (props) =>{

    const circle = {
        height: '20px',
        width: '20px',
        backgroundColor: props.color,
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '3px'
    }

    return (
        <Spring
            to = {{opacity: 1}}
            from = {{opacity: 0}}
            config = {{
                duration: 200
            }}
        >
            {opacity => <span style={Object.assign({}, circle, opacity)} key={props.id}></span>}
            
        </Spring>
    )

}

export default RoulettePrevious;