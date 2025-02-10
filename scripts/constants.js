const SETTINGS_SECTIONS = ['boxType', 'fontSize', 'fontFamily', 'color'];
const SETTINGS_OPTIONS = {
  fontFamily: [
    { presetStyles: { fontFamily: 'Merriweather' } },
    { presetStyles: { fontFamily: 'Roboto' } },
    { presetStyles: { fontFamily: 'Carter One' } },
    { presetStyles: { fontFamily: 'Funnel Display' } },
    { presetStyles: { fontFamily: 'Rokkitt' } },
    { presetStyles: { fontFamily: 'Montserrat' } },
    { presetStyles: { fontFamily: 'Kanit' } },
    { presetStyles: { fontFamily: 'Sour Gummy' } },
  ],
  color: [
    { presetStyles: { color: '#f7f700' } },
    { presetStyles: { color: '#33FF00' } },
    { presetStyles: { color: '#0eeef9' } },
    { presetStyles: { color: '#f90ef5' } },
    { presetStyles: { color: '#f9ab0e' } },
  ],
  fontSize: [
    { name: 'xs', presetStyles: { fontSize: '30' } },
    { name: 'sm', presetStyles: { fontSize: '50' } },
    { name: 'md', presetStyles: { fontSize: '70' } },
    { name: 'lg', presetStyles: { fontSize: '90' } },
    { name: 'xl', presetStyles: { fontSize: '110' } },
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
  fontFamily: 'Funnel Display',
  fontWeight: '900',
  backgroundColor: '#000000',
  color: '#33FF00',
  fontSize: '90',
  boxType: 'Gradient-Box',
};
