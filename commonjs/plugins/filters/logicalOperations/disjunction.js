"use strict";

require("core-js/modules/es.object.get-own-property-descriptor");

exports.__esModule = true;
exports.operationResult = operationResult;
exports.SHORT_NAME_FOR_COMPONENT = exports.OPERATION_ID = void 0;

var C = _interopRequireWildcard(require("../../../i18n/constants"));

var _logicalOperationRegisterer = require("../logicalOperationRegisterer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var OPERATION_ID = 'disjunction';
exports.OPERATION_ID = OPERATION_ID;
var SHORT_NAME_FOR_COMPONENT = C.FILTERS_LABELS_DISJUNCTION; // (p OR q OR w OR x OR...) === TRUE?

exports.SHORT_NAME_FOR_COMPONENT = SHORT_NAME_FOR_COMPONENT;

function operationResult(conditions, value) {
  return conditions.some(function (condition) {
    return condition.func(value);
  });
}

(0, _logicalOperationRegisterer.registerOperation)(OPERATION_ID, SHORT_NAME_FOR_COMPONENT, operationResult);