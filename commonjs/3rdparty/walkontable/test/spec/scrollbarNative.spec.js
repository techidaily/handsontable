"use strict";

require("core-js/modules/es.array.find");

describe('WalkontableScrollbarNative', function () {
  var debug = false;
  beforeEach(function () {
    this.$wrapper = $('<div></div>').css({
      overflow: 'hidden'
    });
    this.$wrapper.width(100).height(200);
    this.$container = $('<div></div>');
    this.$table = $('<table></table>'); // create a table that is not attached to document

    this.$wrapper.append(this.$container);
    this.$container.append(this.$table);
    this.$wrapper.appendTo('body');
    createDataArray(100, 4);
  });
  afterEach(function () {
    if (!debug) {
      $('.wtHolder').remove();
    }

    this.$wrapper.remove();
    this.wotInstance.destroy();
  });
  it('initial render should be no different than the redraw (vertical)', function () {
    createDataArray(100, 1);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns
    });
    wt.draw();
    var tds = spec().$table.find('td').length;
    wt.draw();
    expect(spec().$table.find('td').length).toEqual(tds);
  });
  it('initial render should be no different than the redraw (horizontal)', function () {
    createDataArray(1, 50);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns
    });
    wt.draw();
    var tds = spec().$table.find('td').length;
    wt.draw();
    expect(spec().$table.find('td').length).toEqual(tds);
  });
  it('scrolling 50px down should render 2 more rows', function () {
    createDataArray(20, 4);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns
    });
    wt.draw();
    var lastRenderedRow = wt.wtTable.getLastRenderedRow();
    $(wt.wtTable.holder).scrollTop(50);
    wt.draw();
    expect(wt.wtTable.getLastRenderedRow()).toEqual(lastRenderedRow + 2);
  });
  it('should recognize the scrollHandler properly, even if the \'overflow\' property is assigned in an external stylesheet', function () {
    spec().$wrapper.css({
      overflow: ''
    });
    spec().$wrapper.addClass('testOverflowHidden');
    createDataArray(20, 4);
    var wt = walkontable({
      data: getData,
      totalRows: getTotalRows,
      totalColumns: getTotalColumns
    });
    wt.draw();
    wt.wtOverlays.topOverlay.scrollTo(3);
    expect($(wt.wtTable.holder).scrollTop()).toEqual(69);
  });
});