"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

describe('Walkontable.Renderer.CellsRenderer', function () {
  var TableRendererMock =
  /*#__PURE__*/
  function () {
    function TableRendererMock() {
      _classCallCheck(this, TableRendererMock);

      this.rootDocument = document;
    }

    _createClass(TableRendererMock, [{
      key: "renderedRowToSource",
      value: function renderedRowToSource(visibleRowIndex) {
        return visibleRowIndex;
      }
    }, {
      key: "renderedColumnToSource",
      value: function renderedColumnToSource(visibleColumnIndex) {
        return visibleColumnIndex;
      }
    }]);

    return TableRendererMock;
  }();

  function createRenderer() {
    var rootNode = document.createElement('tbody');
    var tableMock = new TableRendererMock();
    var rowsRenderer = new Walkontable.Renderer.RowsRenderer(rootNode);
    var rowHeadersRenderer = new Walkontable.Renderer.RowHeadersRenderer();
    var cellsRenderer = new Walkontable.Renderer.CellsRenderer();
    rowsRenderer.setTable(tableMock);
    tableMock.rows = rowsRenderer;
    cellsRenderer.setTable(tableMock);
    tableMock.cells = cellsRenderer;
    rowHeadersRenderer.setTable(tableMock);
    tableMock.rowHeaders = rowHeadersRenderer;
    return {
      rowHeadersRenderer: rowHeadersRenderer,
      rowsRenderer: rowsRenderer,
      cellsRenderer: cellsRenderer,
      tableMock: tableMock,
      rootNode: rootNode
    };
  }

  it('should not generate any cells', function () {
    var _createRenderer = createRenderer(),
        rowHeadersRenderer = _createRenderer.rowHeadersRenderer,
        rowsRenderer = _createRenderer.rowsRenderer,
        cellsRenderer = _createRenderer.cellsRenderer,
        tableMock = _createRenderer.tableMock,
        rootNode = _createRenderer.rootNode;

    tableMock.rowsToRender = 5;
    tableMock.columnsToRender = 0;
    tableMock.rowHeadersCount = 0;
    rowsRenderer.adjust();
    rowHeadersRenderer.adjust();
    cellsRenderer.adjust();
    rowsRenderer.render();
    rowHeadersRenderer.render();
    cellsRenderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n      </tbody>\n      ");
  });
  it('should generate as many cells as `columnsToRender` is set', function () {
    var _createRenderer2 = createRenderer(),
        rowHeadersRenderer = _createRenderer2.rowHeadersRenderer,
        rowsRenderer = _createRenderer2.rowsRenderer,
        cellsRenderer = _createRenderer2.cellsRenderer,
        tableMock = _createRenderer2.tableMock,
        rootNode = _createRenderer2.rootNode;

    var headerRenderer1 = jasmine.createSpy();
    var cellRenderer = jasmine.createSpy();
    tableMock.rowsToRender = 2;
    tableMock.columnsToRender = 2;
    tableMock.rowHeadersCount = 1;
    tableMock.rowHeaderFunctions = [headerRenderer1];
    tableMock.cellRenderer = cellRenderer;
    rowsRenderer.adjust();
    rowHeadersRenderer.adjust();
    cellsRenderer.adjust();
    rowsRenderer.render();
    rowHeadersRenderer.render();
    cellsRenderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr>\n          <th class=\"\"></th>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n        </tr>\n        <tr>\n          <th class=\"\"></th>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n        </tr>\n      </tbody>\n      ");
    expect(cellRenderer.calls.argsFor(0)).toEqual([0, 0, jasmine.any(HTMLElement)]);
    expect(cellRenderer.calls.argsFor(1)).toEqual([0, 1, jasmine.any(HTMLElement)]);
    expect(cellRenderer.calls.argsFor(2)).toEqual([1, 0, jasmine.any(HTMLElement)]);
    expect(cellRenderer.calls.argsFor(3)).toEqual([1, 1, jasmine.any(HTMLElement)]);
    expect(cellRenderer).toHaveBeenCalledTimes(4);
  });
  it('should generate cells properly after rerendering the cells from 0 to N cells', function () {
    var _createRenderer3 = createRenderer(),
        rowHeadersRenderer = _createRenderer3.rowHeadersRenderer,
        rowsRenderer = _createRenderer3.rowsRenderer,
        cellsRenderer = _createRenderer3.cellsRenderer,
        tableMock = _createRenderer3.tableMock,
        rootNode = _createRenderer3.rootNode;

    var cellRenderer = jasmine.createSpy();
    tableMock.rowsToRender = 2;
    tableMock.columnsToRender = 0;
    tableMock.rowHeadersCount = 0;
    tableMock.cellRenderer = cellRenderer;
    rowsRenderer.adjust();
    rowHeadersRenderer.adjust();
    cellsRenderer.adjust();
    rowsRenderer.render();
    rowHeadersRenderer.render();
    cellsRenderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr></tr>\n        <tr></tr>\n      </tbody>\n      ");
    tableMock.columnsToRender = 3;
    rowsRenderer.adjust();
    rowHeadersRenderer.adjust();
    cellsRenderer.adjust();
    rowsRenderer.render();
    rowHeadersRenderer.render();
    cellsRenderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n        </tr>\n        <tr>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n        </tr>\n      </tbody>\n      ");
  });
  it('should reuse cell elements after next render call', function () {
    var _createRenderer4 = createRenderer(),
        rowHeadersRenderer = _createRenderer4.rowHeadersRenderer,
        rowsRenderer = _createRenderer4.rowsRenderer,
        cellsRenderer = _createRenderer4.cellsRenderer,
        tableMock = _createRenderer4.tableMock,
        rootNode = _createRenderer4.rootNode;

    var cellRenderer = jasmine.createSpy();
    tableMock.rowsToRender = 2;
    tableMock.columnsToRender = 3;
    tableMock.rowHeadersCount = 0;
    tableMock.rowHeaderFunctions = [];
    tableMock.cellRenderer = cellRenderer;
    rowsRenderer.adjust();
    rowHeadersRenderer.adjust();
    cellsRenderer.adjust();
    rowsRenderer.render();
    rowHeadersRenderer.render();
    cellsRenderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n        </tr>\n        <tr>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n          <td class=\"\"></td>\n        </tr>\n      </tbody>\n      ");
    var tdsForTr1 = rootNode.childNodes[0].childNodes;
    var tdsForTr2 = rootNode.childNodes[1].childNodes;
    rowsRenderer.adjust();
    rowHeadersRenderer.adjust();
    cellsRenderer.adjust();
    rowsRenderer.render();
    rowHeadersRenderer.render();
    cellsRenderer.render();
    expect(rootNode.childNodes[0].childNodes[0]).toBe(tdsForTr1[0]);
    expect(rootNode.childNodes[0].childNodes[1]).toBe(tdsForTr1[1]);
    expect(rootNode.childNodes[0].childNodes[2]).toBe(tdsForTr1[2]);
    expect(rootNode.childNodes[1].childNodes[0]).toBe(tdsForTr2[0]);
    expect(rootNode.childNodes[1].childNodes[1]).toBe(tdsForTr2[1]);
    expect(rootNode.childNodes[1].childNodes[2]).toBe(tdsForTr2[2]);
  });
});