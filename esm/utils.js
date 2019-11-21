
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isPromiseLike = isPromiseLike;
exports.arrayFill = arrayFill;
exports.toMarked = toMarked;
exports.closest = closest;
var toString = Object.prototype.toString;

function isFunction(obj) {
  return toString.call(obj) === "[object Function]";
}

function isPromiseLike(promise) {
  return promise && isFunction(promise.then);
}

function arrayFill(array, value) {
  var length = array == null ? 0 : array.length;

  for (var i = 0; i < length; i++) {
    array[i] = value;
  }

  return array;
} // export function isLoading(node) {
//     return node.loading;
// }
// export function isLeaf(node) {
//     return !!node.leaf;
// }
// export function isExpanded(node) {
//     return !!node.expanded;
// }


function toMarked(array) {
  if (array === void 0) {
    array = [];
  }

  var marked = Object.create(null);
  array.forEach(function (value) {
    marked[value] = true;
  });
  return marked;
}

function closest(el, selector) {
  var matches = el.matches || el.msMatchesSelector || el.webkitMatchesSelector;

  if (el.closest) {
    return el.closest(selector);
  } else {
    do {
      if (matches.call(el, selector)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  }
}