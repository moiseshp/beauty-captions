document.addEventListener('DOMContentLoaded', () => {
  const sectionBox = document.getElementById('section-box');
  const sectionFontFamily = document.getElementById('section-fontfamily');
  const sectionColor = document.getElementById('section-color');
  const sectionFontSize = document.getElementById('section-fontsize');

  BOXES.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = `<div>${item}</div>`;

    div.addEventListener('click', () => {
      console.info(item);
    });
    sectionBox.appendChild(div);
  });

  FONT_FAMILIES.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = `<div>${item}</div>`;

    div.addEventListener('click', () => {
      console.info(item);
    });
    sectionFontFamily.appendChild(div);
  });

  COLORS.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = `<div>${item}</div>`;

    div.addEventListener('click', () => {
      console.info(item);
    });
    sectionColor.appendChild(div);
  });

  FONT_SIZES.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = `<div>${item}</div>`;

    div.addEventListener('click', () => {
      console.info(item);
    });
    sectionFontSize.appendChild(div);
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
