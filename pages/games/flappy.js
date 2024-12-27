import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useCallback, useRef } from 'react';
import styles from '../../styles/Flappy.module.css';

export default function RollingBall() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 100, y: 250 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [path, setPath] = useState([{ x: 100, y: 250 }]);
  const [pipes, setPipes] = useState([]);
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastPointRef = useRef({ x: 100, y: 250 });
  
  const BALL_RADIUS = 15;
  const PIPE_SPEED = 1;
  const PIPE_GAP = 150;
  const PIPE_SPAWN_RATE = 3000;
  const BALL_SPEED = 1;
  const PATH_FOLLOW_DISTANCE = 100; // Top bu mesafe içindeki çizgiyi takip eder

  const startGame = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true);
      setBallPosition({ x: 100, y: 250 });
    }
  }, [gameStarted]);

  const resetGame = useCallback(() => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setBallPosition({ x: 100, y: 250 });
    setPath([{ x: 100, y: 250 }]);
    setPipes([]);
    lastPointRef.current = { x: 100, y: 250 };
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 800, 500);
    }
  }, []);

  const handleMouseDown = (e) => {
    if (!gameOver) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDrawing(true);
      
      if (!gameStarted) {
        setGameStarted(true);
        setBallPosition({ x: 100, y: 250 });
      }
    }
  };

  const handleMouseMove = (e) => {
    if (isDrawing && !gameOver) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        const newPoint = { x, y };
        setPath(prevPath => [...prevPath, newPoint]);
        lastPointRef.current = newPoint;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      // Top hareketi
      setBallPosition(prevPos => {
        const ballX = prevPos.x + BALL_SPEED;
        let targetY = prevPos.y;
        
        // Çizginin son noktasını bul
        const lastPathPoint = path[path.length - 1];
        
        // Eğer top çizginin sonuna geldiyse, x pozisyonunu sınırla
        if (ballX >= lastPathPoint.x) {
          return { x: lastPathPoint.x, y: lastPathPoint.y };
        }
        
        // Topun önündeki çizgi parçasını bul ve takip et
        const relevantPoints = path.filter(point => 
          point.x >= ballX - PATH_FOLLOW_DISTANCE && point.x <= ballX + PATH_FOLLOW_DISTANCE
        );
        
        if (relevantPoints.length > 0) {
          // En yakın noktanın y pozisyonunu hedefle
          const closestPoint = relevantPoints.reduce((prev, curr) => 
            Math.abs(curr.x - ballX) < Math.abs(prev.x - ballX) ? curr : prev
          );
          targetY = closestPoint.y;
        }
        
        // Yumuşak geçiş için interpolasyon
        const dy = targetY - prevPos.y;
        const newY = prevPos.y + dy * 0.1;
        
        return { x: ballX, y: newY };
      });

      // Boruların hareketi
      setPipes(currentPipes => {
        return currentPipes
          .map(pipe => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED,
          }))
          .filter(pipe => pipe.x > -60);
      });

      // Çarpışma kontrolü
      pipes.forEach(pipe => {
        const ballLeft = ballPosition.x - BALL_RADIUS;
        const ballRight = ballPosition.x + BALL_RADIUS;
        const ballTop = ballPosition.y - BALL_RADIUS;
        const ballBottom = ballPosition.y + BALL_RADIUS;
        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + 60;
        const pipeTop = pipe.height;
        const pipeBottom = pipe.height + PIPE_GAP;

        if (
          ballRight > pipeLeft &&
          ballLeft < pipeRight &&
          (ballTop < pipeTop || ballBottom > pipeBottom)
        ) {
          setGameOver(true);
          return;
        }
      });

      // Skor kontrolü
      pipes.forEach(pipe => {
        if (!pipe.passed && pipe.x < ballPosition.x) {
          setScore(s => s + 1);
          pipe.passed = true;
        }
      });

      // Ekran dışına çıkma kontrolü
      if (ballPosition.y < 0 || ballPosition.y > 500) {
        setGameOver(true);
        return;
      }

      if (!gameOver) {
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameOver, ballPosition, path, pipes]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnPipe = setInterval(() => {
      const height = Math.random() * (400 - 100) + 100;
      setPipes(pipes => [...pipes, { x: 800, height, passed: false }]);
    }, PIPE_SPAWN_RATE);

    return () => clearInterval(spawnPipe);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 800, 500);

    // Çizgiyi çiz
    if (path.length > 1) {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Topu çiz
    ctx.beginPath();
    ctx.arc(ballPosition.x, ballPosition.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#ffeb3b';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Boruları çiz
    pipes.forEach(pipe => {
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(pipe.x, 0, 60, pipe.height);
      ctx.fillRect(pipe.x, pipe.height + PIPE_GAP, 60, 500 - pipe.height - PIPE_GAP);
      ctx.strokeStyle = '#2e7d32';
      ctx.strokeRect(pipe.x, 0, 60, pipe.height);
      ctx.strokeRect(pipe.x, pipe.height + PIPE_GAP, 60, 500 - pipe.height - PIPE_GAP);
    });
  }, [path, ballPosition, pipes]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rolling Ball</title>
        <meta name="description" content="Rolling Ball Oyunu" />
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
        <h1 className={styles.title}>Rolling Ball</h1>
        
        <div className={styles.gameContainer}>
          <div className={styles.gameInfo}>
            <p>Skor: {score}</p>
            <div className={styles.controls}>
              <p>Kontroller:</p>
              <ul>
                <li>Ekrana tıklayarak oyunu başlat</li>
                <li>Fare ile çizgi çizerek topu yönlendir</li>
              </ul>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            className={styles.gameArea}
            width={800}
            height={500}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />

          {!gameStarted && !gameOver && (
            <div className={styles.message}>
              Başlamak için ekrana tıklayın
            </div>
          )}

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