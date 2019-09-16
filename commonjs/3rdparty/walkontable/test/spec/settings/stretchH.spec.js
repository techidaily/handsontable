"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('stretchH option', function () {
  var debug = false;
  beforeEach(function () {
    this.$wrapper = $('<div></div>').css({
      overflow: 'hidden'
    });
    this.$wrapper.width(500).height(201);
    this.$container = $('<div></div>');
    this.$table = $('<table></table>'); // create a table that is not attached to document

    this.$wrapper.append(this.$container);
    this.$container.append(this.$table);
    this.$wrapper.appendTo('body');
    createDataArray(100, 4);
  });
  afterEach(function () {
    if (!debug) {
      $('.wtHolder').remove();
    }

    this.$wrapper.remove();
    this.wotInstance.destroy();
  });
  it('should stretch all visible columns when stretchH equals \'all\'', function () {
    createDataArray(20, 2);
    spec().$wrapper.width(500).height(400);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      stretchH: 'all',
      rowHeaders: [function (row, TH) {
        TH.innerHTML = row + 1;
      }]
    });
    wt.draw();
    expect(spec().$table.outerWidth()).toBeAroundValue(wt.wtTable.holder.clientWidth); // fix differences between Mac and Linux PhantomJS

    expect(spec().$table.find('col:eq(2)').width() - spec().$table.find('col:eq(1)').width()).toBeInArray([-1, 0, 1]);
  });
  it('should stretch all visible columns when stretchH equals \'all\' and window is resized',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var wt, initialTableWidth, evt, currentTableWidth;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createDataArray(20, 2);
            spec().$wrapper.width(500).height(400);
            wt = walkontable({
              data: getData,
              totalRows: getTotalRows,
              totalColumns: getTotalColumns,
              stretchH: 'all',
              rowHeaders: [function (row, TH) {
                TH.innerHTML = row + 1;
              }]
            });
            wt.draw();
            initialTableWidth = spec().$table.outerWidth();
            expect(initialTableWidth).toBeAroundValue(spec().$table[0].clientWidth);
            spec().$wrapper.width(600).height(500);
            evt = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'

            evt.initCustomEvent('resize', false, false, null);
            window.dispatchEvent(evt);
            wt.draw();
            _context.next = 13;
            return sleep(300);

          case 13:
            currentTableWidth = spec().$table.outerWidth();
            expect(currentTableWidth).toBeAroundValue(spec().$table[0].clientWidth);
            expect(currentTableWidth).toBeGreaterThan(initialTableWidth);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should stretch all visible columns when stretchH equals \'all\' (when rows are of variable height)', function () {
    createDataArray(20, 2);

    for (var i = 0, ilen = this.data.length; i < ilen; i++) {
      if (i % 2) {
        this.data[i][0] += ' this is a cell that contains a lot of text, which will make it multi-line';
      }
    }

    spec().$wrapper.width(300);
    spec().$wrapper.css({
      overflow: 'hidden'
    });
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      stretchH: 'all'
    });
    wt.draw();
    var expectedColWidth = (300 - getScrollbarWidth()) / 2;
    expectedColWidth = Math.floor(expectedColWidth);
    var wtHider = spec().$table.parents('.wtHider');
    expect(wtHider.find('col:eq(0)').width()).toBeAroundValue(expectedColWidth);
    expect(wtHider.find('col:eq(1)').width() - expectedColWidth).toBeInArray([0, 1]); // fix differences between Mac and Linux PhantomJS
  });
  it('should stretch last visible column when stretchH equals \'last\' (vertical scroll)', function () {
    createDataArray(20, 2);
    spec().$wrapper.width(300).height(201);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      stretchH: 'last',
      rowHeaders: [function (row, TH) {
        TH.innerHTML = row + 1;
      }]
    });
    wt.draw();
    var wtHider = spec().$table.parents('.wtHider');
    expect(wtHider.outerWidth()).toBe(getTableWidth(spec().$table));
    expect(wtHider.find('col:eq(1)').width()).toBeLessThan(wtHider.find('col:eq(2)').width());
  });
  it('should stretch last column when stretchH equals \'last\' (horizontal scroll)', function () {
    createDataArray(5, 20);
    spec().$wrapper.width(400).height(201);
    spec().data[0][19] = 'longer text';
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      stretchH: 'last',
      columnHeaders: [function (index, TH) {
        TH.innerHTML = index + 1;
      }],
      columnWidth: function columnWidth(index) {
        return index === 19 ? 100 : 50;
      }
    });
    wt.draw();
    wt.scrollViewportHorizontally(19);
    wt.draw();
    var wtHider = spec().$table.parents('.wtHider');
    expect(wtHider.find('col:eq(6)').width()).toBe(100);
  });
  it('should stretch last visible column when stretchH equals \'last\' (no scrolls)', function () {
    createDataArray(2, 2);
    spec().$wrapper.width(300).height(201);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      stretchH: 'last',
      rowHeaders: [function (row, TH) {
        TH.innerHTML = row + 1;
      }]
    });
    wt.draw();
    var wtHider = spec().$table.parents('.wtHider');
    expect(wtHider.outerWidth()).toBe(getTableWidth(spec().$table));
    expect(wtHider.find('col:eq(1)').width()).toBeLessThan(wtHider.find('col:eq(2)').width());
  });
  it('should not stretch when stretchH equals \'none\'', function () {
    createDataArray(20, 2);
    spec().$wrapper.width(300).height(201);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      stretchH: 'none',
      rowHeaders: [function (row, TH) {
        TH.innerHTML = row + 1;
      }]
    });
    wt.draw();
    expect(spec().$table.width()).toBeLessThan(spec().$wrapper.width());
    expect(spec().$table.find('col:eq(1)').width()).toBe(spec().$table.find('col:eq(2)').width());
  });
});