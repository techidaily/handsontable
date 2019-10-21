import { defineGetter } from '../../../../../helpers/object';

const MIXIN_NAME = 'overlay';

const overlay = {
  diagonalNeighbourTable() {
    return this.wot.cloneSource.wtTable;
  }
};

defineGetter(overlay, 'MIXIN_NAME', MIXIN_NAME, {
  writable: false,
  enumerable: false,
});

export default overlay;
