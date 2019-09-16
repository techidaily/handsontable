"use strict";

var _viewSize = _interopRequireDefault(require("walkontable/utils/orderView/viewSize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ViewSize', function () {
  it('should be correctly constructed', function () {
    var viewSize = new _viewSize.default();
    expect(viewSize.currentSize).toBe(0);
    expect(viewSize.nextSize).toBe(0);
    expect(viewSize.currentOffset).toBe(0);
    expect(viewSize.nextOffset).toBe(0);
  });
  it('should save previous size after setting a new size', function () {
    var viewSize = new _viewSize.default();
    viewSize.setSize(5);
    expect(viewSize.currentSize).toBe(0);
    expect(viewSize.nextSize).toBe(5);
    viewSize.setSize(9);
    expect(viewSize.currentSize).toBe(5);
    expect(viewSize.nextSize).toBe(9);
    viewSize.setSize(19);
    expect(viewSize.currentSize).toBe(9);
    expect(viewSize.nextSize).toBe(19);
  });
  it('should save previous offset after setting a new offset', function () {
    var viewSize = new _viewSize.default();
    viewSize.setOffset(5);
    expect(viewSize.currentOffset).toBe(0);
    expect(viewSize.nextOffset).toBe(5);
    viewSize.setOffset(9);
    expect(viewSize.currentOffset).toBe(5);
    expect(viewSize.nextOffset).toBe(9);
    viewSize.setOffset(19);
    expect(viewSize.currentOffset).toBe(9);
    expect(viewSize.nextOffset).toBe(19);
  });
});