const FONT_FAMILIES = ['Merriweather', 'Carter One'];
const COLORS = ['#000000', '#33FF00'];
const FONT_SIZES = [30, 50, 80];
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
  items.forEach((item) => {
    const tag = document.createElement(inputTag);
    tag.innerHTML = `<div class="item-${elementId}" id="item-${elementId}">${item}</div>`;

    tag.addEventListener('click', () => handleClick(item));
    document.getElementById(elementId).appendChild(tag);
  });
}
