function getInitElements() {
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

function getSectionItemId(item, presetStyles) {
  const name = `${item}-${presetStyles[item]}`;
  return name.replaceAll(' ', '-').replaceAll('#', '');
}

function removeAllClasses(element, className) {
  document
    .querySelectorAll(element)
    .forEach((item) => item.classList.remove(className));
}

function addClass(element, className) {
  const elementItem = document.getElementById(element);
  if (elementItem) {
    elementItem.classList.add(className);
  }
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
  link.id = FONT_LINK_TAG_NAME;
  document.head.appendChild(link);
}

function removeStyles() {
  const fontLinkTag = document.getElementById(FONT_LINK_TAG_NAME);
  if (fontLinkTag) {
    fontLinkTag.remove();
  }

  const extensionStyle = document.getElementById(EXTENSION_STYLE_TAG_NAME);
  if (extensionStyle) {
    extensionStyle.remove();
  }
}

function setStorage(data = {}, handleStorage = () => {}) {
  chrome.storage.local.set(data, handleStorage);
}

function getStorage(data = [], handleResult = () => {}) {
  chrome.storage.local.get(data, handleResult);
}

function clearStorage() {
  chrome.storage.local.clear();
}

function sendChromeMessage(data = {}, handleResponse = () => {}) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, data, handleResponse);
  });
}

function applyStyles({
  fontFamily,
  fontWeight,
  fontSize,
  backgroundColor,
  color,
  boxType,
}) {
  setGoogleFont({ fontFamily, fontWeight });
  const style = document.createElement('style');
  style.id = EXTENSION_STYLE_TAG_NAME;
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

function loadExtensionStyles(inputStyles = {}) {
  getStorage(
    ['alertExtension', 'presetStyles'],
    ({ presetStyles, alertExtension }) => {
      if (!alertExtension) return;

      const styles = {
        ...(presetStyles || DEFAULT_STYLES_PRESET),
        ...inputStyles,
      };
      setStorage({ presetStyles: styles });
      applyStyles(styles);
    },
  );
}

function initializePopupSettings(toggleExtensionCheckbox) {
  getStorage(
    ['alertExtension', 'presetStyles'],
    ({ alertExtension, presetStyles }) => {
      toggleExtensionCheckbox.checked = Boolean(alertExtension);
      if (!presetStyles) return;

      SETTINGS_SECTION_ITEMS.forEach((item) => {
        addClass(getSectionItemId(item, presetStyles), 'active');
      });
    },
  );
}
