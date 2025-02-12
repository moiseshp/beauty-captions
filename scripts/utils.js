function saveToStorage(data = {}, handleStorage = () => {}) {
  chrome.storage.local.set(data, handleStorage);
}

function getFromStorage(data = [], handleResult = () => {}) {
  chrome.storage.local.get(data, handleResult);
}

function resetStorage() {
  chrome.storage.local.clear();
}
