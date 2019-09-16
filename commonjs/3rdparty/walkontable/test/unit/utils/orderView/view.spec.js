"use strict";

var _view = _interopRequireDefault(require("walkontable/utils/orderView/view"));

var _viewSizeSet = _interopRequireDefault(require("walkontable/utils/orderView/viewSizeSet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createOrderView() {
  var rootNode = document.createElement('tr');

  var nodeFactoryFunction = function nodeFactoryFunction() {};

  var orderView = new _view.default(rootNode, nodeFactoryFunction, 'td');
  return {
    orderView: orderView,
    nodeFactoryFunction: nodeFactoryFunction,
    rootNode: rootNode
  };
}

describe('OrderView', function () {
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
  it('should set a new size through ViewSizeSet method', function () {
    var _createOrderView2 = createOrderView(),
        orderView = _createOrderView2.orderView;

    spyOn(orderView.sizeSet, 'setSize');
    orderView.setSize(5);
    expect(orderView.sizeSet.setSize).toHaveBeenCalledWith(5);
    orderView.setSize(9);
    expect(orderView.sizeSet.setSize).toHaveBeenCalledWith(9);
  });
  it('should set a new offset through ViewSizeSet method', function () {
    var _createOrderView3 = createOrderView(),
        orderView = _createOrderView3.orderView;

    spyOn(orderView.sizeSet, 'setOffset');
    orderView.setOffset(5);
    expect(orderView.sizeSet.setOffset).toHaveBeenCalledWith(5);
    orderView.setOffset(9);
    expect(orderView.sizeSet.setOffset).toHaveBeenCalledWith(9);
  });
  it('should check shared mode through ViewSizeSet method', function () {
    var _createOrderView4 = createOrderView(),
        orderView = _createOrderView4.orderView;

    spyOn(orderView.sizeSet, 'isShared').and.returnValue(true);
    expect(orderView.isSharedViewSet()).toBe(true);
    expect(orderView.sizeSet.isShared).toHaveBeenCalledTimes(1);
  });
  it('should return array item based on visual index of `collectedNodes` property', function () {
    var _createOrderView5 = createOrderView(),
        orderView = _createOrderView5.orderView;

    orderView.collectedNodes = [1, 2, 3];
    expect(orderView.getNode(0)).toBe(1);
    expect(orderView.getNode(1)).toBe(2);
    expect(orderView.getNode(2)).toBe(3);
    expect(orderView.getNode(3)).toBe(null);
  });
  it('should return always last item of the `collectedNodes` array', function () {
    var _createOrderView6 = createOrderView(),
        orderView = _createOrderView6.orderView;

    orderView.collectedNodes = [1, 2, 3];
    expect(orderView.getCurrentNode()).toBe(3);
    orderView.collectedNodes = [1, 2, 3, 8];
    expect(orderView.getCurrentNode()).toBe(8);
  });
});