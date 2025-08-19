export default function GameOver({ winner, onRestart }) {
    console.log(winner)
    return (
        <div className="game-over">
            <h2>Game Over!</h2>
            {winner && <p>WINNER: {winner} !</p>}
            {!winner && <p>It's a draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    )
};
