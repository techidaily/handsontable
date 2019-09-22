"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _element = require("./../../../../helpers/dom/element");

var _pathsRenderer = _interopRequireWildcard(require("./svg/pathsRenderer"));

var _resizer = _interopRequireDefault(require("./svg/resizer"));

var _optimizePath = _interopRequireDefault(require("./svg/optimizePath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var offsetToOverLapPrecedingBorder = -1;
var insetPositioningForCurrentCellHighlight = 1;
/**
 * Manages rendering of cell borders using SVG. Creates a single instance of SVG for each `Table`
 */

var BorderRenderer =
/*#__PURE__*/
function () {
  function BorderRenderer(parentElement) {
    _classCallCheck(this, BorderRenderer);

    /**
     * The SVG container element, where all SVG groups are rendered
     *
     * @type {HTMLElement}
     */
    this.svg = this.createSvgContainer(parentElement);
    /**
     * The function used to resize the SVG container when needed
     *
     * @type {Function}
     */

    this.svgResizer = (0, _resizer.default)(this.svg);
    /**
     * Array that holds pathGroup metadata objects keyed by the layer number
     *
     * @type {Array.<Object>}
     */

    this.pathGroups = [];
    /**
     * Desired width for the SVG container
     *
     * @type {Number}
     */

    this.maxWidth = 0;
    /**
     * Desired height for the SVG container
     *
     * @type {Number}
     */

    this.maxHeight = 0;
    /**
     * Context for getComputedStyle
     *
     * @type {Object}
     */

    this.rootWindow = parentElement.ownerDocument.defaultView;
  }
  /**
   * Creates and configures the SVG container element, where all SVG paths are rendered
   *
   * @param {HTMLElement} parentElement
   * @returns {HTMLElement}
   */


  _createClass(BorderRenderer, [{
    key: "createSvgContainer",
    value: function createSvgContainer(parentElement) {
      var svg = parentElement.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.width = '0';
      svg.style.height = '0';
      svg.style.position = 'absolute';
      svg.style.zIndex = '5';
      svg.setAttribute('pointer-events', 'none');
      parentElement.appendChild(svg);
      return svg;
    }
    /**
     * Returns pathGroup metadata object for a given index.
     * Works recursively to fill gaps in indices starting from 0, e.g.
     * you request index 1 while 0 does not exist, it will create 0 and 1
     *
     * @param {Number} index Number that corresonds to a visual layer (0 is the bottom layer)
     * @returns {Object} pathGroup metadata object
     */

  }, {
    key: "ensurePathGroup",
    value: function ensurePathGroup(index) {
      var found = this.pathGroups[index];

      if (!found) {
        if (this.pathGroups.length < index) {
          this.ensurePathGroup(index - 1); // ensure there are no gaps
        }

        var pathGroup = {
          svgPathsRenderer: this.getSvgPathsRendererForGroup(this.svg),
          stylesAndLines: new Map(),
          styles: [],
          commands: []
        };
        this.pathGroups[index] = pathGroup;
        return pathGroup;
      }

      return found;
    }
    /**
     * Draws the paths according to configuration passed in `argArrays`
     *
     * @param {HTMLElement} table
     * @param {Array.<Array.<*>>} argArrays
     */

  }, {
    key: "render",
    value: function render(table, argArrays) {
      var _this = this;

      this.containerOffset = (0, _element.offset)(table);
      this.maxWidth = 0;
      this.maxHeight = 0; // batch all calculations

      this.pathGroups.forEach(function (pathGroup) {
        return pathGroup.stylesAndLines.clear();
      });
      argArrays.forEach(function (argArray) {
        return _this.convertArgsToLines.apply(_this, _toConsumableArray(argArray));
      });
      this.pathGroups.forEach(function (pathGroup) {
        return _this.convertLinesToCommands(pathGroup);
      }); // batch all DOM writes

      this.svgResizer(this.maxWidth, this.maxHeight);
      this.pathGroups.forEach(function (pathGroup) {
        return pathGroup.svgPathsRenderer(pathGroup.styles, pathGroup.commands);
      });
    }
    /**
     * Returns the sum of values at a specified inner index in a 2D array
     *
     * @param {Array.<Array.<number>>} arr Array of subarrays
     * @param {Number} index Index in subarray
     * @returns {Number} Sum
     */

  }, {
    key: "sumArrayElementAtIndex",
    value: function sumArrayElementAtIndex(arr, index) {
      return arr.reduce(function (accumulator, subarr) {
        return Math.max(accumulator, subarr[index]);
      }, 0);
    }
    /**
     * Serializes `stylesAndLines` map into into a 1D array of SVG path commands (`commands`) within a pathGroup
     * Sets `this.maxWidth` and `this.maxHeight` to the highest observed value.
     *
     * @param {Object} pathGroup pathGroup metadata object
     */

  }, {
    key: "convertLinesToCommands",
    value: function convertLinesToCommands(pathGroup) {
      var _this2 = this;

      var stylesAndLines = pathGroup.stylesAndLines,
          styles = pathGroup.styles,
          commands = pathGroup.commands;
      commands.length = 0;
      styles.length = 0;
      styles.push.apply(styles, _toConsumableArray(stylesAndLines.keys()));
      styles.forEach(function (style) {
        var lines = stylesAndLines.get(style);
        var width = parseInt(style, 10);
        var adjustedLines = (0, _pathsRenderer.adjustLinesToViewBox)(width, lines, Infinity, Infinity);
        var optimizedLines = (0, _optimizePath.default)(adjustedLines);
        var optimizedCommand = (0, _pathsRenderer.convertLinesToCommand)(optimizedLines);
        commands.push(optimizedCommand);
        var marginForBoldStroke = Math.ceil(width / 2); // needed to make sure that the SVG width is enough to render bold strokes

        var currentMaxWidth = _this2.sumArrayElementAtIndex(lines, 2) + marginForBoldStroke;
        var currentMaxHeight = _this2.sumArrayElementAtIndex(lines, 3) + marginForBoldStroke;

        if (currentMaxWidth > _this2.maxWidth) {
          _this2.maxWidth = currentMaxWidth;
        }

        if (currentMaxHeight > _this2.maxHeight) {
          _this2.maxHeight = currentMaxHeight;
        }
      });
    }
    /**
     * Creates and configures the SVG group element, where all SVG paths are rendered
     *
     * @param {HTMLElement} svg SVG container element
     * @returns {HTMLElement}
     */

  }, {
    key: "getSvgPathsRendererForGroup",
    value: function getSvgPathsRendererForGroup(svg) {
      var group = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'g');
      svg.appendChild(group);
      return (0, _pathsRenderer.default)(group);
    }
    /**
     * Returns a number that represents the visual layer on which a border should be rendered.
     * Used to render custom borders on a lower layer than built-in borders (fill, area, current).
     * Higher numbers render above lower numbers.
     *
     * @param {Object} selectionSetting Settings provided in the same format as used by `Selection.setting`
     * @returns {Number}
     */

  }, {
    key: "getLayerNumber",
    value: function getLayerNumber(selectionSetting) {
      switch (selectionSetting.className) {
        case 'current':
          return 3;

        case 'area':
          return 2;

        case 'fill':
          return 1;

        default:
          return 0;
      }
    }
    /**
     * Generates lines in format `[[x1, y1, x2, y2], ...]` based on input given as arguments, and stores them in `pathGroup.stylesAndLines`
     *
     * @param {Object} selectionSetting Settings provided in the same format as used by `Selection.setting`
     * @param {HTMLElement} firstTd TD element that corresponds of the top-left corner of the line that we are drawing
     * @param {HTMLElement} lastTd TD element that corresponds of the bottom-right corner of the line that we are drawing
     * @param {Boolean} hasTopEdge TRUE if the range between `firstTd` and `lastTd` contains the top line, FALSE otherwise
     * @param {Boolean} hasRightEdge TRUE if the range between `firstTd` and `lastTd` contains the right line, FALSE otherwise
     * @param {Boolean} hasBottomEdge TRUE if the range between `firstTd` and `lastTd` contains bottom top line, FALSE otherwise
     * @param {Boolean} hasLeftEdge TRUE if the range between `firstTd` and `lastTd` contains left top line, FALSE otherwise
     */

  }, {
    key: "convertArgsToLines",
    value: function convertArgsToLines(selectionSetting, firstTd, lastTd, hasTopEdge, hasRightEdge, hasBottomEdge, hasLeftEdge) {
      var layerNumber = this.getLayerNumber(selectionSetting);
      var stylesAndLines = this.ensurePathGroup(layerNumber).stylesAndLines;
      var firstTdOffset = (0, _element.offset)(firstTd);
      var lastTdOffset = firstTd === lastTd ? firstTdOffset : (0, _element.offset)(lastTd);
      var lastTdWidth = (0, _element.outerWidth)(lastTd);
      var lastTdHeight = (0, _element.outerHeight)(lastTd);
      var style = (0, _element.getComputedStyle)(firstTd, this.rootWindow);
      var x1 = firstTdOffset.left;
      var y1 = firstTdOffset.top;
      var x2 = lastTdOffset.left + lastTdWidth;
      var y2 = lastTdOffset.top + lastTdHeight;

      if (parseInt(style.borderLeftWidth, 10) > 0) {
        x1 += 1;
      }

      if (parseInt(style.borderTopWidth, 10) > 0) {
        y1 += 1;
      }

      x1 += offsetToOverLapPrecedingBorder - this.containerOffset.left;
      y1 += offsetToOverLapPrecedingBorder - this.containerOffset.top;
      x2 += offsetToOverLapPrecedingBorder - this.containerOffset.left;
      y2 += offsetToOverLapPrecedingBorder - this.containerOffset.top;

      if (selectionSetting.className === 'current') {
        x1 += insetPositioningForCurrentCellHighlight;
        y1 += insetPositioningForCurrentCellHighlight;
      }

      if (x1 < 0 && x2 < 0 || y1 < 0 && y2 < 0) {
        // nothing to draw, everything is at a negative index
        return;
      }

      if (hasTopEdge && this.hasLineAtEdge(selectionSetting, 'top')) {
        var lines = this.getLines(stylesAndLines, selectionSetting, 'top');
        lines.push([x1, y1, x2, y1]);
      }

      if (hasRightEdge && this.hasLineAtEdge(selectionSetting, 'right')) {
        var _lines = this.getLines(stylesAndLines, selectionSetting, 'right');

        _lines.push([x2, y1, x2, y2]);
      }

      if (hasBottomEdge && this.hasLineAtEdge(selectionSetting, 'bottom')) {
        var _lines2 = this.getLines(stylesAndLines, selectionSetting, 'bottom');

        _lines2.push([x1, y2, x2, y2]);
      }

      if (hasLeftEdge && this.hasLineAtEdge(selectionSetting, 'left')) {
        var _lines3 = this.getLines(stylesAndLines, selectionSetting, 'left');

        _lines3.push([x1, y1, x1, y2]);
      }
    }
    /**
     * Checks in the selection configuration to see if a particular edge is set to be rendered and
     * returns TRUE if yes, FALSE otherwise.
     *
     * @param {Object} selectionSetting Settings provided in the same format as used by `Selection.setting`
     * @param {String} edge Possible falues: 'top', 'right', 'bottom', 'left'
     * @returns {Boolean}
     */

  }, {
    key: "hasLineAtEdge",
    value: function hasLineAtEdge(selectionSetting, edge) {
      return !(selectionSetting[edge] && selectionSetting[edge].hide);
    }
    /**
     * For a given `selectionSetting` and `edge`, returns a relevant array from the `stylesAndLines` map.
     * Sets a new array in `stylesAndLines` if an existing one is not found.
     *
     * @param {Map.<string, Array.<Array.<number>>>} stylesAndLines Map where keys are the `style` strings and values are lines in format `[[x1, y1, x2, y2, ...], ...]`
     * @param {Object} selectionSetting Settings provided in the same format as used by `Selection.setting`
     * @param {String} edge Possible falues: 'top', 'right', 'bottom', 'left'
     * @returns {Array.<Array.<number>>} Lines in format `[[x1, y1, x2, y2, ...], ...]`
     */

  }, {
    key: "getLines",
    value: function getLines(stylesAndLines, selectionSetting, edge) {
      var width = 1;

      if (selectionSetting[edge] && selectionSetting[edge].width !== undefined) {
        width = selectionSetting[edge].width;
      } else if (selectionSetting.border && selectionSetting.border.width !== undefined) {
        width = selectionSetting.border.width;
      }

      var color = selectionSetting[edge] && selectionSetting[edge].color || selectionSetting.border && selectionSetting.border.color || 'black';
      var stroke = "".concat(width, "px ").concat(color);
      var lines = stylesAndLines.get(stroke);

      if (lines) {
        return lines;
      }

      var newLines = [];
      stylesAndLines.set(stroke, newLines);
      return newLines;
    }
  }]);

  return BorderRenderer;
}();

exports.default = BorderRenderer;