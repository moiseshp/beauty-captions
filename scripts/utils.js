const SETTINGS_SECTIONS = ['boxType', 'fontSize', 'fontFamily', 'color'];
const BOX_TYPES = {
  gradientBox: 'Gradient-Box',
  blockStyle: 'Block-Style',
  textOnly: 'Text-Only',
};
const SETTINGS_OPTIONS = {
  fontFamily: [
    { presetStyles: { fontFamily: 'Kanit', fontWeight: 800 } },
    { presetStyles: { fontFamily: 'Merriweather', fontWeight: 900 } },
    { presetStyles: { fontFamily: 'Funnel Display', fontWeight: 800 } },
    { presetStyles: { fontFamily: 'Kavoon', fontWeight: 400 } },
    { presetStyles: { fontFamily: 'Agbalumo', fontWeight: 400 } },
    { presetStyles: { fontFamily: 'Carter One', fontWeight: 400 } },
    { presetStyles: { fontFamily: 'Sour Gummy', fontWeight: 900 } },
  ],
  color: [
    { name: 'White', presetStyles: { color: '#FFFFFF' } },
    { name: 'Yellow', presetStyles: { color: '#f7f700' } },
    { name: 'Green', presetStyles: { color: '#33FF00' } },
    { name: 'Cyan', presetStyles: { color: '#0eeef9' } },
    { name: 'Violet', presetStyles: { color: '#f90ef5' } },
    { name: 'Orange', presetStyles: { color: '#f9ab0e' } },
  ],
  fontSize: [
    { name: 'xs', presetStyles: { fontSize: '50' } },
    { name: 'sm', presetStyles: { fontSize: '60' } },
    { name: 'md', presetStyles: { fontSize: '70' } },
    { name: 'lg', presetStyles: { fontSize: '80' } },
    { name: 'xl', presetStyles: { fontSize: '100' } },
  ],
  boxType: [
    { presetStyles: { boxType: BOX_TYPES.gradientBox } },
    { presetStyles: { boxType: BOX_TYPES.blockStyle } },
    { presetStyles: { boxType: BOX_TYPES.textOnly } },
  ],
};

const ACTION_NAMES = {
  CAPTIONS_ENABLED: 'CAPTIONS_ENABLED',
  APPLY_PRESET_STYLES: 'APPLY_PRESET_STYLES',
  REMOVE_PRESET_STYLES: 'REMOVE_PRESET_STYLES',
};

const STORAGE_KEYS = {
  isChromeExtensionActive: 'isChromeExtensionActive',
  presetStyles: 'presetStyles',
};

const DEFAULT_PRESET_STYLES = {
  fontFamily: 'Kanit',
  fontWeight: '800',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontSize: '70',
  boxType: 'Gradient-Box',
};

const EXTENSION_STYLE_TAG = 'extension-style-tag';
const FONT_LINK_TAG = 'font-link-tag';

function saveToStorage(data = {}, handleStorage = () => {}) {
  chrome.storage.local.set(data, handleStorage);
}

function getFromStorage(data = [], handleResult = () => {}) {
  chrome.storage.local.get(data, handleResult);
}

function resetStorage() {
  chrome.storage.local.clear();
}
