function isSubtitlesActive() {
  const status = document.querySelector('.ytp-caption-segment');
  return !!status;
}

function applyPreset({
  font = 'Carter One',
  fontWeight = 400,
  bgColor = 'rgba(0, 0, 0, 0)',
  color = 'rgb(255, 255, 255)',
}) {
  const googleFont = font.replaceAll(' ', '+');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${googleFont}:wght@${fontWeight}&display=swap`;
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
      background: linear-gradient(to top, rgba(0, 0, 0, 1) 20%, ${bgColor} 100%) !important;
    }
    .caption-visual-line {
      padding: 0 4% !important;
    }
    .ytp-caption-segment {
      font-family: ${googleFont}, serif !important;
      font-size: 85px !important;
      color: ${color} !important;
      background: transparent !important;
      text-align: inherit !important;
      padding: 0 !important;
      font-optical-sizing: auto !important;
      font-weight: ${fontWeight} !important;
      line-height: 95px !important;
    }
  `;

  document.head.appendChild(style);
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.info('onMessage');
  if (message.action === 'checkSubtitles') {
    sendResponse({ active: isSubtitlesActive() });
  }

  if (message.action === 'applyStyles') {
    applyPreset({
      font: 'Merriweather',
      fontWeight: 900,
    });
  }
});
