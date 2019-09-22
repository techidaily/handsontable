"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.immediate");

require("core-js/modules/web.timers");

exports.__esModule = true;
exports.sleep = sleep;
exports.spec = spec;
exports.walkontable = walkontable;
exports.createDataArray = createDataArray;
exports.getData = getData;
exports.getTotalRows = getTotalRows;
exports.getTotalColumns = getTotalColumns;
exports.wheelOnElement = wheelOnElement;
exports.getTableWidth = getTableWidth;
exports.range = range;
exports.createSelectionController = createSelectionController;
exports.getTableTopClone = getTableTopClone;
exports.getTableLeftClone = getTableLeftClone;
exports.getTableCornerClone = getTableCornerClone;
exports.createSpreadsheetData = createSpreadsheetData;
exports.spreadsheetColumnLabel = spreadsheetColumnLabel;
exports.walkontableCalculateScrollbarWidth = walkontableCalculateScrollbarWidth;
exports.getScrollbarWidth = getScrollbarWidth;
exports.expectWtTable = expectWtTable;
exports.testSvgAsAsciiArt = testSvgAsAsciiArt;

require("regenerator-runtime/runtime");

var _htmlNormalize = require("./htmlNormalize");

var _svgToAscii = _interopRequireDefault(require("./svgToAscii"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function sleep() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return Promise.resolve({
    then: function then(resolve) {
      if (delay === 0) {
        setImmediate(resolve);
      } else {
        setTimeout(resolve, delay);
      }
    }
  });
}
/**
 * Test context object.
 *
 * @type {Object}
 */


var specContext = {};
/**
 * Get the test case context.
 *
 * @returns {Object|null}
 */

function spec() {
  return specContext.spec;
}
/**
 * Create the Walkontable instance with the provided options and cache it as `wotInstance` in the test context.
 * @param {Object} options Walkontable options.
 * @param {HTMLTableElement} [table] The table element to base the instance on.
 */


function walkontable(options, table) {
  var currentSpec = spec();

  if (!table) {
    table = currentSpec.$table[0];
  }

  options.table = table;
  currentSpec.wotInstance = new Walkontable.Core(options);
  return currentSpec.wotInstance;
}

function createDataArray() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  spec().data = [];

  for (var i = 0; i < rows; i++) {
    var row = [];

    if (cols > 0) {
      row.push(i);

      for (var j = 0; j < cols - 1; j++) {
        /* eslint-disable no-mixed-operators */

        /* eslint-disable no-bitwise */
        row.push(String.fromCharCode(65 + j % 20).toLowerCase() + (j / 20 | 0 || '')); // | 0 is parseInt - see http://jsperf.com/math-floor-vs-math-round-vs-parseint/18
      }
    }

    spec().data.push(row);
  }
}

function getData(row, col) {
  return spec().data[row][col];
}

function getTotalRows() {
  return spec().data.length;
}

function getTotalColumns() {
  return spec().data[0] ? spec().data[0].length : 0;
}
/**
 * Simulates WheelEvent on the element.
 *
 * @param {Element} elem Element to dispatch event.
 * @param {Number} deltaX Relative distance in px to scroll horizontally.
 * @param {Number} deltaY Relative distance in px to scroll vertically.
 */


function wheelOnElement(elem) {
  var deltaX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var deltaY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  elem.dispatchEvent(new WheelEvent('wheel', {
    deltaX: deltaX,
    deltaY: deltaY
  }));
}

