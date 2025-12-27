import { useState } from 'react';
import { questions, calculateResult } from '../quizData';
import QuestionSlider from './QuestionSlider';
import QuestionChoice from './QuestionChoice';

function Quiz({ onFinish }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (currentAnswer === null) return;

    const newAnswers = {
      ...answers,
      [question.id]: currentAnswer
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer(null);
    } else {
      // Финиш
      const result = calculateResult(newAnswers);
      onFinish(result);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(answers[questions[currentQuestion - 1].id] || null);
    }
  };

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="question-number">
        Вопрос {currentQuestion + 1} из {questions.length}
      </div>

      <div className="question-text">{question.question}</div>

      {(question.type === 'slider') && (
        <QuestionSlider 
          question={question}
          value={currentAnswer}
          onChange={handleAnswer}
        />
      )}

      {(question.type === 'emoji' || question.type === 'choice' || question.type === 'image') && (
        <QuestionChoice 
          question={question}
          selected={currentAnswer}
          onSelect={handleAnswer}
        />
      )}

      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button className="nav-button" onClick={handlePrev}>
            ← Назад
          </button>
        )}
        <button 
          className="nav-button" 
          onClick={handleNext}
          disabled={currentAnswer === null}
          style={{ 
            opacity: currentAnswer === null ? 0.5 : 1,
            cursor: currentAnswer === null ? 'not-allowed' : 'pointer'
          }}
        >
          {currentQuestion < questions.length - 1 ? 'Далее →' : 'Узнать результат! 🎉'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
