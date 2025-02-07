function isSubtitlesActive() {
  const status = document.querySelector('.ytp-caption-segment');
  return !!status;
}

function setGoogleFont({ fontFamily, fontWeight }) {
  const googleFont = fontFamily.replaceAll(' ', '+');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${googleFont}:wght@${fontWeight}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

function applyStyles({
  fontFamily = 'Carter One',
  fontWeight = 400,
  fontSize = 85,
  bgColor = '#000000',
  color = '#FFFFFF',
  boxType = 'gradient',
}) {
  setGoogleFont({ fontFamily, fontWeight });
  const style = document.createElement('style');
  document.head.appendChild(style);

  const sheet = style.sheet;

  sheet.insertRule(
    `.caption-window { 
      bottom: 0 !important;
      margin-left: 0 !important;
      width: 100% !important;
      left: 0 !important;
      margin-bottom: 0 !important;
      padding: 300px 3.5% 3.5% !important;
      text-align: left !important;
    }`,
    sheet.cssRules.length,
  );
  sheet.insertRule(
    `.ytp-caption-segment {
      font-family: "${fontFamily}", serif !important;
      font-size: ${fontSize}px !important;
      color: ${color} !important;
      text-align: inherit !important;
      font-optical-sizing: auto !important;
      font-weight: ${fontWeight} !important;
      line-height: ${fontSize * 1.11}px !important;    
    }`,
    sheet.cssRules.length,
  );

  if (boxType === 'GRADIENT_BOX') {
    sheet.insertRule(
      `.caption-window {
        background: linear-gradient(to top, ${bgColor} 25%, rgba(0, 0, 0, 0) 100%) !important;
      }`,
      sheet.cssRules.length,
    );
    sheet.insertRule(
      `.ytp-caption-segment { 
        padding: 0 !important;
        background: transparent !important;
      }`,
      sheet.cssRules.length,
    );
  }

  if (boxType === 'BLOCK_STYLE') {
    sheet.insertRule(
      `.caption-window { background: transparent !important; }`,
      sheet.cssRules.length,
    );
    sheet.insertRule(
      `.ytp-caption-segment {
        background: ${bgColor} !important; 
        padding: 0.5% 2% !important;
      }`,
      sheet.cssRules.length,
    );
    sheet.insertRule(
      `.caption-visual-line:first-child .ytp-caption-segment { padding-top: 1.5% !important }`,
      sheet.cssRules.length,
    );
    sheet.insertRule(
      `.caption-visual-line:last-child .ytp-caption-segment { padding-bottom: 1.5% !important }`,
      sheet.cssRules.length,
    );
  }

  if (boxType === 'TEXT_ONLY') {
    sheet.insertRule(
      `.ytp-caption-segment {
        text-shadow: -4px -4px 0 black, 0px 0px 0 black, 2px 4px 0 black !important;
        background: transparent !important;
      }`,
      sheet.cssRules.length,
    );
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.info('onMessage');
  if (message.action === 'CHECK_SUBTITLES') {
    sendResponse({ active: isSubtitlesActive() });
  }

  if (message.action === 'APPLY_STYLES') {
    applyStyles({
      fontFamily: 'Merriweather',
      fontWeight: 900,
      bgColor: '#000000',
      color: '#33FF00',
      boxType: 'BLOCK_STYLE',
    });
  }
});
