"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

[require.context('.', true, /\.spec\.js$/)].forEach(function (req) {
  req.keys().forEach(function (key) {
    req(key);
  });
});

require('./MemoryLeakTest');