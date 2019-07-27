import { isUndefined } from './helpers/mixed';
import {
  deepObjectSize,
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
  createMap() {
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

  updateSourceData(dataset) {
    this.dataSource.setData(dataset);

    // this.recordTranslator.getColumnIndexMapper().initToLength(this.countSourceColumns());
    // this.recordTranslator.getRowIndexMapper().initToLength(this.countSourceRows());
  }

  update() {

  }

  updateCell() {

  }

  insertColumn() {}
  insertRow() {}

  removeColumn() {}
  removeRow() {}

  countSourceColumns() {
    return this.dataSource.countColumns();
  }
  countSourceRows() {
    return this.dataSource.countRows();
  }

  countTransformedColumns() {}
  countTransformedRows() {}

  countRenderableColumns() {
    return this.dataSource.countColumns();
  }

  countRenderableRows() {
    return this.dataSource.countRows();
  }

  /**
   * Returns data's schema.
   *
   * @returns {Object}
   */
  getSchema() {
    return this.dataSource.getDataSchema();
  }

  getRenderable(startRow, startColumn, endRow, endColumn) {
    if (isUndefined(startRow)) {
      return this.dataSource.getData();
    }

    startRow = this.getPhysicalRow(startRow);
    startColumn = this.getPhysicalColumn(startColumn);

    if (endRow === void 0) {
      return this.dataSource.getAtCell(startRow, startColumn);
    }

    endRow = this.getPhysicalRow(endRow);
    endColumn = this.getPhysicalColumn(endColumn);

    return this.dataSource.getByRange(
      { row: startRow, col: startColumn },
      { row: endRow, col: endColumn },
    );
  }

  /**
   * Returns
   *
   * @param {Number|String} column Visual column index.
   */
  getRenderableAtColumn(column) {
    return this.dataSource.getAtColumn(column);
  }

  getSourceData(startRow, startColumn, endRow, endColumn) {
    startRow = this.getPhysicalRow(startRow);
    startColumn = this.getPhysicalColumn(startColumn);

    if (endRow === void 0) {
      return this.dataSource.getAtCell(startRow, startColumn);
    }

    endRow = this.getPhysicalRow(endRow);
    endColumn = this.getPhysicalColumn(endColumn);

    return this.dataSource.getByRange(
      { row: startRow, col: startColumn },
      { row: endRow, col: endColumn },
    );
  }

  /**
   * @TODO description
   *
   * @param {Number} visualIndex
   * @returns {Number}
   */
  getPhysicalRow(visualIndex) {
    return visualIndex;
  }

  /**
   * @TODO description
   *
   * @param {Number} visualIndex
   * @returns {Number|String}
   */
  getPhysicalColumn(visualIndex) {
    return visualIndex;
  }

  /**
   * @TODO description
   *
   * @param {Number} physicalIndex
   * @returns {Number}
   */
  getVisualRow(physicalIndex) {
    return physicalIndex;
  }

  /**
   * @TODO description
   *
   * @param {Number} physicalIndex
   * @returns {Number}
   */
  getVisualColumn(physicalIndex) {
    return physicalIndex;
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
