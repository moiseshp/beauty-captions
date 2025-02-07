function isSubtitlesActive() {
  const status = document.querySelector('.ytp-caption-segment');
  return !!status;
}

function getBackground(boxType, bgColor) {
  if (boxType === 'gradient') {
    return `linear-gradient(to top, ${bgColor} 20%, rgba(0, 0, 0, 0) 100%)`;
  }
  if (boxType === 'segment') {
    return bgColor;
  }
  return 'transparent';
}

function applyPreset({
  fontFamily = 'Carter One',
  fontWeight = 400,
  fontSize = 85,
  bgColor = '#000000',
  color = '#FFFFFF',
  boxType = 'gradient',
}) {
  const googleFont = fontFamily.replaceAll(' ', '+');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${googleFont}:wght@${fontWeight}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const background = getBackground(boxType, bgColor);
  const style = document.createElement('style');

  style.textContent = `
    .caption-window {
      bottom: 0 !important;
      margin-left: 0 !important;
      width: 100% !important;
      left: 0 !important;
      margin-bottom: 0 !important;
      padding-top: 200px !important;
      padding-bottom: 3.5% !important;
      padding-left: 4% !important;
      padding-right: 4% !important;
      text-align: left !important;
      // background: ${background} !important;
    }
    // .captions-text {
    //   background: ${bgColor} !important;
    //   display: inline-block !important;
    //   padding: 2.5% !important;
    // }
    .ytp-caption-segment {
      font-family: "${fontFamily}", serif !important;
      font-size: ${fontSize}px !important;
      color: ${color} !important;
      text-align: inherit !important;
      font-optical-sizing: auto !important;
      font-weight: ${fontWeight} !important;
      line-height: ${fontSize * 1.11}px !important;
      background: ${bgColor} !important;
      padding: 0 1.5% !important;
      // padding: 0 !important;
      // background: transparent !important;
      // text-shadow: -4px -4px 0 black, 0px 0px 0 black, 2px 4px 0 black !important;
    }
    .caption-visual-line:first-child .ytp-caption-segment { padding-top: 1.5% !important }
    .caption-visual-line:last-child .ytp-caption-segment { padding-bottom: 1.5% !important }
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
      fontFamily: 'Merriweather',
      fontWeight: 900,
      bgColor: '#33FF00',
      color: '#000000',
      boxType: 'gradient',
    });
  }
});
