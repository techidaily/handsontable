"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

describe('Walkontable.Renderer.ColGroupRenderer', function () {
  var TableRendererMock =
  /*#__PURE__*/
  function () {
    function TableRendererMock() {
      _classCallCheck(this, TableRendererMock);

      this.rootDocument = document;
    }

    _createClass(TableRendererMock, [{
      key: "renderedColumnToSource",
      value: function renderedColumnToSource(visibleColumnIndex) {
        return visibleColumnIndex;
      }
    }]);

    return TableRendererMock;
  }();

  var ColumnUtilsMock =
  /*#__PURE__*/
  function () {
    function ColumnUtilsMock() {
      _classCallCheck(this, ColumnUtilsMock);
    }

    _createClass(ColumnUtilsMock, [{
      key: "getStretchedColumnWidth",
      value: function getStretchedColumnWidth() {
        return 100;
      }
    }, {
      key: "getHeaderWidth",
      value: function getHeaderWidth() {
        return 100;
      }
    }]);

    return ColumnUtilsMock;
  }();

  function createRenderer() {
    var rootNode = document.createElement('colgroup');
    var tableMock = new TableRendererMock();
    var columnUtilsMock = new ColumnUtilsMock();
    var renderer = new Walkontable.Renderer.ColGroupRenderer(rootNode);
    tableMock.columnUtils = columnUtilsMock;
    renderer.setTable(tableMock);
    return {
      renderer: renderer,
      tableMock: tableMock,
      columnUtilsMock: columnUtilsMock,
      rootNode: rootNode
    };
  }

  it('should generate as many COLs as the `columnsToRender` and `rowHeadersCount` is set', function () {
    var _createRenderer = createRenderer(),
        renderer = _createRenderer.renderer,
        tableMock = _createRenderer.tableMock,
        rootNode = _createRenderer.rootNode;

    tableMock.columnsToRender = 5;
    tableMock.rowHeadersCount = 1;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n      </colgroup>\n      ");
    tableMock.columnsToRender = 3;
    tableMock.rowHeadersCount = 1;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n      </colgroup>\n      ");
    tableMock.columnsToRender = 3;
    tableMock.rowHeadersCount = 0;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n      </colgroup>\n      ");
    tableMock.columnsToRender = 0;
    tableMock.rowHeadersCount = 0;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup></colgroup>\n      ");
    tableMock.columnsToRender = 0;
    tableMock.rowHeadersCount = 1;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 100px;\">\n      </colgroup>\n      ");
  });
  it('should reuse previously created elements on next render cycle', function () {
    var _createRenderer2 = createRenderer(),
        renderer = _createRenderer2.renderer,
        tableMock = _createRenderer2.tableMock,
        rootNode = _createRenderer2.rootNode;

    tableMock.columnsToRender = 5;
    tableMock.rowHeadersCount = 1;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n      </colgroup>\n      ");
    var prevChildren = rootNode.children;
    tableMock.columnsToRender = 2;
    tableMock.rowHeadersCount = 1;
    renderer.adjust();
    renderer.render();
    expect(rootNode.children[0]).toBe(prevChildren[0]);
    expect(rootNode.children[1]).toBe(prevChildren[1]);
    expect(rootNode.children[2]).toBe(prevChildren[2]);
  });
  it('should reuse previously created elements when offset is changed', function () {
    var _createRenderer3 = createRenderer(),
        renderer = _createRenderer3.renderer,
        tableMock = _createRenderer3.tableMock,
        rootNode = _createRenderer3.rootNode;

    tableMock.columnsToRender = 2;
    tableMock.rowHeadersCount = 1;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 100px;\">\n      </colgroup>\n      ");
    var prevChildren = rootNode.children;
    spyOn(tableMock, 'renderedColumnToSource').and.callFake(function (index) {
      return index + 10;
    });
    renderer.adjust();
    renderer.render();
    expect(rootNode.children[0]).toBe(prevChildren[0]);
    expect(rootNode.children[1]).toBe(prevChildren[1]);
    expect(rootNode.children[2]).toBe(prevChildren[2]);
  });
  it('should render column widths', function () {
    var _createRenderer4 = createRenderer(),
        renderer = _createRenderer4.renderer,
        tableMock = _createRenderer4.tableMock,
        rootNode = _createRenderer4.rootNode,
        columnUtilsMock = _createRenderer4.columnUtilsMock;

    spyOn(columnUtilsMock, 'getHeaderWidth').and.callFake(function (sourceColumnIndex) {
      return sourceColumnIndex + 100;
    });
    spyOn(columnUtilsMock, 'getStretchedColumnWidth').and.callFake(function (sourceColumnIndex) {
      return sourceColumnIndex + 100;
    });
    tableMock.columnsToRender = 2;
    tableMock.rowHeadersCount = 2;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 100px;\">\n        <col style=\"width: 101px;\">\n        <col style=\"width: 100px;\">\n        <col style=\"width: 101px;\">\n      </colgroup>\n      ");
  });
  it('should render column widths based on source column index (offseted value)', function () {
    var _createRenderer5 = createRenderer(),
        renderer = _createRenderer5.renderer,
        tableMock = _createRenderer5.tableMock,
        rootNode = _createRenderer5.rootNode,
        columnUtilsMock = _createRenderer5.columnUtilsMock;

    spyOn(tableMock, 'renderedColumnToSource').and.callFake(function (index) {
      return index + 10;
    });
    spyOn(columnUtilsMock, 'getHeaderWidth').and.callFake(function (sourceColumnIndex) {
      return sourceColumnIndex + 100;
    });
    spyOn(columnUtilsMock, 'getStretchedColumnWidth').and.callFake(function (sourceColumnIndex) {
      return sourceColumnIndex + 100;
    });
    tableMock.columnsToRender = 2;
    tableMock.rowHeadersCount = 2;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col class=\"rowHeader\" style=\"width: 110px;\">\n        <col style=\"width: 111px;\">\n        <col style=\"width: 110px;\">\n        <col style=\"width: 111px;\">\n      </colgroup>\n      ");
  });
});