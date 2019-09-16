"use strict";

var _sharedView = _interopRequireDefault(require("walkontable/utils/orderView/sharedView"));

var _viewSizeSet = _interopRequireDefault(require("walkontable/utils/orderView/viewSizeSet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createOrderView() {
  var rootNode = document.createElement('tr');

  var nodeFactoryFunction = function nodeFactoryFunction() {};

  var orderView = new _sharedView.default(rootNode, nodeFactoryFunction, 'td');
  return {
    orderView: orderView,
    nodeFactoryFunction: nodeFactoryFunction,
    rootNode: rootNode
  };
}

describe('SharedOrderView', function () {
  it('should be correctly constructed', function () {
    var _createOrderView = createOrderView(),
        orderView = _createOrderView.orderView,
        nodeFactoryFunction = _createOrderView.nodeFactoryFunction,
        rootNode = _createOrderView.rootNode;

    expect(orderView.rootNode).toBe(rootNode);
    expect(orderView.nodesPool).toBe(nodeFactoryFunction);
    expect(orderView.sizeSet).toBeInstanceOf(_viewSizeSet.default);
    expect(orderView.childNodeType).toBe('TD');
    expect(orderView.visualIndex).toBe(0);
    expect(orderView.collectedNodes).toEqual([]);
  });
  it('should correctly prepend another OrderView to this instance', function () {
    var _createOrderView2 = createOrderView(),
        orderView = _createOrderView2.orderView;

    var _createOrderView3 = createOrderView(),
        anotherOrderView = _createOrderView3.orderView;

    spyOn(orderView.sizeSet, 'append');
    spyOn(orderView.sizeSet, 'prepend');
    spyOn(anotherOrderView.sizeSet, 'append');
    spyOn(anotherOrderView.sizeSet, 'prepend');
    var result = orderView.prependView(anotherOrderView);
    expect(result).toBe(orderView);
    expect(orderView.sizeSet.prepend).toHaveBeenCalledWith(anotherOrderView.sizeSet);
    expect(orderView.sizeSet.append).not.toHaveBeenCalled();
    expect(anotherOrderView.sizeSet.prepend).not.toHaveBeenCalled();
    expect(anotherOrderView.sizeSet.append).toHaveBeenCalledWith(orderView.sizeSet);
  });
  it('should correctly append another OrderView to this instance', function () {
    var _createOrderView4 = createOrderView(),
        orderView = _createOrderView4.orderView;

    var _createOrderView5 = createOrderView(),
        anotherOrderView = _createOrderView5.orderView;

    spyOn(orderView.sizeSet, 'append');
    spyOn(orderView.sizeSet, 'prepend');
    spyOn(anotherOrderView.sizeSet, 'append');
    spyOn(anotherOrderView.sizeSet, 'prepend');
    var result = orderView.appendView(anotherOrderView);
    expect(result).toBe(orderView);
    expect(orderView.sizeSet.prepend).not.toHaveBeenCalled();
    expect(orderView.sizeSet.append).toHaveBeenCalledWith(anotherOrderView.sizeSet);
    expect(anotherOrderView.sizeSet.prepend).toHaveBeenCalledWith(orderView.sizeSet);
    expect(anotherOrderView.sizeSet.append).not.toHaveBeenCalled();
  });
});