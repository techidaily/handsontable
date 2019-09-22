"use strict";

exports.__esModule = true;
exports.default = svgOptimizePath;

var _mergeOverlappingLines = _interopRequireDefault(require("./mergeOverlappingLines"));

var _groupLinesIntoPolylines = _interopRequireDefault(require("./groupLinesIntoPolylines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simplifies a 2D array of paths by removing redundant points (points that are intermediate on a line)
 * and redundant move commands (moves that can be avoided by correct chaining of the lines)
 *
 * @param {Array.<Array.<number>>>} lines SVG Path data in format `[[x1, y1, x2, y2], ...]`
 * @returns {Array.<Array.<number>>>} SVG Path data in chained format `[[x1, y1, x2, y2, x3, y3, ...], ...]`
 */
function svgOptimizePath(lines) {
  var mergedLines = (0, _mergeOverlappingLines.default)(lines); // remove redundant points

  var polylines = (0, _groupLinesIntoPolylines.default)(mergedLines); // remove redundant move commands

  return polylines;
}