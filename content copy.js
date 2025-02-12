loadStoredStyles();

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === 'CHECK_SUBTITLES') {
    sendResponse({ active: isSubtitlesActive() });
    return true;
  }

  if (message.action === 'APPLY_STYLES') {
    clearInjectedStyles();
    loadStoredStyles(message.presetStyles);
    sendResponse({ success: true });
    return false;
  }

  if (message.action === 'REMOVE_STYLES') {
    resetStorage();
    clearInjectedStyles();
    sendResponse({ success: true });
    return false;
  }
  return false;
});
