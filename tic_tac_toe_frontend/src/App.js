import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Color Theme
 * Accent: #43A047
 * Primary: #1976D2
 * Secondary: #90CAF9
 * Minimalistic, modern, centered layout using light theme.
 */

// PUBLIC_INTERFACE
function App() {
  // Board values: 'X', 'O', or null
  const [board, setBoard] = useState(Array(9).fill(null));
  // Tracks turn, true for X, false for O
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("");
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  // Handles a move on the board
  function handleClick(i) {
    if (board[i] || winner) return;
    const copy = [...board];
    copy[i] = xIsNext ? "X" : "O";
    setBoard(copy);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  // Calculates winner, or draw status after each move
  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
      setStatus(`Winner: ${win === "X" ? "Player 1 (X)" : "Player 2 (O)"}`);
    } else if (board.every(Boolean)) {
      setWinner("Draw");
      setStatus("It's a draw!");
    } else {
      setWinner(null);
      setStatus(`Turn: ${xIsNext ? "Player 1 (X)" : "Player 2 (O)"}`);
    }
  }, [board, xIsNext]);

  // PUBLIC_INTERFACE
  // Resets the game to initial state
  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setStatus("Turn: Player 1 (X)");
  }

  // Render a single square
  function Square({ value, onClick }) {
    return (
      <button
        className="ttt-square"
        onClick={onClick}
        aria-label={value ? `Cell ${value}` : "Empty cell"}
        disabled={!!value || !!winner}
      >
        {value}
      </button>
    );
  }

  // Construct the 3x3 board
  function renderBoard() {
    return (
      <div className="ttt-board">
        {[0, 1, 2].map((row) => (
          <div className="ttt-row" key={row}>
            {[0, 1, 2].map((col) => {
              const idx = row * 3 + col;
              return (
                <Square
                  key={idx}
                  value={board[idx]}
                  onClick={() => handleClick(idx)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="ttt-outer">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      {renderBoard()}
      <div className="ttt-status" aria-live="polite">
        {status}
      </div>
      <button className="ttt-btn" onClick={resetGame} data-accent>
        Reset Game
      </button>
      <div className="ttt-footer">
        <span>React Tic Tac Toe &middot; Minimal UI</span>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Calculate the winner of the tic tac toe board.
 * @param {Array} squares - The board, as array of 9.
 * @returns {'X' | 'O' | null} The winner, or null (not draw), or "Draw" is handled in parent.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diags
  ];
  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default App;
