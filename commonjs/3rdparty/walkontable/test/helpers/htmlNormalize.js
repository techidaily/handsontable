"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.repeat");

require("core-js/modules/es.string.trim");

exports.__esModule = true;
exports.normalize = normalize;
exports.pretty = pretty;

var htmlParseStringify = require('html-parse-stringify');

var NEW_LINE = '\n';
var INDENTATION_CHAR = ' ';
/**
 * Normalizes all attributes of the elements by reordering attributes in alphabetical order.
 *
 * @param {String} htmlString HTML string to normalize.
 * @return {String}
 */

function normalize(htmlString) {
  var ast = htmlParseStringify.parse(htmlString);
  traverseAst(ast, function (subAst, node) {
    if (node.type !== 'tag') {
      return;
    }

    node.attrs = Object.keys(node.attrs).sort().reduce(function (acc, attrKey) {
      acc[attrKey] = node.attrs[attrKey];
      return acc;
    }, {});
  });
  return htmlParseStringify.stringify(ast);
}
/**
 * Prettify HTML string by adding new lines and indentation between children elements.
 *
 * @param {String} htmlString HTML string to prettify.
 * @return {String}
 */


function pretty(htmlString) {
  var ast = htmlParseStringify.parse(htmlString); // Remove all external new lines

  traverseAst(ast, function (subAst, node, levelIndex, rowIndex) {
    if (node.type === 'text' && node.content.trim() === '') {
      subAst.splice(rowIndex, 1);
    }
  }); // Format the tree by adding new lines with indentation

  traverseAst(ast, function (subAst, node, levelIndex, rowIndex) {
    if (node.type === 'text') {
      return;
    }

    if (subAst.length - 1 === rowIndex) {
      subAst.push({
        type: 'text',
        content: "".concat(NEW_LINE).concat(INDENTATION_CHAR.repeat(Math.max(levelIndex * 2 - 2, 0)))
      });
    }

    subAst.splice(subAst.indexOf(node), 0, {
      type: 'text',
      content: "".concat(NEW_LINE).concat(INDENTATION_CHAR.repeat(levelIndex * 2))
    });
  });
  return htmlParseStringify.stringify(ast);
}
/**
 * Internal helper for traversing AST tree.
 *
 * @param {Array} ast An array of Objects which contains node descriptions.
 * @param {Function} callback Callback function called for each node.
 * @param {Number} [levelIndex=0] Level index, which indicates the level of processed children nodes.
 */


function traverseAst(ast, callback) {
  var levelIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  for (var i = 0; i < ast.length; i++) {
    var node = ast[i];
    var subAstLength = ast.length;
    callback(ast, node, levelIndex, i);

    if (ast.length !== subAstLength) {
      i += ast.length - subAstLength;
    }

    if (node.type === 'tag' && node.children.length > 0) {
      traverseAst(node.children, callback, levelIndex + 1);
    }
  }
}