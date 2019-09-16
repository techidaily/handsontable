"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

describe('Walkontable.Renderer.RowsRenderer', function () {
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
    }]);

    return TableRendererMock;
  }();

  function createRenderer() {
    var rootNode = document.createElement('tbody');
    var tableMock = new TableRendererMock();
    var renderer = new Walkontable.Renderer.RowsRenderer(rootNode);
    renderer.setTable(tableMock);
    return {
      renderer: renderer,
      tableMock: tableMock,
      rootNode: rootNode
    };
  }

  it('should generate as many rows as the `rowsToRender` is set', function () {
    var _createRenderer = createRenderer(),
        renderer = _createRenderer.renderer,
        tableMock = _createRenderer.tableMock,
        rootNode = _createRenderer.rootNode;

    tableMock.rowsToRender = 5;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n      </tbody>\n      ");
    tableMock.rowsToRender = 3;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n      </tbody>\n      ");
    tableMock.rowsToRender = 0;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody></tbody>\n      ");
    tableMock.rowsToRender = 1;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr></tr>\n      </tbody>\n      ");
  });
  it('should reuse previously created elements on next render cycle', function () {
    var _createRenderer2 = createRenderer(),
        renderer = _createRenderer2.renderer,
        tableMock = _createRenderer2.tableMock,
        rootNode = _createRenderer2.rootNode;

    tableMock.rowsToRender = 3;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n      </tbody>\n      ");
    var prevChildren = rootNode.children;
    tableMock.rowsToRender = 5;
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

    tableMock.rowsToRender = 3;
    renderer.adjust();
    renderer.render();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tbody>\n        <tr></tr>\n        <tr></tr>\n        <tr></tr>\n      </tbody>\n      ");
    var prevChildren = rootNode.children;
    spyOn(tableMock, 'renderedRowToSource').and.callFake(function (index) {
      return index + 10;
    });
    renderer.adjust();
    renderer.render();
    expect(rootNode.children[0]).toBe(prevChildren[0]);
    expect(rootNode.children[1]).toBe(prevChildren[1]);
    expect(rootNode.children[2]).toBe(prevChildren[2]);
  });
  it('should return all rendered nodes using `getRenderedNode` method', function () {
    var _createRenderer4 = createRenderer(),
        renderer = _createRenderer4.renderer,
        tableMock = _createRenderer4.tableMock,
        rootNode = _createRenderer4.rootNode;

    tableMock.rowsToRender = 3;
    renderer.adjust();
    renderer.render();
    var children = rootNode.children;
    expect(renderer.getRenderedNode(0)).toBe(children[0]);
    expect(renderer.getRenderedNode(1)).toBe(children[1]);
    expect(renderer.getRenderedNode(2)).toBe(children[2]);
    expect(renderer.getRenderedNode(3)).toBe(null);
  });
});