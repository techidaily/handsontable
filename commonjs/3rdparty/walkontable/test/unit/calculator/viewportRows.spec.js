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

describe('ViewportRowsCalculator', function () {
  function allRows20() {
    return 20;
  }

  it('should render first 5 rows in unscrolled container', function () {
    var options = {
      viewportSize: 100,
      scrollOffset: 0,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      calculationType: _calculator.RENDER_TYPE,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(0);
    expect(renderedCalc.startPosition).toBe(0);
    expect(renderedCalc.endRow).toBe(4);
    expect(renderedCalc.count).toBe(5);
    expect(fullyVisibleCalc.startRow).toBe(0);
    expect(fullyVisibleCalc.endRow).toBe(4);
    expect(fullyVisibleCalc.count).toBe(5);
    expect(partiallyVisibleCalc.startRow).toBe(0);
    expect(partiallyVisibleCalc.endRow).toBe(4);
    expect(partiallyVisibleCalc.count).toBe(5);
  });
  it('should render 6 rows, starting from 3 in container scrolled to half of fourth row', function () {
    var options = {
      viewportSize: 100,
      scrollOffset: 70,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      calculationType: _calculator.RENDER_TYPE,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(3);
    expect(renderedCalc.startPosition).toBe(60);
    expect(renderedCalc.endRow).toBe(8);
    expect(renderedCalc.count).toBe(6);
    expect(fullyVisibleCalc.startRow).toBe(4);
    expect(fullyVisibleCalc.endRow).toBe(7);
    expect(fullyVisibleCalc.count).toBe(4);
    expect(partiallyVisibleCalc.startRow).toBe(3);
    expect(partiallyVisibleCalc.endRow).toBe(8);
    expect(partiallyVisibleCalc.count).toBe(6);
  });
  it('should render 10 rows, starting from 1 in container scrolled to half of fourth row (with render overrides)', function () {
    var _overrideFn = function overrideFn(calc) {
      calc.startRow -= 2;
      calc.endRow += 2;
    };

    var options = {
      viewportSize: 100,
      scrollOffset: 70,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: function overrideFn(calc) {
        return _overrideFn(calc);
      },
      calculationType: _calculator.RENDER_TYPE,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(1);
    expect(renderedCalc.startPosition).toBe(20);
    expect(renderedCalc.endRow).toBe(10);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startRow).toBe(4);
    expect(fullyVisibleCalc.endRow).toBe(7);
    expect(fullyVisibleCalc.count).toBe(4);
    expect(partiallyVisibleCalc.startRow).toBe(3);
    expect(partiallyVisibleCalc.endRow).toBe(8);
    expect(partiallyVisibleCalc.count).toBe(6);
  });
  it('should not exceed endRow index beyond total rows (using render overrides)', function () {
    var _overrideFn2 = function overrideFn(calc) {
      calc.startRow -= 3;
      calc.endRow += 30;
    };

    var options = {
      viewportSize: 100,
      scrollOffset: 70,
      totalItems: 8,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: function overrideFn(calc) {
        return _overrideFn2(calc);
      },
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(0);
    expect(renderedCalc.startPosition).toBe(0);
    expect(renderedCalc.endRow).toBe(7);
    expect(renderedCalc.count).toBe(8);
    expect(fullyVisibleCalc.startRow).toBe(3);
    expect(fullyVisibleCalc.endRow).toBe(7);
    expect(fullyVisibleCalc.count).toBe(5);
    expect(partiallyVisibleCalc.startRow).toBe(3);
    expect(partiallyVisibleCalc.endRow).toBe(7);
    expect(partiallyVisibleCalc.count).toBe(5);
  });
  it('should return number of rendered rows', function () {
    var options = {
      viewportSize: 100,
      scrollOffset: 50,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.count).toBe(6);
    expect(fullyVisibleCalc.count).toBe(4);
    expect(partiallyVisibleCalc.count).toBe(6);
  });
  it('should render all rows if their size is smaller than viewport', function () {
    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 8,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(0);
    expect(renderedCalc.endRow).toBe(7);
    expect(renderedCalc.count).toBe(8);
    expect(fullyVisibleCalc.startRow).toBe(0);
    expect(fullyVisibleCalc.endRow).toBe(7);
    expect(fullyVisibleCalc.count).toBe(8);
    expect(partiallyVisibleCalc.startRow).toBe(0);
    expect(partiallyVisibleCalc.endRow).toBe(7);
    expect(partiallyVisibleCalc.count).toBe(8);
  });
  it('should render all rows if their size is exactly the viewport', function () {
    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 10,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(0);
    expect(renderedCalc.endRow).toBe(9);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startRow).toBe(0);
    expect(fullyVisibleCalc.endRow).toBe(9);
    expect(fullyVisibleCalc.count).toBe(10);
    expect(partiallyVisibleCalc.startRow).toBe(0);
    expect(partiallyVisibleCalc.endRow).toBe(9);
    expect(partiallyVisibleCalc.count).toBe(10);
  });
  it('should render all rows if their size is slightly larger than viewport', function () {
    var options = {
      viewportSize: 199,
      scrollOffset: 0,
      totalItems: 10,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(0);
    expect(renderedCalc.endRow).toBe(9);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startRow).toBe(0);
    expect(fullyVisibleCalc.endRow).toBe(8);
    expect(fullyVisibleCalc.count).toBe(9);
    expect(partiallyVisibleCalc.startRow).toBe(0);
    expect(partiallyVisibleCalc.endRow).toBe(9);
    expect(partiallyVisibleCalc.count).toBe(10);
  });
  it('should set null values if total rows is 0', function () {
    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 0,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(null);
    expect(renderedCalc.startPosition).toBe(null);
    expect(renderedCalc.endRow).toBe(null);
    expect(renderedCalc.count).toBe(0);
    expect(fullyVisibleCalc.startRow).toBe(null);
    expect(fullyVisibleCalc.endRow).toBe(null);
    expect(fullyVisibleCalc.count).toBe(0);
    expect(partiallyVisibleCalc.startRow).toBe(null);
    expect(partiallyVisibleCalc.endRow).toBe(null);
    expect(partiallyVisibleCalc.count).toBe(0);
  });
  it('should set null values if total rows is 0 (with overrideFn provided)', function () {
    var _overrideFn3 = function overrideFn(myCalc) {
      myCalc.startRow = 0;
      myCalc.endRow = 0;
    };

    var options = {
      viewportSize: 200,
      scrollOffset: 0,
      totalItems: 0,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: function overrideFn(calc) {
        return _overrideFn3(calc);
      },
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(null);
    expect(renderedCalc.startPosition).toBe(null);
    expect(renderedCalc.endRow).toBe(null);
    expect(renderedCalc.count).toBe(0);
    expect(fullyVisibleCalc.startRow).toBe(null);
    expect(fullyVisibleCalc.endRow).toBe(null);
    expect(fullyVisibleCalc.count).toBe(0);
    expect(partiallyVisibleCalc.startRow).toBe(null);
    expect(partiallyVisibleCalc.endRow).toBe(null);
    expect(partiallyVisibleCalc.count).toBe(0);
  });
  it('should scroll backwards if total rows is reached', function () {
    var options = {
      viewportSize: 190,
      scrollOffset: 350,
      totalItems: 20,
      itemSizeFn: function itemSizeFn(index) {
        return allRows20(index);
      },
      overrideFn: void 0,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(10);
    expect(renderedCalc.startPosition).toBe(200);
    expect(renderedCalc.endRow).toBe(19);
    expect(renderedCalc.count).toBe(10);
    expect(fullyVisibleCalc.startRow).toBe(11);
    expect(fullyVisibleCalc.endRow).toBe(19);
    expect(fullyVisibleCalc.count).toBe(9);
    expect(partiallyVisibleCalc.startRow).toBe(10);
    expect(partiallyVisibleCalc.endRow).toBe(19);
    expect(partiallyVisibleCalc.count).toBe(10);
  });
  it("should calculate the number of rows based on a default height,\n      when the height returned from the function is not a number", function () {
    var options = {
      viewportSize: 100,
      scrollOffset: 0,
      totalItems: 1000,
      itemSizeFn: function itemSizeFn() {
        return void 0 + 1;
      },
      overrideFn: void 0,
      scrollbarHeight: void 0
    };
    var renderedCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.RENDER_TYPE
    }));
    var fullyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.FULLY_VISIBLE_TYPE
    }));
    var partiallyVisibleCalc = new _calculator.ViewportRowsCalculator(_objectSpread({}, options, {
      calculationType: _calculator.PARTIALLY_VISIBLE_TYPE
    }));
    expect(renderedCalc.startRow).toBe(0);
    expect(renderedCalc.startPosition).toBe(0);
    expect(renderedCalc.endRow).toBe(4);
    expect(renderedCalc.count).toBe(5);
    expect(fullyVisibleCalc.startRow).toBe(0);
    expect(fullyVisibleCalc.endRow).toBe(3);
    expect(fullyVisibleCalc.count).toBe(4);
    expect(partiallyVisibleCalc.startRow).toBe(0);
    expect(partiallyVisibleCalc.endRow).toBe(4);
    expect(partiallyVisibleCalc.count).toBe(5);
  });
});