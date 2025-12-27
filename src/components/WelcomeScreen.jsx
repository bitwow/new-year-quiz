function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <h1>🎄 ИТОГИ 2025 ГОДА 🎄</h1>
      <p className="subtitle">Как же прошёл твой год? Давай узнаем! 🔥</p>
      <p>
        Ответь на 10 вопросов, и мы определим, какой ты котик по итогам 2025 года.
        Будь честным — никто не судит! 😼
      </p>
      <button onClick={onStart}>НАЧАТЬ ТЕСТ 🚀</button>
    </div>
  );
}

export default WelcomeScreen;
