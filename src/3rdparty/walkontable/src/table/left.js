import Table from '../table';
import overlay from './mixin/overlay';
import calculatedRows from './mixin/calculatedRows';
import stickyColumnsLeft from './mixin/stickyColumnsLeft';
import { mixin } from './../../../../helpers/object';

/**
 * Subclass of `Table` that provides the helper methods relevant to LeftOverlay, implemented through mixins.
 */
class LeftOverlayTable extends Table {
  eastNeighbourTable() {
    return this.wot.cloneSource.wtTable;
  }
}

mixin(LeftOverlayTable, overlay);
mixin(LeftOverlayTable, calculatedRows);
mixin(LeftOverlayTable, stickyColumnsLeft);

export default LeftOverlayTable;
