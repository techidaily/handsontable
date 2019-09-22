"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = mergeOverlappingLines;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
This file contains refactored excerpts from:

Maker.js
https://github.com/Microsoft/maker.js

Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
*/

/**
 * Reduce redundancy by combining multiple overlapping lines into a single line.
 *
 * @param {Array.<Array.<number>>>} lines SVG Path data in format `[[x1, y1, x2, y2], ...]`
 * @returns {Array.<Array.<number>>>} SVG Path data in the same format as input, but you can expect fewer lines if possible
 */
function mergeOverlappingLines(lines) {
  var newLines = [];
  var similarities = new Map();

  for (var i = 0; i < lines.length; i++) {
    var pathContext = lines[i];
    var isHorizontal = pathContext[1] === pathContext[3];
    var key = isHorizontal ? "h-".concat(pathContext[1]) : "v-".concat(pathContext[0]); // group horizontal lines by Y, vertical lines by X

    var found = similarities.get(key);

    if (found) {
      found.push(pathContext);
    } else {
      similarities.set(key, [pathContext]);
    }
  }

  similarities.forEach(function (value) {
    if (value.length > 1) {
      // merge
      newLines.push.apply(newLines, _toConsumableArray(checkForOverlaps(value)));
    } else {
      // no merge needed
      newLines.push(value[0]);
    }
  });
  return newLines;
}
/**
 * @private
 */


function checkForOverlaps(walkedPaths) {
  var currIndex = 0;

  do {
    var root = walkedPaths[currIndex];
    var isHorizontal = root[1] === root[3];
    var overlaps = void 0;

    do {
      overlaps = false;

      for (var i = currIndex + 1; i < walkedPaths.length; i++) {
        var walkedPath = walkedPaths[i];

        if (!walkedPath.deleted) {
          overlaps = isLineOverlapping(root, walkedPath);

          if (overlaps) {
            var m = modelExtents(root, walkedPath);

            if (!isHorizontal) {
              // vertical
              root[1] = m.low[1];
              root[3] = m.high[1];
            } else {
              // horizontal
              root[0] = m.low[0];
              root[2] = m.high[0];
            }

            walkedPath.deleted = true;
            break;
          }
        }
      }
    } while (overlaps);

    currIndex += 1;
  } while (currIndex < walkedPaths.length);

  return walkedPaths.filter(function (x) {
    return !x.deleted;
  });
}
/**
 * @private
 */


function isPointOnLine(pointX, pointY, line) {
  if (isBetween(pointX, line[0], line[2])) {
    return isBetween(pointY, line[1], line[3]);
  }

  return false;
}
/**
 * Check for line overlapping another line.
 *
 * @private
 * @param lineA The line to test.
 * @param lineB The line to check for overlap.
 * @returns Boolean true if lineA is overlapped with lineB.
 */


function isLineOverlapping(lineA, lineB) {
  return isPointOnLine(lineB[0], lineB[1], lineA) || isPointOnLine(lineB[2], lineB[3], lineA);
}
/**
 * Check if a given number is between two given limits.
 *
 * @private
 * @param valueInQuestion The number to test.
 * @param limitA First limit.
 * @param limitB Second limit.
 * @returns Boolean true if value is between (or equal to) the limits.
 */


function isBetween(valueInQuestion, limitA, limitB) {
  if (limitB > limitA) {
    return valueInQuestion >= limitA && valueInQuestion <= limitB;
  }

  return valueInQuestion >= limitB && valueInQuestion <= limitA;
}
/**
 * Measures the smallest rectangle which contains a model.
 *
 * @private
 * @returns object with low and high points.
 */


function modelExtents(lineA, lineB) {
  var extentsA = pathExtents(lineA);
  var extentsB = pathExtents(lineB);
  return increase(extentsA, extentsB);
}
/**
 * Calculates the smallest rectangle which contains a path.
 *
 * @private
 * @param pathToMeasure The path to measure.
 * @returns object with low and high points.
 */


function pathExtents(pathToMeasure) {
  return {
    low: getExtremePoint(pathToMeasure, Math.min),
    high: getExtremePoint(pathToMeasure, Math.max)
  };
}
/**
 * @private
 */


function getExtremePoint(line, fn) {
  return [fn(line[0], line[2]), fn(line[1], line[3])];
}
/**
 * Increase a measurement by an additional measurement.
 *
 * @private
 * @param baseMeasure The measurement to increase.
 * @param addMeasure The additional measurement.
 * @returns The increased original measurement (for cascading).
 */


function increase(baseMeasure, addMeasure) {
  getExtreme(baseMeasure.low, addMeasure.low, Math.min);
  getExtreme(baseMeasure.high, addMeasure.high, Math.max);
  return baseMeasure;
}
/**
 * @private
 */


function getExtreme(basePoint, newPoint, fn) {
  basePoint[0] = fn(basePoint[0], newPoint[0]);
  basePoint[1] = fn(basePoint[1], newPoint[1]);
}