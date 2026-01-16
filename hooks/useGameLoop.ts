
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Point,
  Direction,
  GameStatus,
  GameState
} from '../types';
import {
  GRID_SIZE,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  BASE_SPEED,
  MIN_SPEED,
  SPEED_INCREMENT,
  DIRECTIONS_MAP,
  OPPOSITE_DIRECTIONS
} from '../constants';

const getRandomPoint = (exclude: Point[]): Point => {
  let newPoint: Point;
  while (true) {
    newPoint = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    if (!exclude.some(p => p.x === newPoint.x && p.y === newPoint.y)) {
      return newPoint;
    }
  }
};

export const useGameLoop = () => {
  const [state, setState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: getRandomPoint(INITIAL_SNAKE),
    direction: INITIAL_DIRECTION as Direction,
    nextDirection: INITIAL_DIRECTION as Direction,
    score: 0,
    highScore: Number(localStorage.getItem('snake-high-score')) || 0,
    status: GameStatus.IDLE,
    speed: BASE_SPEED,
    countdownValue: 3,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: getRandomPoint(INITIAL_SNAKE),
      direction: INITIAL_DIRECTION as Direction,
      nextDirection: INITIAL_DIRECTION as Direction,
      score: 0,
      status: GameStatus.READY,
      speed: BASE_SPEED,
      countdownValue: 3,
    }));
  }, []);

  const startGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: GameStatus.PLAYING,
    }));
  }, []);

  const goToHome = useCallback(() => {
    setState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: getRandomPoint(INITIAL_SNAKE),
      direction: INITIAL_DIRECTION as Direction,
      nextDirection: INITIAL_DIRECTION as Direction,
      score: 0,
      status: GameStatus.IDLE,
      speed: BASE_SPEED,
      countdownValue: 3,
    }));
  }, []);

  const togglePause = useCallback(() => {
    setState(prev => {
      if (prev.status === GameStatus.PLAYING) {
        return { ...prev, status: GameStatus.PAUSED };
      }
      if (prev.status === GameStatus.PAUSED) {
        return { ...prev, status: GameStatus.COUNTDOWN, countdownValue: 3 };
      }
      return prev;
    });
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (state.status !== GameStatus.COUNTDOWN) return;

    let timer: NodeJS.Timeout;
    if (state.countdownValue > 0) {
      timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          countdownValue: prev.countdownValue - 1
        }));
      }, 1000);
    } else {
      setState(prev => ({
        ...prev,
        status: GameStatus.PLAYING
      }));
    }

    return () => clearTimeout(timer);
  }, [state.status, state.countdownValue]);

  const changeDirection = useCallback((newDir: Direction) => {
    setState(prev => {
      // Prevent reversing into itself
      if (newDir === OPPOSITE_DIRECTIONS[prev.direction as keyof typeof OPPOSITE_DIRECTIONS]) {
        return prev;
      }
      return { ...prev, nextDirection: newDir };
    });
  }, []);

  const moveSnake = useCallback(() => {
    const { snake, food, nextDirection, score, highScore, speed } = stateRef.current;
    const head = snake[0];
    const vector = DIRECTIONS_MAP[nextDirection as keyof typeof DIRECTIONS_MAP];
    const newHead = { x: head.x + vector.x, y: head.y + vector.y };

    // Collision check: Wall
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE
    ) {
      handleGameOver();
      return;
    }

    // Collision check: Self
    if (snake.some(p => p.x === newHead.x && p.y === newHead.y)) {
      handleGameOver();
      return;
    }

    const newSnake = [newHead, ...snake];
    let newScore = score;
    let newFood = food;
    let newSpeed = speed;

    // Check food consumption
    if (newHead.x === food.x && newHead.y === food.y) {
      newScore += 10;
      newFood = getRandomPoint(newSnake);
      newSpeed = Math.max(MIN_SPEED, BASE_SPEED - (Math.floor(newScore / 20) * SPEED_INCREMENT));
    } else {
      newSnake.pop(); // Remove tail
    }

    setState(prev => ({
      ...prev,
      snake: newSnake,
      food: newFood,
      score: newScore,
      highScore: Math.max(highScore, newScore),
      direction: nextDirection,
      speed: newSpeed,
    }));
  }, []);

  const handleGameOver = () => {
    setState(prev => {
      const finalHighScore = Math.max(prev.highScore, prev.score);
      localStorage.setItem('snake-high-score', finalHighScore.toString());
      return {
        ...prev,
        status: GameStatus.GAME_OVER,
        highScore: finalHighScore,
      };
    });
  };

  useEffect(() => {
    if (state.status !== GameStatus.PLAYING) return;

    const interval = setInterval(moveSnake, state.speed);
    return () => clearInterval(interval);
  }, [state.status, state.speed, moveSnake]);

  return { state, resetGame, startGame, goToHome, togglePause, changeDirection };
};
