document.addEventListener('DOMContentLoaded', () => {
  const navigation = document.querySelector('nav');
  const main = document.querySelector('main');
  const alertSubtitles = document.getElementById('alert-subtitles');
  const alertExtension = document.getElementById('alert-extension');
  const toggleExtensionCheckbox = document.getElementById(
    'toggle-extension-checkbox',
  );

  renderSubtitleCustomizationSections(SETTINGS_SECTIONS, SETTINGS_OPTIONS);

  sendMessageToActiveTab(
    { action: ACTION_NAMES.CAPTIONS_ENABLED },
    (response) => {
      const isCaptionsEnabled = Boolean(response?.isCaptionsEnabled);

      if (!isCaptionsEnabled) {
        alertSubtitles.classList.remove('hidden');
        return;
      }

      getFromStorage(
        [STORAGE_KEYS.isChromeExtensionActive, STORAGE_KEYS.presetStyles],
        (storage) => {
          toggleExtensionCheckbox.checked = storage.isChromeExtensionActive;

          navigation.classList.remove('hidden');

          if (!storage.isChromeExtensionActive) {
            alertExtension.classList.remove('hidden');
            return;
          }

          refreshUIStyles(storage.presetStyles);
          main.classList.remove('hidden');
        },
      );
    },
  );

  toggleExtensionCheckbox.addEventListener('change', () => {
    const isChromeExtensionActive = Boolean(toggleExtensionCheckbox.checked);
    saveToStorage({ isChromeExtensionActive }, () => {
      if (!isChromeExtensionActive) {
        alertExtension.classList.remove('hidden');
        main.classList.add('hidden');
        sendMessageToActiveTab({ action: ACTION_NAMES.REMOVE_PRESET_STYLES });
        return;
      }

      alertExtension.classList.add('hidden');
      main.classList.remove('hidden');

      sendMessageToActiveTab(
        { action: ACTION_NAMES.APPLY_PRESET_STYLES },
        (response) => {
          refreshUIStyles(response.presetStyles);
        },
      );
    });
  });
});

function sendMessageToActiveTab(data = {}, handleResponse = () => {}) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.tabs.sendMessage(tabs[0].id, data, handleResponse);
  });
}

function renderSubtitleCustomizationSections(sections, options) {
  sections.forEach((item) => {
    options[item].forEach(({ name = '', presetStyles }) => {
      const tag = document.createElement('div');
      tag.className = 'section-item';
      if (item === 'color') {
        tag.style.color = presetStyles.color;
      }
      tag.innerHTML = name || presetStyles[item].replaceAll('-', ' ');
      const elementId = generateSectionItemId(item, presetStyles);
      tag.id = elementId;
      tag.addEventListener('click', () => {
        sendMessageToActiveTab(
          {
            action: ACTION_NAMES.APPLY_PRESET_STYLES,
            presetStyles,
          },
          (response) => {
            refreshUIStyles(response.presetStyles);
          },
        );
      });
      document.getElementById(`section-${item}`).appendChild(tag);
    });
  });
}

function generateSectionItemId(item, presetStyles) {
  const name = `${item}-${presetStyles[item]}`;
  return name.replaceAll(' ', '-').replaceAll('#', '');
}

function refreshUIStyles(presetStyles) {
  if (!presetStyles) return;
  removeActiveClassToItems();
  updateColorToBrandIcon(presetStyles.color);
  addActiveClassToItemsByStyle(presetStyles);
}

function addActiveClassToItemsByStyle(presetStyles) {
  SETTINGS_SECTIONS.forEach((item) => {
    const elementId = generateSectionItemId(item, presetStyles);
    const elementItem = document.getElementById(elementId);
    if (elementItem) {
      elementItem.classList.add('active');
    }
  });
}

function removeActiveClassToItems() {
  document
    .querySelectorAll('section div .section-item')
    .forEach((item) => item.classList.remove('active'));
}

function updateColorToBrandIcon(color) {
  const brandIcon = document.getElementById('brand-icon');
  brandIcon.style.fill = color;
}
