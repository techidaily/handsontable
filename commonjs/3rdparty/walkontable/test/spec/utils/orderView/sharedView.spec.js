"use strict";

describe('Walkontable.SharedOrderView', function () {
  function createOrderView() {
    var rootNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');
    var childNodeType = arguments.length > 1 ? arguments[1] : undefined;

    var nodeFactoryFunction = function nodeFactoryFunction() {
      return document.createElement(childNodeType);
    };

    var orderView = new Walkontable.SharedOrderView(rootNode, nodeFactoryFunction, childNodeType);
    return {
      orderView: orderView,
      nodeFactoryFunction: nodeFactoryFunction,
      rootNode: rootNode
    };
  }

  it('should generate correct DOM structure', function () {
    var rootNode = document.createElement('tr');

    var _createOrderView = createOrderView(rootNode, 'th'),
        orderView = _createOrderView.orderView;

    var _createOrderView2 = createOrderView(rootNode, 'td'),
        secondOrderView = _createOrderView2.orderView;

    orderView.appendView(secondOrderView);
    orderView.setSize(2);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
  });
  it('should generate correct DOM structure while decreasing first OrderView size', function () {
    var rootNode = document.createElement('tr');

    var _createOrderView3 = createOrderView(rootNode, 'th'),
        orderView = _createOrderView3.orderView;

    var _createOrderView4 = createOrderView(rootNode, 'td'),
        secondOrderView = _createOrderView4.orderView;

    orderView.appendView(secondOrderView);
    orderView.setSize(2);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
    orderView.setSize(1);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
    orderView.setSize(0);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
  });
  it('should generate correct DOM structure while increasing first OrderView size', function () {
    var rootNode = document.createElement('tr');

    var _createOrderView5 = createOrderView(rootNode, 'th'),
        orderView = _createOrderView5.orderView;

    var _createOrderView6 = createOrderView(rootNode, 'td'),
        secondOrderView = _createOrderView6.orderView;

    orderView.appendView(secondOrderView);
    orderView.setSize(0);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
    orderView.setSize(1);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
    orderView.setSize(3);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n        <th></th>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
  });
  it('should generate correct DOM structure while decreasing last OrderView size', function () {
    var rootNode = document.createElement('tr');

    var _createOrderView7 = createOrderView(rootNode, 'th'),
        orderView = _createOrderView7.orderView;

    var _createOrderView8 = createOrderView(rootNode, 'td'),
        secondOrderView = _createOrderView8.orderView;

    orderView.appendView(secondOrderView);
    orderView.setSize(2);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
    orderView.setSize(2);
    secondOrderView.setSize(1);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n        <td></td>\n      </tr>\n      ");
    orderView.setSize(2);
    secondOrderView.setSize(0);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n      </tr>\n      ");
  });
  it('should generate correct DOM structure while increasing last OrderView size', function () {
    var rootNode = document.createElement('tr');

    var _createOrderView9 = createOrderView(rootNode, 'th'),
        orderView = _createOrderView9.orderView;

    var _createOrderView10 = createOrderView(rootNode, 'td'),
        secondOrderView = _createOrderView10.orderView;

    orderView.appendView(secondOrderView);
    orderView.setSize(2);
    secondOrderView.setSize(0);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n      </tr>\n      ");
    orderView.setSize(2);
    secondOrderView.setSize(1);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n        <td></td>\n      </tr>\n      ");
    orderView.setSize(2);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <tr>\n        <th></th>\n        <th></th>\n        <td></td>\n        <td></td>\n        <td></td>\n      </tr>\n      ");
  });
  it('should return correct count of rendered elements', function () {
    var rootNode = document.createElement('tr');

    var _createOrderView11 = createOrderView(rootNode, 'th'),
        orderView = _createOrderView11.orderView;

    var _createOrderView12 = createOrderView(rootNode, 'td'),
        secondOrderView = _createOrderView12.orderView;

    orderView.appendView(secondOrderView);
    orderView.setSize(2);
    secondOrderView.setSize(0);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.end();
    expect(orderView.getRenderedChildCount()).toBe(2);
    expect(secondOrderView.getRenderedChildCount()).toBe(0);
    orderView.setSize(2);
    secondOrderView.setSize(1);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.end();
    expect(orderView.getRenderedChildCount()).toBe(2);
    expect(secondOrderView.getRenderedChildCount()).toBe(1);
    orderView.setSize(2);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(orderView.getRenderedChildCount()).toBe(2);
    expect(secondOrderView.getRenderedChildCount()).toBe(3);
    orderView.setSize(0);
    secondOrderView.setSize(2);
    orderView.start();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(orderView.getRenderedChildCount()).toBe(0);
    expect(secondOrderView.getRenderedChildCount()).toBe(2);
    orderView.setSize(1);
    secondOrderView.setSize(1);
    orderView.start();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.end();
    expect(orderView.getRenderedChildCount()).toBe(1);
    expect(secondOrderView.getRenderedChildCount()).toBe(1);
  });
  it('should reuse already created elements after rerendering the View', function () {
    var rootNode = document.createElement('div');

    var _createOrderView13 = createOrderView(rootNode, 'p'),
        orderView = _createOrderView13.orderView;

    var _createOrderView14 = createOrderView(rootNode, 'div'),
        secondOrderView = _createOrderView14.orderView;

    orderView.appendView(secondOrderView);
    orderView.setSize(2);
    secondOrderView.setSize(3);
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <div>\n        <p></p>\n        <p></p>\n        <div></div>\n        <div></div>\n        <div></div>\n      </div>\n      ");
    var prevChildNodes = rootNode.childNodes;
    orderView.start();
    orderView.render();
    orderView.render();
    orderView.end();
    secondOrderView.start();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.render();
    secondOrderView.end();
    expect(rootNode.outerHTML).toMatchHTML("\n      <div>\n        <p></p>\n        <p></p>\n        <div></div>\n        <div></div>\n        <div></div>\n      </div>\n      ");
    expect(rootNode.childNodes[0]).toBe(prevChildNodes[0]);
    expect(rootNode.childNodes[1]).toBe(prevChildNodes[1]);
    expect(rootNode.childNodes[2]).toBe(prevChildNodes[2]);
    expect(rootNode.childNodes[3]).toBe(prevChildNodes[3]);
    expect(rootNode.childNodes[4]).toBe(prevChildNodes[4]);
  });
});