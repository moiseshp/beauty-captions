document.addEventListener('DOMContentLoaded', () => {
  const textColor = document.getElementById('textColor');
  const textSize = document.getElementById('textSize');
  const bgColor = document.getElementById('bgColor');
  const saveButton = document.getElementById('save');

  const toggleSubs = document.getElementById('toggleSubs');

  // Cargar configuraciones previas
  chrome.storage.sync.get(
    ['textColor', 'textSize', 'bgColor', 'subtitlesEnabled'],
    (data) => {
      if (data.textColor) textColor.value = data.textColor;
      if (data.textSize) textSize.value = data.textSize;
      if (data.bgColor) bgColor.value = data.bgColor;

      toggleSubs.checked = data.subtitlesEnabled || false;
    },
  );

  toggleSubs.addEventListener('change', () => {
    const enabled = toggleSubs.checked;
    chrome.storage.sync.set({ subtitlesEnabled: enabled });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: toggleYouTubeSubtitles,
          args: [enabled],
        });
      }
    });
  });

  // Guardar configuraciones
  saveButton.addEventListener('click', () => {
    chrome.storage.sync.set({
      textColor: textColor.value,
      textSize: textSize.value,
      bgColor: bgColor.value,
    });

    // Enviar mensaje a content.js para aplicar cambios en tiempo real
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        textColor: textColor.value,
        textSize: textSize.value,
        bgColor: bgColor.value,
      });
    });
  });
});
