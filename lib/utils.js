
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isPromiseLike = isPromiseLike;
exports.arrayFill = arrayFill;
exports.isLoading = isLoading;
exports.isLeaf = isLeaf;
exports.isExpanded = isExpanded;
var toString = Object.prototype.toString;

function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
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
}

function isLoading(node) {
  return node.loading;
}

function isLeaf(node) {
  return !!node.leaf;
}

function isExpanded(node) {
  return !!node.expanded;
}