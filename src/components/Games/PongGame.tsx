import React, { useRef, useEffect, useState, useCallback } from 'react';

interface PongState {
  ball: { x: number; y: number; dx: number; dy: number };
  playerPaddle: { y: number };
  computerPaddle: { y: number };
  playerScore: number;
  computerScore: number;
  gameStatus: 'playing' | 'paused' | 'gameOver' | 'quit';
  ballSpeed: number;
  rallyCount: number;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 4;

const initialState: PongState = {
  ball: { 
    x: CANVAS_WIDTH / 2, 
    y: CANVAS_HEIGHT / 2, 
    dx: INITIAL_BALL_SPEED, 
    dy: INITIAL_BALL_SPEED 
  },
  playerPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
  computerPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
  playerScore: 0,
  computerScore: 0,
  gameStatus: 'playing',
  ballSpeed: INITIAL_BALL_SPEED,
  rallyCount: 0
};

const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const [gameState, setGameState] = useState<PongState>(initialState);
  const keysPressed = useRef<Set<string>>(new Set());

  const resetBall = useCallback((currentSpeed: number) => {
    return {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      dx: (Math.random() > 0.5 ? 1 : -1) * currentSpeed,
      dy: (Math.random() > 0.5 ? 1 : -1) * currentSpeed
    };
  }, []);

