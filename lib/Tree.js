
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { _defaults(o, p); return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var Tree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree() {
    _classCallCheck(this, Tree);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tree).apply(this, arguments));
  }

  _createClass(Tree, [{
    key: "getRootNode",
    value: function getRootNode() {
      return {
        id: this.props.rootId,
        leaf: false,
        expanded: true,
        checked: false,
        pid: null,
        root: true,
        depth: 0
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          className = _this$props.className,
          rootId = _this$props.rootId,
          loadData = _this$props.loadData;
      var classes = (0, _classnames.default)((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, className), _classNames));
      return _react.default.createElement("div", {
        className: classes
      }, _react.default.createElement(_TreeNode.default, {
        parentProps: this.props,
        node: this.getRootNode(),
        isRoot: true
      }));
    }
  }]);

  return Tree;
}(_react.default.Component);

exports.default = Tree;

_defineProperty(Tree, "propTypes", {
  loadData: _propTypes.default.func
});

_defineProperty(Tree, "defaultProps", {
  prefixCls: 'nil-tree',
  className: '',
  rootId: '0',
  loadingText: '加载中...',
  loadData: null,
  showIcon: true,
  checkable: false,
  //showLine: false, //自定义支持
  //animate: false, //自定义支持
  childWrapperComponent: 'div',
  renderIndentIcons: null,
  renderExpanderIcon: null,
  renderLoadingIcon: null,
  renderIcon: null,
  renderCheckbox: null,
  renderLabel: null,
  renderExtIcons: null,
  renderNode: null,
  //events
  onNodeClick: noop,
  onNodeDoubleClick: noop,
  onNodeContextMenu: noop,
  onNodeMouseDown: noop,
  onNodeMouseUp: noop,
  onNodeMouseEnter: noop,
  onNodeMouseLeave: noop,
  onNodeMouseOver: noop,
  onNodeMouseOut: noop,
  onNodeMouseMove: noop
});