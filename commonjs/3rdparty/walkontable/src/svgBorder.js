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

var _svgPathsRenderer = _interopRequireWildcard(require("./svg/svgPathsRenderer"));

var _svgResizer = _interopRequireDefault(require("./svg/svgResizer"));

var _svgOptimizePath = _interopRequireDefault(require("./svg/svgOptimizePath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var marginForSafeRenderingOfTheRightBottomEdge = 1;
var offsetToOverLapPrecedingBorder = -1;
var insetPositioningForCurrentCellHighlight = 1;

var SvgBorder =
/*#__PURE__*/
function () {
  function SvgBorder(parentElement) {
    _classCallCheck(this, SvgBorder);

    this.svg = parentElement.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.style.top = '0';
    this.svg.style.left = '0';
    this.svg.style.width = '0';
    this.svg.style.height = '0';
    this.svg.style.position = 'absolute';
    this.svg.style.zIndex = '5';
    this.svg.setAttribute('pointer-events', 'none');
    parentElement.appendChild(this.svg);
    this.svgResizer = (0, _svgResizer.default)(this.svg);
    this.pathGroups = []; // paths are grouped by priority

    this.maxWidth = 0;
    this.maxHeight = 0;
  }

  _createClass(SvgBorder, [{
    key: "ensurePathGroup",
    value: function ensurePathGroup(priority) {
      var found = this.pathGroups[priority];

      if (!found) {
        if (this.pathGroups.length < priority) {
          this.ensurePathGroup(priority - 1); // ensure there are no gaps
        }

        var pathGroup = {
          svgPathsRenderer: this.getSvgPathsRendererForGroup(this.svg),
          stylesAndLines: new Map(),
          styles: [],
          commands: []
        };
        this.pathGroups[priority] = pathGroup;
        return pathGroup;
      }

      return found;
    }
  }, {
    key: "render",
    value: function render(argArrays) {
      var _this = this;

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
     *
     * @param {Array} arr Array of subarrays
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
        var adjustedLines = (0, _svgPathsRenderer.adjustLinesToViewBox)(width, lines, Infinity, Infinity);
        var optimizedCommand = (0, _svgOptimizePath.default)(adjustedLines);
        commands.push(optimizedCommand);
        var currentMaxWidth = _this2.sumArrayElementAtIndex(lines, 2) + marginForSafeRenderingOfTheRightBottomEdge;

        if (currentMaxWidth > _this2.maxWidth) {
          _this2.maxWidth = currentMaxWidth;
        }

        var currentMaxHeight = _this2.sumArrayElementAtIndex(lines, 3) + marginForSafeRenderingOfTheRightBottomEdge;

        if (currentMaxHeight > _this2.maxHeight) {
          _this2.maxHeight = currentMaxHeight;
        }
      });
    }
  }, {
    key: "getSvgPathsRendererForGroup",
    value: function getSvgPathsRendererForGroup(svg) {
      var group = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'g');
      svg.appendChild(group);
      return (0, _svgPathsRenderer.default)(group);
    }
  }, {
    key: "convertArgsToLines",
    value: function convertArgsToLines(rect, borderSetting, priority, hasTopEdge, hasRightEdge, hasBottomEdge, hasLeftEdge) {
      var x1 = rect.x1,
          y1 = rect.y1,
          x2 = rect.x2,
          y2 = rect.y2;
      var stylesAndLines = this.ensurePathGroup(priority).stylesAndLines;
      x1 += offsetToOverLapPrecedingBorder;
      y1 += offsetToOverLapPrecedingBorder;
      x2 += offsetToOverLapPrecedingBorder;
      y2 += offsetToOverLapPrecedingBorder;

      if (borderSetting.className === 'current') {
        x1 += insetPositioningForCurrentCellHighlight;
        y1 += insetPositioningForCurrentCellHighlight;
      }

      if (x1 < 0 && x2 < 0 || y1 < 0 && y2 < 0) {
        // nothing to draw, everything is at a negative index
        return;
      }

      if (hasTopEdge && this.hasLineAtEdge(borderSetting, 'top')) {
        var lines = this.getLines(stylesAndLines, borderSetting, 'top');
        lines.push([x1, y1, x2, y1]);
      }

      if (hasRightEdge && this.hasLineAtEdge(borderSetting, 'right')) {
        var _lines = this.getLines(stylesAndLines, borderSetting, 'right');

        _lines.push([x2, y1, x2, y2]);
      }

      if (hasBottomEdge && this.hasLineAtEdge(borderSetting, 'bottom')) {
        var _lines2 = this.getLines(stylesAndLines, borderSetting, 'bottom');

        _lines2.push([x1, y2, x2, y2]);
      }

      if (hasLeftEdge && this.hasLineAtEdge(borderSetting, 'left')) {
        var _lines3 = this.getLines(stylesAndLines, borderSetting, 'left');

        _lines3.push([x1, y1, x1, y2]);
      }
    }
  }, {
    key: "hasLineAtEdge",
    value: function hasLineAtEdge(borderSetting, edge) {
      return !(borderSetting[edge] && borderSetting[edge].hide);
    }
  }, {
    key: "getLines",
    value: function getLines(map, borderSetting, edge) {
      var width = 1;

      if (borderSetting[edge] && borderSetting[edge].width !== undefined) {
        width = borderSetting[edge].width;
      } else if (borderSetting.border && borderSetting.border.width !== undefined) {
        width = borderSetting.border.width;
      }

      var color = borderSetting[edge] && borderSetting[edge].color || borderSetting.border && borderSetting.border.color || 'black';
      var stroke = "".concat(width, "px ").concat(color);
      var lines = map.get(stroke);

      if (lines) {
        return lines;
      }

      var newLines = [];
      map.set(stroke, newLines);
      return newLines;
    }
  }]);

  return SvgBorder;
}();

exports.default = SvgBorder;