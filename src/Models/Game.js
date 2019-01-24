import React, { Component } from 'react';
import Board from './Board';
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.handleAnyChange = this.handleAnyChange.bind(this);
        this.handleGameOverChange = this.handleGameOverChange.bind(this);
        this.handleStepNumberChange = this.handleStepNumberChange.bind(this);
        this.state = {
            isGameOver: false,
            winner: null,
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
        };
    }

    handleAnyChange(squares) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
        });
    }

    handleGameOverChange(isGameOver, winner) {
        this.setState({
            isGameOver: isGameOver,
            winner: winner
        });
    }

    handleStepNumberChange(stepNumber){
        this.setState({
            stepNumber : stepNumber
        });
    }


    render() {

    
        return (
            <div className="game">
                <div className="game-board">
                    <Board onGameOverChange={this.handleGameOverChange}
                        onStepNumberChange = {this.handleStepNumberChange}
                        onAnyChange={this.handleAnyChange}
                        isGameOver={this.state.isGameOver}
                        winner={this.state.winner}
                        history= {this.state.history}
                        stepNumber = {this.state.stepNumber}
                    />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                   
                </div>
            </div>
        );
    }
}

export default Game;