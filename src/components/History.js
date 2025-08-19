export default function History({ turns }) {
    return (
        <ul className="history">
            {turns.map((turn, index) => {
                const moveNumber = turns.length - index;
                return (
                    <li key={`${index}-${turn.square.rowIndex}-${turn.square.colIndex}`}>
                        <button className="move-left-right ">
                            Move #{moveNumber}: Player {turn.playerSymbolPerTurn} selected row {turn.square.rowIndex} - column {turn.square.colIndex}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}