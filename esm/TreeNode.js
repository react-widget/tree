
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _utils = require("./utils");

var _TreeContext = _interopRequireDefault(require("./TreeContext"));

var _Node = _interopRequireDefault(require("./Node"));

var _NodeItem = _interopRequireDefault(require("./NodeItem"));

var TreeNode =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(TreeNode, _Component);

  function TreeNode(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.state = {
      isLoading: false,
      childNodes: null
    };

    var tree = _this.getTree();

    tree.registerTreeNode((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = TreeNode.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var tree = this.getTree();
    tree.unregisterTreeNode(this);
  };

  _proto.getTree = function getTree() {
    return this.context.tree;
  };

  _proto.getTreeProps = function getTreeProps() {
    var tree = this.getTree();
    return tree.props;
  };

  _proto.renderRootLoading = function renderRootLoading() {
    var _this$getTreeProps = this.getTreeProps(),
        LoadingComponent = _this$getTreeProps.rootLoadingComponent;

    if (!LoadingComponent) return null;
    return _react.default.createElement(LoadingComponent, null);
  };

  _proto.renderNodeLoading = function renderNodeLoading() {
    var _this$getTreeProps2 = this.getTreeProps(),
        LoadingComponent = _this$getTreeProps2.nodeLoadingComponent;

    if (!LoadingComponent) return null;
    return _react.default.createElement(LoadingComponent, null);
  };

  _proto.renderNodeList = function renderNodeList(list) {
    var tree = this.getTree();
    var pNode = this.props.node;
    var options = this.getTreeProps();
    var state = tree.state;
    return list.map(function (data, i) {
      var node = new _Node.default(data, pNode, options, state);
      return _react.default.createElement(TreeNode, {
        node: node,
        key: node.getId()
      });
    });
  };

  _proto.renderChildNodes = function renderChildNodes() {
    var _this2 = this;

    var _this$props = this.props,
        node = _this$props.node,
        isRoot = _this$props.isRoot;
    var _this$state = this.state,
        isLoading = _this$state.isLoading,
        childNodes = _this$state.childNodes;

    var _this$getTreeProps3 = this.getTreeProps(),
        loadData = _this$getTreeProps3.loadData,
        asyncTestDelay = _this$getTreeProps3.asyncTestDelay;

    var Loader = isRoot ? this.renderRootLoading() : this.renderNodeLoading();
    if (isLoading) return Loader;

    if (childNodes) {
      return this.renderNodeList(childNodes);
    }

    var asyncTimer = null;

    var success = function success(childNodes) {
      if (asyncTimer) {
        clearTimeout(asyncTimer);
        asyncTimer = null;
      }

      var expanded = node.isExpanded();
      node.setLoading(false);

      _this2.setState({
        isLoading: false,
        childNodes: expanded ? childNodes : null
      }, function () {
        if (expanded) {
          // eslint-disable-next-line
          _this2.state.childNodes = null;
        }
      });
    };

    var fail = function fail() {
      success([]);
    };

    var isAsync = false;
    var results = loadData(node);

    if ((0, _utils.isPromiseLike)(results)) {
      isAsync = true;
      asyncTimer = setTimeout(function () {
        asyncTimer = null;
        node.setLoading(true);

        _this2.setState({
          isLoading: true
        });
      }, asyncTestDelay);
      results.then(success).catch(fail);
    }

    return isAsync ? null : this.renderNodeList(results);
  };

  _proto.renderChildNodesWrapper = function renderChildNodesWrapper() {
    var _this3 = this;

    var _this$getTreeProps4 = this.getTreeProps(),
        prefixCls = _this$getTreeProps4.prefixCls,
        maxDepth = _this$getTreeProps4.maxDepth,
        ChildNodesWrapper = _this$getTreeProps4.childNodesWrapperComponent;

    var node = this.props.node;
    var leaf = node.isLeaf();
    var shouldRender = !leaf && node.isExpanded();

    if (shouldRender && node.getDepth() >= maxDepth) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, "maximum depth: " + maxDepth) : void 0;
      return null;
    }

    return leaf ? null : _react.default.createElement(ChildNodesWrapper, {
      expanded: shouldRender,
      node: node,
      className: prefixCls + "-child-wrapper"
    }, function () {
      return _this3.renderChildNodes();
    });
  };

  _proto.render = function render() {
    var _this$getTreeProps5 = this.getTreeProps(),
        NodeItemWrapperComponent = _this$getTreeProps5.nodeItemWrapperComponent;

    var _this$props2 = this.props,
        node = _this$props2.node,
        isRoot = _this$props2.isRoot;

    if (isRoot) {
      return this.renderChildNodes();
    } // return (
    //     <div className={`${prefixCls}-item`}>
    //         <NodeItem node={node} self={this} parentProps={parentProps} />
    //         {this.renderChildNodesWrapper()}
    //     </div>
    // );


    var props = {};

    if (NodeItemWrapperComponent !== _react.Fragment) {
      props.node = node;
    }

    return _react.default.createElement(NodeItemWrapperComponent, props, _react.default.createElement(_NodeItem.default, {
      node: node,
      data: node.getData()
    }), this.renderChildNodesWrapper());
  };

  return TreeNode;
}(_react.Component);

(0, _defineProperty2.default)(TreeNode, "contextType", _TreeContext.default);
TreeNode.propTypes = process.env.NODE_ENV !== "production" ? {
  node: _propTypes.default.object,
  isRoot: _propTypes.default.bool
} : {};
TreeNode.defaultProps = {
  node: null,
  isRoot: false
};
var _default = TreeNode;
exports.default = _default;