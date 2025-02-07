document.addEventListener('DOMContentLoaded', () => {
  const subtitleStatus = document.getElementById('subtitle-status');
  const extensionStatus = document.getElementById('extension-status');
  const mainContainer = document.getElementById('main-container');
  const switchExtensionStatus = document.getElementById(
    'switch-extension-status',
  );

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'CHECK_SUBTITLES' },
      (response) => {
        if (response?.active) {
          subtitleStatus.classList.add('hidden');
          mainContainer.classList.remove('hidden');
        } else {
          subtitleStatus.classList.remove('hidden');
          extensionStatus.classList.add('hidden');
          mainContainer.classList.add('hidden');
          switchExtensionStatus.classList.add('hidden');
        }
      },
    );
  });

  const checkboxExtensionStatus = document.getElementById(
    'switch-extension-status',
  );
  checkboxExtensionStatus.addEventListener('change', () => {
    console.info(checkboxExtensionStatus.checked ? 'ON' : 'OFF');
  });

  // const buttonApply = document.getElementById('button-apply');

  // buttonApply.addEventListener('click', () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     chrome.tabs.sendMessage(tabs[0].id, { action: 'APPLY_STYLES' });
  //   });
  // });

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
