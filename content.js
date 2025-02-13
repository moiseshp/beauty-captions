initializeStyles();

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === ACTION_NAMES.CAPTIONS_ENABLED) {
    sendResponse({ isCaptionsEnabled: isCaptionsEnabled() });
  }

  if (message.action === ACTION_NAMES.APPLY_PRESET_STYLES) {
    getFromStorage([STORAGE_KEYS.presetStyles], (storage) => {
      let presetStyles = storage?.presetStyles || DEFAULT_PRESET_STYLES;
      if (message?.presetStyles) {
        presetStyles = {
          ...presetStyles,
          ...message.presetStyles,
        };
      }

      saveToStorage({ presetStyles });
      sendResponse({ presetStyles });
      applyCaptionStyles(presetStyles);
    });
  }

  if (message.action === ACTION_NAMES.REMOVE_PRESET_STYLES) {
    resetCaptionStyles();
    sendResponse({ success: true });
  }

  return true;
});

const DEFAULT_PRESET_STYLES = {
  fontFamily: 'Montserrat',
  fontWeight: '800',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontSize: '70',
  boxType: 'Gradient-Box',
};

const EXTENSION_STYLE_TAG = 'extension-style-tag';
const FONT_LINK_TAG = 'font-link-tag';

function isCaptionsEnabled() {
  const button = document.querySelector('.ytp-subtitles-button');
  return Boolean(button && button.getAttribute('aria-pressed') === 'true');
}

function initializeStyles() {
  getFromStorage(
    [STORAGE_KEYS.isChromeExtensionActive, STORAGE_KEYS.presetStyles],
    ({ isChromeExtensionActive, presetStyles }) => {
      if (!isChromeExtensionActive) return;
      applyCaptionStyles(presetStyles);
    },
  );
}

function loadGoogleFont({ fontFamily, fontWeight }) {
  const googleFont = fontFamily.replaceAll(' ', '+');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${googleFont}:wght@${fontWeight}&display=swap`;
  link.rel = 'stylesheet';
  link.id = FONT_LINK_TAG;
  document.head.appendChild(link);
}

function resetCaptionStyles() {
  const fontLinkTag = document.getElementById(FONT_LINK_TAG);
  if (fontLinkTag) fontLinkTag.remove();

  const extensionStyle = document.getElementById(EXTENSION_STYLE_TAG);
  if (extensionStyle) extensionStyle.remove();
}

function applyCaptionStyles({
  fontFamily,
  fontWeight,
  fontSize,
  backgroundColor,
  color,
  boxType,
}) {
  resetCaptionStyles();
  loadGoogleFont({ fontFamily, fontWeight });
  const style = document.createElement('style');
  style.id = EXTENSION_STYLE_TAG;
  document.head.appendChild(style);

  let cssRules = `
    .caption-window { 
      bottom: 0 !important;
      width: auto !important;
      left: 0 !important;
      right: 0 !important;
      margin: 0 !important;
      padding: 250px 3.5% 3.5% !important;
      text-align: left !important;
    }
    .ytp-caption-segment {
      font-family: "${fontFamily}", serif !important;
      font-size: ${fontSize}px !important;
      color: ${color} !important;
      text-align: inherit !important;
      font-optical-sizing: auto !important;
      font-weight: ${fontWeight} !important;
      line-height: ${Math.floor(fontSize * 1.05)}px !important;
    }
  `;

  if (boxType === BOX_TYPES.gradientBox) {
    cssRules += `
      .caption-window {
        background: linear-gradient(to top, ${backgroundColor} 25%, rgba(0, 0, 0, 0) 100%) !important;
      }
      .ytp-caption-segment { 
        padding: 0 !important;
        background: transparent !important;
      }
    `;
  }

  if (boxType === BOX_TYPES.blockStyle) {
    cssRules += `
      .caption-window { background: transparent !important; }
      .ytp-caption-segment {
        background: rgba(0,0,0,.80) !important; 
        padding: 0.5% 2% !important;
        line-height: ${Math.floor(fontSize * 0.9)}px !important;
      }
      .caption-visual-line:first-child .ytp-caption-segment { 
        padding-top: 1% !important;
      }
      .caption-visual-line:last-child .ytp-caption-segment { 
        padding-bottom: 1% !important;
      }
    `;
  }

  if (boxType === BOX_TYPES.textOnly) {
    cssRules += `
      .caption-window { background: transparent !important; }
      .ytp-caption-segment {
        text-shadow: -3px -3px 0 black, 0px 0px 0 black, 2px 3px 0 black !important;
        background: transparent !important;
        padding: 0 !important;
      }
    `;
  }

  style.textContent = cssRules;
}
