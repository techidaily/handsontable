import { isUndefined } from './helpers/mixed';
import {
  createObjectPropListener,
  deepObjectSize,
  hasOwnProperty,
  isObject,
} from './helpers/object';
import Core from './core';
import DataSource from './dataSource';
import { getTranslator } from './translations';

class DataManager {
  constructor(instance) {
    this.hot = instance;

    this.dataSource = new DataSource(instance);
    this.recordTranslator = getTranslator(instance);
  }

  /**
   * Generates cache for property to and from column addressation.
   */
  setRowModel() {
    const schema = this.getSchema();
    let i;

    if (typeof schema === 'undefined') {
      throw new Error('trying to create `columns` definition but you didn\'t provide `schema` nor `data`');
    }

    this.colToPropCache = [];
    this.propToColCache = new Map();

    const columns = this.instance.getSettings().columns;

    if (columns) {
      const maxCols = this.instance.getSettings().maxCols;
      let columnsLen = Math.min(maxCols, columns.length);
      let filteredIndex = 0;
      let columnsAsFunc = false;
      const schemaLen = deepObjectSize(schema);

      if (typeof columns === 'function') {
        columnsLen = schemaLen > 0 ? schemaLen : this.instance.countSourceCols();
        columnsAsFunc = true;
      }

      for (i = 0; i < columnsLen; i++) {
        const column = columnsAsFunc ? columns(i) : columns[i];

        if (isObject(column)) {
          if (typeof column.data !== 'undefined') {
            const index = columnsAsFunc ? filteredIndex : i;
            this.colToPropCache[index] = column.data;
            this.propToColCache.set(column.data, index);
          }

          filteredIndex += 1;
        }
      }

    } else {
      this.recursiveDuckColumns(schema);
    }
  }

  /**
   * Returns data's schema.
   *
   * @returns {Object}
   */
  getSchema() {
    return this.dataSource.getDataSchema();
  }

  setSchema() {

  }

  setSourceData(dataset) {
    this.dataSource.setData(dataset);
  }

  /**
   * Sets value in
   *
   * @param {Number} row Visual row index.
   * @param {Number} column Visual column index.
   * @param {*} value New value to set in cell.
   */
  set(row, column, value) {
    const physicalRow = this.toPhysicalRow(row);
    const physicalColumn = this.toPhysicalColumn(column);

    this.setSourceCell(physicalRow, physicalColumn, value);
  }

  /**
   *
   * @param {Number} row
   * @param {Number|String} column
   * @param {*} value
   * @param {*} source
   */
  setSourceCell(row, column, value) {
    let newValue = value;
    let dataRow = this.dataSource.getAtRow(row);
    // TODO: To remove, use 'modifyData' hook instead (see below)
    const modifiedRowData = this.hot.runHooks('modifyRowData', row);

    dataRow = isNaN(modifiedRowData) ? modifiedRowData : dataRow;

    if (this.hot.hasHook('modifyData')) {
      const valueHolder = createObjectPropListener(newValue);

      this.hot.runHooks('modifyData', row, this.toVisualColumn(column), valueHolder, 'set');

      if (valueHolder.isTouched()) {
        newValue = valueHolder.value;
      }
    }

    // try to set value under property `prop` (includes dot)

    const property = this.dataSource.dataSchemaMap.getValueAtIndex(column);
    if (dataRow && dataRow.hasOwnProperty && hasOwnProperty(dataRow, property)) {
      dataRow[property] = newValue;

    } else if (typeof property === 'string' && property.indexOf('.') > -1) {
      const sliced = property.split('.');
      let out = dataRow;
      let i = 0;
      let ilen;

      for (i = 0, ilen = sliced.length - 1; i < ilen; i++) {
        if (typeof out[sliced[i]] === 'undefined') {
          out[sliced[i]] = {};
        }
        out = out[sliced[i]];
      }
      out[sliced[i]] = newValue;

    } else if (typeof property === 'function') {
      /* see the `function` handler in `get` */
      property(this.dataSource.slice(row, row + 1)[0], newValue);

    } else {
      dataRow[property] = newValue;
    }
  }

  countSourceColumns() {
    return this.recordTranslator.getColumnIndexMapper().getNumberOfIndexes();
  }

