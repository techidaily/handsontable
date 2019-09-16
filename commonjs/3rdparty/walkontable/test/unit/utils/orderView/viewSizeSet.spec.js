"use strict";

var _viewSizeSet = _interopRequireDefault(require("walkontable/utils/orderView/viewSizeSet"));

var _viewSize = _interopRequireDefault(require("walkontable/utils/orderView/viewSize"));

var _constants = require("walkontable/utils/orderView/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ViewSizeSet', function () {
  it('should be correctly constructed', function () {
    var viewSizeSet = new _viewSizeSet.default();
    expect(viewSizeSet.size).toBeInstanceOf(_viewSize.default);
    expect(viewSizeSet.workingSpace).toBe(_constants.WORKING_SPACE_ALL);
    expect(viewSizeSet.sharedSize).toBe(null);
  });
  it('should set a new size through ViewSize method', function () {
    var viewSizeSet = new _viewSizeSet.default();
    spyOn(viewSizeSet.size, 'setSize');
    viewSizeSet.setSize(5);
    expect(viewSizeSet.size.setSize).toHaveBeenCalledWith(5);
    viewSizeSet.setSize(9);
    expect(viewSizeSet.size.setSize).toHaveBeenCalledWith(9);
  });
  it('should set a new offset through ViewSize method', function () {
    var viewSizeSet = new _viewSizeSet.default();
    spyOn(viewSizeSet.size, 'setOffset');
    viewSizeSet.setOffset(5);
    expect(viewSizeSet.size.setOffset).toHaveBeenCalledWith(5);
    viewSizeSet.setOffset(9);
    expect(viewSizeSet.size.setOffset).toHaveBeenCalledWith(9);
  });
  it('should return ViewSize instance', function () {
    var viewSizeSet = new _viewSizeSet.default();
    expect(viewSizeSet.getViewSize()).toBeInstanceOf(_viewSize.default);
  });
  it('should return `true` when sharedSize property is set', function () {
    var viewSizeSet = new _viewSizeSet.default();
    viewSizeSet.sharedSize = new _viewSize.default();
    expect(viewSizeSet.isShared()).toBe(true);
  });
  it('should return `false` when sharedSize property is not set', function () {
    var viewSizeSet = new _viewSizeSet.default();
    expect(viewSizeSet.isShared()).toBe(false);
    viewSizeSet.sharedSize = 1;
    expect(viewSizeSet.isShared()).toBe(false);
  });
  it('should return boolean confirmation if working place matches to passed constant', function () {
    var viewSizeSet = new _viewSizeSet.default();
    expect(viewSizeSet.isPlaceOn()).toBe(false);
    expect(viewSizeSet.isPlaceOn(null)).toBe(false);
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_ALL)).toBe(true);
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_TOP)).toBe(false);
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_BOTTOM)).toBe(false);
    viewSizeSet.workingSpace = _constants.WORKING_SPACE_TOP;
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_ALL)).toBe(false);
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_TOP)).toBe(true);
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_BOTTOM)).toBe(false);
    viewSizeSet.workingSpace = _constants.WORKING_SPACE_BOTTOM;
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_ALL)).toBe(false);
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_TOP)).toBe(false);
    expect(viewSizeSet.isPlaceOn(_constants.WORKING_SPACE_BOTTOM)).toBe(true);
  });
  it('should append shared ViewSizeSet to current instance and mark this internally in both instances', function () {
    var viewSizeSet = new _viewSizeSet.default();
    var sharedViewSizeSet = new _viewSizeSet.default();
    viewSizeSet.append(sharedViewSizeSet);
    expect(viewSizeSet.workingSpace).toBe(1); // top space

    expect(sharedViewSizeSet.workingSpace).toBe(2); // bottom space

    expect(viewSizeSet.sharedSize).toBe(sharedViewSizeSet.size);
  });
  it('should prepend shared ViewSizeSet to current instance and mark this internally in both instances', function () {
    var viewSizeSet = new _viewSizeSet.default();
    var sharedViewSizeSet = new _viewSizeSet.default();
    viewSizeSet.prepend(sharedViewSizeSet);
    expect(viewSizeSet.workingSpace).toBe(2); // bottom space

    expect(sharedViewSizeSet.workingSpace).toBe(1); // top space

    expect(viewSizeSet.sharedSize).toBe(sharedViewSizeSet.size);
  });
});