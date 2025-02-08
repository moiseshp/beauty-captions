document.addEventListener('DOMContentLoaded', () => {
  const {
    subtitleStatus,
    extensionStatus,
    mainContainer,
    switchExtensionStatus,
    checkboxExtensionStatus,
  } = getInitElements();

  getStorage(['extensionStatus'], ({ extensionStatus }) => {
    checkboxExtensionStatus.checked = Boolean(extensionStatus);
  });

  sendChromeMessage({ action: 'CHECK_SUBTITLES' }, (response) => {
    if (!response?.active) {
      subtitleStatus.classList.remove('hidden');
      extensionStatus.classList.add('hidden');
      mainContainer.classList.add('hidden');
      switchExtensionStatus.classList.add('hidden');
      return;
    }

    subtitleStatus.classList.add('hidden');

    if (checkboxExtensionStatus.checked) {
      extensionStatus.classList.add('hidden');
      mainContainer.classList.remove('hidden');
    } else {
      extensionStatus.classList.remove('hidden');
      mainContainer.classList.add('hidden');
    }
  });

  checkboxExtensionStatus.addEventListener('change', () => {
    setStorage({ extensionStatus: Boolean(checkboxExtensionStatus.checked) });

    if (checkboxExtensionStatus.checked) {
      extensionStatus.classList.add('hidden');
      mainContainer.classList.remove('hidden');

      sendChromeMessage({ action: 'APPLY_STYLES' });
    } else {
      extensionStatus.classList.remove('hidden');
      mainContainer.classList.add('hidden');

      sendChromeMessage({ action: 'REMOVE_STYLES' });
    }
  });

  renderSettingsSection({
    elementId: 'section-boxtype',
    items: BOX_TYPES,
    handleClick: (boxType) => {
      sendChromeMessage({ action: 'APPLY_STYLES', stylesPreset: { boxType } });
    },
  });

  renderSettingsSection({
    elementId: 'section-fontfamily',
    items: FONT_FAMILIES,
    handleClick: (fontFamily) => {
      sendChromeMessage({
        action: 'APPLY_STYLES',
        stylesPreset: { fontFamily },
      });
    },
  });

  renderSettingsSection({
    elementId: 'section-color',
    items: COLORS,
    handleClick: (color) => {
      sendChromeMessage({
        action: 'APPLY_STYLES',
        stylesPreset: { color },
      });
    },
  });

  renderSettingsSection({
    elementId: 'section-fontsize',
    items: FONT_SIZES,
    handleClick: (item) => {
      console.info('renderSettingsSection: ', { item });
    },
  });

  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});
