export function createInitialBoard(rows, cols, fill = null) {
    const grid = new Array(rows);
    for (let r = 0; r < grid.length; r++) {
        grid[r] = new Array(cols).fill(fill);
    }
    return grid;
}

export function deriveActivePlayer(gameTurns) {
    let activePlayerSymbol = 'X';
    if (gameTurns.length > 0 && gameTurns[0].playerSymbolPerTurn === 'X') {
        activePlayerSymbol = 'O';
    }
    return activePlayerSymbol;
}

export function calculateWinner(squares2D) {
    const n = squares2D.length;

    // --- check rows --- 
    for (let r = 0; r < n; r++) {
        if (squares2D[r][0] && squares2D[r].every(cell => cell === squares2D[r][0])) {
            return squares2D[r][0];
        }
    }

    //  --- check cols --- 
    for (let c = 0; c < n; c++) {
        const first = squares2D[0][c];
        if (first && squares2D.every(row => row[c] === first)) {
            return first;
        }
    }

    //  --- check main diagonal --- 
    if (squares2D[0][0] && squares2D.every((row, i) => row[i] === squares2D[0][0])) {
        return squares2D[0][0];
    }

    //  --- check anti-diagonal --- 
    if (squares2D[0][n - 1] && squares2D.every((row, i) => row[n - 1 - i] === squares2D[0][n - 1])) {
        return squares2D[0][n - 1];
    }

    return null;
}
