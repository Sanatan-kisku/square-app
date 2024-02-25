import React, { useState } from 'react';
import './SquareResult.css';

const SquareResult = ({ correctCount, correctAnswers, wrongCount, wrongAnswers, onRetry }) => {
  const [showCorrectList, setShowCorrectList] = useState(false);
  const [showWrongList, setShowWrongList] = useState(false);

  const toggleCorrectList = () => {
    setShowWrongList(false);
    setShowCorrectList(!showCorrectList);
  };

  const toggleWrongList = () => {
    setShowCorrectList(false);
    setShowWrongList(!showWrongList);
  };


  return (
    <div className="result-section">
      <p>

        <button
          className="correct-button"
          onClick={toggleCorrectList}
        >
          Correct Answers ({correctCount})
        </button>
      </p>
      {showCorrectList && correctCount > 0 && (
        <div>
          <p>Correct Answers:</p>
          <ul>
            {correctAnswers.map(({ number, correctAnswer }, index) => (
              <li key={index}>
                Square of {number} is {correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>
        <button
          className="incorrect-button"
          onClick={toggleWrongList}
        >
          Incorrect Answers ({wrongCount})
        </button>
      </p>
      {showWrongList && wrongCount > 0 && (
        <div>
          <p>Incorrect Answers:</p>
          <ul>
            {wrongAnswers.map(({ number, userAnswer }, index) => (
              <li key={index}>
                Square of {number} is {Math.pow(number, 2)} (Your Answer: {userAnswer})
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default SquareResult;
