"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _element = require("./../../../helpers/dom/element");

var _selectionHandle = _interopRequireDefault(require("./selectionHandle"));

var _coords = _interopRequireDefault(require("./cell/coords"));

var _range = _interopRequireDefault(require("./cell/range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class Selection
 */
var Selection =
/*#__PURE__*/
function () {
  /**
   * @param {Object} settings
   * @param {CellRange} cellRange
   */
  function Selection(settings, cellRange) {
    _classCallCheck(this, Selection);

    this.settings = settings;
    this.cellRange = cellRange || null;
    this.instanceSelectionHandles = new Map();
    this.classNames = [this.settings.className];
    this.classNameGenerator = this.linearClassNameGenerator(this.settings.className, this.settings.layerLevel);
  }
  /**
   * Returns information if the current selection is configured to display a corner or a selection handle
   */


  _createClass(Selection, [{
    key: "hasSelectionHandle",
    value: function hasSelectionHandle() {
      return this.settings.border && typeof this.settings.border.cornerVisible === 'function';
    }
    /**
     * Each Walkontable clone requires it's own selection handle for every selection. This method creates and returns selection
     * handles per instance
     *
     * @param {Walkontable} wotInstance
     * @returns {SelectionHandle}
     */

  }, {
    key: "getSelectionHandle",
    value: function getSelectionHandle(wotInstance) {
      var found = this.getSelectionHandleIfExists(wotInstance);

      if (found) {
        return found;
      }

      var selectionHandle = new _selectionHandle.default(wotInstance, this.settings);
      this.instanceSelectionHandles.set(wotInstance, selectionHandle);
      return selectionHandle;
    }
    /**
     * Return an existing intance of Border class if defined for a given Walkontable instance
     *
     * @param {Walkontable} wotInstance
     * @returns {SelectionHandle|undefined}
     */

  }, {
    key: "getSelectionHandleIfExists",
    value: function getSelectionHandleIfExists(wotInstance) {
      return this.instanceSelectionHandles.get(wotInstance);
    }
    /**
     * Checks if selection is empty
     *
     * @returns {Boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.cellRange === null;
    }
    /**
     * Adds a cell coords to the selection
     *
     * @param {CellCoords} coords
     */

  }, {
    key: "add",
    value: function add(coords) {
      if (this.isEmpty()) {
        this.cellRange = new _range.default(coords);
      } else {
        this.cellRange.expand(coords);
      }

      return this;
    }
    /**
     * If selection range from or to property equals oldCoords, replace it with newCoords. Return boolean
     * information about success
     *
     * @param {CellCoords} oldCoords
     * @param {CellCoords} newCoords
     * @returns {Boolean}
     */

  }, {
    key: "replace",
    value: function replace(oldCoords, newCoords) {
      if (!this.isEmpty()) {
        if (this.cellRange.from.isEqual(oldCoords)) {
          this.cellRange.from = newCoords;
          return true;
        }

        if (this.cellRange.to.isEqual(oldCoords)) {
          this.cellRange.to = newCoords;
          return true;
        }
      }

      return false;
    }
    /**
     * Clears selection
     *
     * @returns {Selection}
     */

  }, {
    key: "clear",
    value: function clear() {
      this.cellRange = null;
      return this;
    }
    /**
     * Returns the top left (TL) and bottom right (BR) selection coordinates
     *
     * @returns {Array} Returns array of coordinates for example `[1, 1, 5, 5]`
     */

  }, {
    key: "getCorners",
    value: function getCorners() {
      var topLeft = this.cellRange.getTopLeftCorner();
      var bottomRight = this.cellRange.getBottomRightCorner();
      return [topLeft.row, topLeft.col, bottomRight.row, bottomRight.col];
    }
    /**
     * Adds class name to cell element at given coords
     *
     * @param {Walkontable} wotInstance Walkontable instance
     * @param {Number} sourceRow Cell row coord
     * @param {Number} sourceColumn Cell column coord
     * @param {String} className Class name
     * @param {Boolean} [markIntersections=false] If `true`, linear className generator will be used to add CSS classes
     *                                            in a continuous way.
     * @returns {Selection}
     */

  }, {
    key: "addClassAtCoords",
    value: function addClassAtCoords(wotInstance, sourceRow, sourceColumn, className) {
      var markIntersections = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var TD = wotInstance.wtTable.getCell(new _coords.default(sourceRow, sourceColumn));

      if (_typeof(TD) === 'object') {
        var cellClassName = className;

        if (markIntersections) {
          cellClassName = this.classNameGenerator(TD);

          if (!this.classNames.includes(cellClassName)) {
            this.classNames.push(cellClassName);
          }
        }

        (0, _element.addClass)(TD, cellClassName);
      }

      return this;
    }
    /**
     * Generate helper for calculating classNames based on previously added base className.
     * The generated className is always generated as a continuation of the previous className. For example, when
     * the currently checked element has 'area-2' className the generated new className will be 'area-3'. When
     * the element doesn't have any classNames than the base className will be returned ('area');
     *
     * @param {String} baseClassName Base className to be used.
     * @param {Number} layerLevelOwner Layer level which the instance of the Selection belongs to.
     * @return {Function}
     */

  }, {
    key: "linearClassNameGenerator",
    value: function linearClassNameGenerator(baseClassName, layerLevelOwner) {
      // TODO: Make this recursive function Proper Tail Calls (TCO/PTC) friendly.
      return function calcClassName(element) {
        var previousIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        if (layerLevelOwner === 0 || previousIndex === 0) {
          return baseClassName;
        }

        var index = previousIndex >= 0 ? previousIndex : layerLevelOwner;
        var className = baseClassName;
        index -= 1;
        var previousClassName = index === 0 ? baseClassName : "".concat(baseClassName, "-").concat(index);

        if ((0, _element.hasClass)(element, previousClassName)) {
          var currentLayer = index + 1;
          className = "".concat(baseClassName, "-").concat(currentLayer);
        } else {
          className = calcClassName(element, index);
        }

        return className;
      };
    }
  }, {
    key: "addClassIfElemExists",
    value: function addClassIfElemExists(elem, classNames) {
      if (elem) {
        (0, _element.addClass)(elem, classNames);
      }
    }
    /**
     * @param wotInstance
     */

  }, {
    key: "draw",
    value: function draw(wotInstance, selectedCellFn) {
      if (this.isEmpty()) {
        if (this.hasSelectionHandle()) {
          var found = this.getSelectionHandleIfExists(wotInstance);

          if (found) {
            found.disappear();
          }
        }

        return;
      }

      var renderedRows = wotInstance.wtTable.getRenderedRowsCount();
      var renderedColumns = wotInstance.wtTable.getRenderedColumnsCount();
      var corners = this.getCorners();

      var _corners = _slicedToArray(corners, 4),
          firstRow = _corners[0],
          firstColumn = _corners[1],
          lastRow = _corners[2],
          lastColumn = _corners[3]; // row/column values can be negative if row/column header was clicked


      var tableFirstRenderedRow = wotInstance.wtTable.getFirstRenderedRow(); // -1 when there are no rendered rows

      var tableFirstRenderedColumn = wotInstance.wtTable.getFirstRenderedColumn(); // -1 when there are no rendered columns

      var tableLastRenderedRow = wotInstance.wtTable.getLastRenderedRow(); // null when there are no rendered rows

      var tableLastRenderedColumn = wotInstance.wtTable.getLastRenderedColumn(); // null when there are no rendered columns

      var highlightFirstRenderedRow = Math.max(firstRow, tableFirstRenderedRow);
      var highlightFirstRenderedColumn = Math.max(firstColumn, tableFirstRenderedColumn);
      var highlightLastRenderedRow = Math.min(lastRow, tableLastRenderedRow);
      var highlightLastRenderedColumn = Math.min(lastColumn, tableLastRenderedColumn);

      if (renderedColumns && (this.settings.highlightHeaderClassName || this.settings.highlightColumnClassName)) {
        for (var sourceColumn = highlightFirstRenderedColumn; sourceColumn <= highlightLastRenderedColumn; sourceColumn += 1) {
          this.addClassIfElemExists(wotInstance.wtTable.getColumnHeader(sourceColumn), [this.settings.highlightHeaderClassName, this.settings.highlightColumnClassName]);

          if (this.settings.highlightColumnClassName) {
            for (var renderedRow = 0; renderedRow < renderedRows; renderedRow += 1) {
              if (renderedRow < highlightFirstRenderedRow || renderedRow > highlightLastRenderedRow) {
                var sourceRow = wotInstance.wtTable.rowFilter.renderedToSource(renderedRow);
                this.addClassAtCoords(wotInstance, sourceRow, sourceColumn, this.settings.highlightColumnClassName);
              }
            }
          }
        }
      }

      if (renderedRows && (this.settings.highlightHeaderClassName || this.settings.highlightRowClassName)) {
        for (var _sourceRow = highlightFirstRenderedRow; _sourceRow <= highlightLastRenderedRow; _sourceRow += 1) {
          this.addClassIfElemExists(wotInstance.wtTable.getRowHeader(_sourceRow), [this.settings.highlightHeaderClassName, this.settings.highlightRowClassName]);

          if (this.settings.highlightRowClassName) {
            for (var renderedColumn = 0; renderedColumn < renderedColumns; renderedColumn += 1) {
              if (renderedColumn < highlightFirstRenderedColumn || renderedColumn > highlightLastRenderedColumn) {
                var _sourceColumn = wotInstance.wtTable.columnFilter.renderedToSource(renderedColumn);

                this.addClassAtCoords(wotInstance, _sourceRow, _sourceColumn, this.settings.highlightRowClassName);
              }
            }
          }
        }
      }

      if (renderedRows && renderedColumns) {
        if (highlightFirstRenderedRow <= highlightLastRenderedRow && highlightFirstRenderedColumn <= highlightLastRenderedColumn) {
          selectedCellFn(this, highlightFirstRenderedRow, highlightFirstRenderedColumn, highlightLastRenderedRow, highlightLastRenderedColumn, highlightFirstRenderedRow === firstRow, highlightLastRenderedColumn === lastColumn, highlightLastRenderedRow === lastRow, highlightFirstRenderedColumn === firstColumn);
        }

        for (var _sourceRow2 = highlightFirstRenderedRow; _sourceRow2 <= highlightLastRenderedRow; _sourceRow2 += 1) {
          for (var _sourceColumn2 = highlightFirstRenderedColumn; _sourceColumn2 <= highlightLastRenderedColumn; _sourceColumn2 += 1) {
            if (_sourceRow2 >= highlightFirstRenderedRow && _sourceRow2 <= highlightLastRenderedRow && _sourceColumn2 >= highlightFirstRenderedColumn && _sourceColumn2 <= highlightLastRenderedColumn) {
              // selected cell
              if (this.settings.className) {
                this.addClassAtCoords(wotInstance, _sourceRow2, _sourceColumn2, this.settings.className, this.settings.markIntersections);
              }
            }

            if (this.settings.className) {
              // This has a big perf cost. Don't perform this for custom borders
              var additionalSelectionClass = wotInstance.getSetting('onAfterDrawSelection', _sourceRow2, _sourceColumn2, corners, this.settings.layerLevel);

              if (typeof additionalSelectionClass === 'string') {
                this.addClassAtCoords(wotInstance, _sourceRow2, _sourceColumn2, additionalSelectionClass);
              }
            }
          }
        }
      }

      wotInstance.getSetting('onBeforeDrawBorders', corners, this.settings.className);

      if (this.hasSelectionHandle()) {
        // warning! selectionHandle.appear modifies corners!
        this.getSelectionHandle(wotInstance).appear(corners);
      }
    }
    /**
     * Cleans up all the DOM state related to a Selection instance. Call this prior to deleting a Selection instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.instanceSelectionHandles.forEach(function (selectionHandle) {
        return selectionHandle.destroy();
      });
    }
  }]);

  return Selection;
}();

var _default = Selection;
exports.default = _default;