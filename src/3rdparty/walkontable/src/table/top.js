import Table from '../table';
import overlay from './mixin/overlay';
import stickyRowsTop from './mixin/stickyRowsTop';
import calculatedColumns from './mixin/calculatedColumns';
import { mixin } from './../../../../helpers/object';

/**
 * Subclass of `Table` that provides the helper methods relevant to TopOverlay, implemented through mixins.
 */
class TopOverlayTable extends Table {
  southNeighbourTable() {
    return this.wot.cloneSource.wtTable;
  }
}

mixin(TopOverlayTable, overlay);
mixin(TopOverlayTable, stickyRowsTop);
mixin(TopOverlayTable, calculatedColumns);

export default TopOverlayTable;
