const SETTINGS_SECTION_ITEMS = ['boxType', 'fontSize', 'fontFamily', 'color'];
const SETTINGS_ITEMS = {
  fontFamily: [
    { stylesPreset: { fontFamily: 'Merriweather' } },
    { stylesPreset: { fontFamily: 'Roboto' } },
    { stylesPreset: { fontFamily: 'Carter One' } },
    { stylesPreset: { fontFamily: 'Funnel Display' } },
    { stylesPreset: { fontFamily: 'Rokkitt' } },
    { stylesPreset: { fontFamily: 'Montserrat' } },
    { stylesPreset: { fontFamily: 'Kanit' } },
    { stylesPreset: { fontFamily: 'Sour Gummy' } },
  ],
  color: [
    { stylesPreset: { color: '#f7f700' } },
    { stylesPreset: { color: '#33FF00' } },
    { stylesPreset: { color: '#0eeef9' } },
    { stylesPreset: { color: '#f90ef5' } },
    { stylesPreset: { color: '#f9ab0e' } },
  ],
  fontSize: [
    { name: 'xs', stylesPreset: { fontSize: '30' } },
    { name: 'sm', stylesPreset: { fontSize: '50' } },
    { name: 'md', stylesPreset: { fontSize: '70' } },
    { name: 'lg', stylesPreset: { fontSize: '90' } },
    { name: 'xl', stylesPreset: { fontSize: '110' } },
  ],
  boxType: [
    { stylesPreset: { boxType: 'Gradient-Box' } },
    { stylesPreset: { boxType: 'Block-Style' } },
    { stylesPreset: { boxType: 'Text-Only' } },
  ],
};

function getSectionItemId(item, stylesPreset) {
  return `${item}-${stylesPreset[item]
    .replaceAll(' ', '-')
    .replaceAll('#', '')}`;
}

function getInitElements() {
  return {
    subtitleStatus: document.getElementById('subtitle-status'),
    extensionStatus: document.getElementById('extension-status'),
    mainContainer: document.getElementById('main-container'),
    switchExtensionStatus: document.getElementById(
      'extension-status-container',
    ),
    checkboxExtensionStatus: document.getElementById(
      'checkbox-extension-status',
    ),
  };
}

function setStorage(data = {}, handleStorage = () => {}) {
  chrome.storage.local.set(data, handleStorage);
}

function getStorage(data = [], handleResult = () => {}) {
  chrome.storage.local.get(data, handleResult);
}

function sendChromeMessage(data = {}, handleResponse = () => {}) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, data, handleResponse);
  });
}
