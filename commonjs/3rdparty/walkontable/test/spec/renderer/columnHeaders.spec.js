"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

describe('Walkontable.Renderer.ColumnHeadersRenderer', function () {
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

  function createRenderer() {
    var rootNode = document.createElement('thead');
    var tableMock = new TableRendererMock();
    var renderer = new Walkontable.Renderer.ColumnHeadersRenderer(rootNode);
    renderer.setTable(tableMock);
    return {
      renderer: renderer,
      tableMock: tableMock,
      rootNode: rootNode
    };
  }

  it('should generate as many TR (with TH) as the `columnHeadersCount`, `rowHeadersCount` and `columnsToRender` is set', function () {
    var _createRenderer = createRenderer(),
        renderer = _createRenderer.renderer,
        tableMock = _createRenderer.tableMock,
        rootNode = _createRenderer.rootNode;

    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 1;
    tableMock.columnHeaderFunctions = [function (sourceColumnIndex, TH) {
      TH.innerHTML = '1';
    }, function (sourceColumnIndex, TH) {
      TH.innerHTML = '1';
    }];
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <thead>\n        <tr>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n        </tr>\n        <tr>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n        </tr>\n      </thead>\n      ");
    tableMock.columnsToRender = 1;
    tableMock.columnHeadersCount = 1;
    tableMock.rowHeadersCount = 1;
    tableMock.columnHeaderFunctions = [function (sourceColumnIndex, TH) {
      TH.innerHTML = '2';
    }];
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <thead>\n        <tr>\n          <th class=\"\">2</th>\n          <th class=\"\">2</th>\n        </tr>\n      </thead>\n      ");
    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 1;
    tableMock.rowHeadersCount = 0;
    tableMock.columnHeaderFunctions = [function (sourceColumnIndex, TH) {
      TH.innerHTML = '3';
    }];
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <thead>\n        <tr>\n          <th class=\"\">3</th>\n          <th class=\"\">3</th>\n        </tr>\n      </thead>\n      ");
    tableMock.columnsToRender = 0;
    tableMock.columnHeadersCount = 0;
    tableMock.rowHeadersCount = 0;
    tableMock.columnHeaderFunctions = [];
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <thead>\n        <tr></tr>\n      </thead>\n      ");
    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 0;
    tableMock.columnHeaderFunctions = [function (sourceColumnIndex, TH) {
      TH.innerHTML = '4';
    }, function (sourceColumnIndex, TH) {
      TH.innerHTML = '4';
    }];
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <thead>\n        <tr>\n          <th class=\"\">4</th>\n          <th class=\"\">4</th>\n        </tr>\n        <tr>\n          <th class=\"\">4</th>\n          <th class=\"\">4</th>\n        </tr>\n      </thead>\n      ");
  });
  it('should reuse previously created elements on next render cycle', function () {
    var _createRenderer2 = createRenderer(),
        renderer = _createRenderer2.renderer,
        tableMock = _createRenderer2.tableMock,
        rootNode = _createRenderer2.rootNode;

    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 1;
    tableMock.columnHeaderFunctions = [function (sourceColumnIndex, TH) {
      TH.innerHTML = '1';
    }, function (sourceColumnIndex, TH) {
      TH.innerHTML = '1';
    }];
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <thead>\n        <tr>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n        </tr>\n        <tr>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n          <th class=\"\">1</th>\n        </tr>\n      </thead>\n      ");
    var prevChildren = rootNode.children;
    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 0;
    tableMock.columnHeaderFunctions = [function (sourceColumnIndex, TH) {
      TH.innerHTML = '2';
    }, function (sourceColumnIndex, TH) {
      TH.innerHTML = '2';
    }];
    renderer.adjust();
    renderer.render();
    expect(rootNode.children[0]).toBe(prevChildren[0]);
    expect(rootNode.children[1]).toBe(prevChildren[1]);
    expect(rootNode.children[0].children[0]).toBe(prevChildren[0].children[0]);
    expect(rootNode.children[0].children[1]).toBe(prevChildren[0].children[1]);
    expect(rootNode.children[1].children[0]).toBe(prevChildren[1].children[0]);
    expect(rootNode.children[1].children[1]).toBe(prevChildren[1].children[1]);
  });
  it('should reuse previously created elements when offset is changed', function () {
    var _createRenderer3 = createRenderer(),
        renderer = _createRenderer3.renderer,
        tableMock = _createRenderer3.tableMock,
        rootNode = _createRenderer3.rootNode;

    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 1;
    tableMock.columnHeaderFunctions = [function () {}, function () {}];
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <thead>\n        <tr>\n          <th class=\"\"></th>\n          <th class=\"\"></th>\n          <th class=\"\"></th>\n        </tr>\n        <tr>\n          <th class=\"\"></th>\n          <th class=\"\"></th>\n          <th class=\"\"></th>\n        </tr>\n      </thead>\n      ");
    var prevChildren = rootNode.children;
    spyOn(tableMock, 'renderedColumnToSource').and.callFake(function (index) {
      return index + 10;
    });
    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 0;
    tableMock.columnHeaderFunctions = [function () {}, function () {}];
    renderer.adjust();
    renderer.render();
    expect(rootNode.children[0]).toBe(prevChildren[0]);
    expect(rootNode.children[1]).toBe(prevChildren[1]);
    expect(rootNode.children[0].children[0]).toBe(prevChildren[0].children[0]);
    expect(rootNode.children[0].children[1]).toBe(prevChildren[0].children[1]);
    expect(rootNode.children[1].children[0]).toBe(prevChildren[1].children[0]);
    expect(rootNode.children[1].children[1]).toBe(prevChildren[1].children[1]);
  });
  it('should call column headers renderers with valid arguments', function () {
    var _createRenderer4 = createRenderer(),
        renderer = _createRenderer4.renderer,
        tableMock = _createRenderer4.tableMock;

    var headerRenderer1 = jasmine.createSpy();
    var headerRenderer2 = jasmine.createSpy();
    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 1;
    tableMock.columnHeaderFunctions = [headerRenderer1, headerRenderer2];
    renderer.adjust();
    renderer.render();
    expect(headerRenderer1.calls.argsFor(0)).toEqual([-1, jasmine.any(HTMLTableCellElement), 0]);
    expect(headerRenderer1.calls.argsFor(1)).toEqual([0, jasmine.any(HTMLTableCellElement), 0]);
    expect(headerRenderer1.calls.argsFor(2)).toEqual([1, jasmine.any(HTMLTableCellElement), 0]);
    expect(headerRenderer2.calls.argsFor(0)).toEqual([-1, jasmine.any(HTMLTableCellElement), 1]);
    expect(headerRenderer2.calls.argsFor(1)).toEqual([0, jasmine.any(HTMLTableCellElement), 1]);
    expect(headerRenderer2.calls.argsFor(2)).toEqual([1, jasmine.any(HTMLTableCellElement), 1]);
  });
  it('should call column headers renderers with valid arguments when offset is applied', function () {
    var _createRenderer5 = createRenderer(),
        renderer = _createRenderer5.renderer,
        tableMock = _createRenderer5.tableMock;

    var headerRenderer1 = jasmine.createSpy();
    var headerRenderer2 = jasmine.createSpy();
    tableMock.columnsToRender = 2;
    tableMock.columnHeadersCount = 2;
    tableMock.rowHeadersCount = 1;
    tableMock.columnHeaderFunctions = [headerRenderer1, headerRenderer2];
    spyOn(tableMock, 'renderedColumnToSource').and.callFake(function (index) {
      return index + 10;
    });
    renderer.adjust();
    renderer.render();
    expect(headerRenderer1.calls.argsFor(0)).toEqual([9, jasmine.any(HTMLTableCellElement), 0]);
    expect(headerRenderer1.calls.argsFor(1)).toEqual([10, jasmine.any(HTMLTableCellElement), 0]);
    expect(headerRenderer1.calls.argsFor(2)).toEqual([11, jasmine.any(HTMLTableCellElement), 0]);
    expect(headerRenderer2.calls.argsFor(0)).toEqual([9, jasmine.any(HTMLTableCellElement), 1]);
    expect(headerRenderer2.calls.argsFor(1)).toEqual([10, jasmine.any(HTMLTableCellElement), 1]);
    expect(headerRenderer2.calls.argsFor(2)).toEqual([11, jasmine.any(HTMLTableCellElement), 1]);
  });
});