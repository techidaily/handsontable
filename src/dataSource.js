import { defineGetter, getProperty, deepObjectSize, isObject, duckSchema } from './helpers/object';
import { arrayEach } from './helpers/array';
import { rangeEach, isNumeric } from './helpers/number';
import { getTranslator, ValueMap } from './translations';

const DATA_SOURCE_MAP_NAME = 'DataSource';

/**
 * @class DataSource
 * @private
 */
class DataSource {
  constructor(hotInstance, dataSource = []) {
    /**
     * Instance of Handsontable.
     *
     * @type {Handsontable}
     */
    defineGetter(this, 'hot', hotInstance, {
      writable: false
    });

    defineGetter(this, 'rowIndexMapper', getTranslator(hotInstance).getRowIndexMapper(), {
      writable: false
    });

    defineGetter(this, 'columnIndexMapper', getTranslator(hotInstance).getColumnIndexMapper(), {
      writable: false
    });

    /**
     * Data source
     *
     * @type {Array}
     */
    this.data = dataSource;
    /**
     * Type of data source.
     *
     * @type {String}
     * @default 'arrays'
     */
    this.dataType = DataSource.ARRAY_OF_ARRAYS;

    /**
     * @type {ValueMap}
     */
    this.dataSchemaMap = this.columnIndexMapper.registerMap(DATA_SOURCE_MAP_NAME, new ValueMap());

  }

  /**
   * @returns {String}
   */
  static get ARRAY_OF_ARRAYS() {
    return 'arrays';
  }

  /**
   * @returns {String}
   */
  static get ARRAY_OF_OBJECTS() {
    return 'objects';
  }

  /**
   * Set new data source.
   *
   * @param data {Array}
   */
  setData(data) {
    this.data = data;

    const firstRow = this.data[0];
    let type = DataSource.ARRAY_OF_ARRAYS;

    if (firstRow) {
      if (isObject(firstRow)) {
        type = DataSource.ARRAY_OF_OBJECTS;

      } else if (!Array.isArray(firstRow)) {
        type = 'unknown';
      }
    }

    this.setDataType(type);

    this.rowIndexMapper.initToLength(this.countRows());
    this.columnIndexMapper.initToLength(this.countColumns());

    this.updateDataSchema();
  }

  /**
   * Sets proper data type for data validation.
   *
   * @param {String} type
   */
  setDataType(type) {
    if (!this.isSupportedDataType(type)) {
      throw new Error('Handsontable: Unsupported DataType');
    }

    this.dataType = type;
  }

  updateDataSchema() {
    switch (this.dataType) {
      case DataSource.ARRAY_OF_OBJECTS: {
        const keys = duckSchema(this.data[0]);

        Object.keys(keys).forEach((property, index) => this.dataSchemaMap.setValueAtIndex(index, property));

        break;
      }

      default:
        break;
    }
  }

  getDataSchema() {
    return this.dataSchemaMap.getValues();
  }

  /**
   *
   * @param {String} type
   */
  isSupportedDataType(type) {
    return [
      DataSource.ARRAY_OF_ARRAYS,
      DataSource.ARRAY_OF_OBJECTS,
    ].includes(type);
  }

  /**
   * Get all data.
   *
   * @param {Boolean} [toArray=false] If `true` return source data as an array of arrays even when source data was provided
   *                                  in another format.
   * @returns {Array}
   */
  getData(toArray = false) {
    let result = this.data;

    if (toArray) {
      result = this.getByRange(
        { row: 0, col: 0 },
        { row: Math.max(this.countRows() - 1, 0), col: Math.max(this.countColumns() - 1, 0) },
        true
      );
    }

    return result;
  }

  /**
   * Returns array of column values from the data source. `column` is the index of the row in the data source.
   *
   * @param {Number|String} column Physical column index or property name.
   * @returns {Array}
   */
  getAtColumn(column) {
    const result = [];

    arrayEach(this.data, (row) => {
      const property = this.dataSchemaMap.getValueAtIndex(column);
      let value;

      if (typeof property === 'string') {
        value = getProperty(row, property);

      } else if (typeof property === 'function') {
        value = property(row);
      } else {
        value = row[property];
      }

      result.push(value);
    });

    return result;
  }

  /**
   * Returns a single row of the data (array or object, depending on what you have). `row` is the index of the row in the data source.
   *
   * @param {Number} row Physical row index.
   * @returns {Array|Object}
   */
  getAtRow(row) {
    return this.data[row];
  }

  /**
   * Returns a single value from the data.
   *
   * @param {Number} row Physical row index.
   * @param {Number|String} column Physical column index.
   * @returns {*}
   */
  getAtCell(row, column) {
    let result = null;

    const modifyRowData = this.hot.runHooks('modifyRowData', row);

    const dataRow = isNaN(modifyRowData) ? modifyRowData : this.data[row];

    if (dataRow) {
      const property = isNumeric(column) ? this.dataSchemaMap.getValueAtIndex(column) : column;

      if (typeof property === 'string') {
        result = getProperty(dataRow, property);

      } else if (typeof property === 'function') {
        result = property(this.data.slice(row, row + 1)[0]);

      } else {
        result = dataRow[property];
      }
    }

    return result;
  }

  /**
   * Returns source data by passed range.
   *
   * @param {Object} start Object with physical `row` and `col` keys (or visual column index, if data type is an array of objects).
   * @param {Object} end Object with physical `row` and `col` keys (or visual column index, if data type is an array of objects).
   * @param {Boolean} [toArray=false] If `true` return source data as an array of arrays even when source data was provided
   *                                  in another format.
   * @returns {Array}
   */
  getByRange(start, end, toArray = false) {
    const startRow = Math.min(start.row, end.row);
    const startCol = Math.min(start.col, end.col);
    const endRow = Math.max(start.row, end.row);
    const endCol = Math.max(start.col, end.col);
    const result = [];

    rangeEach(startRow, endRow, (currentRow) => {
      const row = this.getAtRow(currentRow);
      let newRow;

      if (this.dataType === DataSource.ARRAY_OF_ARRAYS) {
        newRow = row.slice(startCol, endCol + 1);

      } else if (this.dataType === DataSource.ARRAY_OF_OBJECTS) {
        newRow = toArray ? [] : {};

        rangeEach(startCol, endCol, (column) => {
          const property = this.dataSchemaMap.getValueAtIndex(column);

          if (toArray) {
            newRow.push(row[property]);
          } else {
            newRow[column] = row[property];
          }
        });
      }

      result.push(newRow);
    });

    return result;
  }

  /**
   * Count number of rows.
   *
   * @returns {Number}
   */
  countRows() {
    return Array.isArray(this.data) ? this.data.length : 0;
  }

  /**
   * Count number of columns.
   *
   * @returns {Number}
   */
  countColumns() {
    const firstRow = this.data[0];

    if (!firstRow) {
      return 0;
    }

    let result = 0;

    switch (this.dataType) {
      case DataSource.ARRAY_OF_ARRAYS:
        result = firstRow.length;
        break;

      case DataSource.ARRAY_OF_OBJECTS:
        result = deepObjectSize(firstRow);
        break;

      default:
        break;
    }

    return result;
  }

  /**
   * Destroy instance.
   */
  destroy() {
    this.data = null;
    this.hot = null;
  }
}

export default DataSource;
