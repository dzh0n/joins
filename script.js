document.querySelectorAll('[data-video-player]').forEach((block) => {
  const video = block.querySelector('video');
  const playBtn = block.querySelector('[data-video-play]');

  if (!video || !playBtn) return;

  playBtn.addEventListener('click', () => {
    video.play();
    block.classList.add('is-playing');
  });

  video.addEventListener('pause', () => {
    block.classList.remove('is-playing');
  });

  video.addEventListener('ended', () => {
    block.classList.remove('is-playing');
  });

  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      block.classList.add('is-playing');
    } else {
      video.pause();
    }
  });
});

// Random decorations for section titles
const DECO_COLORS = ['#56BAF1', '#F83584', '#89CE4C', '#ffab42', '#f577a8', '#ffd23f', '#2D2682'];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function pickColor() {
  return DECO_COLORS[Math.floor(Math.random() * DECO_COLORS.length)];
}

function randomDecoPosition() {
  const zone = Math.random();
  if (zone < 0.25) {
    return { left: randomBetween(0, 22), top: randomBetween(0, 100) };
  }
  if (zone < 0.5) {
    return { left: randomBetween(78, 100), top: randomBetween(0, 100) };
  }
  if (zone < 0.75) {
    return { left: randomBetween(0, 100), top: randomBetween(0, 28) };
  }
  return { left: randomBetween(0, 100), top: randomBetween(72, 100) };
}

document.querySelectorAll('.section-title').forEach((title) => {
  const decor = document.createElement('div');
  decor.className = 'section-title__decor';
  decor.setAttribute('aria-hidden', 'true');

  const count = Math.floor(randomBetween(4, 10));

  for (let i = 0; i < count; i++) {
    const isStar = Math.random() > 0.55;
    const el = document.createElement('span');
    const color = pickColor();
    const { left, top } = randomDecoPosition();
    const rotate = randomBetween(-20, 20);

    el.className = `section-title__deco section-title__deco--${isStar ? 'star' : 'dot'}`;
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;

    if (isStar) {
      el.textContent = '✦';
      el.style.fontSize = `${randomBetween(10, 24)}px`;
      el.style.color = color;
    } else {
      const size = randomBetween(7, 22);
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = color;
    }

    decor.appendChild(el);
  }

  title.insertBefore(decor, title.firstChild);
});
