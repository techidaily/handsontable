import Table from '../table';
import stickyRowsBottom from './mixin/stickyRowsBottom';
import stickyColumnsLeft from './mixin/stickyColumnsLeft';
import { mixin } from './../../../../helpers/object';

/**
 * Subclass of `Table` that provides the helper methods relevant to BottomLeftCornerOverlay, implemented through mixins.
 */
class BottomLeftCornerOverlayTable extends Table {
  eastNeighbourTable() {
    return this.wot.cloneSource.wtOverlays.bottomOverlay.clone.wtTable;
  }

  northNeighbourTable() {
    return this.wot.cloneSource.wtOverlays.leftOverlay.clone.wtTable;
  }
}

mixin(BottomLeftCornerOverlayTable, stickyRowsBottom);
mixin(BottomLeftCornerOverlayTable, stickyColumnsLeft);

export default BottomLeftCornerOverlayTable;
