const extensionStyleTagName = 'extension-style-tag';
const fontLinkTagName = 'font-link-tag';
const DEFAULT_STYLES_PRESET = {
  fontFamily: 'Funnel Display',
  fontWeight: '900',
  bgColor: '#000000',
  color: '#33FF00',
  fontSize: 85,
  boxType: 'Gradient-Box',
};

function setStorage(data = {}, handleStorage = () => {}) {
  chrome.storage.local.set(data, handleStorage);
}

function getStorage(data = [], handleResult = () => {}) {
  chrome.storage.local.get(data, handleResult);
}

function clearStorage() {
  chrome.storage.local.clear();
}

function isSubtitlesActive() {
  const status = document.querySelector('.ytp-caption-segment');
  return Boolean(status);
}

function setGoogleFont({ fontFamily, fontWeight }) {
  const googleFont = fontFamily.replaceAll(' ', '+');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${googleFont}:wght@${fontWeight}&display=swap`;
  link.rel = 'stylesheet';
  link.id = fontLinkTagName;
  document.head.appendChild(link);
}

function removeStyles() {
  const fontLinkTag = document.getElementById(fontLinkTagName);
  if (fontLinkTag) {
    fontLinkTag.remove();
  }

  const extensionStyle = document.getElementById(extensionStyleTagName);
  if (extensionStyle) {
    extensionStyle.remove();
  }
}

function applyStyles({
  fontFamily,
  fontWeight,
  fontSize,
  bgColor,
  color,
  boxType,
}) {
  setGoogleFont({ fontFamily, fontWeight });
  const style = document.createElement('style');
  style.id = extensionStyleTagName;
  document.head.appendChild(style);

  let cssRules = `
    .caption-window { 
      bottom: 0 !important;
      width: auto !important;
      left: 0 !important;
      right: 0 !important;
      margin: 0 !important;
      padding: 300px 3.5% 3.5% !important;
      text-align: left !important;
    }
    .ytp-caption-segment {
      font-family: "${fontFamily}", serif !important;
      font-size: ${fontSize}px !important;
      color: ${color} !important;
      text-align: inherit !important;
      font-optical-sizing: auto !important;
      font-weight: ${fontWeight} !important;
      line-height: ${fontSize * 1.11}px !important;
    }
  `;

  if (boxType === 'Gradient-Box') {
    cssRules += `
      .caption-window {
        background: linear-gradient(to top, ${bgColor} 25%, rgba(0, 0, 0, 0) 100%) !important;
      }
      .ytp-caption-segment { 
        padding: 0 !important;
        background: transparent !important;
      }
    `;
  }

  if (boxType === 'Block-Style') {
    cssRules += `
      .caption-window { background: transparent !important; }
      .ytp-caption-segment {
        background: ${bgColor} !important; 
        padding: 0.5% 2% !important;
      }
      .caption-visual-line:first-child .ytp-caption-segment { 
        padding-top: 1.5% !important;
      }
      .caption-visual-line:last-child .ytp-caption-segment { 
        padding-bottom: 1.5% !important;
      }
    `;
  }

  if (boxType === 'Text-Only') {
    cssRules += `
      .caption-window { background: transparent !important; }
      .ytp-caption-segment {
        text-shadow: -4px -4px 0 black, 0px 0px 0 black, 2px 4px 0 black !important;
        background: transparent !important;
        padding: 0 !important;
      }
    `;
  }

  style.textContent = cssRules;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'CHECK_SUBTITLES') {
    sendResponse({ active: isSubtitlesActive() });
  }

  if (message.action === 'APPLY_STYLES') {
    removeStyles();
    getStorage(['stylesPreset'], (storage) => {
      const newStylesPreset = {
        ...(storage.stylesPreset || DEFAULT_STYLES_PRESET),
        ...message.stylesPreset,
      };
      setStorage({ stylesPreset: newStylesPreset });
      applyStyles(newStylesPreset);
    });
  }

  if (message.action === 'REMOVE_STYLES') {
    clearStorage();
    removeStyles();
  }
});

getStorage(
  ['stylesPreset', 'extensionStatus'],
  ({ stylesPreset, extensionStatus }) => {
    if (extensionStatus && Boolean(stylesPreset)) {
      applyStyles(stylesPreset);
    }
  },
);
