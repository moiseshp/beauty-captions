loadExtensionStyles();

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === 'CHECK_SUBTITLES') {
    sendResponse({ active: isSubtitlesActive() });
  }

  if (message.action === 'APPLY_STYLES') {
    removeStyles();
    loadExtensionStyles(message.presetStyles);
  }

  if (message.action === 'REMOVE_STYLES') {
    clearStorage();
    removeStyles();
  }
});
