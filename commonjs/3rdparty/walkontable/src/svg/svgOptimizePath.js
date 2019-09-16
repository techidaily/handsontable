"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = svgOptimizePath;

var _index = require("../../../makerjs/index");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function svgOptimizePath(lines) {
  // copied from https://observablehq.com/@forresto/maker-js-svg-path-simplify
  var makerModel = {
    paths: {}
  };

  for (var ii = 0; ii < lines.length; ii++) {
    var _lines$ii = _slicedToArray(lines[ii], 4),
        x1 = _lines$ii[0],
        y1 = _lines$ii[1],
        x2 = _lines$ii[2],
        y2 = _lines$ii[3];

    makerModel.paths["p_".concat(ii)] = {
      end: [x2, -y2],
      origin: [x1, -y1]
    };
  }

  _index.MakerJs.model.simplify(makerModel); // remove redundant points


  var pathDatas = (0, _index.getPathDataByLayer)(makerModel); // remove redundant move commands

  var optimizedPathString = pathDatas.join(' ');

  if (optimizedPathString[optimizedPathString.length - 1] !== 'Z') {
    var allPositions = optimizedPathString.split(' ').filter(function (x) {
      return x !== '' && isFinite(x);
    }); // isFinite returns true if value is numeric

    optimizedPathString += " M ".concat(allPositions[allPositions.length - 4], " ").concat(allPositions[allPositions.length - 3], " Z");
  }

  return optimizedPathString;
}