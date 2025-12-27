import { useEffect } from 'react';

function Snowflakes() {
  useEffect(() => {
    const createSnowflake = (startPosition = null) => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄️';
      
      // Случайная позиция по горизонтали
      snowflake.style.left = Math.random() * 100 + 'vw';
      
      // Случайный размер
      const size = Math.random() * 1.5 + 0.5;
      snowflake.style.fontSize = size + 'rem';
      
      // Случайная скорость падения
      const duration = Math.random() * 10 + 10;
      snowflake.style.animationDuration = duration + 's';
      
      // Если указана начальная позиция (для первичного заполнения), размещаем снежинку по экрану
      if (startPosition !== null) {
        snowflake.style.top = startPosition + 'vh';
        snowflake.style.animationDelay = '0s';
      } else {
        // Для новых снежинок - начинаем сверху
        snowflake.style.animationDelay = Math.random() * 5 + 's';
      }
      
      // Случайная непрозрачность
      snowflake.style.opacity = Math.random() * 0.4 + 0.3;
      
      document.body.appendChild(snowflake);
      
      // Удаляем снежинку после анимации
      setTimeout(() => {
        snowflake.remove();
      }, (duration + 5) * 1000);
    };
    
    // Заполняем экран снежинками при загрузке (распределяем их по всей высоте)
    for (let i = 0; i < 20; i++) {
      const randomPosition = Math.random() * 100; // случайная позиция от 0 до 100vh
      createSnowflake(randomPosition);
    }
    
    // Добавляем новые снежинки каждые 2 секунды
    const interval = setInterval(() => {
      createSnowflake(); // без параметра - начинают сверху
    }, 2000);
    
    return () => {
      clearInterval(interval);
      // Очищаем все снежинки при размонтировании
      document.querySelectorAll('.snowflake').forEach(sf => sf.remove());
    };
  }, []);
  
  return null;
}

export default Snowflakes;
