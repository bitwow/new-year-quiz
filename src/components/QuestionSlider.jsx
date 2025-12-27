import { useState, useEffect } from 'react';

function QuestionSlider({ question, value, onChange }) {
  const [sliderValue, setSliderValue] = useState(value !== null ? value : 5);

  useEffect(() => {
    if (value !== null) {
      setSliderValue(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={question.min}
        max={question.max}
        value={sliderValue}
        onChange={handleChange}
        className="slider"
      />
      <div className="slider-labels">
        <span>{question.minLabel}</span>
        <span>{question.maxLabel}</span>
      </div>
      <div className="slider-value">{sliderValue}</div>
    </div>
  );
}

export default QuestionSlider;
