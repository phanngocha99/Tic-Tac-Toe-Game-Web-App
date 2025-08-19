import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Player from './components/Player';
import History from './components/History';
import GameOver from './components/GameOver';
import { createInitialBoard, deriveActivePlayer, calculateWinner } from './utils/utils';

function App() {
  const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
  }
  const initialBoard = createInitialBoard(3, 3);
  // --- declare UseState Hook ---
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // --- setting gameBoard variable ---
  const activePlayerSymbol = deriveActivePlayer(gameTurns);
  let gameBoard = initialBoard.map((row) => [...row]);
  for (const turn of gameTurns) {
    const { square, playerSymbolPerTurn } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = playerSymbolPerTurn;
  }
  // --- check Winner and Draw status 
  const winner = calculateWinner(gameBoard);
  const hasDraw = gameBoard.flat().every((element) => element !== null);
  // --- declare Function of current Component --- 
  function handleChangeName(symbol, newName) {
    setPlayerName((prevName) => {
      return {
        ...prevName,
        [symbol]: newName
      }
    })
  };
  function handleClickSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayerSymbol = deriveActivePlayer(prevTurns);
      const updatedTurn = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          playerSymbolPerTurn: currentPlayerSymbol
        },
        ...prevTurns
      ]
      return updatedTurn;
    })
  };
  function handleRestart() {
    setGameTurns([]);
  };

  return (
    <div className='app-container'>
      <div className='title'>TIC-TAC-TOE</div>
      <div className='players-container'>
        <ul className='players'>
          <Player
            initialName={playerName.X}
            symbol={'X'}
            isActive={activePlayerSymbol === 'X'}
            onChangeName={handleChangeName}
          />
          <li className='title'>
            <span><sup>V</sup>/<sub>S</sub></span>
          </li>
          <Player
            initialName={playerName.O}
            symbol={'O'}
            isActive={activePlayerSymbol === 'O'}
            onChangeName={handleChangeName}
          />
        </ul>
      </div>
      {(winner || hasDraw) ?
        <GameOver
          winner={
            winner && (winner === 'X' ? playerName.X : playerName.O)
          }
          onRestart={handleRestart} /> : ''}
      <div className='boardgame-container'>
        <Board
          onSelectSquare={handleClickSquare}
          board={gameBoard}
        />
      </div>
      <div className='history-container'>
        <History turns={gameTurns} />
      </div>
    </div>
  );
}

export default App;
