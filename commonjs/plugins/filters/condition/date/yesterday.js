"use strict";

require("core-js/modules/es.object.get-own-property-descriptor");

exports.__esModule = true;
exports.condition = condition;
exports.CONDITION_NAME = void 0;

var _moment = _interopRequireDefault(require("moment"));

var C = _interopRequireWildcard(require("../../../../i18n/constants"));

var _conditionRegisterer = require("../../conditionRegisterer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONDITION_NAME = 'date_yesterday';
exports.CONDITION_NAME = CONDITION_NAME;

function condition(dataRow) {
  var date = (0, _moment.default)(dataRow.value, dataRow.meta.dateFormat);

  if (!date.isValid()) {
    return false;
  }

  return date.isSame((0, _moment.default)().subtract(1, 'days').startOf('day'), 'd');
}

(0, _conditionRegisterer.registerCondition)(CONDITION_NAME, condition, {
  name: C.FILTERS_CONDITIONS_YESTERDAY,
  inputsCount: 0
});