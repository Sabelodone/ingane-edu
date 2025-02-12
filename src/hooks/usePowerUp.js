import { useState, useCallback } from 'react';

const usePowerUp = (initialPowerUps, initialLives, filteredQuestions, currentQuestionIndex) => {
  const [availablePowerUps, setAvailablePowerUps] = useState(initialPowerUps);
  const [lives, setLives] = useState(initialLives);
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);

  const applyPowerUp = useCallback((powerUp) => {
    switch (powerUp.name) {
      case 'Time Freeze':
        setIsTimeFrozen(true);
        setTimeout(() => setIsTimeFrozen(false), 10000);
        break;
      case '50/50':
        const currentQuestion = filteredQuestions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;
        const incorrectOptions = currentQuestion.options.filter(option => option !== correctAnswer);
        const remainingOptions = [
          correctAnswer,
          incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)],
        ];
        filteredQuestions[currentQuestionIndex].options = remainingOptions.sort(() => Math.random() - 0.5);
        break;
      case 'Extra Life':
        setLives(lives + 1);
        break;
      default:
        break;
    }
    setAvailablePowerUps(availablePowerUps.filter(p => p.name !== powerUp.name));
  }, [availablePowerUps, currentQuestionIndex, filteredQuestions, lives]);

  return {
    availablePowerUps,
    lives,
    isTimeFrozen,
    applyPowerUp,
  };
};

export default usePowerUp;