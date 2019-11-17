
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

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

var _utils = require("./utils");

var _NodeItem = _interopRequireDefault(require("./NodeItem"));

var TreeNode =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(TreeNode, _Component);

  function TreeNode() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      childNodes: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_shouldUpdate", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "toggleExpand", function () {
      var node = _this.props.node;
      if ((0, _utils.isLoading)(node)) return;
      node.expanded = !node.expanded;

      _this.forceUpdate();
    });
    return _this;
  }

  var _proto = TreeNode.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.shouldUpdateTreeNode();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.shouldUpdateTreeNode();
  };

  _proto.shouldUpdateTreeNode = function shouldUpdateTreeNode() {
    if (this._shouldUpdate) {
      this._shouldUpdate = false;
      this.forceUpdate();
    }
  } //deleted
  ;

  _proto.renderLoadingNode = function renderLoadingNode() {
    var _this$props$parentPro = this.props.parentProps,
        prefixCls = _this$props$parentPro.prefixCls,
        loadingLabel = _this$props$parentPro.loadingLabel,
        LoadingComponent = _this$props$parentPro.loadingComponent;
    if (!loadingLabel) return null;
    return _react.default.createElement(LoadingComponent, {
      className: prefixCls + "-loading-wrapper"
    }, loadingLabel);
  };

  _proto.renderNodeList = function renderNodeList(NodeList) {
    var _this$props = this.props,
        parentProps = _this$props.parentProps,
        pNode = _this$props.node;
    return NodeList.map(function (node, i) {
      node.relativeDepth = pNode.relativeDepth + 1;
      return _react.default.createElement(TreeNode, {
        parentProps: parentProps,
        node: node,
        key: node.id == null ? i : node.id
      });
    });
  };

  _proto.renderChildNodes = function renderChildNodes() {
    var _this2 = this;

    var _this$props2 = this.props,
        node = _this$props2.node,
        parentProps = _this$props2.parentProps,
        isRoot = _this$props2.isRoot;
    var loadData = parentProps.loadData;
    var childNodes = this.state.childNodes;
    var Loader = isRoot ? this.renderLoadingNode() : null;
    if ((0, _utils.isLoading)(node)) return Loader;

    if (childNodes) {
      return this.renderNodeList(childNodes);
    }

    ;

    var success = function success(childNodes) {
      _this2._shouldUpdate = false;
      node.loading = false;
      var expanded = (0, _utils.isExpanded)(node);

      _this2.setState({
        childNodes: expanded ? childNodes : null
      }, function () {
        if (expanded) _this2.state.childNodes = null;
      });
    };

    var fail = function fail() {
      success(null);
    };

    var async = false;
    var results = loadData(node);

    if ((0, _utils.isPromiseLike)(results)) {
      async = true;
      node.loading = true;
      this._shouldUpdate = true; //this.forceUpdate();

      results.then(success).catch(fail);
    } else {
      node.loading = false;
    }

    return async ? Loader : this.renderNodeList(results);
  };

  _proto.renderChildNodesWrapper = function renderChildNodesWrapper() {
    var _this3 = this;

    var _this$props3 = this.props,
        node = _this$props3.node,
        parentProps = _this$props3.parentProps;
    var prefixCls = parentProps.prefixCls,
        ChildNodesWrapper = parentProps.childNodesWrapperComponent;
    var leaf = (0, _utils.isLeaf)(node);
    var shouldRender = !leaf && (0, _utils.isExpanded)(node);

    if (shouldRender && node.relativeDepth >= parentProps.maxDepth) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, "maximum depth: " + parentProps.maxDepth) : void 0;
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
    var _this$props4 = this.props,
        node = _this$props4.node,
        isRoot = _this$props4.isRoot,
        parentProps = _this$props4.parentProps;
    var NodeItemWrapperComponent = parentProps.nodeItemWrapperComponent;

    if (isRoot) {
      return this.renderChildNodes();
    } // return (
    //     <div className={`${prefixCls}-item`}>
    //         <NodeItem node={node} self={this} parentProps={parentProps} />
    //         {this.renderChildNodesWrapper()}
    //     </div>
    // );


    var wrapProps = {};

    if (NodeItemWrapperComponent !== _react.Fragment) {
      Object.assign(wrapProps, {
        node: node
      });
    }

    return _react.default.createElement(NodeItemWrapperComponent, wrapProps, _react.default.createElement(_NodeItem.default, {
      node: node,
      self: this,
      parentProps: parentProps
    }), this.renderChildNodesWrapper());
  };

  return TreeNode;
}(_react.Component);

exports.default = TreeNode;
(0, _defineProperty2.default)(TreeNode, "defaultProps", {
  parentProps: null,
  node: null,
  isRoot: false
});
TreeNode.propTypes = process.env.NODE_ENV !== "production" ? {
  parentProps: _propTypes.default.object,
  node: _propTypes.default.object,
  isRoot: _propTypes.default.bool
} : {};