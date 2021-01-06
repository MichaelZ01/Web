import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// May consider writing a function to avoid having to import manually
import flipImage from './images/Flipped.jpg';
import blankImage from './images/Blank.jpg';
import catImage from './images/Cat.jpg';
import dogImage from './images/Dog.jpg';
import sheepImage from './images/Sheep.jpg';
import yakImage from './images/Yak.jpg';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          name: 'Cat',
          img: catImage,
        },
        {
          name: 'Cat',
          img: catImage,
        },
        {
          name: 'Dog',
          img: dogImage,
        },
        {
          name: 'Dog',
          img: dogImage,
        },
        {
          name: 'Sheep',
          img: sheepImage,
        },
        {
          name: 'Sheep',
          img: sheepImage,
        },
        {
          name: 'Yak',
          img: yakImage,
        },
        {
          name: 'Yak',
          img: yakImage,
        },
      ]
    }
  }


  render() {
    return (
      <div className="game">
        <Clock/>
        <div>
          <Board/>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  createBoard() {
    let board = [];

    for(let i = 0; i < 2; i++) {
      let children = [];
      for(let j =0; j < 4; j++) {
        children.push(this.renderSquare())
      }

      board.push(<div className="board-row">{children}</div>);
    }

    return board;
  }

  renderSquare() {
    return(
      <img
        src= {catImage}
        alt="Flipped"
      />
    )
  }

  render() {
    return(
      <div>
        {this.createBoard()}
      </div>
    );
  }
}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    }
  }

  // Lifecycle methods
  // Run after the component output has been rendered to the DOM
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div className="game-time">
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
  

