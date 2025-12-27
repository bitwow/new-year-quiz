function TelegramLink() {
  return (
    <a 
      href="https://t.me/bitwow_tg" 
      target="_blank" 
      rel="noopener noreferrer"
      className="telegram-link"
    >
      <img
        src="/new-year-quiz/images/logo.png"
        alt="Telegram"
        className="telegram-logo"
      />
      <div className="telegram-text">
        <span className="telegram-label">Telegram</span>
        <span className="telegram-handle">@bitwow_tg</span>
      </div>
    </a>
  );
}

export default TelegramLink;
