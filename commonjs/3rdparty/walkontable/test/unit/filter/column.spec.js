"use strict";

var _column = _interopRequireDefault(require("walkontable/filter/column"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ColumnFilter', function () {
  describe('offsettedTH', function () {
    it('should do nothing if row header is not visible', function () {
      var filter = new _column.default();
      filter.countTH = 0;
      expect(filter.offsettedTH(1)).toEqual(1);
    });
    it('should decrease n by 1 if row header is visible', function () {
      var filter = new _column.default();
      filter.countTH = 1;
      expect(filter.offsettedTH(1)).toEqual(0);
    });
  });
  describe('unOffsettedTH', function () {
    it('should do nothing if row header is not visible', function () {
      var filter = new _column.default();
      filter.countTH = 0;
      expect(filter.unOffsettedTH(1)).toEqual(1);
    });
    it('should increase n by 1 if row header is visible', function () {
      var filter = new _column.default();
      filter.countTH = 1;
      expect(filter.unOffsettedTH(0)).toEqual(1);
    });
  });
});