
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var NodeItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(NodeItem, _Component);

  function NodeItem() {
    (0, _classCallCheck2.default)(this, NodeItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NodeItem).apply(this, arguments));
  }

  (0, _createClass2.default)(NodeItem, [{
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
      var relativeDepth = node.relativeDepth - 1;
      if (relativeDepth <= 0) return null;
      var indentProps = {
        className: "".concat(prefixCls, "-indent")
      };
      if (renderIndentIcons) return renderIndentIcons(node, indentProps, this);
      var indents = (0, _utils.arrayFill)(Array(relativeDepth), 0);
      return indents.map(function (v, i) {
        return _react.default.createElement("span", (0, _extends2.default)({}, indentProps, {
          key: i
        }));
      });
    }
  }, {
    key: "renderExpanderIcon",
    value: function renderExpanderIcon() {
      var _classNames;

      var _this$props2 = this.props,
          parentProps = _this$props2.parentProps,
          node = _this$props2.node;
      var renderExpanderIcon = parentProps.renderExpanderIcon,
          prefixCls = parentProps.prefixCls;
      var leaf = (0, _utils.isLeaf)(node);
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-expander-icon"), !leaf), (0, _defineProperty2.default)(_classNames, "open", !leaf && (0, _utils.isExpanded)(node)), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-indent"), leaf), _classNames));
      var expanderProps = {
        className: classes
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
      var classes = (0, _classnames.default)((_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-loading-icon"), true), _classNames2));
      var loadingProps = {
        className: classes
      };
      if (renderLoadingIcon) return renderLoadingIcon(node, loadingProps, this);
      return _react.default.createElement("span", loadingProps);
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
      var leaf = (0, _utils.isLeaf)(node);
      var classes = (0, _classnames.default)((_classNames3 = {}, (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-icon-parent"), !leaf), (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-icon-leaf"), leaf), (0, _defineProperty2.default)(_classNames3, node.iconCls, node.iconCls), _classNames3));
      var iconProps = {
        className: classes
      };
      if (renderIcon) return renderIcon(node, iconProps, this);
      return _react.default.createElement("span", iconProps);
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
      var classes = (0, _classnames.default)((_classNames4 = {}, (0, _defineProperty2.default)(_classNames4, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classNames4, "".concat(prefixCls, "-icon-checkbox"), true), (0, _defineProperty2.default)(_classNames4, "checked", !!node.checked), _classNames4));
      var checkboxProps = {
        className: classes
      };
      if (renderCheckbox) return renderCheckbox(node, checkboxProps, this);
      return _react.default.createElement("span", checkboxProps);
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props6 = this.props,
          parentProps = _this$props6.parentProps,
          node = _this$props6.node;
      var renderLabel = parentProps.renderLabel,
          prefixCls = parentProps.prefixCls;
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
      if (renderExtIcons) return renderExtIcons(node, {}, this);
    }
  }, {
    key: "getNodeProps",
    value: function getNodeProps() {
      var _classNames5;

      var _this$props8 = this.props,
          node = _this$props8.node,
          parentProps = _this$props8.parentProps,
          self = _this$props8.self;
      var prefixCls = parentProps.prefixCls,
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
        className: (0, _classnames.default)((_classNames5 = {}, (0, _defineProperty2.default)(_classNames5, "".concat(prefixCls, "-item"), true), (0, _defineProperty2.default)(_classNames5, node.cls, node.cls), (0, _defineProperty2.default)(_classNames5, "".concat(prefixCls, "-item-expanded"), (0, _utils.isExpanded)(node)), _classNames5)),
        onClick: function onClick(e) {
          onNodeClick(node, e, self);
        },
        onDoubleClick: function onDoubleClick(e) {
          onNodeDoubleClick(node, e, self);
        },
        onContextMenu: function onContextMenu(e) {
          onNodeContextMenu(node, e, self);
        },
        onMouseDown: function onMouseDown(e) {
          onNodeMouseDown(node, e, self);
        },
        onMouseUp: function onMouseUp(e) {
          onNodeMouseUp(node, e, self);
        },
        onMouseEnter: function onMouseEnter(e) {
          onNodeMouseEnter(node, e, self);
        },
        onMouseLeave: function onMouseLeave(e) {
          onNodeMouseLeave(node, e, self);
        },
        onMouseOver: function onMouseOver(e) {
          onNodeMouseOver(node, e, self);
        },
        onMouseOut: function onMouseOut(e) {
          onNodeMouseOut(node, e, self);
        },
        onMouseMove: function onMouseMove(e) {
          onNodeMouseMove(node, e, self);
        }
      };
      return nodeProps;
    }
  }, {
    key: "renderNode",
    value: function renderNode() {
      var _this$props9 = this.props,
          node = _this$props9.node,
          parentProps = _this$props9.parentProps;
      var showIcon = parentProps.showIcon,
          showExpanderIcon = parentProps.showExpanderIcon,
          checkable = parentProps.checkable;
      return _react.default.createElement("div", this.getNodeProps(), _react.default.createElement(_react.Fragment, null, this.renderIndentIcons(), (0, _utils.isLoading)(node) ? this.renderLoadingIcon() : showExpanderIcon ? this.renderExpanderIcon() : null, showIcon ? this.renderIcon() : null, checkable ? this.renderCheckbox() : null, this.renderLabel(), this.renderExtIcons()));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props10 = this.props,
          node = _this$props10.node,
          parentProps = _this$props10.parentProps;
      var renderNode = parentProps.renderNode;
      return renderNode ? renderNode(node, this.getNodeProps(), this) : this.renderNode();
    }
  }]);
  return NodeItem;
}(_react.Component);

exports.default = NodeItem;
(0, _defineProperty2.default)(NodeItem, "propTypes", {
  parentProps: _propTypes.default.object,
  self: _propTypes.default.object,
  node: _propTypes.default.object
});
(0, _defineProperty2.default)(NodeItem, "defaultProps", {});