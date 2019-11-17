
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var ChildNodesContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(ChildNodesContainer, _Component);

  function ChildNodesContainer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChildNodesContainer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        expanded = _this$props.expanded,
        children = _this$props.children;
    if (!expanded) return null;
    var results = children();

    if ((0, _utils.isPromiseLike)(results)) {
      return null;
    }

    return _react.default.createElement(_react.Fragment, null, results);
  };

  return ChildNodesContainer;
}(_react.Component);

exports.default = ChildNodesContainer;
(0, _defineProperty2.default)(ChildNodesContainer, "defaultProps", {
  expanded: false
});
ChildNodesContainer.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes.default.bool,
  node: _propTypes.default.object
} : {};