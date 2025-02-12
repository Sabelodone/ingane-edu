import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { useProgress } from "./ProgressContext"

const MiniGame = () => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const { addPoints } = useProgress()

  useEffect(() => {
    let timer
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      endGame()
    }
    return () => clearInterval(timer)
  }, [gameActive, timeLeft])

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)
  }

  const endGame = () => {
    setGameActive(false)
    addPoints(score)
  }

  const handleClick = () => {
    if (gameActive) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Mini Game: Click as fast as you can!</h2>
      {!gameActive && (
        <Button onClick={startGame} className="mb-4">
          Start Game
        </Button>
      )}
      {gameActive && (
        <div className="space-y-4">
          <p className="text-xl">Time left: {timeLeft} seconds</p>
          <p className="text-xl">Score: {score}</p>
          <motion.button
            className="bg-accent text-white px-6 py-3 rounded-full text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
          >
            Click me!
          </motion.button>
        </div>
      )}
    </div>
  )
}

export default MiniGame

