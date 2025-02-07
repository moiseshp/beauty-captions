const BOXES = ['box-1', 'box-2', 'box-3'];
const FONT_FAMILIES = ['Merriweather', 'Carter One'];
const COLORS = ['#000000', '#33FF00'];
const FONT_SIZES = [30, 50, 80];

function replaceText(text) {
  const customizeContent = document.getElementById('aside-content');
  if (customizeContent) {
    customizeContent.innerHTML = text;
  } else {
    console.error("Elemento 'aside-content' no encontrado.");
  }
}
