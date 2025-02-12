
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import Confetti from 'react-confetti';
import { FaBolt, FaClock, FaHeart } from 'react-icons/fa';
import './Ukuphicaphica.css';
import usePowerUp from '../hooks/usePowerUp'; // Adjust the path as necessary

const difficultyLevels = ['Easy', 'Medium', 'Hard'];



const iziphicaphico = [
  // Easy questions
  {
    question: "Uhlanga lwenziwa ngomoya...",
    options: ["Ngemibono", "Ngokukhanya", "Ngezinkanyezi"],
    answer: "Ngokukhanya",
    icon: "💨",
    difficulty: "Easy",
  },
  {
    question: "Izinyoka zithanda izinkanyezi...",
    options: ["Izingane", "Amadlozi", "Umlando"],
    answer: "Amadlozi",
    icon: "🐍",
    difficulty: "Easy",
  },
  {
    question: "Uthando lwamaZulu lukhula...",
    options: ["Ngemithombo", "Ngemibono", "Ngezinkanyezi"],
    answer: "Ngemithombo",
    icon: "❤️",
    difficulty: "Easy",
  },
  {
    question: "Umlando kaZulu ungumlando omkhulu...",
    options: ["Uthando", "Iphupho", "Ubuhlakani"],
    answer: "Ubuhlakani",
    icon: "📚",
    difficulty: "Easy",
  },
  {
    question: "Ukwakha umndeni kuqala...",
    options: ["Uthando", "Uhlanga", "Ukwazi"],
    answer: "Uthando",
    icon: "👨‍👩‍👧‍👦",
    difficulty: "Easy",
  },
  {
    question: "Uhlanga lomusa lukhanya...",
    options: ["Ngempilo", "Ngezinkanyezi", "Ngehlathi"],
    answer: "Ngehlathi",
    icon: "🌳",
    difficulty: "Easy",
  },

  // Medium questions
  {
    question: "Izinyoni ziphila emanzini...",
    options: ["Ngenhla", "Ngezithombe", "Ngaphakathi"],
    answer: "Ngenhla",
    icon: "🐦",
    difficulty: "Medium",
  },
  {
    question: "Izimanga zomhlaba zibhakabhaka...",
    options: ["Ngezinhlanzi", "Ngezinkanyezi", "Ngemithombo"],
    answer: "Ngemithombo",
    icon: "🌍",
    difficulty: "Medium",
  },
  {
    question: "Uthando lwenkosi lwenziwa uMvelinqangi...",
    options: ["Ngenhlanhla", "Ngomoya", "Ngezinkanyezi"],
    answer: "Ngenhlanhla",
    icon: "👑",
    difficulty: "Medium",
  },
  {
    question: "Umoya omkhulu uvela...",
    options: ["Ngenhlanhla", "Ngaphakathi", "Ngehlathi"],
    answer: "Ngehlathi",
    icon: "🌬️",
    difficulty: "Medium",
  },
  {
    question: "Umlando wokuphila uqala...",
    options: ["Ngenhlanhla", "Ngezinkanyezi", "Ngemithombo"],
    answer: "Ngenhlanhla",
    icon: "🌱",
    difficulty: "Medium",
  },
  {
    question: "Izingane zethu ziwumsebenzi wethu...",
    options: ["Ngemithombo", "Ngaphandle", "Ngezinsiza"],
    answer: "Ngaphandle",
    icon: "👶",
    difficulty: "Medium",
  },

  // Hard questions
  {
    question: "Izimfihlo zokuphila zikhona...",
    options: ["Ngezinkanyezi", "Ngemithombo", "Ngezinhlanzi"],
    answer: "Ngezinhlanzi",
    icon: "🐠",
    difficulty: "Hard",
  },
  {
    question: "Ubuqotho buhamba noxolo...",
    options: ["Ngokukhanya", "Ngemithombo", "Ngezinkanyezi"],
    answer: "Ngokukhanya",
    icon: "☮️",
    difficulty: "Hard",
  },
  {
    question: "Uhlanga lunikeza ubuhle...",
    options: ["Ngemithombo", "Ngezinsiza", "Ngehlathi"],
    answer: "Ngehlathi",
    icon: "🌺",
    difficulty: "Hard",
  },
  {
    question: "Ukwazi nezinto kuhlangene...",
    options: ["Ngemibono", "Ngaphandle", "Ngezinhlanzi"],
    answer: "Ngemibono",
    icon: "💡",
    difficulty: "Hard",
  },
  {
    question: "Izindlovu zikhumbula umndeni...",
    options: ["Ngenhlanhla", "Ngehlathi", "Ngezinkanyezi"],
    answer: "Ngenhlanhla",
    icon: "🐘",
    difficulty: "Hard",
  },
  {
    question: "Ukwakha umndeni kuqala...",
    options: ["Ngenhlanhla", "Ngemithombo", "Ngehlathi"],
    answer: "Ngehlathi",
    icon: "🏡",
    difficulty: "Hard",
  },
]
const powerUps = [
  { name: 'Time Freeze', icon: <FaClock />, description: 'Pause the timer for 10 seconds' },
  { name: '50/50', icon: <FaBolt />, description: 'Remove two incorrect answers' },
  { name: 'Extra Life', icon: <FaHeart />, description: 'Allows one incorrect answer without penalty' },
];

