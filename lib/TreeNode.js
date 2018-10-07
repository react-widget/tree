
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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var TreeNode =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TreeNode, _Component);

  function TreeNode() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TreeNode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TreeNode)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      childNodes: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleExpand", function () {
      var node = _this.props.node;
      if (_this.isLoading(node)) return;
      node.expanded = !node.expanded;

      _this.forceUpdate();
    });
    return _this;
  }

  (0, _createClass2.default)(TreeNode, [{
    key: "renderLoadingNode",
    value: function renderLoadingNode() {
      var _this$props$parentPro = this.props.parentProps,
          prefixCls = _this$props$parentPro.prefixCls,
          loadingText = _this$props$parentPro.loadingText;
      if (!loadingText) return null;
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-loading-wrapper")
      }, loadingText);
    }
  }, {
    key: "renderIndentIcons",
    value: function renderIndentIcons() {
      var _this$props = this.props,
          parentProps = _this$props.parentProps,
          node = _this$props.node;
      var renderIndentIcons = parentProps.renderIndentIcons,
          prefixCls = parentProps.prefixCls;
      var depth = node.depth - 1;
      if (depth <= 0) return null;
      if (renderIndentIcons) return renderIndentIcons(node);
      var indents = (0, _utils.arrayFill)(Array(depth), 0);
      return indents.map(function (v, i) {
        return _react.default.createElement("span", {
          key: i,
          className: "".concat(prefixCls, "-indent")
        });
      });
    }
  }, {
    key: "renderExpanderIcon",
    value: function renderExpanderIcon() {
      var _classNames,
          _this2 = this;

      var _this$props2 = this.props,
          parentProps = _this$props2.parentProps,
          node = _this$props2.node;
      var renderExpanderIcon = parentProps.renderExpanderIcon,
          prefixCls = parentProps.prefixCls;
      var isLeaf = this.isLeaf(node);
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-expander-icon"), !isLeaf), (0, _defineProperty2.default)(_classNames, "open", !isLeaf && this.isExpanded(node)), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-indent"), isLeaf), _classNames));
      var expanderProps = {
        className: classes,
        onClick: function onClick(e) {
          _this2.toggleExpand();
        }
      };
      if (renderExpanderIcon) return renderExpanderIcon(node, expanderProps, this);
      return _react.default.createElement("span", expanderProps);
    }
  }, {
    key: "renderLoadingIcon",
    value: function renderLoadingIcon() {
      var _classNames2;

      var _this$props3 = this.props,
          parentProps = _this$props3.parentProps,
          node = _this$props3.node;
      var renderLoadingIcon = parentProps.renderLoadingIcon,
          prefixCls = parentProps.prefixCls;
      if (renderLoadingIcon) return renderLoadingIcon(node, this);
      var classes = (0, _classnames.default)((_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-loading-icon"), true), _classNames2));
      return _react.default.createElement("span", {
        className: classes
      });
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      var _classNames3;

      var _this$props4 = this.props,
          parentProps = _this$props4.parentProps,
          node = _this$props4.node;
      var renderIcon = parentProps.renderIcon,
          prefixCls = parentProps.prefixCls;
      if (renderIcon) return renderIcon(node, this);
      var isLeaf = this.isLeaf(node);
      var classes = (0, _classnames.default)((_classNames3 = {}, (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-icon-parent"), !isLeaf), (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-icon-leaf"), isLeaf), (0, _defineProperty2.default)(_classNames3, node.iconCls, node.iconCls), _classNames3));
      return _react.default.createElement("span", {
        className: classes
      });
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      var _classNames4;

      var _this$props5 = this.props,
          parentProps = _this$props5.parentProps,
          node = _this$props5.node;
      var renderCheckbox = parentProps.renderCheckbox,
          prefixCls = parentProps.prefixCls;
      if (renderCheckbox) return renderCheckbox(node, this);
      var classes = (0, _classnames.default)((_classNames4 = {}, (0, _defineProperty2.default)(_classNames4, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames4, "".concat(prefixCls, "-icon-checkbox"), true), (0, _defineProperty2.default)(_classNames4, "checked", !!node.checked), _classNames4));
      return _react.default.createElement("span", {
        className: classes
      });
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props6 = this.props,
          parentProps = _this$props6.parentProps,
          node = _this$props6.node;
      var renderLabel = parentProps.renderLabel,
          prefixCls = parentProps.prefixCls,
          onSelect = parentProps.onSelect;
      var labelProps = {
        className: "".concat(prefixCls, "-label")
      };
      if (renderLabel) return renderLabel(node, labelProps, this);
      return _react.default.createElement("div", labelProps, node.label);
    }
  }, {
    key: "renderExtIcons",
    value: function renderExtIcons() {
      var _this$props7 = this.props,
          parentProps = _this$props7.parentProps,
          node = _this$props7.node;
      var renderExtIcons = parentProps.renderExtIcons,
          prefixCls = parentProps.prefixCls;
      if (renderExtIcons) return renderExtIcons(node, this);
    }
  }, {
    key: "renderChildNodes",
    value: function renderChildNodes() {
      var _this3 = this;

      var _this$props8 = this.props,
          node = _this$props8.node,
          parentProps = _this$props8.parentProps;
      var prefixCls = parentProps.prefixCls,
          loadData = parentProps.loadData;
      var childNodes = this.state.childNodes;

      if (childNodes) {
        return this.renderNodeList(childNodes);
      }

      ;

      var success = function success(childNodes) {
        if (!node.expanded) return;
        node.loading = false;

        _this3.setState({
          childNodes: childNodes
        }, function () {
          _this3.state.childNodes = null;
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
        results.then(success).catch(fail);
      } else {
        node.loading = false;
      }

      return async ? this.renderLoadingNode() : this.renderNodeList(results);
    }
  }, {
    key: "renderNodeList",
    value: function renderNodeList(NodeList) {
      var _this$props9 = this.props,
          parentProps = _this$props9.parentProps,
          pNode = _this$props9.node;
      var loadData = parentProps.loadData;
      return NodeList.map(function (node, i) {
        node.depth = pNode.depth + 1;
        return _react.default.createElement(TreeNode, {
          parentProps: parentProps,
          node: node,
          key: node.id == null ? i : node.id
        });
      });
    }
  }, {
    key: "isExpanded",
    value: function isExpanded(node) {
      return !!node.expanded;
    }
  }, {
    key: "isLeaf",
    value: function isLeaf(node) {
      return !!node.leaf;
    }
  }, {
    key: "isLoading",
    value: function isLoading(node) {
      return node.loading;
    }
  }, {
    key: "renderChildWrapper",
    value: function renderChildWrapper() {
      var _this$props10 = this.props,
          node = _this$props10.node,
          parentProps = _this$props10.parentProps;
      var prefixCls = parentProps.prefixCls,
          ChildWrapper = parentProps.childWrapperComponent;
      var shouldRender = !this.isLeaf(node) && this.isExpanded(node);
      return shouldRender ? _react.default.createElement(ChildWrapper, {
        className: "".concat(prefixCls, "-child-wrapper")
      }, this.renderChildNodes()) : null;
    }
  }, {
    key: "renderNode",
    value: function renderNode() {
      var _classNames5,
          _this4 = this;

      var _this$props11 = this.props,
          node = _this$props11.node,
          parentProps = _this$props11.parentProps;
      var prefixCls = parentProps.prefixCls,
          renderNode = parentProps.renderNode,
          showIcon = parentProps.showIcon,
          checkable = parentProps.checkable,
          onNodeClick = parentProps.onNodeClick,
          onNodeDoubleClick = parentProps.onNodeDoubleClick,
          onNodeContextMenu = parentProps.onNodeContextMenu,
          onNodeMouseDown = parentProps.onNodeMouseDown,
          onNodeMouseUp = parentProps.onNodeMouseUp,
          onNodeMouseEnter = parentProps.onNodeMouseEnter,
          onNodeMouseLeave = parentProps.onNodeMouseLeave,
          onNodeMouseOver = parentProps.onNodeMouseOver,
          onNodeMouseOut = parentProps.onNodeMouseOut,
          onNodeMouseMove = parentProps.onNodeMouseMove;
      var nodeProps = {
        className: (0, _classnames.default)("".concat(prefixCls, "-item-wrapper"), (_classNames5 = {}, (0, _defineProperty2.default)(_classNames5, node.cls, node.cls), (0, _defineProperty2.default)(_classNames5, "".concat(prefixCls, "-item-expanded"), this.isExpanded(node)), _classNames5)),
        onClick: function onClick(e) {
          onNodeClick(node, e, _this4);
        },
        onDoubleClick: function onDoubleClick(e) {
          onNodeDoubleClick(node, e, _this4);
        },
        onContextMenu: function onContextMenu(e) {
          onNodeContextMenu(node, e, _this4);
        },
        onMouseDown: function onMouseDown(e) {
          onNodeMouseDown(node, e, _this4);
        },
        onMouseUp: function onMouseUp(e) {
          onNodeMouseUp(node, e, _this4);
        },
        onMouseEnter: function onMouseEnter(e) {
          onNodeMouseEnter(node, e, _this4);
        },
        onMouseLeave: function onMouseLeave(e) {
          onNodeMouseLeave(node, e, _this4);
        },
        onMouseOver: function onMouseOver(e) {
          onNodeMouseOver(node, e, _this4);
        },
        onMouseOut: function onMouseOut(e) {
          onNodeMouseOut(node, e, _this4);
        },
        onMouseMove: function onMouseMove(e) {
          onNodeMouseMove(node, e, _this4);
        }
      };
      return _react.default.createElement("div", nodeProps, renderNode ? renderNode(node, nodeProps, this) : _react.default.createElement(_react.Fragment, null, this.renderIndentIcons(), this.isLoading(node) ? this.renderLoadingIcon() : this.renderExpanderIcon(), showIcon ? this.renderIcon() : null, checkable ? this.renderCheckbox() : null, this.renderLabel(), this.renderExtIcons()));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props12 = this.props,
          node = _this$props12.node,
          isRoot = _this$props12.isRoot,
          parentProps = _this$props12.parentProps;
      var prefixCls = parentProps.prefixCls;

      if (isRoot) {
        return this.renderChildNodes();
      }

      var childWrappeer = this.renderChildWrapper();
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-item")
      }, this.renderNode(), this.isLoading(node) ? null : childWrappeer);
    }
  }]);
  return TreeNode;
}(_react.Component);

exports.default = TreeNode;
(0, _defineProperty2.default)(TreeNode, "propTypes", {
  parentProps: _propTypes.default.object,
  node: _propTypes.default.object,
  isRoot: _propTypes.default.bool
});
(0, _defineProperty2.default)(TreeNode, "defaultProps", {
  parentProps: null,
  node: null,
  isRoot: false
});