function getDOMElements() {
  return {
    alertSubtitles: document.getElementById('alert-subtitles'),
    alertExtension: document.getElementById('alert-extension'),
    main: document.getElementById('main'),
    labelToggleExtensionCheckbox: document.querySelector(
      'label[for="toggle-extension-checkbox"]',
    ),
    toggleExtensionCheckbox: document.getElementById(
      'toggle-extension-checkbox',
    ),
  };
}

function generateSectionItemId(item, presetStyles) {
  const name = `${item}-${presetStyles[item]}`;
  return name.replaceAll(' ', '-').replaceAll('#', '');
}

function removeClassFromAll(element, className) {
  document
    .querySelectorAll(element)
    .forEach((item) => item.classList.remove(className));
}

function addClassToElement(element, className) {
  const elementItem = document.getElementById(element);
  if (elementItem) {
    elementItem.classList.add(className);
  }
}

function isSubtitlesActive() {
  return Boolean(document.querySelector('.ytp-caption-segment'));
}

function loadGoogleFont({ fontFamily, fontWeight }) {
  const googleFont = fontFamily.replaceAll(' ', '+');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${googleFont}:wght@${fontWeight}&display=swap`;
  link.rel = 'stylesheet';
  link.id = FONT_LINK_TAG;
  document.head.appendChild(link);
}

function clearInjectedStyles() {
  const fontLinkTag = document.getElementById(FONT_LINK_TAG);
  if (fontLinkTag) fontLinkTag.remove();

  const extensionStyle = document.getElementById(EXTENSION_STYLE_TAG);
  if (extensionStyle) extensionStyle.remove();
}

function saveToStorage(data = {}, handleStorage = () => {}) {
  chrome.storage.local.set(data, handleStorage);
}

function fetchFromStorage(data = [], handleResult = () => {}) {
  chrome.storage.local.get(data, handleResult);
}

function resetStorage() {
  chrome.storage.local.clear();
}

function sendMessageToActiveTab(data = {}, handleResponse = () => {}) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, data, handleResponse);
  });
}

function applyCaptionStyles({
  fontFamily,
  fontWeight,
  fontSize,
  backgroundColor,
  color,
  boxType,
}) {
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
        background: linear-gradient(to top, ${backgroundColor} 25%, rgba(0, 0, 0, 0) 100%) !important;
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
        background: ${backgroundColor} !important; 
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

function loadStoredStyles(inputStyles = {}) {
  fetchFromStorage(
    ['alertExtension', 'presetStyles'],
    ({ presetStyles, alertExtension }) => {
      if (!alertExtension) return;

      const styles = {
        ...(presetStyles || DEFAULT_PRESET_STYLES),
        ...inputStyles,
      };
      saveToStorage({ presetStyles: styles });
      applyCaptionStyles(styles);
    },
  );
}

function initPopupSettings(toggleExtensionCheckbox) {
  fetchFromStorage(
    ['alertExtension', 'presetStyles'],
    ({ alertExtension, presetStyles }) => {
      toggleExtensionCheckbox.checked = Boolean(alertExtension);
      if (!presetStyles) return;

      SETTINGS_SECTIONS.forEach((item) => {
        addClassToElement(generateSectionItemId(item, presetStyles), 'active');
      });
    },
  );
}
