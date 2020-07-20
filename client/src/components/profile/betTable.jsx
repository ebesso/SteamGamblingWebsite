import React from 'react'
import {Component} from 'react'

import styled from 'styled-components'

import {Table, TableBody, TableCell, TableHead, TableContainer, TableRow} from '@material-ui/core';

const BodyCell = styled(TableCell)`
color: hsla(0,0%,100%,.75);
padding-left: 0
`

const HeadCell = styled(TableCell)`
color: white;
font-size: 1.5rem;
padding-left: 0;
`

class BetTable extends Component{

    state = {
        small: false,
    }

    constructor(){
        super();
    }

    updateDimensions = () =>{
        if(window.innerWidth < 550){
            this.setState({small: true});
        }
        else{
            
            this.setState({small: false});
        }
    }

    componentDidMount(){
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    render(){
        return(

            <React.Fragment>
                <TableContainer style={{marginLeft: '20px'}}>
                    <Table style={{}}>
                        <TableHead>
                            <TableRow>
                                <HeadCell>Game</HeadCell>
                                <HeadCell>Date</HeadCell>
                                {(this.state.small) ? 
                                <React.Fragment></React.Fragment> : 
                                <React.Fragment><HeadCell>Amount</HeadCell><HeadCell>Payout</HeadCell></React.Fragment>}
                                <HeadCell>Profit</HeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.bets.map(bet =>
                        <TableRow>
                            <BodyCell>{bet.gamemode}</BodyCell>
                            <BodyCell>{(new Date(bet.date)).toISOString().split('T')[0]}</BodyCell>
                            {(this.state.small) ? <React.Fragment></React.Fragment>:<React.Fragment><BodyCell>{bet.amount}</BodyCell><BodyCell>{bet.payout}</BodyCell></React.Fragment>}
                            <TableCell style={{color: (bet.payout > 0) ? 'green' : 'red'}}>{(bet.payout > 0) ? '+' : ''}{bet.payout - bet.amount}</TableCell>

                        </TableRow> 
                        )}
                        </TableBody>
                    </Table>

                </TableContainer>
            </React.Fragment>

        )
    }
}

export default BetTable;