beforeEach(function () {
  specContext.spec = this;
  var matchers = {
    toBeInArray: function toBeInArray() {
      return {
        compare: function compare(actual, expected) {
          return {
            pass: Array.isArray(expected) && expected.indexOf(actual) > -1
          };
        }
      };
    },
    toBeFunction: function toBeFunction() {
      return {
        compare: function compare(actual) {
          return {
            pass: typeof actual === 'function'
          };
        }
      };
    },
    toMatchHTML: function toMatchHTML() {
      return {
        compare: function compare(actual, expected) {
          var actualHTML = (0, _htmlNormalize.pretty)((0, _htmlNormalize.normalize)(actual));
          var expectedHTML = (0, _htmlNormalize.pretty)((0, _htmlNormalize.normalize)(expected));
          var result = {
            pass: actualHTML === expectedHTML
          };
          result.message = "Expected ".concat(actualHTML, " NOT to be ").concat(expectedHTML);

          if ((typeof jest === "undefined" ? "undefined" : _typeof(jest)) === 'object') {
            /* eslint-disable global-require */
            var jestMatcherUtils = require('jest-matcher-utils');

            result.message = function () {
              return jestMatcherUtils.diff(expectedHTML, actualHTML);
            };
          }

          return result;
        }
      };
    },
    toBeAroundValue: function toBeAroundValue() {
      return {
        compare: function compare(actual, expected) {
          var diff = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          var pass = actual >= expected - diff && actual <= expected + diff;
          var message = "Expected ".concat(actual, " to be around ").concat(expected, " (between ").concat(expected - diff, " and ").concat(expected + diff, ")");

          if (!pass) {
            message = "Expected ".concat(actual, " NOT to be around ").concat(expected, " (between ").concat(expected - diff, " and ").concat(expected + diff, ")");
          }

          return {
            pass: pass,
            message: message
          };
        }
      };
    }
  };
  jasmine.addMatchers(matchers);
});
afterEach(function () {
  specContext.spec = null;
  window.scrollTo(0, 0);
});

function getTableWidth(elem) {
  return $(elem).outerWidth() || $(elem).find('tbody').outerWidth() || $(elem).find('thead').outerWidth(); // IE8 reports 0 as <table> offsetWidth
}

function range(start, end) {
  if (!arguments.length) {
    return [];
  }

  var from = start;
  var to = end;

  if (arguments.length === 1) {
    to = from;
    from = 0;
  }

  if (to > from) {
    from = [to, to = from][0]; // one-liner for swapping two values
  }

  var result = [];

  while (to < from) {
    to += 1;
    result.push(to);
  }

  return result;
}
/**
 * Creates the selection controller necessary for the Walkontable to make selections typical for Handsontable such as
 * current selection, area selection, selection for autofill and custom borders.
 *
 * @param {Object} selections An object with custom selection instances.
 * @returns {Object} Selection controller.
 */


function createSelectionController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      current = _ref.current,
      area = _ref.area,
      fill = _ref.fill,
      custom = _ref.custom;

  var currentCtrl = current || new Walkontable.Selection({
    className: 'current',
    border: {
      width: 2,
      color: '#4b89ff',
      cornerVisible: function cornerVisible() {
        return true;
      }
    }
  });
  var areaCtrl = area || new Walkontable.Selection({
    className: 'area',
    border: {
      width: 1,
      color: '#4b89ff'
    }
  });
  var fillCtrl = fill || new Walkontable.Selection({
    className: 'fill',
    border: {
      width: 1,
      color: '#ff0000'
    }
  });
  var customCtrl = custom || [];
  return _defineProperty({
    getCell: function getCell() {
      return currentCtrl;
    },
    createOrGetArea: function createOrGetArea() {
      return areaCtrl;
    },
    getAreas: function getAreas() {
      return [areaCtrl];
    },
    getFill: function getFill() {
      return fillCtrl;
    }
  }, Symbol.iterator, function () {
    return [fillCtrl, currentCtrl, areaCtrl].concat(_toConsumableArray(customCtrl))[Symbol.iterator]();
  });
}

function getTableTopClone() {
  return $('.ht_clone_top');
}

function getTableLeftClone() {
  return $('.ht_clone_left');
}

function getTableCornerClone() {
  return $('.ht_clone_top_left_corner');
}

function createSpreadsheetData(rows, columns) {
  var _rows = [];
  var i;
  var j;

  for (i = 0; i < rows; i++) {
    var row = [];

    for (j = 0; j < columns; j++) {
      row.push(spreadsheetColumnLabel(j) + (i + 1));
    }

    _rows.push(row);
  }

  return _rows;
}

