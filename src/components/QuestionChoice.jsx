function QuestionChoice({ question, selected, onSelect }) {
  const isImageQuestion = question.type === 'image';
  
  return (
    <div className={isImageQuestion ? 'options-grid' : 'options-container'}>
      {question.options.map((option, index) => {
        const isSelected = selected === option.points;
        
        if (isImageQuestion) {
          // Для вопросов с картинками - плитка 2x2
          return (
            <button
              key={index}
              className={`option-button-grid ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(option.points)}
            >
              <img 
                src={option.image} 
                alt={option.text}
                className="option-cat-image"
              />
              <span className="option-text-grid">{option.text}</span>
            </button>
          );
        } else {
          // Обычные вопросы - список
          return (
            <button
              key={index}
              className={`option-button ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(option.points)}
            >
              {option.emoji && (
                <span className="option-emoji">{option.emoji}</span>
              )}
              <span className="option-text">{option.text}</span>
            </button>
          );
        }
      })}
    </div>
  );
}

export default QuestionChoice;
