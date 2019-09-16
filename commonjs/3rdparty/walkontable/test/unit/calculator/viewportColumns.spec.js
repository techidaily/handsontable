"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

var _calculator = require("walkontable/calculator");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('ViewportColumnsCalculator', function () {
  function allColumns20() {
    return 20;
  }

  it('should render first 5 columns in unscrolled container', function () {
    var options = {
      viewportSize: 100,
      scrollOffset: 0,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(0);
    expect(renderedCalc.startPosition).toBe(0);
    expect(renderedCalc.endColumn).toBe(4);
    expect(renderedCalc.count).toBe(5);
    expect(fullyVisibleCalc.startColumn).toBe(0);
    expect(fullyVisibleCalc.endColumn).toBe(4);
    expect(fullyVisibleCalc.count).toBe(5);
    expect(partiallyVisibleCalc.startColumn).toBe(0);
    expect(partiallyVisibleCalc.endColumn).toBe(4);
    expect(partiallyVisibleCalc.count).toBe(5);
  });
  it('should render 6 columns, starting from 3 in container scrolled to half of fourth column', function () {
    var options = {
      viewportSize: 100,
      scrollOffset: 70,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(3);
    expect(renderedCalc.startPosition).toBe(60);
    expect(renderedCalc.endColumn).toBe(8);
    expect(renderedCalc.count).toBe(6);
    expect(fullyVisibleCalc.startColumn).toBe(4);
    expect(fullyVisibleCalc.endColumn).toBe(7);
    expect(fullyVisibleCalc.count).toBe(4);
    expect(partiallyVisibleCalc.startColumn).toBe(3);
    expect(partiallyVisibleCalc.endColumn).toBe(8);
    expect(partiallyVisibleCalc.count).toBe(6);
  });
  it('should render 10 columns, starting from 1 in container scrolled to half of fourth column (with render overrides)', function () {
    var _overrideFn = function overrideFn(calc) {
      calc.startColumn -= 2;
      calc.endColumn += 2;
    };

    var options = {
      viewportSize: 100,
      scrollOffset: 70,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: function overrideFn(calc) {
        return _overrideFn(calc);
      },
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(1);
    expect(renderedCalc.startPosition).toBe(20);
    expect(renderedCalc.endColumn).toBe(10);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startColumn).toBe(4);
    expect(fullyVisibleCalc.endColumn).toBe(7);
    expect(fullyVisibleCalc.count).toBe(4);
    expect(partiallyVisibleCalc.startColumn).toBe(3);
    expect(partiallyVisibleCalc.endColumn).toBe(8);
    expect(partiallyVisibleCalc.count).toBe(6);
  });
  it('should not exceed endColumn index beyond total columns (using render overrides)', function () {
    var _overrideFn2 = function overrideFn(calc) {
      calc.startColumn -= 2;
      calc.endColumn += 30;
    };

    var options = {
      viewportSize: 100,
      scrollOffset: 70,
      totalItems: 8,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: function overrideFn(calc) {
        return _overrideFn2(calc);
      },
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(0);
    expect(renderedCalc.startPosition).toBe(0);
    expect(renderedCalc.endColumn).toBe(7);
    expect(renderedCalc.count).toBe(8);
    expect(fullyVisibleCalc.startColumn).toBe(3);
    expect(fullyVisibleCalc.endColumn).toBe(7);
    expect(fullyVisibleCalc.count).toBe(5);
    expect(partiallyVisibleCalc.startColumn).toBe(2);
    expect(partiallyVisibleCalc.endColumn).toBe(7);
    expect(partiallyVisibleCalc.count).toBe(6);
  });
  it('should return number of rendered columns', function () {
    var options = {
      viewportSize: 100,
      scrollOffset: 50,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.count).toBe(6);
    expect(fullyVisibleCalc.count).toBe(4);
    expect(partiallyVisibleCalc.count).toBe(6);
  });
  it('should render all columns if their size is smaller than viewport', function () {
    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 8,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(0);
    expect(renderedCalc.endColumn).toBe(7);
    expect(renderedCalc.count).toBe(8);
    expect(fullyVisibleCalc.startColumn).toBe(0);
    expect(fullyVisibleCalc.endColumn).toBe(7);
    expect(fullyVisibleCalc.count).toBe(8);
    expect(partiallyVisibleCalc.startColumn).toBe(0);
    expect(partiallyVisibleCalc.endColumn).toBe(7);
    expect(partiallyVisibleCalc.count).toBe(8);
  });
  it('should render all columns if their size is exactly the viewport', function () {
    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 10,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(0);
    expect(renderedCalc.endColumn).toBe(9);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startColumn).toBe(0);
    expect(fullyVisibleCalc.endColumn).toBe(9);
    expect(fullyVisibleCalc.count).toBe(10);
    expect(partiallyVisibleCalc.startColumn).toBe(0);
    expect(partiallyVisibleCalc.endColumn).toBe(9);
    expect(partiallyVisibleCalc.count).toBe(10);
  });
  it('should render all columns if their size is slightly larger than viewport', function () {
    var options = {
      viewportSize: 199,
      scrollOffset: 0,
      totalItems: 10,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(0);
    expect(renderedCalc.endColumn).toBe(9);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startColumn).toBe(0);
    expect(fullyVisibleCalc.endColumn).toBe(8);
    expect(fullyVisibleCalc.count).toBe(9);
    expect(partiallyVisibleCalc.startColumn).toBe(0);
    expect(partiallyVisibleCalc.endColumn).toBe(9);
    expect(partiallyVisibleCalc.count).toBe(10);
  });
  it('should set null values if total columns is 0', function () {
    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 0,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(null);
    expect(renderedCalc.startPosition).toBe(null);
    expect(renderedCalc.endColumn).toBe(null);
    expect(renderedCalc.count).toBe(0);
    expect(fullyVisibleCalc.startColumn).toBe(null);
    expect(fullyVisibleCalc.endColumn).toBe(null);
    expect(fullyVisibleCalc.count).toBe(0);
    expect(partiallyVisibleCalc.startColumn).toBe(null);
    expect(partiallyVisibleCalc.endColumn).toBe(null);
    expect(partiallyVisibleCalc.count).toBe(0);
  });
  it('should set null values if total columns is 0 (with overrideFn provided)', function () {
    var _overrideFn3 = function overrideFn(myCalc) {
      myCalc.startColumn = 0;
      myCalc.endColumn = 0;
    };

    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 0,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: function overrideFn(calc) {
        return _overrideFn3(calc);
      },
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(null);
    expect(renderedCalc.startPosition).toBe(null);
    expect(renderedCalc.endColumn).toBe(null);
    expect(renderedCalc.count).toBe(0);
    expect(fullyVisibleCalc.startColumn).toBe(null);
    expect(fullyVisibleCalc.endColumn).toBe(null);
    expect(fullyVisibleCalc.count).toBe(0);
    expect(partiallyVisibleCalc.startColumn).toBe(null);
    expect(partiallyVisibleCalc.endColumn).toBe(null);
    expect(partiallyVisibleCalc.count).toBe(0);
  });
  it('should scroll backwards if total columns is reached', function () {
    var options = {
      viewportSize: 190,
      scrollOffset: 350,
      totalItems: 20,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(10);
    expect(renderedCalc.startPosition).toBe(200);
    expect(renderedCalc.endColumn).toBe(19);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startColumn).toBe(11);
    expect(fullyVisibleCalc.endColumn).toBe(19);
    expect(fullyVisibleCalc.count).toBe(9);
    expect(partiallyVisibleCalc.startColumn).toBe(10);
    expect(partiallyVisibleCalc.endColumn).toBe(19);
    expect(partiallyVisibleCalc.count).toBe(10);
  });
  it('should update stretchAllRatio after refreshStretching call (stretch: all)', function () {
    var calc = new _calculator.ViewportColumnsCalculator({
      viewportSize: 250,
      scrollOffset: 0,
      totalItems: 20,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      calculationType: _calculator.RENDER_TYPE,
      stretchMode: 'all',
      stretchingItemWidthFn: void 0
    });
    expect(calc.stretchAllRatio).toBe(0);
    expect(calc.stretchLastWidth).toBe(0);
    calc.refreshStretching(414);
    expect(calc.stretchAllRatio).toBe(1.035);
    expect(calc.stretchLastWidth).toBe(0);
  });
  it('should update stretchAllRatio after refreshStretching call (stretch: last)', function () {
    var calc = new _calculator.ViewportColumnsCalculator({
      viewportSize: 250,
      scrollOffset: 0,
      totalItems: 5,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      calculationType: _calculator.RENDER_TYPE,
      stretchMode: 'last',
      stretchingItemWidthFn: void 0
    });
    expect(calc.stretchAllRatio).toBe(0);
    expect(calc.stretchLastWidth).toBe(0);
    calc.refreshStretching(414);
    expect(calc.stretchAllRatio).toBe(0);
    expect(calc.stretchLastWidth).toBe(334);
  });
  it('should return valid stretched column width (stretch: all)', function () {
    var calc = new _calculator.ViewportColumnsCalculator({
      viewportSize: 250,
      scrollOffset: 0,
      totalItems: 5,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      calculationType: _calculator.RENDER_TYPE,
      stretchMode: 'all',
      stretchingItemWidthFn: void 0
    });
    expect(calc.getStretchedColumnWidth(0, 50)).toBe(null);
    expect(calc.needVerifyLastColumnWidth).toBe(true);
    calc.refreshStretching(417);
    expect(calc.getStretchedColumnWidth(0, allColumns20())).toBe(83);
    expect(calc.getStretchedColumnWidth(1, allColumns20())).toBe(83);
    expect(calc.getStretchedColumnWidth(2, allColumns20())).toBe(83);
    expect(calc.getStretchedColumnWidth(3, allColumns20())).toBe(83);
    expect(calc.needVerifyLastColumnWidth).toBe(true);
    expect(calc.getStretchedColumnWidth(4, allColumns20())).toBe(85);
    expect(calc.needVerifyLastColumnWidth).toBe(false);
  });
  it('should return valid stretched column width (stretch: last)', function () {
    var calc = new _calculator.ViewportColumnsCalculator({
      viewportSize: 250,
      scrollOffset: 0,
      totalItems: 5,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      calculationType: _calculator.RENDER_TYPE,
      stretchMode: 'last',
      stretchingItemWidthFn: void 0
    });
    expect(calc.getStretchedColumnWidth(0, 50)).toBe(null);
    calc.refreshStretching(417);
    expect(calc.getStretchedColumnWidth(0, allColumns20())).toBe(null);
    expect(calc.getStretchedColumnWidth(1, allColumns20())).toBe(null);
    expect(calc.getStretchedColumnWidth(2, allColumns20())).toBe(null);
    expect(calc.getStretchedColumnWidth(3, allColumns20())).toBe(null);
    expect(calc.getStretchedColumnWidth(4, allColumns20())).toBe(337);
  });
  it('call refreshStretching should clear stretchAllColumnsWidth and needVerifyLastColumnWidth property', function () {
    var calc = new _calculator.ViewportColumnsCalculator({
      viewportSize: 250,
      scrollOffset: 0,
      totalItems: 5,
      itemSizeFn: function itemSizeFn(index) {
        return allColumns20(index);
      },
      overrideFn: void 0,
      calculationType: _calculator.RENDER_TYPE,
      stretchMode: 'all',
      stretchingItemWidthFn: void 0
    });
    expect(calc.stretchAllColumnsWidth.length).toBe(0);
    expect(calc.needVerifyLastColumnWidth).toBe(true);
    calc.refreshStretching(417);
    calc.getStretchedColumnWidth(0, allColumns20());
    calc.getStretchedColumnWidth(1, allColumns20());
    calc.getStretchedColumnWidth(2, allColumns20());
    calc.getStretchedColumnWidth(3, allColumns20());
    calc.getStretchedColumnWidth(4, allColumns20());
    expect(calc.stretchAllColumnsWidth.length).toBe(5);
    expect(calc.needVerifyLastColumnWidth).toBe(false);
    calc.refreshStretching(201);
    expect(calc.stretchAllColumnsWidth.length).toBe(0);
    expect(calc.needVerifyLastColumnWidth).toBe(true);
  });
  it("should calculate the number of columns based on a default width,\n      when the width returned from the function is not a number", function () {
    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn() {
        return void 0 + 1;
      },
      overrideFn: void 0,
      stretchMode: void 0,
      stretchingItemWidthFn: void 0
    };
    var renderedCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportColumnsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startColumn).toBe(0);
    expect(renderedCalc.startPosition).toBe(0);
    expect(renderedCalc.endColumn).toBe(3);
    expect(fullyVisibleCalc.startColumn).toBe(0);
    expect(fullyVisibleCalc.endColumn).toBe(3);
    expect(partiallyVisibleCalc.startColumn).toBe(0);
    expect(partiallyVisibleCalc.endColumn).toBe(3);
  });
});