var COLUMN_LABEL_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var COLUMN_LABEL_BASE_LENGTH = COLUMN_LABEL_BASE.length;
/**
 * Generates spreadsheet-like column names: A, B, C, ..., Z, AA, AB, etc.
 *
 * @param {Number} index Column index.
 * @returns {String}
 */

function spreadsheetColumnLabel(index) {
  var dividend = index + 1;
  var columnLabel = '';
  var modulo;

  while (dividend > 0) {
    modulo = (dividend - 1) % COLUMN_LABEL_BASE_LENGTH;
    columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
    dividend = parseInt((dividend - modulo) / COLUMN_LABEL_BASE_LENGTH, 10);
  }

  return columnLabel;
}

function walkontableCalculateScrollbarWidth() {
  var inner = document.createElement('div');
  inner.style.height = '200px';
  inner.style.width = '100%';
  var outer = document.createElement('div');
  outer.style.boxSizing = 'content-box';
  outer.style.height = '150px';
  outer.style.left = '0px';
  outer.style.overflow = 'hidden';
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.width = '200px';
  outer.style.visibility = 'hidden';
  outer.appendChild(inner);
  (document.body || document.documentElement).appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  (document.body || document.documentElement).removeChild(outer);
  return w1 - w2;
}

var cachedScrollbarWidth;

function getScrollbarWidth() {
  if (cachedScrollbarWidth === void 0) {
    cachedScrollbarWidth = walkontableCalculateScrollbarWidth();
  }

  return cachedScrollbarWidth;
}
/**
 * Run expectation towards a certain WtTable overlay
 * @param {*} wt WOT instance
 * @param {*} name Name of the overlay
 * @param {*} callb Callback that will receive wtTable of that overlay
 */


function expectWtTable(wt, callb, name) {
  var callbAsString = callb.toString().replace(/\s\s+/g, ' ');

  if (name === 'master') {
    return expect(callb(wt.wtTable)).withContext("".concat(name, ": ").concat(callbAsString));
  }

  return expect(callb(wt.wtOverlays["".concat(name, "Overlay")].clone.wtTable)).withContext("".concat(name, ": ").concat(callbAsString));
}
/**
 * Run expectation towards an SVG image rendering according to the provided reference ASCII art string
 *
 * @param {HTMLElement} svg
 * @param {String} expectedAsciiArt
 */


function testSvgAsAsciiArt(_x, _x2) {
  return _testSvgAsAsciiArt.apply(this, arguments);
}
/**
 * Repeats every character in the string horizontally and vertically by a number.
 *
 * @param {String} str String to multiply
 * @param {Number} factor Integer by which each char will be multiplied
 */


function _testSvgAsAsciiArt() {
  _testSvgAsAsciiArt = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(svg, expectedAsciiArt) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              var whenConverted = (0, _svgToAscii.default)(svg);
              whenConverted.then(function (resultAsciiArt) {
                var scaleFactor = window.devicePixelRatio || 1;
                expectedAsciiArt = expectedAsciiArt.trim();
                expectedAsciiArt = multiplyStringChars2D(expectedAsciiArt, scaleFactor);
                expect("\n".concat(resultAsciiArt, "\n")).toBe("\n".concat(expectedAsciiArt, "\n"));
                resolve();
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _testSvgAsAsciiArt.apply(this, arguments);
}

function multiplyStringChars2D(str, factor) {
  var lines = str.split('\n');
  var out = '';

  for (var ll = 0; ll < lines.length; ll++) {
    for (var ii = 0; ii < factor; ii++) {
      if (out !== '') {
        out += '\n';
      }

      for (var cc = 0; cc < lines[ll].length; cc++) {
        for (var jj = 0; jj < factor; jj++) {
          out += lines[ll][cc];
        }
      }
    }
  }

  return out;
}