  const updateGameState = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameStatus !== 'playing') return prevState;

      const newState = { ...prevState };

      // Update ball position
      newState.ball = {
        ...newState.ball,
        x: newState.ball.x + newState.ball.dx,
        y: newState.ball.y + newState.ball.dy
      };

      // Ball collision with top and bottom walls
      if (newState.ball.y <= 0 || newState.ball.y >= CANVAS_HEIGHT - BALL_SIZE) {
        newState.ball.dy = -newState.ball.dy;
      }

      // Ball collision with paddles
      const ballLeft = newState.ball.x;
      const ballRight = newState.ball.x + BALL_SIZE;
      const ballTop = newState.ball.y;
      const ballBottom = newState.ball.y + BALL_SIZE;

      // Player paddle collision (left side)
      if (ballLeft <= PADDLE_WIDTH && 
          ballRight >= 0 && 
          ballBottom >= newState.playerPaddle.y && 
          ballTop <= newState.playerPaddle.y + PADDLE_HEIGHT &&
          newState.ball.dx < 0) { // Only collide if ball is moving toward paddle
        // Increase rally count and ball speed
        newState.rallyCount++;
        newState.ballSpeed = Math.min(newState.ballSpeed + 0.3, INITIAL_BALL_SPEED * 2.5); // Cap at 2.5x speed
        
        // Update ball direction and speed
        newState.ball.dx = newState.ballSpeed; // Set to positive speed
        // Add some spin based on where ball hits paddle
        const hitPos = (ballTop + BALL_SIZE/2 - newState.playerPaddle.y) / PADDLE_HEIGHT;
        newState.ball.dy = (hitPos - 0.5) * 8;
      }

      // Computer paddle collision (right side)
      if (ballRight >= CANVAS_WIDTH - PADDLE_WIDTH && 
          ballLeft <= CANVAS_WIDTH && 
          ballBottom >= newState.computerPaddle.y && 
          ballTop <= newState.computerPaddle.y + PADDLE_HEIGHT &&
          newState.ball.dx > 0) { // Only collide if ball is moving toward paddle
        // Increase rally count and ball speed
        newState.rallyCount++;
        newState.ballSpeed = Math.min(newState.ballSpeed + 0.3, INITIAL_BALL_SPEED * 2.5); // Cap at 2.5x speed
        
        // Update ball direction and speed
        newState.ball.dx = -newState.ballSpeed; // Set to negative speed
        // Add some spin based on where ball hits paddle
        const hitPos = (ballTop + BALL_SIZE/2 - newState.computerPaddle.y) / PADDLE_HEIGHT;
        newState.ball.dy = (hitPos - 0.5) * 8;
      }

      // Scoring
      if (newState.ball.x < 0) {
        newState.computerScore++;
        newState.ballSpeed = INITIAL_BALL_SPEED; // Reset speed after point
        newState.rallyCount = 0;
        newState.ball = resetBall(newState.ballSpeed);
      } else if (newState.ball.x > CANVAS_WIDTH) {
        newState.playerScore++;
        newState.ballSpeed = INITIAL_BALL_SPEED; // Reset speed after point
        newState.rallyCount = 0;
        newState.ball = resetBall(newState.ballSpeed);
      }

      // Check for game over (first to 3 points)
      if (newState.playerScore >= 3 || newState.computerScore >= 3) {
        newState.gameStatus = 'gameOver';
      }

      // Update player paddle based on keys
      if (keysPressed.current.has('ArrowUp') || keysPressed.current.has('KeyW')) {
        newState.playerPaddle.y = Math.max(0, newState.playerPaddle.y - PADDLE_SPEED);
      }
      if (keysPressed.current.has('ArrowDown') || keysPressed.current.has('KeyS')) {
        newState.playerPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newState.playerPaddle.y + PADDLE_SPEED);
      }

      // Update computer paddle (AI)
      const ballCenterY = newState.ball.y + BALL_SIZE / 2;
      const paddleCenterY = newState.computerPaddle.y + PADDLE_HEIGHT / 2;
      const diff = ballCenterY - paddleCenterY;
      
      // Add some imperfection to AI
      const aiSpeed = PADDLE_SPEED * 0.8;
      const aiError = Math.random() * 30 - 15; // Random error
      
      if (diff + aiError > 10) {
        newState.computerPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newState.computerPaddle.y + aiSpeed);
      } else if (diff + aiError < -10) {
        newState.computerPaddle.y = Math.max(0, newState.computerPaddle.y - aiSpeed);
      }

      return newState;
    });
  }, [resetBall]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#00ff00';
    
    // Player paddle (left)
    ctx.fillRect(0, gameState.playerPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    
    // Computer paddle (right)
    ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, gameState.computerPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(gameState.ball.x, gameState.ball.y, BALL_SIZE, BALL_SIZE);

    // Draw score
    ctx.fillStyle = '#00ffff';
    ctx.font = '24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${gameState.playerScore}`, CANVAS_WIDTH / 4, 40);
    ctx.fillText(`${gameState.computerScore}`, (3 * CANVAS_WIDTH) / 4, 40);
  }, [gameState]);

  const gameLoop = useCallback(() => {
    updateGameState();
    render();
    if (gameState.gameStatus === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [updateGameState, render, gameState.gameStatus]);

  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop, gameState.gameStatus]);

  useEffect(() => {
    const keys = keysPressed.current; // Capture ref value at start of effect
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle game keys when game is actually playing
      if (gameState.gameStatus !== 'playing') return;
      
      // Check for quit key
      if (e.key.toLowerCase() === 'q') {
        setGameState(prev => ({ ...prev, gameStatus: 'quit' }));
        e.preventDefault();
        return;
      }
      
      // Only prevent default for game control keys
      if (['KeyW', 'KeyS', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        keys.add(e.code);
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Only handle game keys when game is playing
      if (gameState.gameStatus !== 'playing') return;
      
      if (['KeyW', 'KeyS', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        keys.delete(e.code);
        e.preventDefault();
      }
    };

    // Only add listeners when game is playing
    if (gameState.gameStatus === 'playing') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      // Clear any pressed keys when cleaning up
      keys.clear();
    };
  }, [gameState.gameStatus]);

  const handleCanvasTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const y = touch.clientY - rect.top;
    
    // Convert to canvas coordinates
    const canvasY = (y / rect.height) * CANVAS_HEIGHT;
    
    // Move player paddle to touch position
    setGameState(prev => ({
      ...prev,
      playerPaddle: {
        y: Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, canvasY - PADDLE_HEIGHT / 2))
      }
    }));
  };

  const restartGame = () => {
    setGameState(initialState);
  };

  // Focus management to return focus to terminal when game ends
  useEffect(() => {
    if (gameState.gameStatus === 'gameOver' || gameState.gameStatus === 'quit') {
      // Small delay to ensure the DOM is updated
      const timer = setTimeout(() => {
        // Try to find and focus the terminal input
        const terminalInput = document.querySelector('input[placeholder="Type a command..."]') as HTMLInputElement;
        if (terminalInput) {
          terminalInput.focus();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus]);

  const getWinner = () => {
    if (gameState.playerScore >= 3) return 'Player';
    if (gameState.computerScore >= 3) return 'Computer';
    return null;
  };

  return (
    <div className="pong-game w-full">
      <div className="text-center mb-4">
        <div className="text-terminal-green text-xl font-bold mb-2">🏓 PONG</div>
        <div className="text-terminal-text text-sm mb-2">
          Desktop: W/S keys or ↑/↓ arrows | Mobile: Touch to move paddle | Press 'Q' to quit
        </div>
        <div className="text-terminal-cyan">
          First to 3 points wins! | Player: {gameState.playerScore} - Computer: {gameState.computerScore}
        </div>
        {gameState.rallyCount > 0 && (
          <div className="text-terminal-yellow text-xs">
            Rally: {gameState.rallyCount} | Speed: {(gameState.ballSpeed / INITIAL_BALL_SPEED).toFixed(1)}x
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-terminal-green bg-black max-w-full h-auto"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            touchAction: 'none' 
          }}
          onTouchStart={handleCanvasTouch}
          onTouchMove={handleCanvasTouch}
        />
      </div>

      {(gameState.gameStatus === 'gameOver' || gameState.gameStatus === 'quit') && (
        <div className="text-center mt-4">
          <div className="text-terminal-green text-xl mb-2">
            {gameState.gameStatus === 'quit' ? 
              '👋 Game Quit!' : 
              `🎉 ${getWinner()} Wins!`
            }
          </div>
          <button
            onClick={restartGame}
            className="bg-terminal-green text-black px-4 py-2 rounded hover:bg-terminal-cyan transition-colors mr-2"
          >
            Play Again
          </button>
          {gameState.gameStatus === 'quit' && (
            <div className="text-terminal-text text-sm mt-2">
              Type 'pong' again to start a new game
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-4 text-terminal-text text-xs">
        <p>🎮 Classic Pong - Challenge the computer!</p>
      </div>
    </div>
  );
};

export default PongGame;