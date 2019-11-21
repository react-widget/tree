
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TreeContext = _interopRequireDefault(require("./TreeContext"));

var _Node = _interopRequireDefault(require("./Node"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _ChildNodesWrapper = _interopRequireDefault(require("./ChildNodesWrapper"));

var _utils = require("./utils");

var noop = function noop() {};

function RootLoadingComponent(props) {
  return _react.default.createElement("div", props, "Loading...");
}

var Tree =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Tree, _React$Component);

  Tree.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var checkedKeys = nextProps.checkedKeys || prevState.checkedKeys;
    var selectedKeys = nextProps.selectedKeys || prevState.selectedKeys;
    var expandedKeys = nextProps.expandedKeys || prevState.expandedKeys;
    return {
      checkedKeys: checkedKeys,
      selectedKeys: selectedKeys,
      expandedKeys: expandedKeys,
      checkedMap: (0, _utils.toMarked)(checkedKeys),
      selectedMap: (0, _utils.toMarked)(selectedKeys),
      expandedMap: (0, _utils.toMarked)(expandedKeys)
    };
  };

  function Tree(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      checkedKeys: props.defaultCheckedKeys || [],
      selectedKeys: props.defaultSelectedKeys || [],
      expandedKeys: props.defaultExpandedKeys || [],
      checkedMap: {},
      selectedMap: {},
      expandedMap: {}
    };
    _this.treeNodes = [];
    _this.treeNodesMap = Object.create(null);
    return _this;
  }

  var _proto = Tree.prototype;

  _proto.registerTreeNode = function registerTreeNode(tNode) {
    var node = tNode.props.node;
    var id = node.getId();
    this.treeNodes.push(tNode);
    this.treeNodesMap[id] = tNode;
  };

  _proto.unregisterTreeNode = function unregisterTreeNode(tNode) {
    var node = tNode.props.node;
    var id = node.getId();
    var prevTNode = this.treeNodesMap[id];
    var idx = this.treeNodes.indexOf(tNode);
    this.treeNodes.splice(idx, 1);

    if (prevTNode === tNode) {
      this.treeNodesMap[id] = null;
      delete this.treeNodesMap[id];
    }
  };

  _proto.getNode = function getNode(id) {
    var treeNode = this.treeNodesMap[id];
    return treeNode ? treeNode.props.node : null;
  };

  _proto.getRootNode = function getRootNode() {
    var _ref;

    var _this$props = this.props,
        rootId = _this$props.rootId,
        idField = _this$props.idField,
        pidField = _this$props.pidField,
        leafField = _this$props.leafField;
    var node = new _Node.default((_ref = {}, _ref[idField] = rootId, _ref[pidField] = null, _ref[leafField] = false, _ref), null, this.props, this.state);
    return node;
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

  _proto.getContext = function getContext() {
    return {
      tree: this
    };
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        style = _this$props2.style,
        Component = _this$props2.rootComponent;
    var classes = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls] = true, _classNames[className] = className, _classNames));

    if (_react.Fragment === Component) {
      classes = {};
    }

    return _react.default.createElement(_TreeContext.default.Provider, {
      value: this.getContext()
    }, _react.default.createElement(Component, {
      className: classes,
      style: style
    }, _react.default.createElement(_TreeNode.default, {
      parentProps: this.props,
      node: this.getRootNode(),
      isRoot: true
    })));
  };

  return Tree;
}(_react.default.Component);

Tree.propTypes = process.env.NODE_ENV !== "production" ? {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  rootId: _propTypes.default.any,
  idField: _propTypes.default.string,
  leafField: _propTypes.default.string,
  pidField: _propTypes.default.string,
  labelField: _propTypes.default.string,
  rootLoadingComponent: _propTypes.default.elementType,
  nodeLoadingComponent: _propTypes.default.elementType,
  loadData: _propTypes.default.func,
  showIcon: _propTypes.default.bool,
  showExpanderIcon: _propTypes.default.bool,
  multiple: _propTypes.default.bool,
  selectable: _propTypes.default.bool,
  unselectable: _propTypes.default.bool,
  singleExpand: _propTypes.default.bool,
  maxDepth: _propTypes.default.number,
  asyncTestDelay: _propTypes.default.number,
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
  onSelect: _propTypes.default.func,
  onExpand: _propTypes.default.func,
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
Tree.defaultProps = {
  prefixCls: "nil-tree",
  className: "",
  style: {},
  rootId: null,
  idField: "id",
  leafField: "leaf",
  pidField: "pid",
  labelField: "label",
  rootLoadingComponent: RootLoadingComponent,
  loadData: null,
  showIcon: true,
  multiple: false,
  selectable: true,
  unselectable: true,
  singleExpand: false,
  showExpanderIcon: true,
  maxDepth: 99,
  //最大层级99   Number.MAX_VALUE
  asyncTestDelay: 16,
  rootComponent: "div",
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
  onSelect: noop,
  onExpand: noop,
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
};
var _default = Tree;
exports.default = _default;