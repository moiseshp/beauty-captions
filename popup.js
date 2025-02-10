document.addEventListener('DOMContentLoaded', () => {
  const {
    main,
    alertSubtitles,
    alertExtension,
    labelToggleExtensionCheckbox,
    toggleExtensionCheckbox,
  } = getDOMElements();

  initPopupSettings(toggleExtensionCheckbox);

  sendMessageToActiveTab({ action: 'CHECK_SUBTITLES' }, (response) => {
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
    saveToStorage({ alertExtension: Boolean(toggleExtensionCheckbox.checked) });

    if (toggleExtensionCheckbox.checked) {
      alertExtension.classList.add('hidden');
      main.classList.remove('hidden');

      sendMessageToActiveTab({ action: 'APPLY_STYLES' }, () => {
        initPopupSettings(toggleExtensionCheckbox);
      });
    } else {
      alertExtension.classList.remove('hidden');
      main.classList.add('hidden');

      sendMessageToActiveTab({ action: 'REMOVE_STYLES' });
    }
  });

  SETTINGS_SECTIONS.forEach((item) => {
    SETTINGS_OPTIONS[item].forEach(({ name = '', presetStyles }) => {
      const tag = document.createElement('div');
      tag.className = 'section-item';
      tag.innerHTML = name || presetStyles[item].replaceAll('-', ' ');
      const elementId = generateSectionItemId(item, presetStyles);
      tag.id = elementId;
      tag.addEventListener('click', () => {
        removeClassFromAll(`#section-${item} .section-item`, 'active');
        addClassToElement(elementId, 'active');
        sendMessageToActiveTab({ action: 'APPLY_STYLES', presetStyles });
      });
      document.getElementById(`section-${item}`).appendChild(tag);
    });
  });

  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});
