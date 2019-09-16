"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

describe('WalkontableEvent', function () {
  var debug = false;
  beforeEach(function () {
    this.$wrapper = $('<div></div>').css({
      overflow: 'hidden'
    });
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
  it('should call `onCellMouseDown` callback', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellMouseDown: function onCellMouseDown(event, coords, TD) {
        myCoords = coords;
        myTD = TD;
      }
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('mousedown');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  });
  it('should call `onCellContextMenu` callback', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellContextMenu: function onCellContextMenu(event, coords, TD) {
        myCoords = coords;
        myTD = TD;
      }
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('contextmenu');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  });
  it('should call `onCellMouseOver` callback', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellMouseOver: function onCellMouseOver(event, coords, TD) {
        myCoords = coords;
        myTD = TD;
      }
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('mouseover');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  });
  it('should call `onCellMouseOver` callback with correctly passed TD element when cell contains another table', function () {
    var fn = jasmine.createSpy();
    var wt = walkontable({
      data: [['<table style="width: 50px;"><tr><td class="test">TEST</td></tr></table>']],
      totalRows: 1,
      totalColumns: 1,
      onCellMouseOver: fn,
      cellRenderer: function cellRenderer(row, column, TD) {
        TD.innerHTML = wt.wtSettings.getSetting('data', row, column);
      }
    });
    wt.draw();
    var outerTD = spec().$table.find('tbody td:not(td.test)');
    var innerTD = spec().$table.find('tbody td.test');
    innerTD.simulate('mouseover');
    expect(fn.calls.argsFor(0)[2]).toBe(outerTD[0]);
  });
  it('should call `onCellMouseOut` callback', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellMouseOut: function onCellMouseOut(event, coords, TD) {
        myCoords = coords;
        myTD = TD;
      }
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('mouseover').simulate('mouseout');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  });
  it('should call `onCellMouseOut` callback with correctly passed TD element when cell contains another table', function () {
    var fn = jasmine.createSpy();
    var wt = walkontable({
      data: [['<table style="width: 50px;"><tr><td class="test">TEST</td></tr></table>']],
      totalRows: 1,
      totalColumns: 1,
      onCellMouseOut: fn,
      cellRenderer: function cellRenderer(row, column, TD) {
        TD.innerHTML = wt.wtSettings.getSetting('data', row, column);
      }
    });
    wt.draw();
    var outerTD = spec().$table.find('tbody td:not(td.test)');
    spec().$table.find('tbody td.test').simulate('mouseover').simulate('mouseout');
    expect(fn.calls.argsFor(0)[2]).toBe(outerTD[0]);
  });
  it('should call `onCellDblClick` callback', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellDblClick: function onCellDblClick(event, coords, TD) {
        myCoords = coords;
        myTD = TD;
      }
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('mousedown').simulate('mouseup').simulate('mousedown').simulate('mouseup');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  });
  it('should call `onCellDblClick` callback, even when it is set only after first click', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns
    });
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    $td.simulate('mousedown').simulate('mouseup').simulate('mousedown');
    wt.update('onCellDblClick', function (event, coords, TD) {
      myCoords = coords;
      myTD = TD;
    });
    $td.simulate('mouseup');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  });
  it('should call `onCellMouseDown` callback when clicked on TH', function () {
    var called = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = col + 1;
      }],
      onCellMouseDown: function onCellMouseDown() {
        called = true;
      }
    });
    wt.draw();
    spec().$table.find('th:first').simulate('mousedown');
    expect(called).toEqual(true);
  });
  it('should not call `onCellMouseDown` callback when clicked on the focusable element (column headers)', function () {
    var opt = ['Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'].map(function (value) {
      return "<option value=\"".concat(value, "\">").concat(value, "</option>");
    }).join('');
    var called = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = "#".concat(col, "<select>").concat(opt, "</select>");
      }],
      onCellMouseDown: function onCellMouseDown() {
        called = true;
      }
    });
    wt.draw();
    spec().$table.find('th:first select').focus().simulate('mousedown');
    expect(called).toBe(false);
  });
  it('should not call `onCellMouseDown` callback when clicked on the focusable element (cell renderer)', function () {
    var opt = ['Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'].map(function (value) {
      return "<option value=\"".concat(value, "\">").concat(value, "</option>");
    }).join('');
    var called = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      cellRenderer: function cellRenderer(row, column, TD) {
        TD.innerHTML = "<select>".concat(opt, "</select>");
      },
      onCellMouseDown: function onCellMouseDown() {
        called = true;
      }
    });
    wt.draw();
    spec().$table.find('td:first select').focus().simulate('mousedown');
    expect(called).toBe(false);
  });
  it('should call `onCellMouseOver` callback when clicked on TH', function () {
    var called = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = col + 1;
      }],
      onCellMouseOver: function onCellMouseOver(event, coords) {
        called = coords;
      }
    });
    wt.draw();
    spec().$table.find('th:first').simulate('mouseover');
    expect(called.row).toEqual(-1);
    expect(called.col).toEqual(0);
  });
  it('should call `onCellDblClick` callback when clicked on TH', function () {
    var called = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      columnHeaders: [function (col, TH) {
        TH.innerHTML = col + 1;
      }],
      onCellDblClick: function onCellDblClick() {
        called = true;
      }
    });
    wt.draw();
    spec().$table.find('th:first').simulate('mousedown').simulate('mouseup').simulate('mousedown').simulate('mouseup');
    expect(called).toEqual(true);
  });
  it('should not call `onCellDblClick` callback when right-clicked', function () {
    var called = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellDblClick: function onCellDblClick() {
        called = true;
      }
    });
    wt.draw();
    var options = {
      button: 2
    };
    spec().$table.find('tbody tr:first td:first').simulate('mousedown', options).simulate('mouseup', options).simulate('mousedown', options).simulate('mouseup', options);
    expect(called).toEqual(false);
  });
  it('should not call `onCellDblClick` when first mouse up came from mouse drag', function () {
    var called = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onCellDblClick: function onCellDblClick() {
        called = true;
      }
    });
    wt.draw();
    spec().$table.find('tbody tr:first td:eq(1)').simulate('mousedown');
    spec().$table.find('tbody tr:first td:first').simulate('mouseup').simulate('mousedown').simulate('mouseup');
    expect(called).toEqual(false);
  });
  it('border click should call `onCellMouseDown` callback', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid'
          }
        })
      }),
      onCellMouseDown: function onCellMouseDown(event, coords, TD) {
        myCoords = coords;
        myTD = TD;
      }
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(1, 1));
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    spec().$table.parents('.wtHolder').find('.current:first').simulate('mousedown');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  });
  it('border click should call `onCellDblClick` callback', function () {
    var myCoords = null;
    var myTD = null;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid'
          }
        })
      }),
      onCellDblClick: function onCellDblClick(event, coords, TD) {
        myCoords = coords;
        myTD = TD;
      }
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(1, 1));
    wt.draw();
    var $td = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    spec().$table.parents('.wtHolder').find('.current:first').simulate('mousedown').simulate('mouseup').simulate('mousedown').simulate('mouseup');
    expect(myCoords).toEqual(new Walkontable.CellCoords(1, 1));
    expect(myTD).toEqual($td[0]);
  }); // corner

  it('should call `onCellCornerMouseDown` callback', function () {
    var clicked = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid',
            cornerVisible: function cornerVisible() {
              return true;
            }
          }
        })
      }),
      onCellCornerMouseDown: function onCellCornerMouseDown() {
        clicked = true;
      }
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(10, 2));
    wt.draw();
    spec().$table.parents('.wtHolder').find('.current.corner').simulate('mousedown');
    expect(clicked).toEqual(true);
  });
  it('should call `onCellCornerDblClick` callback, even when it is set only after first click', function () {
    var clicked = false;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      selections: createSelectionController({
        current: new Walkontable.Selection({
          className: 'current',
          border: {
            width: 1,
            color: 'red',
            style: 'solid',
            cornerVisible: function cornerVisible() {
              return true;
            }
          }
        })
      })
    });
    wt.selections.getCell().add(new Walkontable.CellCoords(10, 2));
    wt.draw();
    var $td = spec().$table.parents('.wtHolder').find('.current.corner');
    $td.simulate('mousedown').simulate('mouseup').simulate('mousedown');
    wt.update('onCellCornerDblClick', function () {
      clicked = true;
    });
    $td.simulate('mouseup');
    expect(clicked).toEqual(true);
  });
  it('should call `onDraw` callback after render', function () {
    var count = 0;
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns,
      onDraw: function onDraw() {
        count += 1;
      }
    });
    wt.draw();
    expect(count).toEqual(1);
  });
});