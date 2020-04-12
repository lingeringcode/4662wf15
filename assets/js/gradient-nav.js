var items = [].slice.call(document.querySelectorAll('.item'));

function createStyle(styleText) {
  var style = document.createElement('style');
  style.type = 'text/css';

  // <style> element must be appended into DOM before setting `cssText`
  // otherwise IE8 will interpret the text in IE7 mode.
  document.body.appendChild(style);
  if (style.styleSheet) {
    style.styleSheet.cssText = styleText;
  } else {
    style.appendChild(document.createTextNode(styleText));
  }

  return style;
}

var gradientTpl = [
  '.item:nth-child(${n}):hover {',
    'background-image: -webkit-linear-gradient(-15deg, transparent 40%, ${end} 100%);',
    'background-image: -moz-linear-gradient(-15deg, transparent 40%, ${end} 100%);',
    'background-image: linear-gradient(105deg, transparent 40%, ${end} 100%);',
    'background-repeat: repeat;',
  '}'
].join('');

var style;
function randomize() {
  var colors = kolor.random({
    size: items.length,
    s: 0.7,
    l: 0.8,
    space: 'rgba'
  });

  var styleText = '';
  items.forEach(function (item, i) {
    item.style.borderColor = colors[i].css();

    if (style) {
      style.parentNode.removeChild(style);
    }

    styleText += gradientTpl.replace(/\$\{n\}/g, i + 1).replace(/\$\{end\}/g, colors[i].a(0.3).css());
    style = createStyle(styleText);
  });
}

setInterval(function () {
  randomize();
}, 3000);

randomize();