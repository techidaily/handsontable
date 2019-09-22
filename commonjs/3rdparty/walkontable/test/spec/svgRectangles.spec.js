"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

describe('getSvgPathsRenderer', function () {
  var container;
  var svg;
  var svgResizer;
  var svgPathsRenderer;
  var totalWidth = 10;
  var totalHeight = 10;

  function callSvgPathsRenderer(rawData) {
    var stylesAndCommands = Walkontable.precalculateStylesAndCommands(rawData, totalWidth, totalHeight);

    var strokeStyles = _toConsumableArray(stylesAndCommands.keys());

    var strokeCommands = _toConsumableArray(stylesAndCommands.values());

    svgResizer(totalWidth, totalHeight);
    svgPathsRenderer(strokeStyles, strokeCommands);
  }

  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = '';
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.background = 'white';
    container.appendChild(svg);
    svgResizer = Walkontable.getSvgResizer(svg);
    svgPathsRenderer = Walkontable.getSvgPathsRenderer(svg);
  });
  afterEach(function () {
    document.body.removeChild(container);
  });
  describe('stroke alignment of a rectangle in the middle', function () {
    it('should center 1px line exactly on the path',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rawData = [{
                x1: 2,
                x2: 7,
                y1: 2,
                y2: 7,
                topStyle: '1px #000',
                rightStyle: '1px #000',
                leftStyle: '1px #000',
                bottomStyle: '1px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF"));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should center 2px on the path with a leak to the top-left',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              rawData = [{
                x1: 2,
                x2: 7,
                y1: 2,
                y2: 7,
                topStyle: '2px #000',
                rightStyle: '2px #000',
                leftStyle: '2px #000',
                bottomStyle: '2px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context2.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF"));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should center 3px line exactly on the path',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              rawData = [{
                x1: 2,
                x2: 7,
                y1: 2,
                y2: 7,
                topStyle: '3px #000',
                rightStyle: '3px #000',
                leftStyle: '3px #000',
                bottomStyle: '3px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context3.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AF\u25AF\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AF\u25AF\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF"));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('stroke alignment of a rectangle that touches the edges vertically', function () {
    it('should center 1px line exactly on the path',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              rawData = [{
                x1: 2,
                x2: 7,
                y1: 0,
                y2: 9,
                topStyle: '1px #000',
                rightStyle: '1px #000',
                leftStyle: '1px #000',
                bottomStyle: '1px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context4.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AF\u25AF\n\u25AF\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF"));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should center 2px on the path with a leak to the top-left',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              rawData = [{
                x1: 2,
                x2: 7,
                y1: 0,
                y2: 9,
                topStyle: '2px #000',
                rightStyle: '2px #000',
                leftStyle: '2px #000',
                bottomStyle: '2px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context5.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AF\u25AF\u25AF\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\u25AF"));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should center 3px line exactly on the path',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              rawData = [{
                x1: 2,
                x2: 7,
                y1: 0,
                y2: 9,
                topStyle: '3px #000',
                rightStyle: '3px #000',
                leftStyle: '3px #000',
                bottomStyle: '3px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context6.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AF\u25AF\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AF\u25AF\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AF\u25AF\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AF\u25AF\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF\n\u25AF\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AF"));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('stroke alignment of a rectangle that touches the edges horizontally', function () {
    it('should center 1px line exactly on the path',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              rawData = [{
                x1: 0,
                x2: 9,
                y1: 2,
                y2: 7,
                topStyle: '1px #000',
                rightStyle: '1px #000',
                leftStyle: '1px #000',
                bottomStyle: '1px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context7.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AE\n\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AE\n\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AE\n\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF"));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should center 2px on the path with a leak to the top-left',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              rawData = [{
                x1: 0,
                x2: 9,
                y1: 2,
                y2: 7,
                topStyle: '2px #000',
                rightStyle: '2px #000',
                leftStyle: '2px #000',
                bottomStyle: '2px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context8.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AE\u25AE\n\u25AE\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AE\u25AE\n\u25AE\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF"));

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('should center 3px line exactly on the path',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var rawData;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              rawData = [{
                x1: 0,
                x2: 9,
                y1: 2,
                y2: 7,
                topStyle: '3px #000',
                rightStyle: '3px #000',
                leftStyle: '3px #000',
                bottomStyle: '3px #000'
              }];
              callSvgPathsRenderer(rawData);
              return _context9.abrupt("return", testSvgAsAsciiArt(svg, "\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AF\u25AF\u25AF\u25AF\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\n\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF"));

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
});