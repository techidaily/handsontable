"use strict";

var _rowHeaders = _interopRequireDefault(require("walkontable/renderer/rowHeaders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRenderer() {
  var renderer = new _rowHeaders.default();
  return {
    renderer: renderer
  };
}

describe('RowHeadersRenderer', function () {
  it('should be correctly setup', function () {
    var _createRenderer = createRenderer(),
        renderer = _createRenderer.renderer;

    expect(renderer.nodeType).toBe('TH');
    expect(renderer.sourceRowIndex).toBe(0);
  });
});