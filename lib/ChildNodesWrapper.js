
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var ChildNodesContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ChildNodesContainer, _Component);

  function ChildNodesContainer() {
    (0, _classCallCheck2.default)(this, ChildNodesContainer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ChildNodesContainer).apply(this, arguments));
  }

  (0, _createClass2.default)(ChildNodesContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          expanded = _this$props.expanded,
          children = _this$props.children;
      if (!expanded) return null;
      var results = children();

      if ((0, _utils.isPromiseLike)(results)) {
        return null;
      }

      return _react.default.createElement(_react.Fragment, null, results);
    }
  }]);
  return ChildNodesContainer;
}(_react.Component);

exports.default = ChildNodesContainer;
(0, _defineProperty2.default)(ChildNodesContainer, "propTypes", {
  expanded: _propTypes.default.bool,
  node: _propTypes.default.object
});
(0, _defineProperty2.default)(ChildNodesContainer, "defaultProps", {
  expanded: false
});