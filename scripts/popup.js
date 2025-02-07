document.addEventListener('DOMContentLoaded', () => {
  const subtitleStatus = document.getElementById('subtitle-status');
  const extensionStatus = document.getElementById('extension-status');
  const mainContainer = document.getElementById('main-container');
  const switchExtensionStatus = document.getElementById(
    'extension-status-container',
  );
  const checkboxExtensionStatus = document.getElementById(
    'checkbox-extension-status',
  );

  chrome.storage.local.get(['stylesPreset', 'extensionStatus'], (result) => {
    checkboxExtensionStatus.checked = Boolean(result.extensionStatus);
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'CHECK_SUBTITLES' },
      (response) => {
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
      },
    );
  });

  checkboxExtensionStatus.addEventListener('change', () => {
    storeExtensionStatus(checkboxExtensionStatus.checked);

    if (checkboxExtensionStatus.checked) {
      extensionStatus.classList.add('hidden');
      mainContainer.classList.remove('hidden');

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'APPLY_STYLES',
          stylesPreset: DEFAULT_STYLES_PRESET,
        });
      });
    } else {
      extensionStatus.classList.remove('hidden');
      mainContainer.classList.add('hidden');
    }
  });

  renderUserTool({
    elementId: 'section-boxtype',
    items: BOX_TYPES,
    handleEvent: (item) => {
      console.info('renderUserTool: ', { item });
    },
  });

  renderUserTool({
    elementId: 'section-fontfamily',
    items: FONT_FAMILIES,
    handleEvent: (item) => {
      console.info('renderUserTool: ', { item });
    },
  });

  renderUserTool({
    elementId: 'section-color',
    items: COLORS,
    handleEvent: (item) => {
      console.info('renderUserTool: ', { item });
    },
  });

  renderUserTool({
    elementId: 'section-fontsize',
    items: FONT_SIZES,
    handleEvent: (item) => {
      console.info('renderUserTool: ', { item });
    },
  });

  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});
