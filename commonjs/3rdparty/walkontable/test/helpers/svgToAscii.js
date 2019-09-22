"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.split");

exports.__esModule = true;
exports.default = svgToAscii;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Converts an SVG image to a ASCII representation in a string
 *
 * @param {HTMLElement} svg
 * @returns {String}
 */
function svgToAscii(_x) {
  return _svgToAscii.apply(this, arguments);
} // var characters = '.,:;i1tfLCG08@◼'.split('');


function _svgToAscii() {
  _svgToAscii = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(svg) {
    var xml, scaleFactor, img;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            xml = new XMLSerializer().serializeToString(svg);
            scaleFactor = window.devicePixelRatio || 1;
            img = document.createElement('img'); // img.style.imageRendering = 'crisp-edges'; //FF
            // img.style.imageRendering = `pixelated`; //Ch

            img.style.width = "".concat(svg.clientWidth, "px");
            img.style.height = "".concat(svg.clientHeight, "px");
            return _context.abrupt("return", new Promise(function (resolve) {
              img.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.style.width = "".concat(svg.clientWidth, "px");
                canvas.style.height = "".concat(svg.clientHeight, "px");
                canvas.width = img.naturalWidth * scaleFactor;
                canvas.height = img.naturalHeight * scaleFactor; // canvas.style.imageRendering = 'crisp-edges'; //FF
                // canvas.style.imageRendering = `pixelated`; //Ch

                svg.parentNode.appendChild(canvas);
                var ctx = canvas.getContext('2d');
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                var imageData;

                try {
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                } catch (e) {
                  // SecurityError is thrown in IE, let's abandon
                  return;
                }

                var art = imageToAscii(imageData);
                resolve(art);
              };

              svg.parentNode.appendChild(img);
              img.src = "data:image/svg+xml; charset=utf8, ".concat(encodeURIComponent(xml));
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _svgToAscii.apply(this, arguments);
}

var characters = '▯▮'.split('');
/**
 * Converts canvas imageData to a ASCII representation in a string
 *
 * @param {HTMLElement} imageData
 * @returns {String}
 */

function imageToAscii(imageData) {
  var width = imageData.width;
  var height = imageData.height;
  var data = imageData.data;
  var bytesPerPixel = imageData.format === 'RGB24' ? 3 : 4;
  var ascii = '';

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var offset = (y * width + x) * bytesPerPixel; // pixel color at offset

      var r = data[offset];
      var g = data[offset + 1];
      var b = data[offset + 2]; // increase the contrast of the image

      r = clamp(r - 128 + 128, 0, 255);
      g = clamp(g - 128 + 128, 0, 255);
      b = clamp(b - 128 + 128, 0, 255); // calculate pixel brightness
      // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color

      var brightness = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      ascii += characters[Math.round(brightness * (characters.length - 1))];
    }

    ascii += '\n';
  }

  return ascii.slice(0, -1);
}
/**
 * Adjusts the `value` to in the range given by `min` and `max`
 *
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */


function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}