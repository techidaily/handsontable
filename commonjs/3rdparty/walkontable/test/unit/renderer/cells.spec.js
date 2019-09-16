"use strict";

var _cells = _interopRequireDefault(require("walkontable/renderer/cells"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRenderer() {
  var renderer = new _cells.default();
  return {
    renderer: renderer
  };
}

describe('CellsRenderer', function () {
  it('should be correctly setup', function () {
    var _createRenderer = createRenderer(),
        renderer = _createRenderer.renderer;

    expect(renderer.nodeType).toBe('TD');
    expect(renderer.sourceRowIndex).toBe(0);
  });
});