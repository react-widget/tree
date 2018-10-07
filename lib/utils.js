
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isPromiseLike = isPromiseLike;
exports.arrayFill = arrayFill;
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