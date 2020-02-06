function jsonToSCSS(stringdata = ``, data = {}) {
  /* JSON.parse can throw. Always be ready for that. */
  try {
    data = JSON.parse(stringdata);
  } catch (e) {
    console.warn(e);
    return ``;
  }

  return Object.keys(data)
    .map(key => `${key}: ${data[key]};`)
    .join("\n");
}

function writeScss(scss) {
  let text = `/* Material Color Tool SCSS Variables */
  ${scss}

  /* Font utilities*/
  $font-size: 0.625rem; // for 1rem = 16px, 0.1rem = 1px
  $font-family: 'Roboto', sans-serif;

  /* Spacing utilities*/ 
  $spacing-xs: 4px;
  $spacing-s: 8px;
  $spacing-m: 16px;
  $spacing-ml: 24px;
  $spacing-l: 32px;
  $spacing-xl: 48px;
  $spacing-xxl: 64px;
  $spacing-xxxl: 128px;


  /* Common Mixins */ 
  @mixin flexCenter($direction){
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: $direction;
  }`;

  return text;
}

module.exports = { jsonToSCSS, writeScss };
