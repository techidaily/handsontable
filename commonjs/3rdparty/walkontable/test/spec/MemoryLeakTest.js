"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.string.includes");

require("core-js/modules/web.dom-collections.for-each");

// this file is called MemoryLeakTest.js (not MemoryLeak.spec.js) to make sure it is manually executed as the last suite
describe('MemoryLeakTest', function () {
  it('after all Walkontable instances are destroyed, there should be no more active listeners', function () {
    expect(Walkontable.getListenersCounter()).toEqual(0);
  });
  it('should not leave any any DOM containers, except for those created by Jasmine', function () {
    var leftoverNodesCount = 0;
    document.body.children.forEach(function (child) {
      if (child.nodeName !== 'SCRIPT' && !child.className.includes('jasmine')) {
        leftoverNodesCount += 1;
      }
    });
    expect(leftoverNodesCount).toBe(0);
  });
});