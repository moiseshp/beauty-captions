document.addEventListener('DOMContentLoaded', () => {
  const {
    subtitleStatus,
    extensionStatus,
    mainContainer,
    switchExtensionStatus,
    checkboxExtensionStatus,
  } = getInitElements();

  getStorage(
    ['extensionStatus', 'stylesPreset'],
    ({ extensionStatus, stylesPreset }) => {
      checkboxExtensionStatus.checked = Boolean(extensionStatus);
      SETTINGS_SECTION_ITEMS.forEach((item) => {
        const sectionItem = document.getElementById(
          getSectionItemId(item, stylesPreset),
        );
        sectionItem.classList.add('active');
      });
    },
  );

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

  SETTINGS_SECTION_ITEMS.forEach((item) => {
    SETTINGS_ITEMS[item].forEach(({ name = '', stylesPreset }) => {
      const tag = document.createElement('div');
      tag.className = 'section-item';
      tag.innerHTML = name || stylesPreset[item].replaceAll('-', ' ');
      tag.id = getSectionItemId(item, stylesPreset);
      tag.addEventListener('click', () => {
        sendChromeMessage({ action: 'APPLY_STYLES', stylesPreset });
      });
      document.getElementById(`section-${item}`).appendChild(tag);
    });
  });

  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});