const achievements = [
  { name: "Quick Thinker", description: "Answer 5 questions in under 10 seconds each", icon: "⚡" },
  { name: "Perfect Round", description: "Complete a round with 100% accuracy", icon: "🏆" },
  { name: "Power Player", description: "Use all power-ups in a single game", icon: "💪" },
  { name: "Streak Master", description: "Achieve a streak of 10 correct answers", icon: "🔥" },
  { name: "Zulu Scholar", description: "Complete all difficulty levels", icon: "📚" },
];

const Ukuphicaphica = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [multiplier, setMultiplier] = useState(1);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  const filteredQuestions = iziphicaphico.filter(q => q.difficulty === difficulty);

  const { availablePowerUps, lives, isTimeFrozen, applyPowerUp } = usePowerUp(powerUps, 3, filteredQuestions, currentQuestionIndex);

  useEffect(() => {
    const backgroundMusic = new Howl({
      src: ['/audio/background-music.mp3'],
      loop: true,
      volume: 0.5,
    });
    backgroundMusic.play();

    return () => {
      backgroundMusic.stop();
    };
  }, []);

  useEffect(() => {
    if (!showResult && selectedAnswer === null && !isTimeFrozen) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 1) {
            handleAnswerClick(null);
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showResult, selectedAnswer, isTimeFrozen]);

  const playSound = useCallback(soundFile => {
    const sound = new Howl({
      src: [soundFile],
      html5: true,
    });
    sound.play();
  }, []);

  const handleAnswerClick = useCallback(
    option => {
      setSelectedAnswer(option);
      const correct = option === filteredQuestions[currentQuestionIndex].answer;
      setIsCorrect(correct);
      if (correct) {
        const basePoints = difficulty === 'Easy' ? 100 : difficulty === 'Medium' ? 200 : difficulty === 'Hard' ? 300 : 0;
        const timeBonus = Math.floor(timeLeft * 3.33); // Up to 100 bonus points for fastest answer
        const newScore = score + (basePoints + timeBonus) * multiplier;
        setScore(newScore);
        setStreak(streak + 1);
        setMultiplier(Math.min(multiplier + 0.1, 3)); // Cap multiplier at 3x
        playSound('/audio/correct-answer.mp3');
        if (streak + 1 >= 3) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        if (lives > 1 || availablePowerUps.some(p => p.name === 'Extra Life')) {
          if (availablePowerUps.some(p => p.name === 'Extra Life')) {
            setAvailablePowerUps(availablePowerUps.filter(p => p.name !== 'Extra Life'));
          } else {
            setLives(lives - 1);
          }
        } else {
          setShowResult(true);
        }
        setStreak(0);
        setMultiplier(1);
        playSound('/audio/wrong-answer.mp3');
      }
      setAnswers([...answers, { question: currentQuestionIndex, answer: option, correct }]);
      checkAchievements();
    },
    [
      currentQuestionIndex,
      difficulty,
      filteredQuestions,
      multiplier,
      score,
      streak,
      timeLeft,
      lives,
      availablePowerUps,
      answers,
      playSound,
    ],
  );

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
    playSound('/audio/next-question.mp3');
  }, [currentQuestionIndex, filteredQuestions.length, playSound]);

  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setTimeLeft(30);
    setStreak(0);
    setMultiplier(1);
    setLives(3);
    setAvailablePowerUps(powerUps);
    playSound('/audio/restart-quiz.mp3');
  }, [playSound]);

  const changeDifficulty = useCallback(
    newDifficulty => {
      setDifficulty(newDifficulty);
      restartQuiz();
    },
    [restartQuiz],
  );

  const checkAchievements = useCallback(() => {
    const newAchievements = [];

    if (answers.filter(a => a.correct).length >= 5 && !unlockedAchievements.includes('Quick Thinker')) {
      newAchievements.push('Quick Thinker');
    }

    if (
      answers.length === filteredQuestions.length &&
      answers.every(a => a.correct) &&
      !unlockedAchievements.includes('Perfect Round')
    ) {
      newAchievements.push('Perfect Round');
    }

    if (availablePowerUps.length === 0 && !unlockedAchievements.includes('Power Player')) {
      newAchievements.push('Power Player');
    }

    if (streak >= 10 && !unlockedAchievements.includes('Streak Master')) {
      newAchievements.push('Streak Master');
    }

    if (
      difficultyLevels.every(d => answers.some(a => filteredQuestions[a.question].difficulty === d)) &&
      !unlockedAchievements.includes('Zulu Scholar')
    ) {
      newAchievements.push('Zulu Scholar');
    }

    if (newAchievements.length > 0) {
      setUnlockedAchievements([...unlockedAchievements, ...newAchievements]);
      playSound('/audio/achievement-unlocked.mp3');
    }
  }, [answers, availablePowerUps, filteredQuestions, streak, unlockedAchievements, playSound]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="ukuphicaphica-container">
      {showConfetti && <Confetti />}
      <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        Ukuphicaphica
      </motion.h1>

      {!showResult ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="question-container"
          >
            <div className="question-header">
              <h2>
                {currentQuestion.icon} {currentQuestion.question}
              </h2>
              <div className="score-time">
                <span className="score">Score: {score}</span>
                <span className="time">Time: {timeLeft}s</span>
                <span className="lives">Lives: {lives}</span>
                <span className="multiplier">Multiplier: x{multiplier.toFixed(1)}</span>
              </div>
            </div>
            <motion.div
              className="progress-bar"
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                {isCorrect ? (
                  <>
                    🎉 Correct! +
                    {((difficulty === 'Easy' ? 100 : difficulty === 'Medium' ? 200 : difficulty === 'Hard' ? 300 : 0) + Math.floor(timeLeft * 3.33)) * multiplier}{' '}
                    points
                    {streak >= 3 && <span className="streak">🔥 {streak} Streak!</span>}
                  </>
                ) : (
                  '😢 Oops! Try again next time.'
                )}
              </motion.div>
            )}
            {selectedAnswer !== null && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="next-button"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </motion.button>
            )}
            <div className="power-ups">
              {availablePowerUps.map((powerUp, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="power-up-button"
                  onClick={() => applyPowerUp(powerUp)}
                >
                  {powerUp.icon} {powerUp.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="result-container"
        >
          <h2>Quiz Results</h2>
          <p className="final-score">Your Score: {score}</p>
          <div className="results-list">
            {answers.map((answer, index) => (
              <div key={index} className={`result-item ${answer.correct ? 'correct' : 'incorrect'}`}>
                <p>
                  {filteredQuestions[answer.question].icon} {filteredQuestions[answer.question].question}
                </p>
                <p>Your answer: {answer.answer || "Time's up!"}</p>
                <p>Correct answer: {filteredQuestions[answer.question].answer}</p>
              </div>
            ))}
          </div>
          <div className="achievements">
            <h3>Achievements Unlocked</h3>
            {unlockedAchievements.map((achievement, index) => (
              <div key={index} className="achievement">
                {achievements.find(a => a.name === achievement).icon} {achievement}
              </div>
            ))}
          </div>
          <div className="difficulty-selection">
            <h3>Select Difficulty</h3>
            {difficultyLevels.map((level, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`difficulty-button ${difficulty === level ? 'selected' : ''}`}
                onClick={() => changeDifficulty(level)}
              >
                {level}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="restart-button"
            onClick={restartQuiz}
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Ukuphicaphica;