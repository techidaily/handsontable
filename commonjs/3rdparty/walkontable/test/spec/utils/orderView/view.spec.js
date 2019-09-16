"use strict";

describe('Walkontable.OrderView', function () {
  function createOrderView(rootNodeType, childNodeType) {
    var rootNode = document.createElement(rootNodeType);

    var nodeFactoryFunction = function nodeFactoryFunction() {
      return document.createElement(childNodeType);
    };

    var orderView = new Walkontable.OrderView(rootNode, nodeFactoryFunction, childNodeType);
    return {
      orderView: orderView,
      nodeFactoryFunction: nodeFactoryFunction,
      rootNode: rootNode
    };
  }

  it('should generate correct DOM structure', function () {
    var _createOrderView = createOrderView('tr', 'td'),
        orderView = _createOrderView.orderView,
        rootNode = _createOrderView.rootNode;

    orderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
  });
  it('should generate correct DOM structure while increasing/decreasing view size', function () {
    var _createOrderView2 = createOrderView('div', 'p'),
        orderView = _createOrderView2.orderView,
        rootNode = _createOrderView2.rootNode;

    orderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <div>\n        <p></p>\n        <p></p>\n        <p></p>\n      </div>\n      ");
    orderView.setSize(0);
    orderView.start();
    orderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <div></div>\n      ");
    orderView.setSize(2);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <div>\n        <p></p>\n        <p></p>\n      </div>\n      ");
    orderView.setSize(10);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <div>\n        <p></p>\n        <p></p>\n        <p></p>\n        <p></p>\n        <p></p>\n        <p></p>\n        <p></p>\n        <p></p>\n        <p></p>\n        <p></p>\n      </div>\n      ");
  });
  it('should return correct count of rendered elements', function () {
    var _createOrderView3 = createOrderView('div', 'p'),
        orderView = _createOrderView3.orderView;

    orderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(orderView.getRenderedChildCount()).toBe(3);
    orderView.setSize(0);
    orderView.start();
    orderView.end();
    expect(orderView.getRenderedChildCount()).toBe(0);
    orderView.setSize(2);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(orderView.getRenderedChildCount()).toBe(2);
    orderView.setSize(10);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(orderView.getRenderedChildCount()).toBe(10);
  });
  it('should reuse already created elements after rerendering the View', function () {
    var _createOrderView4 = createOrderView('colgroup', 'col'),
        orderView = _createOrderView4.orderView,
        rootNode = _createOrderView4.rootNode;

    orderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <colgroup>\n        <col>\n        <col>\n        <col>\n      </colgroup>\n      ");
    var prevChildren = rootNode.childNodes;
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(rootNode.childNodes[0]).toBe(prevChildren[0]);
    expect(rootNode.childNodes[1]).toBe(prevChildren[1]);
    expect(rootNode.childNodes[2]).toBe(prevChildren[2]);
    expect(rootNode.childNodes[3]).toBe(void 0);
  });
  it('should return count of rendered children', function () {
    var _createOrderView5 = createOrderView('tr', 'td'),
        orderView = _createOrderView5.orderView;

    orderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.render();
    orderView.end();
    expect(orderView.getRenderedChildCount()).toBe(3);
  });
  it('should make created element accessible after each render cycle', function () {
    var _createOrderView6 = createOrderView('tr', 'td'),
        orderView = _createOrderView6.orderView,
        rootNode = _createOrderView6.rootNode;

    orderView.setSize(3);
    orderView.start();
    orderView.render();
    {
      var currentNode = orderView.getCurrentNode();
      expect(currentNode.tagName).toBe('TD');
    }
    orderView.render();
    {
      var _currentNode = orderView.getCurrentNode();

      expect(_currentNode.tagName).toBe('TD');
    }
    orderView.render();
    {
      var _currentNode2 = orderView.getCurrentNode();

      expect(_currentNode2.tagName).toBe('TD');
    }
    orderView.end();
    expect(orderView.getNode(0)).toBe(rootNode.childNodes[0]);
    expect(orderView.getNode(1)).toBe(rootNode.childNodes[1]);
    expect(orderView.getNode(2)).toBe(rootNode.childNodes[2]);
  });
  it('should make created element accessible after each render cycle', function () {
    var _createOrderView7 = createOrderView('tr', 'td'),
        orderView = _createOrderView7.orderView,
        rootNode = _createOrderView7.rootNode;

    orderView.setSize(3);
    orderView.start();
    orderView.render();
    {
      var currentNode = orderView.getCurrentNode();
      expect(currentNode.tagName).toBe('TD');
    }
    orderView.render();
    {
      var _currentNode3 = orderView.getCurrentNode();

      expect(_currentNode3.tagName).toBe('TD');
    }
    orderView.render();
    {
      var _currentNode4 = orderView.getCurrentNode();

      expect(_currentNode4.tagName).toBe('TD');
    }
    orderView.end();
    expect(orderView.getNode(0)).toBe(rootNode.childNodes[0]);
    expect(orderView.getNode(1)).toBe(rootNode.childNodes[1]);
    expect(orderView.getNode(2)).toBe(rootNode.childNodes[2]);
  });
});