document.addEventListener('DOMContentLoaded', () => {
  const {
    alertSubtitles,
    alertExtension,
    main,
    labelToggleExtensionCheckbox,
    toggleExtensionCheckbox,
  } = getInitElements();

  initializePopupSettings(toggleExtensionCheckbox);

  sendChromeMessage({ action: 'CHECK_SUBTITLES' }, (response) => {
    if (!response?.active) {
      alertSubtitles.classList.remove('hidden');
      alertExtension.classList.add('hidden');
      main.classList.add('hidden');
      labelToggleExtensionCheckbox.classList.add('hidden');
      return;
    }

    alertSubtitles.classList.add('hidden');

    if (toggleExtensionCheckbox.checked) {
      alertExtension.classList.add('hidden');
      main.classList.remove('hidden');
    } else {
      alertExtension.classList.remove('hidden');
      main.classList.add('hidden');
    }
  });

  toggleExtensionCheckbox.addEventListener('change', () => {
    setStorage({ alertExtension: Boolean(toggleExtensionCheckbox.checked) });

    if (toggleExtensionCheckbox.checked) {
      alertExtension.classList.add('hidden');
      main.classList.remove('hidden');

      sendChromeMessage({ action: 'APPLY_STYLES' }, () => {
        initializePopupSettings(toggleExtensionCheckbox);
      });
    } else {
      alertExtension.classList.remove('hidden');
      main.classList.add('hidden');

      sendChromeMessage({ action: 'REMOVE_STYLES' });
    }
  });

  SETTINGS_SECTION_ITEMS.forEach((item) => {
    SETTINGS_ITEMS[item].forEach(({ name = '', presetStyles }) => {
      const tag = document.createElement('div');
      tag.className = 'section-item';
      tag.innerHTML = name || presetStyles[item].replaceAll('-', ' ');
      const elementId = getSectionItemId(item, presetStyles);
      tag.id = elementId;
      tag.addEventListener('click', () => {
        removeAllClasses(`#section-${item} .section-item`, 'active');
        addClass(elementId, 'active');
        sendChromeMessage({ action: 'APPLY_STYLES', presetStyles });
      });
      document.getElementById(`section-${item}`).appendChild(tag);
    });
  });

  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});
