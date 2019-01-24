import React, { Component } from 'react';
import Square from './Square';
import calculateWinner from '../Utils/GameCal';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (squares[i]) { return ;}
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.props.onStepNumberChange(this.props.stepNumber + 1);
        this.props.onAnyChange(squares);
        const winner = calculateWinner(squares);
        if (winner){
            this.props.onGameOverChange(true,winner);
        }
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
        
    }

    restartGame(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
        }, ()=>{
            this.props.onGameOverChange(false,null);
        })
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />;
    }

    jumpTo(step) {

        const newSquare = this.props.history[step].squares;
        this.props.onStepNumberChange(step);
        this.setState({
          xIsNext: (step % 2) === 0,
          squares:newSquare
        });
    }

    render() {

        const history = this.props.history;
        const current = history[history.length - 1];
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let display;
        let winnerDisplay =  (
            <div>
                <div className="status">{this.props.winner}</div>
                <button onClick= {(e)=> this.restartGame(e)}>restart</button>
            </div>
        );

        let normalDisplay = (
            <div>
                <div className="status">Next player: {this.state.xIsNext ? 'X' : 'O'}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>

                 <div>{moves}</div>
            </div>
        );

        if (this.props.isGameOver) {

            display = winnerDisplay;
        } else {
            display = normalDisplay;
        }
        return display;
    }
}

export default Board;
