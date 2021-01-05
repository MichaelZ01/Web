import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARD_SIZE = 3;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return ( 
      <Square
        key = {i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} 
      />
    );
  }

  createBoard() {

    let board = [];

    for(let i = 0; i < BOARD_SIZE; i++) {

      let children = []

      for(let j = 0; j < BOARD_SIZE; j++) {

        children.push(this.renderSquare(j + 3 * i));
      }

      board.push(<div key={i} className="board-row">{children}</div>)
    }

    return board;
  }

  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        currentSquare: ['empty'],
        move: 0,
      }],
      xIsNext: true,
      stepNumber: 0,
      sortMovesAscending: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X': 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        currentSquare: ('row: ' + (Math.floor(i/3) + 1) + ' col: ' + (i % 3 + 1)),
        move: history.length,
      }]),
      
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

    console.log(history);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleSortClick() {
    this.setState({
      sortMovesAscending: !this.state.sortMovesAscending,
    })
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const sortedHistory = this.state.sortMovesAscending ? 
      history : 
      history.slice().reverse();

    const moves = sortedHistory.map((step, move) => {
      let desc = step.move ?
        'Go to move #' + step.move :
        'Go to game start';

      // Bold the current move
      if(step.move === this.state.stepNumber) {
        desc = <b>{desc}</b>;
      }

      return (
        <li key={step.move}>
          <button onClick={() => this.jumpTo(step.move)}>{desc}</button>
          <p className="move-pos">{history[step.move].currentSquare}</p> 
        </li>
      )

    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (history.length > 9) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="move-sort">
            <button onClick={() => this.handleSortClick()}>
              <b>{this.state.sortMovesAscending ? 
                "Sort Descending" : "Sort Ascending"}</b>
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// ========================================
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  
  