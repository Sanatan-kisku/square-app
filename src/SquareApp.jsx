import React, { useState, useEffect, useRef } from 'react';
import SquareResult from './SquareResult'; // Assuming you have the Result component from the previous example
import './SquareApp.css';

function SquareApp() {
  const initialNumber = 1;
  const [number, setNumber] = useState(initialNumber);
  // const [userInput, setUserInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const check = (e, index) => {
    const nextIndex = index + 1;
    const nextInput = document.getElementById(`input-${nextIndex}`);

    if (nextInput && e.key === 'Enter') {
      e.preventDefault();
      nextInput.focus();

      // If this is the last input, trigger "Next Number" on Enter press
      if (nextIndex === 2) {
        next(e);
      }
    }

    const userAnswer = e.target.value.trim();
    const correctAnswer = Math.pow(number, 2).toString();

    if (userAnswer.length === correctAnswer.length) {
      const isCorrect = userAnswer === correctAnswer;

      if (isCorrect) {
        e.target.classList.add("correct");
        e.target.classList.remove("wrong");
        setCorrectCount((prevCount) => prevCount + 1);
        setCorrectAnswers((prevCorrectAnswers) => [
          ...prevCorrectAnswers,
          { number, correctAnswer },
        ]);
      } else {
        e.target.classList.add("wrong");
        e.target.classList.remove("correct");
        setWrongCount((prevCount) => prevCount + 1);
        setWrongAnswers((prevAnswers) => [
          ...prevAnswers,
          { number, userAnswer },
        ]);
      }
    }

  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById("nextBtn").click();
      const nextIndex = index + 1;
      const nextInput = document.getElementById(`input-${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById("endBtn").click();
    }
  };

  const reset = () => {
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'wrong');
    });

    setNumber(initialNumber);
    // setUserInput('');
    setCorrectCount(0);
    setWrongCount(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setShowResults(false);
  };

  const next = (e) => {
    e.preventDefault();

    // Increment number
    setNumber((prevNumber) => prevNumber + 1);

    // Reset input values and remove classes
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'wrong');
    });


    setShowResults(false);
  };

  const endTest = (e) => {
    e.preventDefault();
    // Show the results
    setShowResults(true);
  };


  const retryTest = () => {
    setShowResults(false);
    setNumber(initialNumber);
    setCorrectCount(0);
    setWrongCount(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
  };

  const squareInputs = [1].map((index) => (
    <div key={index} className="input-container">
      <label>
        {showResults ? 'Answer' : `Square of ${number}`} <span>=</span>
        <input
          ref={index === 1 ? firstInputRef : null}
          id={`input-${index}`}
          type="number"
          onChange={(e) => check(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      </label>
    </div>
  ));

  return (
    <div className='container'>
      <h1>Square App</h1>
      <p className='desc'>Test and practice squaring numbers</p>
      {!showResults && (
        <>
          <button className="reset-button" onClick={reset}>
            Reset
          </button>
        </>
      )}
      <hr />
      <h2>{showResults ? 'Results' : `Square of ${number}`}</h2>
      {showResults ? (
        <SquareResult
          correctCount={correctCount}
          correctAnswers={correctAnswers}
          wrongCount={wrongCount}
          wrongAnswers={wrongAnswers}
          onRetry={retryTest}
        />
      ) : (
        <form>
          <div className='multiplier'>
            {squareInputs}
          </div>
          <div className="button-container">
            <button id='nextBtn' style={{ backgroundColor: 'green', color: 'white' }} onClick={next}>Next Number</button>
            <button id='endBtn' style={{ backgroundColor: 'red', color: 'white' }} onClick={endTest}>End Test</button>
          </div>
        </form>
      )}
      <p><span className='note'>*</span>Shortcuts: [Enter] = Next number, [Space] = Show results</p>
    </div>
  );
}

export default SquareApp;
