
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

var _classnames = _interopRequireDefault(require("classnames"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _ChildNodesWrapper = _interopRequireDefault(require("./ChildNodesWrapper"));

var noop = function noop() {};

var Tree =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Tree, _React$Component);

  function Tree() {
    (0, _classCallCheck2.default)(this, Tree);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tree).apply(this, arguments));
  }

  (0, _createClass2.default)(Tree, [{
    key: "getRootNode",
    value: function getRootNode() {
      var rootId = this.props.rootId;
      return {
        //id: this.props.rootId,
        get id() {
          return rootId;
        },

        //leaf: false,
        get leaf() {
          return false;
        },

        //expanded: true,
        get expanded() {
          return true;
        },

        //checked: false,
        get checked() {
          return false;
        },

        //pid: null,
        get pid() {
          return null;
        },

        ///root: true,
        get root() {
          return true;
        },

        // depth: 0, //deprecated
        //relativeDepth: 0,
        get relativeDepth() {
          return 0;
        },

        loading: false
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          className = _this$props.className,
          Component = _this$props.rootComponent;
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, prefixCls, true), (0, _defineProperty2.default)(_classNames, className, className), _classNames));

      if (_react.Fragment === Component) {
        classes = {};
      }

      return _react.default.createElement(Component, {
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
(0, _defineProperty2.default)(Tree, "propTypes", {
  loadData: _propTypes.default.func
});
(0, _defineProperty2.default)(Tree, "defaultProps", {
  prefixCls: 'nil-tree',
  className: '',
  rootId: null,
  loadingText: 'Loading...',
  loadData: null,
  showIcon: true,
  checkable: false,
  maxDepth: 50,
  //最大层级50
  rootComponent: 'div',
  childNodesWrapperComponent: _ChildNodesWrapper.default,
  nodeItemWrapperComponent: _react.Fragment,
  //自定义
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