  countSourceRows() {
    return this.recordTranslator.getRowIndexMapper().getNumberOfIndexes();
  }

  countTransformedColumns() {
    return this.recordTranslator.getColumnIndexMapper().getNotSkippedIndexesLength();
  }

  countTransformedRows() {
    return this.recordTranslator.getRowIndexMapper().getNotSkippedIndexesLength();
  }

  countColumns() {
    return this.recordTranslator.getColumnIndexMapper().getNotSkippedVisuallyIndexesLength();
  }

  countRows() {
    return this.recordTranslator.getRowIndexMapper().getNotSkippedVisuallyIndexesLength();
  }

  isColumnInsertingAllowed() {

  }

  isColumnRemovingAllowed() {

  }

  /**
   * @todo
   *
   * @param {Number} column Visual column index.
   * @returns {Number|String}
   */
  toPhysicalColumn(column) {
    return this.recordTranslator.getColumnIndexMapper().getPhysicalIndex(column);
  }
  /**
   * @todo
   *
   * @param {Number} row Visual row index.
   * @returns {Number|String}
   */
  toPhysicalRow(row) {
    return this.recordTranslator.getRowIndexMapper().getPhysicalIndex(row);
  }

  /**
   * @todo
   *
   * @param {Number|String} column Physical column index or property.
   * @returns {Number}
   */
  toVisualColumn(column) {
    return this.recordTranslator.getColumnIndexMapper().getVisualIndex(column);
  }

  /**
   * @todo
   *
   * @param {Number} row Physical row index.
   * @returns {Number}
   */
  toVisualRow(row) {
    return this.recordTranslator.getRowIndexMapper().getVisualIndex(row);
  }

  insertColumn() {

  }

  insertRow() {

  }

  removeColumn() {

  }

  removeRow() {

  }

  spliceCol() {

  }

  spliceRow() {

  }

  getData(startRow, startColumn, endRow, endColumn) {
    if (isUndefined(startRow)) {
      return this.dataSource.getData(true);
    }

    startRow = this.toPhysicalRow(startRow);
    startColumn = this.toPhysicalColumn(startColumn);

    if (endRow === void 0) {
      return this.dataSource.getAtCell(startRow, startColumn);
    }

    endRow = this.toPhysicalRow(endRow);
    endColumn = this.toPhysicalColumn(endColumn);

    return this.dataSource.getByRange(
      { row: startRow, col: startColumn },
      { row: endRow, col: endColumn },
      true
    );
  }

  /**
   * @todo
   *
   * @param {Number|String} column Visual column index.
   */
  getDataAtColumn(column) {
    const physicalColumn = this.toPhysicalColumn(column);

    return this.dataSource.getAtColumn(physicalColumn);
  }

  /**
   * @todo
   *
   * @param {Number} startRow
   * @param {*} startColumn
   * @param {*} endRow
   * @param {*} endColumn
   */
  getSourceData(startRow, startColumn, endRow, endColumn) {
    startRow = this.toPhysicalRow(startRow);
    startColumn = this.toPhysicalColumn(startColumn);

    if (endRow === void 0) {
      return this.dataSource.getAtCell(startRow, startColumn);
    }

    endRow = this.toPhysicalRow(endRow);
    endColumn = this.toPhysicalColumn(endColumn);

    return this.dataSource.getByRange(
      { row: startRow, col: startColumn },
      { row: endRow, col: endColumn },
    );
  }
}

const identities = new WeakMap();
const dataManagerSingletons = new WeakMap();

/**
 * Returns a cached instance of DataManager.
 *
 * @param {*} identity
 * @returns {RecordTranslator}
 */
function getDataManager(identity) {
  const instance = identity instanceof Core ? identity : getIdentity(identity);
  let singleton;

  if (dataManagerSingletons.has(instance)) {
    singleton = dataManagerSingletons.get(instance);

  } else {
    singleton = new DataManager(instance);
    dataManagerSingletons.set(instance, singleton);
  }

  return singleton;
}

/**
 * Returns mapped identity.
 *
 * @param {*} identity
 * @returns {*}
 */
export function getIdentity(identity) {
  if (!identities.has(identity)) {
    throw Error('DataManager was not registered for this object identity');
  }

  return identities.get(identity);
}

export {
  DataManager,
  getDataManager,
};
