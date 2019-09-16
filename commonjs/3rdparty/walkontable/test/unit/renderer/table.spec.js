"use strict";

var _table = _interopRequireDefault(require("walkontable/renderer/table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createRenderer() {
  var rootNode = document.createElement('table');

  var cellRenderer = function cellRenderer() {};

  var renderer = new _table.default(rootNode, {
    cellRenderer: cellRenderer
  });
  return {
    renderer: renderer,
    rootNode: rootNode,
    cellRenderer: cellRenderer
  };
}

describe('TableRenderer', function () {
  it('should be correctly setup', function () {
    var _createRenderer = createRenderer(),
        renderer = _createRenderer.renderer,
        rootNode = _createRenderer.rootNode,
        cellRenderer = _createRenderer.cellRenderer;

    expect(renderer.rootNode).toBe(rootNode);
    expect(renderer.rootDocument).toBe(rootNode.ownerDocument);
    expect(renderer.rowHeaders).toBe(null);
    expect(renderer.columnHeaders).toBe(null);
    expect(renderer.colGroup).toBe(null);
    expect(renderer.rows).toBe(null);
    expect(renderer.cells).toBe(null);
    expect(renderer.rowFilter).toBe(null);
    expect(renderer.columnFilter).toBe(null);
    expect(renderer.rowUtils).toBe(null);
    expect(renderer.columnUtils).toBe(null);
    expect(renderer.rowsToRender).toBe(0);
    expect(renderer.columnsToRender).toBe(0);
    expect(renderer.rowHeaderFunctions).toEqual([]);
    expect(renderer.rowHeadersCount).toBe(0);
    expect(renderer.columnHeaderFunctions).toEqual([]);
    expect(renderer.cellRenderer).toBe(cellRenderer);
  });
  it('should set `rowUtils` and `columnUtils` properties after calling `setAxisUtils` method', function () {
    var _createRenderer2 = createRenderer(),
        renderer = _createRenderer2.renderer;

    var rowUtils = new function RowUtils() {
      _classCallCheck(this, RowUtils);
    }();
    var columnUtils = new function ColumnUtils() {
      _classCallCheck(this, ColumnUtils);
    }();
    renderer.setAxisUtils(rowUtils, columnUtils);
    expect(renderer.rowUtils).toBe(rowUtils);
    expect(renderer.columnUtils).toBe(columnUtils);
  });
  it('should set `rowsToRender` and `columnsToRender` properties after calling `setViewportSize` method', function () {
    var _createRenderer3 = createRenderer(),
        renderer = _createRenderer3.renderer;

    renderer.setViewportSize(10, 20);
    expect(renderer.rowsToRender).toBe(10);
    expect(renderer.columnsToRender).toBe(20);
  });
  it('should set `rowFilter` and `columnFilter` properties after calling `setFilters` method', function () {
    var _createRenderer4 = createRenderer(),
        renderer = _createRenderer4.renderer;

    var rowFilter = new function RowFilter() {
      _classCallCheck(this, RowFilter);
    }();
    var columnFilter = new function ColumnFilter() {
      _classCallCheck(this, ColumnFilter);
    }();
    renderer.setFilters(rowFilter, columnFilter);
    expect(renderer.rowFilter).toBe(rowFilter);
    expect(renderer.columnFilter).toBe(columnFilter);
  });
  it('should set row and column header functions and calculate their length after calling `setHeaderContentRenderers` method', function () {
    var _createRenderer5 = createRenderer(),
        renderer = _createRenderer5.renderer;

    var rowHeaderFunc1 = function rowHeaderFunc1() {};

    var rowHeaderFunc2 = function rowHeaderFunc2() {};

    var columnHeaderFunc1 = function columnHeaderFunc1() {};

    renderer.setHeaderContentRenderers([rowHeaderFunc1, rowHeaderFunc2], [columnHeaderFunc1]);
    expect(renderer.rowHeaderFunctions[0]).toBe(rowHeaderFunc1);
    expect(renderer.rowHeaderFunctions[1]).toBe(rowHeaderFunc2);
    expect(renderer.rowHeadersCount).toBe(2);
    expect(renderer.columnHeaderFunctions[0]).toBe(columnHeaderFunc1);
    expect(renderer.columnHeadersCount).toBe(1);
  });
  it('should set renderer instances after calling `setRenderers` method', function () {
    var _createRenderer6 = createRenderer(),
        renderer = _createRenderer6.renderer;

    var rowHeadersRenderer = new (
    /*#__PURE__*/
    function () {
      function RowHeadersRenderer() {
        _classCallCheck(this, RowHeadersRenderer);
      }

      _createClass(RowHeadersRenderer, [{
        key: "setTable",
        value: function setTable() {}
      }]);

      return RowHeadersRenderer;
    }())();
    var columnHeadersRenderer = new (
    /*#__PURE__*/
    function () {
      function ColumnHeadersRenderer() {
        _classCallCheck(this, ColumnHeadersRenderer);
      }

      _createClass(ColumnHeadersRenderer, [{
        key: "setTable",
        value: function setTable() {}
      }]);

      return ColumnHeadersRenderer;
    }())();
    var colGroupRenderer = new (
    /*#__PURE__*/
    function () {
      function ColGroupRenderer() {
        _classCallCheck(this, ColGroupRenderer);
      }

      _createClass(ColGroupRenderer, [{
        key: "setTable",
        value: function setTable() {}
      }]);

      return ColGroupRenderer;
    }())();
    var rowsRenderer = new (
    /*#__PURE__*/
    function () {
      function RowsRenderer() {
        _classCallCheck(this, RowsRenderer);
      }

      _createClass(RowsRenderer, [{
        key: "setTable",
        value: function setTable() {}
      }]);

      return RowsRenderer;
    }())();
    var cellsRenderer = new (
    /*#__PURE__*/
    function () {
      function CellsRenderer() {
        _classCallCheck(this, CellsRenderer);
      }

      _createClass(CellsRenderer, [{
        key: "setTable",
        value: function setTable() {}
      }]);

      return CellsRenderer;
    }())();
    spyOn(rowHeadersRenderer, 'setTable');
    spyOn(columnHeadersRenderer, 'setTable');
    spyOn(colGroupRenderer, 'setTable');
    spyOn(rowsRenderer, 'setTable');
    spyOn(cellsRenderer, 'setTable');
    renderer.setRenderers({
      rowHeaders: rowHeadersRenderer,
      columnHeaders: columnHeadersRenderer,
      colGroup: colGroupRenderer,
      rows: rowsRenderer,
      cells: cellsRenderer
    });
    expect(renderer.rowHeaders).toBe(rowHeadersRenderer);
    expect(renderer.columnHeaders).toBe(columnHeadersRenderer);
    expect(renderer.colGroup).toBe(colGroupRenderer);
    expect(renderer.rows).toBe(rowsRenderer);
    expect(renderer.cells).toBe(cellsRenderer);
    expect(rowHeadersRenderer.setTable).toHaveBeenCalledWith(renderer);
    expect(columnHeadersRenderer.setTable).toHaveBeenCalledWith(renderer);
    expect(colGroupRenderer.setTable).toHaveBeenCalledWith(renderer);
    expect(rowsRenderer.setTable).toHaveBeenCalledWith(renderer);
    expect(cellsRenderer.setTable).toHaveBeenCalledWith(renderer);
  });
  it('should translate rendered row index to source using rowFilter module', function () {
    var _createRenderer7 = createRenderer(),
        renderer = _createRenderer7.renderer;

    var rowFilter = new (
    /*#__PURE__*/
    function () {
      function RowFilter() {
        _classCallCheck(this, RowFilter);
      }

      _createClass(RowFilter, [{
        key: "renderedToSource",
        value: function renderedToSource() {}
      }]);

      return RowFilter;
    }())();
    var columnFilter = new (
    /*#__PURE__*/
    function () {
      function ColumnFilter() {
        _classCallCheck(this, ColumnFilter);
      }

      _createClass(ColumnFilter, [{
        key: "renderedToSource",
        value: function renderedToSource() {}
      }]);

      return ColumnFilter;
    }())();
    spyOn(rowFilter, 'renderedToSource').and.returnValue(4);
    spyOn(columnFilter, 'renderedToSource');
    renderer.setFilters(rowFilter, columnFilter);
    expect(renderer.renderedRowToSource(5)).toBe(4);
    expect(rowFilter.renderedToSource).toHaveBeenCalledWith(5);
    expect(columnFilter.renderedToSource).not.toHaveBeenCalled();
  });
  it('should translate rendered column index to source using columnFilter module', function () {
    var _createRenderer8 = createRenderer(),
        renderer = _createRenderer8.renderer;

    var rowFilter = new (
    /*#__PURE__*/
    function () {
      function RowFilter() {
        _classCallCheck(this, RowFilter);
      }

      _createClass(RowFilter, [{
        key: "renderedToSource",
        value: function renderedToSource() {}
      }]);

      return RowFilter;
    }())();
    var columnFilter = new (
    /*#__PURE__*/
    function () {
      function ColumnFilter() {
        _classCallCheck(this, ColumnFilter);
      }

      _createClass(ColumnFilter, [{
        key: "renderedToSource",
        value: function renderedToSource() {}
      }]);

      return ColumnFilter;
    }())();
    spyOn(rowFilter, 'renderedToSource');
    spyOn(columnFilter, 'renderedToSource').and.returnValue(4);
    renderer.setFilters(rowFilter, columnFilter);
    expect(renderer.renderedColumnToSource(5)).toBe(4);
    expect(columnFilter.renderedToSource).toHaveBeenCalledWith(5);
    expect(rowFilter.renderedToSource).not.toHaveBeenCalled();
  });
  it('should call `adjust` and `render` methods for all renderers', function () {
    var _createRenderer9 = createRenderer(),
        renderer = _createRenderer9.renderer;

    var rowHeadersRenderer = new (
    /*#__PURE__*/
    function () {
      function RowHeadersRenderer() {
        _classCallCheck(this, RowHeadersRenderer);
      }

      _createClass(RowHeadersRenderer, [{
        key: "adjust",
        value: function adjust() {}
      }, {
        key: "render",
        value: function render() {}
      }]);

      return RowHeadersRenderer;
    }())();
    var columnHeadersRenderer = new (
    /*#__PURE__*/
    function () {
      function ColumnHeadersRenderer() {
        _classCallCheck(this, ColumnHeadersRenderer);
      }

      _createClass(ColumnHeadersRenderer, [{
        key: "adjust",
        value: function adjust() {}
      }, {
        key: "render",
        value: function render() {}
      }]);

      return ColumnHeadersRenderer;
    }())();
    var colGroupRenderer = new (
    /*#__PURE__*/
    function () {
      function ColGroupRenderer() {
        _classCallCheck(this, ColGroupRenderer);
      }

      _createClass(ColGroupRenderer, [{
        key: "adjust",
        value: function adjust() {}
      }, {
        key: "render",
        value: function render() {}
      }]);

      return ColGroupRenderer;
    }())();
    var rowsRenderer = new (
    /*#__PURE__*/
    function () {
      function RowsRenderer() {
        _classCallCheck(this, RowsRenderer);
      }

      _createClass(RowsRenderer, [{
        key: "adjust",
        value: function adjust() {}
      }, {
        key: "render",
        value: function render() {}
      }]);

      return RowsRenderer;
    }())();
    var cellsRenderer = new (
    /*#__PURE__*/
    function () {
      function CellsRenderer() {
        _classCallCheck(this, CellsRenderer);
      }

      _createClass(CellsRenderer, [{
        key: "adjust",
        value: function adjust() {}
      }, {
        key: "render",
        value: function render() {}
      }]);

      return CellsRenderer;
    }())();
    var columnUtils = new (
    /*#__PURE__*/
    function () {
      function ColumnUtils() {
        _classCallCheck(this, ColumnUtils);
      }

      _createClass(ColumnUtils, [{
        key: "calculateWidths",
        value: function calculateWidths() {}
      }]);

      return ColumnUtils;
    }())();
    spyOn(rowHeadersRenderer, 'adjust');
    spyOn(rowHeadersRenderer, 'render');
    spyOn(columnHeadersRenderer, 'adjust');
    spyOn(columnHeadersRenderer, 'render');
    spyOn(colGroupRenderer, 'adjust');
    spyOn(colGroupRenderer, 'render');
    spyOn(rowsRenderer, 'adjust');
    spyOn(rowsRenderer, 'render');
    spyOn(cellsRenderer, 'adjust');
    spyOn(cellsRenderer, 'render');
    spyOn(columnUtils, 'calculateWidths');
    renderer.rowHeaders = rowHeadersRenderer;
    renderer.columnHeaders = columnHeadersRenderer;
    renderer.colGroup = colGroupRenderer;
    renderer.rows = rowsRenderer;
    renderer.cells = cellsRenderer;
    renderer.columnUtils = columnUtils;
    renderer.render();
    expect(rowHeadersRenderer.adjust).toHaveBeenCalledTimes(1);
    expect(columnHeadersRenderer.adjust).toHaveBeenCalledTimes(1);
    expect(colGroupRenderer.adjust).toHaveBeenCalledTimes(1);
    expect(rowsRenderer.adjust).toHaveBeenCalledTimes(1);
    expect(rowHeadersRenderer.render).toHaveBeenCalledTimes(1);
    expect(columnHeadersRenderer.render).toHaveBeenCalledTimes(1);
    expect(colGroupRenderer.render).toHaveBeenCalledTimes(1);
    expect(rowsRenderer.render).toHaveBeenCalledTimes(1);
    expect(cellsRenderer.render).toHaveBeenCalledTimes(1);
    expect(columnUtils.calculateWidths).toHaveBeenCalledTimes(1);
  });
});