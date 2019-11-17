
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

var _classnames = _interopRequireDefault(require("classnames"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _ChildNodesWrapper = _interopRequireDefault(require("./ChildNodesWrapper"));

var noop = function noop() {};

var Tree =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Tree, _React$Component);

  function Tree() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tree.prototype;

  _proto.getRootNode = function getRootNode() {
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
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        style = _this$props.style,
        Component = _this$props.rootComponent;
    var classes = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls] = true, _classNames[className] = className, _classNames));

    if (_react.Fragment === Component) {
      classes = {};
    }

    return _react.default.createElement(Component, {
      className: classes,
      style: style
    }, _react.default.createElement(_TreeNode.default, {
      parentProps: this.props,
      node: this.getRootNode(),
      isRoot: true
    }));
  };

  return Tree;
}(_react.default.Component);

exports.default = Tree;
(0, _defineProperty2.default)(Tree, "defaultProps", {
  prefixCls: 'nil-tree',
  className: '',
  style: {},
  rootId: null,
  loadingLabel: 'Loading...',
  loadingComponent: 'div',
  loadData: null,
  showIcon: true,
  showExpanderIcon: true,
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
Tree.propTypes = process.env.NODE_ENV !== "production" ? {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  rootId: _propTypes.default.any,
  loadingLabel: _propTypes.default.node,
  loadingComponent: _propTypes.default.elementType,
  loadData: _propTypes.default.func,
  showIcon: _propTypes.default.bool,
  showExpanderIcon: _propTypes.default.bool,
  checkable: _propTypes.default.bool,
  maxDepth: _propTypes.default.number,
  rootComponent: _propTypes.default.elementType,
  childNodesWrapperComponent: _propTypes.default.elementType,
  nodeItemWrapperComponent: _propTypes.default.elementType,
  renderIndentIcons: _propTypes.default.func,
  renderExpanderIcon: _propTypes.default.func,
  renderLoadingIcon: _propTypes.default.func,
  renderIcon: _propTypes.default.func,
  renderCheckbox: _propTypes.default.func,
  renderLabel: _propTypes.default.func,
  renderExtIcons: _propTypes.default.func,
  renderNode: _propTypes.default.func,
  onNodeClick: _propTypes.default.func,
  onNodeDoubleClick: _propTypes.default.func,
  onNodeContextMenu: _propTypes.default.func,
  onNodeMouseDown: _propTypes.default.func,
  onNodeMouseUp: _propTypes.default.func,
  onNodeMouseEnter: _propTypes.default.func,
  onNodeMouseLeave: _propTypes.default.func,
  onNodeMouseOver: _propTypes.default.func,
  onNodeMouseOut: _propTypes.default.func,
  onNodeMouseMove: _propTypes.default.func
} : {};