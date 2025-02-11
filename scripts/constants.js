const SETTINGS_SECTIONS = ['boxType', 'fontSize', 'fontFamily', 'color'];
const SETTINGS_OPTIONS = {
  fontFamily: [
    { presetStyles: { fontFamily: 'Kanit', fontWeight: 800 } },
    { presetStyles: { fontFamily: 'Montserrat', fontWeight: 800 } },
    { presetStyles: { fontFamily: 'Merriweather', fontWeight: 900 } },
    { presetStyles: { fontFamily: 'Funnel Display', fontWeight: 800 } },
    { presetStyles: { fontFamily: 'Kavoon', fontWeight: 400 } },
    { presetStyles: { fontFamily: 'Agbalumo', fontWeight: 400 } },
    { presetStyles: { fontFamily: 'Carter One', fontWeight: 400 } },
    { presetStyles: { fontFamily: 'Sour Gummy', fontWeight: 900 } },
  ],
  color: [
    { name: 'White', presetStyles: { color: '#FFFFFF' } },
    { name: 'Yellow', presetStyles: { color: '#f7f700' } },
    { name: 'Green', presetStyles: { color: '#33FF00' } },
    { name: 'Cyan', presetStyles: { color: '#0eeef9' } },
    { name: 'Violet', presetStyles: { color: '#f90ef5' } },
    { name: 'Orange', presetStyles: { color: '#f9ab0e' } },
  ],
  fontSize: [
    { name: 'xs', presetStyles: { fontSize: '40' } },
    { name: 'sm', presetStyles: { fontSize: '50' } },
    { name: 'md', presetStyles: { fontSize: '65' } },
    { name: 'lg', presetStyles: { fontSize: '80' } },
    { name: 'xl', presetStyles: { fontSize: '100' } },
  ],
  boxType: [
    { presetStyles: { boxType: 'Gradient-Box' } },
    { presetStyles: { boxType: 'Block-Style' } },
    { presetStyles: { boxType: 'Text-Only' } },
  ],
};
const EXTENSION_STYLE_TAG = 'extension-style-tag';
const FONT_LINK_TAG = 'font-link-tag';
const DEFAULT_PRESET_STYLES = {
  fontFamily: 'Montserrat',
  fontWeight: '800',
  color: '#FFFFFF',
  fontSize: '65',
  boxType: 'Gradient-Box',
};
