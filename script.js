const activePopups = [];
const MAX_POPUPS = 15;


function getRandomSize() {
    const width = Math.floor(Math.random() * 180) + 80;
    const height = Math.floor(Math.random() * 120) + 60;
    return { width, height };
  }
  
  function getRandomPosition() {
    const positions = ['top-left', 'top-right', 'bottom-right', 'center', 'random'];
    return positions[Math.floor(Math.random() * positions.length)];
  }
  
  function getPositionStyle(position, width, height) {
    const style = {};
    if (position === 'random') {
      const maxLeft = window.innerWidth - width - 20;
      const maxTop = window.innerHeight - height - 20;
      style.top = `${Math.floor(Math.random() * maxTop)}px`;
      style.left = `${Math.floor(Math.random() * maxLeft)}px`;
    } else {
      switch (position) {
        case 'top-left':
          style.top = '10px';
          style.left = '10px';
          break;
        case 'top-right':
          style.top = '10px';
          style.right = '10px';
          break;
        case 'bottom-right':
          style.bottom = '10px';
          style.right = '10px';
          break;
        case 'center':
          style.top = '50%';
          style.left = '50%';
          style.transform = 'translate(-50%, -50%)';
          break;
      }
    }
    return style;
  }
  
  function getRandomText() {
    const messages = [
      '🔥 Diskon 90% cuma hari ini!',
      '💸 Klik untuk kaya mendadak!',
      '🎮 Game paling seru 2025!',
      '🤑 Cuma klik ini bisa beli rumah!',
      '🚀 Upgrade aplikasi jadi turbo!',
      '🎁 Hadiah iPhone hanya 1 klik!',
      '👀 Kamu dicari oleh iklan ini!',
      '📱 Download aplikasi lebih cepat!',
      '💥 Iklan tercepat se-Indonesia!',
      '🎉 Klik sebelum hilang selamanya!',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
  

  function createPopup(position, delayToClose = 0, respawnDelay = 2000) {
    const { width, height } = getRandomSize();
    const popup = document.createElement('div');
    popup.className = 'popup';
  
    popup.style.width = `${width}px`;
    popup.style.height = `${height}px`;
  
    const pos = getPositionStyle(position, width, height);
    for (let key in pos) {
      popup.style[key] = pos[key];
    }
  
    if (delayToClose > 0) {
      popup.classList.add('disabled');
    }
  
    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '×';
  
    if (delayToClose > 0) {
      setTimeout(() => {
        popup.classList.remove('disabled');
      }, delayToClose);
    }
  
    closeBtn.addEventListener('click', () => {
      popup.remove();
      const index = activePopups.indexOf(popup);
      if (index !== -1) activePopups.splice(index, 1);
      setTimeout(() => createPopup(getRandomPosition(), delayToClose, respawnDelay), respawnDelay);
    });
  
    const link = document.createElement('a');
    const adLinks = [
        'https://fpsaimlabfakecopyoioi.netlify.app/',
        'https://youtu.be/9AcPURZrmRs?si=hDk5cKyrkHuv6rmR'
      ];
      link.href = adLinks[Math.floor(Math.random() * adLinks.length)];
          link.target = '_blank';
    link.textContent = getRandomText();
  
    popup.appendChild(closeBtn);
    popup.appendChild(link);
  
    document.body.appendChild(popup);
    activePopups.push(popup);
  
    if (activePopups.length > MAX_POPUPS) {
      const oldest = activePopups.shift();
      oldest.remove();
    }
  }
  
  function runPopups() {
    setInterval(() => createPopup(getRandomPosition(), 0, 2000), 2200);
    setInterval(() => createPopup('center', 5000, 5000), 6000);        
    setInterval(() => createPopup('random', 0, 2000), 3000);      
    setInterval(() => createPopup('top-right', 0, 2000), 2500);
    setInterval(() => createPopup('bottom-right', 0, 2000), 2000);
  }
  
  runPopups();

  
