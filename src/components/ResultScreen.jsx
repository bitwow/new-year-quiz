import { useRef } from 'react';

function ResultScreen({ result, onRestart }) {
  const canvasRef = useRef(null);

  const generateResultImage = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Вертикальный формат для сторис 9:16
    canvas.width = 1080;
    canvas.height = 1920;

    // Фон - градиент как в приложении
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#ee7752');
    gradient.addColorStop(0.33, '#e73c7e');
    gradient.addColorStop(0.66, '#23a6d5');
    gradient.addColorStop(1, '#23d5ab');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Снежинки декор
    ctx.font = '50px serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillText('❄️', x, y);
    }

    // Логотип вверху слева
    try {
      const logo = new Image();

      await new Promise((resolve, reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
        logo.src = '/new-year-quiz/images/logo.png';
      });

      const logoSize = 100;
      const logoPadding = 60;
      const logoTop = 120; // Опустили ниже
      ctx.drawImage(logo, logoPadding, logoTop, logoSize, logoSize);

      // Текст рядом с логотипом (крупнее)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '34px -apple-system, sans-serif';
      ctx.fillText('Telegram:', logoPadding + logoSize + 20, logoTop + 30);
      ctx.font = 'bold 46px -apple-system, sans-serif';
      ctx.fillText('@bitwow_tg', logoPadding + logoSize + 20, logoTop + 78);
    } catch (error) {
      console.log('Логотип не загрузился, пропускаем');
    }

    // Заголовок
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 85px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ИТОГИ 2025 ГОДА', canvas.width / 2, 350);
    ctx.font = 'bold 90px serif';
    ctx.fillText('🎄', canvas.width / 2, 460);

    // Картинка финального котика
    try {
      const catImage = new Image();

      await new Promise((resolve, reject) => {
        catImage.onload = resolve;
        catImage.onerror = reject;
        catImage.src = result.image;
      });

      const catSize = 450;
      const catX = (canvas.width - catSize) / 2;
      const catY = 540;

      // Рисуем котика
      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, catY + catSize / 2, catSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(catImage, catX, catY, catSize, catSize);
      ctx.restore();

      // Рамка вокруг котика
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, catY + catSize / 2, catSize / 2, 0, Math.PI * 2);
      ctx.stroke();

    } catch (error) {
      console.log('Картинка котика не загрузилась, показываем эмодзи');
      // Если картинка не загрузилась - показываем эмодзи
      ctx.font = '320px serif';
      ctx.textAlign = 'center';
      ctx.fillText(result.emoji, canvas.width / 2, 820);
    }

    // Название типа (крупнее)
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 75px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(result.title, canvas.width / 2, 1080);

    // Описание (крупнее)
    ctx.fillStyle = '#ffffff';
    ctx.font = '38px -apple-system, sans-serif';
    const maxWidth = 950;
    const lineHeight = 54;
    const words = result.description.split(' ');
    let line = '';
    let y = 1180;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[i] + ' ';
        y += lineHeight;

        if (y > 1820) break;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Сохранение для мобильных устройств (iOS/Telegram)
    try {
      // Проверяем, доступен ли Telegram WebApp API
      if (window.Telegram?.WebApp) {
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            // Открываем изображение в новом окне для сохранения
            const newWindow = window.open();
            newWindow.document.write(`<img src="${base64data}" alt="Result" style="width:100%"/>`);
          };
          reader.readAsDataURL(blob);
        });
      } else {
        // Для обычных браузеров и десктопа
        canvas.toBlob((blob) => {
          // Проверяем поддержку navigator.share для мобильных устройств
          if (navigator.share && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            const file = new File([blob], `итоги-2025-${result.title}.png`, { type: 'image/png' });
            navigator.share({
              files: [file],
              title: 'Итоги 2025 года',
              text: `Мой результат: ${result.title}`
            }).catch(() => {
              // Если share не сработал, показываем изображение
              const url = URL.createObjectURL(blob);
              const newWindow = window.open(url);
              if (!newWindow) {
                // Если не открылось окно, пробуем скачать
                const a = document.createElement('a');
                a.href = url;
                a.download = `итоги-2025-${result.title}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }
            });
          } else {
            // Для десктопа - обычное скачивание
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `итоги-2025-${result.title}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }, 'image/png');
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Произошла ошибка при сохранении изображения. Попробуйте ещё раз.');
    }
  };

  const handleShare = () => {
    const shareText = `Я прошёл тест "Итоги 2025 года" и получил: ${result.title}! 🎄\n\nt.me/bitwow_tg`;

    if (navigator.share) {
      navigator.share({
        title: 'Итоги 2025 года',
        text: shareText,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Текст скопирован в буфер обмена!');
    }
  };

  return (
    <div className="result-screen">
      <h2>🎊 ТВОЙ РЕЗУЛЬТАТ 🎊</h2>
      
      {result.image && (
        <img 
          src={result.image} 
          alt={result.title}
          className="result-cat-image"
        />
      )}
      
      {!result.image && (
        <div className="result-emoji">{result.emoji}</div>
      )}
      
      <div className="result-title">{result.title}</div>
      
      <p className="result-description">{result.description}</p>

      <div className="share-buttons">
        <button onClick={generateResultImage}>
          Сохранить картинку 📸
        </button>
        <button onClick={onRestart}>
          Пройти ещё раз 🔄
        </button>
      </div>
      
      <canvas ref={canvasRef} id="result-canvas" />
    </div>
  );
}

export default ResultScreen;
