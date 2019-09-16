"use strict";

require("core-js/modules/es.array.concat");

exports.__esModule = true;
exports.default = getSvgResizer;

/**
 * getSvgResizer is a higher-order function that returns a function to resize SVG.
 *
 * @param {HTMLElement} svg <svg> element
 */
function getSvgResizer(svg) {
  var lastTotalWidth;
  var lastTotalHeight;
  return function (totalWidth, totalHeight) {
    if (totalWidth !== lastTotalWidth || totalHeight !== lastTotalHeight) {
      svg.setAttribute('viewBox', "0 0 ".concat(totalWidth, " ").concat(totalHeight));

      if (totalWidth !== lastTotalWidth) {
        svg.style.width = "".concat(totalWidth, "px");
        svg.setAttribute('width', totalWidth);
        lastTotalWidth = totalWidth;
      }

      if (totalHeight !== lastTotalHeight) {
        svg.style.height = "".concat(totalHeight, "px");
        svg.setAttribute('height', totalHeight);
        lastTotalHeight = totalHeight;
      }
    }
  };
}