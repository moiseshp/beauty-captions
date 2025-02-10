loadStoredStyles();

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === 'CHECK_SUBTITLES') {
    sendResponse({ active: isSubtitlesActive() });
  }

  if (message.action === 'APPLY_STYLES') {
    clearInjectedStyles();
    loadStoredStyles(message.presetStyles);
  }

  if (message.action === 'REMOVE_STYLES') {
    resetStorage();
    clearInjectedStyles();
  }
});
