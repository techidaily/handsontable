"use strict";

var _nodesPool = _interopRequireDefault(require("walkontable/utils/nodesPool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('NodesPool', function () {
  it('should be correctly constructed', function () {
    var nodePool = new _nodesPool.default('div');
    expect(nodePool.nodeType).toBe('DIV');
  });
  it('should set root document object through `setRootDocument` method', function () {
    var nodePool = new _nodesPool.default('div');
    var rootDocument = document;
    nodePool.setRootDocument(rootDocument);
    expect(nodePool.rootDocument).toBe(rootDocument);
  });
  it('should obtain an element based on defined node type', function () {
    var nodePool = new _nodesPool.default('div');
    var rootDocument = document;
    nodePool.setRootDocument(rootDocument);
    expect(nodePool.obtain().tagName).toBe('DIV');
  });
});