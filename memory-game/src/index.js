import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// May consider writing a function to avoid having to import manually
import flipImage from './images/Flipped.jpg';
import catImage from './images/Cat.jpg';
import dogImage from './images/Dog.jpg';
import sheepImage from './images/Sheep.jpg';
import yakImage from './images/Yak.jpg';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Cards are randomly sorted at the start
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
      ].sort(() => 0.5 - Math.random()),
      cardChosen: [],
      cardFound: [],
    }
  }

  // Handles when a card is picked
  handleClick(i) {
    const cardChosen = this.state.cardChosen;
    const cardFound = this.state.cardFound;

    // A already picked card is picked
    if(cardChosen.includes(i) || cardFound.includes(i)) {
      return;
    }

    // If it is the first card picked
    if(cardChosen.length === 0) {
      this.setState({
        cardChosen: [...this.state.cardChosen, i]
      });
    // If it is the second card picked
    } else if (cardChosen.length === 1) {
      this.setState({
        cardChosen: [...this.state.cardChosen, i]
      }, () => {this.checkMatch()});
    }
    // If more than 2 cards are picked, subsequent cards are ignored
  }

  // Handles restarting the game
  handleReplay() {
    this.setState({
      cards: [...this.state.cards].sort(() => 0.5 - Math.random()),
      cardChosen: [],
      cardFound: [],
    });
  }

  // Checks if the two selected cards are matching
  checkMatch() {
    const cards = this.state.cards.slice();
    const cardFound = this.state.cardFound.slice();
    const cardChosen = this.state.cardChosen.slice();

    // If cards are matching, they are added to cardFound
    if(cards[cardChosen[0]].name === cards[cardChosen[1]].name) {
      this.setState({
        cardFound: [...cardFound, ...cardChosen],
        cardChosen: [],
      });
    // Else, the cards are displayed for 0.5s then flipped back over
    } else {
      setTimeout( () =>{
        this.setState({ 
          cardChosen: [],
        });
      }, 500);
    }
  }

  // Flips cards that aren't found or picked.
  coverCards() {
    const cardDisplay = [];

    for(let i = 0; i < this.state.cards.length; i++) {
      if(this.state.cardChosen.includes(i) || this.state.cardFound.includes(i)) {
        cardDisplay.push(this.state.cards[i]);
      // Flip card
      } else {
        cardDisplay.push({name: 'flipped', img: flipImage});
      }
    }
    return cardDisplay;
  }

  render() {
    const score = this.state.cardFound.length / 2;

    return (
      <div className="game">
        <div className="game-info">
          <div className="game-time">
            <Clock/>
          </div>
          <div className="game-replay">
            <button onClick={() => this.handleReplay()}> Replay</button>
          </div>
          <div className="game-score">
            <h2> Score: {score}</h2>
          </div>
        </div>
        <div className="game-board">
          <Board
            cards={this.coverCards()}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return(
      <Square
        key = {i}
        src={this.props.cards[i].img}
        alt={this.props.cards[i].name}
        onClick={() => this.props.onClick(i)}
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

  createBoard() {
    let board = [];
    for(let i = 0; i < 2; i++) {
      let children = [];
      for(let j=0; j < 4; j++) {
        children.push(this.renderSquare(i * 4 + j))
      }
      board.push(<div key = {i} className="board-row">{children}</div>);
    }
    return board;
  }
}

function Square(props) {
  return(
    <img 
      className = "square"
      src = {props.src}
      alt = {props.alt}
      onClick={props.onClick}
    />
  );
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
  

