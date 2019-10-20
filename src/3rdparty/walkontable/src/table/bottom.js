import Table from '../table';
import overlay from './mixin/overlay';
import stickyRowsBottom from './mixin/stickyRowsBottom';
import calculatedColumns from './mixin/calculatedColumns';
import { mixin } from './../../../../helpers/object';

/**
 * Subclass of `Table` that provides the helper methods relevant to BottomOverlay, implemented through mixins.
 */
class BottomOverlayTable extends Table {
  northNeighbourTable() {
    return this.wot.cloneSource.wtTable;
  }
}

mixin(BottomOverlayTable, overlay);
mixin(BottomOverlayTable, stickyRowsBottom);
mixin(BottomOverlayTable, calculatedColumns);

export default BottomOverlayTable;
