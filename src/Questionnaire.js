import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './questions';

const Questionnaire = () => {
  const questionKeys = Object.keys(QUESTIONS).map(Number);
  const [answers, setAnswers] = useState(Array(questionKeys.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    if (savedScores.length > 0) {
      const totalScore = savedScores.reduce((acc, score) => acc + score, 0);
      const avgScore = totalScore / savedScores.length;
      setAverageScore(avgScore);
    }
  }, []);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questionKeys.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const yesCount = newAnswers.filter(ans => ans === true).length;
      const currentScore = (100 * yesCount) / questionKeys.length;

      setScore(currentScore);
      const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
      const newScores = [...savedScores, currentScore];
      localStorage.setItem('scores', JSON.stringify(newScores));

      const totalScore = newScores.reduce((acc, score) => acc + score, 0);
      const avgScore = totalScore / newScores.length;
      setAverageScore(avgScore);
    }
  };

  if (score !== null) {
    return (
      <div>
        <h2>Your score: {score.toFixed(2)}</h2>
        <h2>Average score: {averageScore ? averageScore.toFixed(2) : 'N/A'}</h2>
        <button onClick={() => window.location.reload()}>Start Over</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{QUESTIONS[questionKeys[currentQuestion]]}</h1>
      <button onClick={() => handleAnswer(true)}>Yes</button>
      <button onClick={() => handleAnswer(false)}>No</button>
    </div>
  );
};

export default Questionnaire;
