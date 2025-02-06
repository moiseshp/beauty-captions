const DEFAULT_PRESETS = ['cc-01', 'cc-02'];

function replaceText(text) {
  const customizeContent = document.getElementById('customize-content');
  if (customizeContent) {
    customizeContent.innerHTML = text;
  } else {
    console.error("Elemento 'customize-content' no encontrado.");
  }
}
