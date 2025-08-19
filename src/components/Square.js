export default function Square({ playerSymbol, onSquareClick }) {
    return (
        <button className={`square ${playerSymbol || ''}`}
            onClick={() => onSquareClick()}
            disabled={!!playerSymbol}
        >
            {playerSymbol}
        </button>
    );
}