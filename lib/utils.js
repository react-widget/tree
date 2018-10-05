
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isPromiseLike = isPromiseLike;
var toString = Object.prototype.toString;

function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
}

function isPromiseLike(promise) {
  return promise && isFunction(promise.then);
}