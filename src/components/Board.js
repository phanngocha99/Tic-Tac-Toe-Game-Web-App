import Square from './Square';

export default function Board({ onSelectSquare, board }) {
    return (
        <>
            <div className='board-setting'>
                <p>Board Size: </p>
                <p className='board-size'>{3} x {3}</p>
            </div >
            <div className='board-wrap'>
                {board.map((row, rowIndex) =>
                    <div key={rowIndex} className='board-row'>
                        {row.map((col, colIndex) =>
                            <Square
                                key={colIndex}
                                playerSymbol={col}
                                onSquareClick={
                                    () => onSelectSquare(rowIndex, colIndex)
                                }
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    )
};

