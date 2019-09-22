"use strict";

exports.__esModule = true;

var _renderer = _interopRequireDefault(require("./renderer"));

exports.BorderRenderer = _renderer.default;

var _optimizePath = _interopRequireDefault(require("./svg/optimizePath"));

exports.svgOptimizePath = _optimizePath.default;

var _pathsRenderer = _interopRequireDefault(require("./svg/pathsRenderer"));

exports.getSvgPathsRenderer = _pathsRenderer.default;

var _resizer = _interopRequireDefault(require("./svg/resizer"));

exports.getSvgResizer = _resizer.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }