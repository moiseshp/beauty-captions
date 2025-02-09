const FONT_FAMILIES = [
  'Merriweather',
  'Roboto',
  'Carter One',
  'Funnel Display',
  'Rokkitt',
  'Montserrat',
  'Kanit',
  'Sour Gummy',
];
const COLORS = ['#f7f700', '#33FF00', '#0eeef9', '#f90ef5', '#f9ab0e'];
const FONT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const BOX_TYPES = ['GRADIENT_BOX', 'BLOCK_STYLE', 'TEXT_ONLY'];

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

function renderSettingsSection({
  elementId = '',
  inputTag = 'div',
  items = [],
  handleClick = () => {},
}) {
  getStorage(['stylesPreset'], ({ stylesPreset }) => {
    items.forEach((item) => {
      const isActive = stylesPreset['boxType'] === item;
      const tag = document.createElement(inputTag);
      tag.innerHTML = `<div class="section-item ${
        isActive && 'active'
      }">${item}</div>`;

      tag.addEventListener('click', () => handleClick(item));
      document.getElementById(elementId).appendChild(tag);
    });
  });
}
