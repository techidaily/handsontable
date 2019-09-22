"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = getSvgPathsRenderer;
exports.precalculateStylesAndCommands = precalculateStylesAndCommands;
exports.adjustLinesToViewBox = adjustLinesToViewBox;
exports.convertLinesToCommand = convertLinesToCommand;

var _optimizePath = _interopRequireDefault(require("./optimizePath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * getSvgPathsRenderer is a higher-order function that returns a function to render paths.
 *
 * `styles` is an array of stroke style strings, e.g.:
 * [
 *   '1px black',
 *   '2px #FF0000'
 * ]
 *
 * `commands` is an array of path commands strings for each style, e.g.:
 * [
 *   'M 0 0 L 0 10',
 *   'M 50 0 L 50 20'
 * ]
 *
 * Assumptions:
 *  - the length of `styles` and `commands` must be the same
 *
 * @param {HTMLElement} svg <svg> or <g> element
 * @returns {Function}
 */
function getSvgPathsRenderer(svg) {
  svg.setAttribute('fill', 'none');
  /**
   * Map of states for each <path> element, where the key is `style` and the value is the state object
   *
   * @type {Map.<string, Object>}
   */

  var states = new Map();
  return function (styles, commands) {
    states.forEach(resetState);

    for (var ii = 0; ii < styles.length; ii++) {
      // http://jsbench.github.io/#fb2e17228039ba5bfdf4d1744395f352
      var state = getStateForStyle(states, styles[ii], svg);
      state.command = commands[ii];
    }

    states.forEach(renderState);
  };
}
/**
 * For a given `style` string returns a relevant array from the `stylesAndLines` map.
 * Sets a new array in `stylesAndLines` if an existing one is not found.
 *
 * @param {Map.<string, Array.<Array.<number>>>} stylesAndLines Map where keys are the `style` strings and values are lines in format `[[x1, y1, x2, y2, ...], ...]`
 * @param {String} style Stroke style description, e.g. `1px black`
 * @returns {Array.<Array.<number>>} Lines in format `[[x1, y1, x2, y2, ...], ...]`
 */


function getLines(stylesAndLines, style) {
  var lines = stylesAndLines.get(style);

  if (lines) {
    return lines;
  }

  var newLines = [];
  stylesAndLines.set(style, newLines);
  return newLines;
}
/**
 * For a given configuration object (as described in Handsontable `CustomBorders` plugin) returns a relevant `stylesAndLines` map.
 *
 * @param {Array.<Object>} rawData Configuration object
 * @param {Number} totalWidth Desired total width of SVG
 * @param {Number} totalHeight Desired total height of SVG
 * @returns {Map.<string, Array.<Array.<string>>>} Map where keys are the `style` strings and values are SVG Path commands in format `['M x1 y1 x2 y2 ... Z', ...]`
 */


function precalculateStylesAndCommands(rawData, totalWidth, totalHeight) {
  var stylesAndLines = new Map();
  var stylesAndCommands = new Map();

  for (var ii = 0; ii < rawData.length; ii++) {
    var _rawData$ii = rawData[ii],
        x1 = _rawData$ii.x1,
        y1 = _rawData$ii.y1,
        x2 = _rawData$ii.x2,
        y2 = _rawData$ii.y2,
        topStyle = _rawData$ii.topStyle,
        rightStyle = _rawData$ii.rightStyle,
        bottomStyle = _rawData$ii.bottomStyle,
        leftStyle = _rawData$ii.leftStyle;

    if (topStyle) {
      var lines = getLines(stylesAndLines, topStyle);
      lines.push([x1, y1, x2, y1]);
    }

    if (rightStyle) {
      var _lines = getLines(stylesAndLines, rightStyle);

      _lines.push([x2, y1, x2, y2]);
    }

    if (bottomStyle) {
      var _lines2 = getLines(stylesAndLines, bottomStyle);

      _lines2.push([x1, y2, x2, y2]);
    }

    if (leftStyle) {
      var _lines3 = getLines(stylesAndLines, leftStyle);

      _lines3.push([x1, y1, x1, y2]);
    }
  }

  var styles = _toConsumableArray(stylesAndLines.keys());

  styles.forEach(function (style) {
    var lines = stylesAndLines.get(style);
    var strokeWidth = parseInt(style, 10);
    var adjustedLines = adjustLinesToViewBox(strokeWidth, lines, totalWidth, totalHeight);
    var optimizedLines = (0, _optimizePath.default)(adjustedLines);
    var command = convertLinesToCommand(optimizedLines);
    stylesAndCommands.set(style, command);
  });
  return stylesAndCommands;
}
/**
 * Prepares the state object for the next rendering
 *
 * @param {Object} state
 */


function resetState(state) {
  state.command = '';
}
/**
 * Renders the <path> element in the state object to DOM and memoizes the current path
 *
 * @param {Object} state
 */


function renderState(state) {
  if (state.renderedCommand !== state.command) {
    state.elem.setAttribute('d', state.command);
    state.renderedCommand = state.command;
  }
}
/**
 * Returns a state object for given style. Creates the state object if requested for the first time.
 *
 * @param {Map.<string, Object>} states
 * @param {String} style Stroke style description, e.g. `1px black`
 * @param {HTMLElement} parent <svg> or <g> HTML element where the <path> elements should be appended
 */


function getStateForStyle(states, style, parent) {
  var state = states.get(style);

  if (!state) {
    var elem = parent.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'path');

    var _style$split = style.split(' '),
        _style$split2 = _slicedToArray(_style$split, 2),
        size = _style$split2[0],
        color = _style$split2[1];

    elem.setAttribute('stroke', color);
    elem.setAttribute('stroke-width', size);
    elem.setAttribute('stroke-linecap', 'square'); // elem.setAttribute('shape-rendering', 'optimizeSpeed');

    elem.setAttribute('shape-rendering', 'geometricPrecision'); // TODO why the border renders wrong when this is on
    // elem.setAttribute('shape-rendering', 'crispEdges');

    state = {
      elem: elem,
      command: '',
      renderedCommand: ''
    };
    resetState(state);
    parent.appendChild(elem);
    states.set(style, state);
  }

  return state;
}
/**
 * Adjusts the pixel coordinate to make sure that the rendered stroke (including its with) is fully rendered within the total size of the SVG image
 *
 * @param {Number} pos Pixel coordinate
 * @param {Number} totalSize Total size of the SVG image in the relevant direction
 * @param {Number} halfStrokeWidth The size in pixels by which we are adjusting
 * @returns {Number} New pixel coordinate
 */


function keepLineWithinViewBox(pos, totalSize, halfStrokeWidth) {
  if (pos - halfStrokeWidth < 0) {
    pos += Math.ceil(halfStrokeWidth - pos);
  }

  if (pos + halfStrokeWidth > totalSize) {
    pos -= Math.ceil(pos + halfStrokeWidth - totalSize);
  }

  return pos;
}
/**
 * Adjusts all line coordinates to fit within the SVG image
 *
 * `lines` is an array of `x1`, `y1`, `x2`, `y2` quadruplets, e.g.:
 * [
 *   [0, 0, 10, 10, 0, 0, 10, 0, 20, 20, 50, 50],
 *   [5, 5, 55, 5]
 * ]
 *
 * Assumptions:
 *  - `(x1 >= 0 || x2 >= 0) && (y1 >= 0 || y2 >= 0)`
 *  - `x1 <= x2 && y1 <= y2`
 *  - `x1 === x2 || y1 === y2`
 *
 * @param {Number} strokeWidth The width of the stroke in pixels
 * @param {Array.<Array.<number>>>} lines SVG Path data in format `[[x1, y1, x2, y2], ...]`
 * @param {Number} totalWidth Total width of the SVG image where the lines need to fit
 * @param {Number} totalHeight Total height of the SVG image where the lines need to fit
 */


function adjustLinesToViewBox(strokeWidth, lines, totalWidth, totalHeight) {
  var newLines = new Array(lines.length);
  var halfStrokeWidth = strokeWidth / 2;
  var needSubPixelCorrection = strokeWidth % 2 !== 0; // disable antialiasing

  for (var ii = 0; ii < lines.length; ii++) {
    var _lines$ii = _slicedToArray(lines[ii], 4),
        x1 = _lines$ii[0],
        y1 = _lines$ii[1],
        x2 = _lines$ii[2],
        y2 = _lines$ii[3];

    if (needSubPixelCorrection) {
      y1 += 0.5;
      y2 += 0.5;
      x1 += 0.5;
      x2 += 0.5;
    }

    x1 = keepLineWithinViewBox(x1, totalWidth, halfStrokeWidth);
    y1 = keepLineWithinViewBox(y1, totalHeight, halfStrokeWidth);
    x2 = keepLineWithinViewBox(x2, totalWidth, halfStrokeWidth);
    y2 = keepLineWithinViewBox(y2, totalHeight, halfStrokeWidth);
    newLines[ii] = [x1, y1, x2, y2];
  }

  return newLines;
}
/**
 * Convert array of positions to a SVG Path command string
 *
 * @param {Array.<Array.<number>>>} lines SVG Path data in format `[[x1, y1, x2, y2, ...], ...]`
 * @returns {String}
 */


function convertLinesToCommand(lines) {
  var command = '';
  var firstX = -1;
  var firstY = -1;
  var lastX = -1;
  var lastY = -1;

  for (var ii = 0; ii < lines.length; ii++) {
    var line = lines[ii];

    if (ii === 0) {
      firstX = line[0];
      firstY = line[1];
    }

    var len = line.length;
    lastX = line[len - 2];
    lastY = line[len - 1];
    command += "M ".concat(line.join(' '), " ");
  }

  var isLastPointDifferentThanFirst = firstX !== lastX || firstY !== lastY;

  if (isLastPointDifferentThanFirst) {
    command += "M ".concat(firstX, " ").concat(firstY, " Z");
  } else {
    command += 'Z';
  }

  return command;
}