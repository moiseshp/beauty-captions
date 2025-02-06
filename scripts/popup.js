document.addEventListener('DOMContentLoaded', () => {
  /**
   * LIST ALL DEFAULT PRESETS
   */
  const presetsContent = document.getElementById('presets-content');
  if (!presetsContent) {
    return;
  }
  DEFAULT_PRESETS.forEach((item) => {
    const picture = document.createElement('picture');
    picture.innerHTML = `<img src="images/screenshots/${item}.png" alt="${item}" />`;

    picture.addEventListener('click', () => replaceText(item));
    presetsContent.appendChild(picture);
  });

  /**
   * SWITCH ON/OFF PRESET
   */
  document.getElementById('button-apply').addEventListener('click', () => {
    console.info('button applied');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'applyStyles' });
    });
  });

  /**
   * SHOW ALERT MESSAGE WHEN CC IT IS INACTIVE
   */
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      // { action: 'CHECK_SUBTITLES' },
      { action: 'checkSubtitles' },
      (response) => {
        if (response?.active) {
          document.getElementById('cc-status').classList.add('hidden');
        } else {
          document.getElementById('cc-status').classList.remove('hidden');
        }
      },
    );
  });

  /**
   * SHOW CURRENT YEAR
   */
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});
