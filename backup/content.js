function toggleYouTubeSubtitles(enable) {
  const settingsButton = document.querySelector('.ytp-settings-button');
  console.info({ settingsButton });
  if (!settingsButton) return;

  settingsButton.click(); // Abrir menú de configuraciones

  setTimeout(() => {
    const menuItems = document.querySelectorAll('.ytp-menuitem');
    menuItems.forEach((item) => {
      if (
        item.innerText.includes('Subtítulos') ||
        item.innerText.includes('Subtitles')
      ) {
        item.click(); // Entrar a la configuración de subtítulos
        setTimeout(() => {
          const options = document.querySelectorAll('.ytp-menuitem');
          if (options.length > 1) {
            if (enable) {
              options[1].click(); // Activar subtítulos
            } else {
              options[0].click(); // Desactivar subtítulos
            }
          }
        }, 500);
      }
    });
  }, 500);

  if (enable) {
    applySubtitleStyles(); // Aplicar estilos personalizados
  }
}

// 2️⃣ Aplicar estilos personalizados en los subtítulos (MutationObserver)
function applySubtitleStyles({ textColor, textSize, bgColor }) {
  // Cargar la fuente de Google Fonts
  const link = document.createElement('link');
  link.href =
    'https://fonts.googleapis.com/css2?family=Carter+One&display=swap';
  // 'https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.innerHTML = `
        .caption-window {
            bottom: 0 !important;
            margin-left: 0 !important;
            width: 100% !important;
            left: 0 !important;
            margin-bottom: 0 !important;
            padding-top: 200px !important;
            padding-bottom: 3.5% !important;
            text-align: left !important;
            background: linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%) !important;
        }
        .caption-visual-line {
            padding: 0 4% !important;
        }
        .ytp-caption-segment {
            // font-family: "Merriweather", serif !important;
            font-family: "Carter One", serif !important;
            font-size: 85px !important;
            color: white !important;
            background: transparent !important;
            text-align: inherit !important;
            padding: 0 !important;
            font-optical-sizing: auto !important;
            // font-weight: 900 !important;
            font-weight: 400 !important;
            line-height: 95px !important;
        }
    `;
  document.head.appendChild(style);

  const subtitles = document.querySelectorAll('.ytp-caption-segment');
  subtitles.forEach((sub) => {
    sub.style.color = textColor;
    sub.style.fontSize = textSize + 'px';
    sub.style.backgroundColor = bgColor;
  });
}

// 3️⃣ Detectar cuando YouTube cambia los subtítulos y forzar los estilos
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['textColor', 'textSize', 'bgColor'], (data) => {
    applySubtitleStyles(data);
  });
});

// 4️⃣ Observar el contenedor de subtítulos en YouTube
const observeSubtitles = () => {
  const subtitleContainer = document.querySelector(
    '.ytp-caption-window-container',
  );
  if (subtitleContainer) {
    observer.observe(subtitleContainer, { childList: true, subtree: true });
  }
};

// 5️⃣ Esperar a que el contenedor de subtítulos aparezca y aplicar la observación
const interval = setInterval(() => {
  if (document.querySelector('.ytp-caption-window-container')) {
    observeSubtitles();
    clearInterval(interval);
  }
}, 1000);
