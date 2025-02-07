const FONT_FAMILIES = ['Merriweather', 'Carter One'];
const COLORS = ['#000000', '#33FF00'];
const FONT_SIZES = [30, 50, 80];
const BOX_TYPES = ['GRADIENT_BOX', 'BLOCK_STYLE', 'TEXT_ONLY'];
const DEFAULT_STYLES_PRESET = {
  fontFamily: 'Merriweather',
  fontWeight: 900,
  bgColor: '#000000',
  color: '#33FF00',
  fontSize: 85,
  boxType: BOX_TYPES[0],
};

function storeStylesPreset(styles = {}) {
  chrome.storage.local.set(
    { stylesPreset: { ...DEFAULT_STYLES_PRESET, ...styles } },
    () => {
      console.log('Configuración guardada:', DEFAULT_STYLES_PRESET);
    },
  );
}

function storeExtensionStatus(status) {
  chrome.storage.local.set({ extensionStatus: Boolean(status) });
}

function renderUserTool({
  elementId = '',
  inputTag = 'div',
  items = [],
  handleEvent = () => {},
}) {
  items.forEach((item) => {
    const tag = document.createElement(inputTag);
    tag.innerHTML = `<div class="item-${elementId}" id="item-${elementId}">${item}</div>`;

    tag.addEventListener('click', () => handleEvent(item));
    document.getElementById(elementId).appendChild(tag);
  });
}
