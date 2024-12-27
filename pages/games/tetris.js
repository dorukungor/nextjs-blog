import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import styles from '../../styles/Tetris.module.css';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: '#00f0f0'
  },
  J: {
    shape: [[1, 0, 0], [1, 1, 1]],
    color: '#0000f0'
  },
  L: {
    shape: [[0, 0, 1], [1, 1, 1]],
    color: '#f0a000'
  },
  O: {
    shape: [[1, 1], [1, 1]],
    color: '#f0f000'
  },
  S: {
    shape: [[0, 1, 1], [1, 1, 0]],
    color: '#00f000'
  },
  T: {
    shape: [[0, 1, 0], [1, 1, 1]],
    color: '#a000f0'
  },
  Z: {
    shape: [[1, 1, 0], [0, 1, 1]],
    color: '#f00000'
  }
};

export default function Tetris() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  function createEmptyBoard() {
    return Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
  }

  const spawnNewPiece = useCallback(() => {
    if (gameOver) return;
    
    const pieces = Object.keys(TETROMINOS);
    const newPieceType = pieces[Math.floor(Math.random() * pieces.length)];
    const newPiece = {
      type: newPieceType,
      shape: TETROMINOS[newPieceType].shape,
      color: TETROMINOS[newPieceType].color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOS[newPieceType].shape[0].length / 2),
      y: 0
    };
    
    if (isCollision(newPiece)) {
      setGameOver(true);
      return;
    }
    
    setCurrentPiece(newPiece);
  }, [gameOver, board]);

  function isCollision(piece) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardX = piece.x + x;
          const boardY = piece.y + y;
          
          if (
            boardX < 0 || 
            boardX >= BOARD_WIDTH || 
            boardY >= BOARD_HEIGHT ||
            (boardY >= 0 && board[boardY][boardX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver) return;

    const newPiece = {
      ...currentPiece,
      x: currentPiece.x + dx,
      y: currentPiece.y + dy
    };

    if (!isCollision(newPiece)) {
      setCurrentPiece(newPiece);
    } else if (dy > 0) {
      // Piece has landed
      const newBoard = [...board];
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            if (boardY >= 0) {
              newBoard[boardY][currentPiece.x + x] = currentPiece.color;
            }
          }
        }
      }
      
      // Check for completed lines
      let linesCleared = 0;
      for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (newBoard[y].every(cell => cell !== 0)) {
          newBoard.splice(y, 1);
          newBoard.unshift(Array(BOARD_WIDTH).fill(0));
          linesCleared++;
          y++;
        }
      }
      
      // Update score
      if (linesCleared > 0) {
        setScore(prev => prev + (linesCleared * 100));
      }
      
      setBoard(newBoard);
      spawnNewPiece();
    }
  }, [currentPiece, board, gameOver, spawnNewPiece]);

  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver) return;

    const rotatedShape = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );

    const newPiece = {
      ...currentPiece,
      shape: rotatedShape
    };

    if (!isCollision(newPiece)) {
      setCurrentPiece(newPiece);
    }
  }, [currentPiece, gameOver]);

  const resetGame = useCallback(() => {
    const emptyBoard = createEmptyBoard();
    setBoard(emptyBoard);
    setScore(0);
    setCurrentPiece(null);
    setGameOver(false);
  }, []);

  useEffect(() => {
    let gameLoop;
    
    if (!gameOver) {
      if (!currentPiece) {
        spawnNewPiece();
      }

      const handleKeyPress = (e) => {
        if (gameOver) return;
        
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            movePiece(-1, 0);
            break;
          case 'ArrowRight':
            e.preventDefault();
            movePiece(1, 0);
            break;
          case 'ArrowDown':
            e.preventDefault();
            movePiece(0, 1);
            break;
          case 'ArrowUp':
            e.preventDefault();
            rotatePiece();
            break;
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      
      gameLoop = setInterval(() => {
        movePiece(0, 1);
      }, 500);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        if (gameLoop) clearInterval(gameLoop);
      };
    }
  }, [currentPiece, movePiece, rotatePiece, spawnNewPiece, gameOver]);

  const renderBoard = () => {
    const displayBoard = [...board];
    
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            if (boardY >= 0) {
              displayBoard[boardY] = [...displayBoard[boardY]];
              displayBoard[boardY][currentPiece.x + x] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className={styles.row}>
        {row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={styles.cell}
            style={{ backgroundColor: cell || '#1e1e1e' }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Tetris</title>
        <meta name="description" content="Tetris Oyunu" />
      </Head>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Blog
        </Link>
        <Link href="/about" className={styles.navLink}>
          Hakkımda
        </Link>
        <Link href="/games" className={styles.navLink}>
          Oyunlar
        </Link>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>Tetris</h1>
        
        <div className={styles.gameContainer}>
          <div className={styles.gameInfo}>
            <p>Skor: {score}</p>
            <div className={styles.controls}>
              <p>Kontroller:</p>
              <ul>
                <li>← → : Hareket</li>
                <li>↑ : Döndür</li>
                <li>↓ : Hızlandır</li>
              </ul>
            </div>
          </div>

          <div className={styles.board}>
            {renderBoard()}
          </div>

          {gameOver && (
            <div className={styles.gameOver}>
              <h2>Oyun Bitti!</h2>
              <p>Skor: {score}</p>
              <button onClick={resetGame} className={styles.resetButton}>
                Tekrar Oyna
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 