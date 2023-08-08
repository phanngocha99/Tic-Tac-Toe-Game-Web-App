//React provides a special function called useState that you can call from your component to let it “remember” things. 
import { useState } from 'react';

import './App.css';


//Create  creates a component. 
//In React, a component is a piece of reusable code that represents a part of a user interface. 
//Components are used to render, manage, and update the UI elements in your application.
function App() {
  // creates an array with nine elements                            
  //and sets each of them to null : useState(Array(9).fill(null))
  const [history, setHistory] = useState([Array(9).fill(null)]); //an array with a single item, which itself is an array of 9 nulls.
  const [currentMove, setCurrentMove] = useState(0); // keep track of which step the user is currently viewing
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //The return JavaScript keyword means whatever comes after is returned as a value to the caller of the function.
  return (
    //Building the board - This is parent component 
    <div className="app">
      <div className='title'>Tic Tac Toe</div>
      <div className='appWrap'>
        <div className="app-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="app-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  function handleSquareClick(i, e) {
    //display an “X” when clicked
    //By calling this set function from an onClick handler,
    // you’re telling React to re-render that Square whenever its <button> is clicked 
    //-  By default, all child components re-render automatically when the state of a parent component changes.
    //Taking turns
    if (squares[i] || calculateWinner(squares)) { //If the square is already filled, you will return
      return;
    }
    //console.log(squares);
    const nextSquares = squares.slice(); //copy of the squares array -  immutability is important 
    if (xIsNext) {
      nextSquares[i] = "X";
      e.target.style.color = "#dfc6ff";
      e.target.style.textShadow = ' 0 0 6px rgba(202, 228, 225, 0.98), 0 0 30px rgba(202, 228, 225, 0.42), 0 0 12px rgba(30, 132, 242, 0.58), 0 0 22px rgba(30, 132, 242, 0.84), 0 0 38px rgba(30, 132, 242, 0.88), 0 0 60px rgba(30, 132, 242, 1)';
    }
    else {
      nextSquares[i] = "O";
      e.target.style.color = "#fee";
      e.target.style.textShadow = '0 -40px 100px, 0 0 2px, 0 0 1em #ff4444, 0 0 0.5em #ff4444, 0 0 0.1em #ff4444, 0 10px 3px #000';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (squares.every(element => element !== null)) {
      status = "Tie Result !";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  //The return JavaScript keyword means whatever comes after 
  //is returned as a value to the caller of the function.
  return (
    //Building the board - This is parent component 
    <div className="Board">
      <div className="status">{status}</div>
      {/* 
          - <button> is a JSX element
          - A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display.
          - className="square" is a button property or prop that tells CSS how to style the button */}
      <div className="Board-Wrap">

        <div className="board-row">
          <Square value={squares[0]} onSquareClick={(e) => handleSquareClick(0, e)} />
          <Square value={squares[1]} onSquareClick={(e) => handleSquareClick(1, e)} />
          <Square value={squares[2]} onSquareClick={(e) => handleSquareClick(2, e)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={(e) => handleSquareClick(3, e)} />
          <Square value={squares[4]} onSquareClick={(e) => handleSquareClick(4, e)} />
          <Square value={squares[5]} onSquareClick={(e) => handleSquareClick(5, e)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={(e) => handleSquareClick(6, e)} />
          <Square value={squares[7]} onSquareClick={(e) => handleSquareClick(7, e)} />
          <Square value={squares[8]} onSquareClick={(e) => handleSquareClick(8, e)} />
        </div>
      </div>
    </div>
  );
}

//Passing data through props - This is child component
function Square({ value, onSquareClick }) {
  //value stores the value and setValue is a function that can be used to change the value.
  //the null passed to useState is used as the initial value for this state variable, so value here starts off equal to null.
  return (
    <button className="square" onClick={(e) => onSquareClick(e)}>
      {value}
    </button>
  );
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//the export JavaScript keyword makes this function accessible outside of this file.
//the default keyword tells other files using your code that it’s the main function in your file.
export default App;
