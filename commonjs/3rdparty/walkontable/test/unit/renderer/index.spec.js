"use strict";

var _renderer = require("walkontable/renderer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createRenderer() {
  var TABLE = document.createElement('table');
  var THEAD = document.createElement('thead');
  var COLGROUP = document.createElement('colgroup');
  var TBODY = document.createElement('tbody');
  var rowUtils = new function RowUtils() {
    _classCallCheck(this, RowUtils);
  }();
  var columnUtils = new function ColumnUtils() {
    _classCallCheck(this, ColumnUtils);
  }();

  var cellRenderer = function cellRenderer() {};

  var renderer = new _renderer.Renderer({
    TABLE: TABLE,
    THEAD: THEAD,
    COLGROUP: COLGROUP,
    TBODY: TBODY,
    rowUtils: rowUtils,
    columnUtils: columnUtils,
    cellRenderer: cellRenderer
  });
  return {
    renderer: renderer,
    TABLE: TABLE,
    THEAD: THEAD,
    COLGROUP: COLGROUP,
    TBODY: TBODY,
    rowUtils: rowUtils,
    columnUtils: columnUtils,
    cellRenderer: cellRenderer
  };
}

describe('TableRenderer', function () {
  it('should be correctly setup', function () {
    var _createRenderer = createRenderer(),
        renderer = _createRenderer.renderer;

    expect(renderer.renderer).toBeInstanceOf(_renderer.TableRenderer);
  });
  it('should set `rowFilter` and `columnFilter` properties through TableRenderer `setFilters` method', function () {
    var _createRenderer2 = createRenderer(),
        renderer = _createRenderer2.renderer;

    spyOn(renderer.renderer, 'setFilters');
    var rowFilter = new function RowFilter() {
      _classCallCheck(this, RowFilter);
    }();
    var columnFilter = new function ColumnFilter() {
      _classCallCheck(this, ColumnFilter);
    }();
    var result = renderer.setFilters(rowFilter, columnFilter);
    expect(result).toBe(renderer);
    expect(renderer.renderer.setFilters).toHaveBeenCalledWith(rowFilter, columnFilter);
  });
  it('should set `rowsCount` and `columnsCount` properties through TableRenderer `setViewportSize` method', function () {
    var _createRenderer3 = createRenderer(),
        renderer = _createRenderer3.renderer;

    spyOn(renderer.renderer, 'setViewportSize');
    var result = renderer.setViewportSize(3, 6);
    expect(result).toBe(renderer);
    expect(renderer.renderer.setViewportSize).toHaveBeenCalledWith(3, 6);
  });
  it('should set `rowHeaders` and `columnsHeaders` properties through TableRenderer `setHeaderContentRenderers` method', function () {
    var _createRenderer4 = createRenderer(),
        renderer = _createRenderer4.renderer;

    spyOn(renderer.renderer, 'setHeaderContentRenderers');
    var rowHeaders = [function () {}];
    var columnsHeaders = [function () {}];
    var result = renderer.setHeaderContentRenderers(rowHeaders, columnsHeaders);
    expect(result).toBe(renderer);
    expect(renderer.renderer.setHeaderContentRenderers).toHaveBeenCalledWith(rowHeaders, columnsHeaders);
  });
  it('should call `render` method through TableRenderer module', function () {
    var _createRenderer5 = createRenderer(),
        renderer = _createRenderer5.renderer;

    spyOn(renderer.renderer, 'render');
    renderer.render();
    expect(renderer.renderer.render).toHaveBeenCalledTimes(1);
  });
});