import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import Snowflakes from './components/Snowflakes';
import WinterBackground from './components/WinterBackground';
import TelegramLink from './components/TelegramLink';
import './index.css';

function App() {
  const [screen, setScreen] = useState('welcome'); // welcome, quiz, result
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setScreen('quiz');
  };

  const handleFinish = (finalResult) => {
    setResult(finalResult);
    setScreen('result');
  };

  const handleRestart = () => {
    setResult(null);
    setScreen('welcome');
  };

  return (
    <>
      <WinterBackground />
      <Snowflakes />
      <TelegramLink />
      <div className="app">
        {screen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
        {screen === 'quiz' && <Quiz onFinish={handleFinish} />}
        {screen === 'result' && <ResultScreen result={result} onRestart={handleRestart} />}
      </div>
    </>
  );
}

export default App;
