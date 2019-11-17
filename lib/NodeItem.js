
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var NodeItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(NodeItem, _Component);

  function NodeItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = NodeItem.prototype;

  _proto.renderLoadingNode = function renderLoadingNode() {
    var _this$props$parentPro = this.props.parentProps,
        prefixCls = _this$props$parentPro.prefixCls,
        loadingText = _this$props$parentPro.loadingText;
    if (!loadingText) return null;
    return _react.default.createElement("div", {
      className: prefixCls + "-loading-wrapper"
    }, loadingText);
  };

  _proto.renderIndentIcons = function renderIndentIcons() {
    var _this$props = this.props,
        parentProps = _this$props.parentProps,
        node = _this$props.node;
    var renderIndentIcons = parentProps.renderIndentIcons,
        prefixCls = parentProps.prefixCls;
    var relativeDepth = node.relativeDepth - 1;
    if (relativeDepth <= 0) return null;
    var indentProps = {
      className: prefixCls + "-indent"
    };
    if (renderIndentIcons) return renderIndentIcons(node, indentProps, this);
    var indents = (0, _utils.arrayFill)(Array(relativeDepth), 0);
    return indents.map(function (v, i) {
      return _react.default.createElement("span", (0, _extends2.default)({}, indentProps, {
        key: i
      }));
    });
  };

  _proto.renderExpanderIcon = function renderExpanderIcon() {
    var _classNames;

    var _this$props2 = this.props,
        parentProps = _this$props2.parentProps,
        node = _this$props2.node;
    var renderExpanderIcon = parentProps.renderExpanderIcon,
        prefixCls = parentProps.prefixCls;
    var leaf = (0, _utils.isLeaf)(node);
    var classes = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-icon"] = true, _classNames[prefixCls + "-expander-icon"] = !leaf, _classNames.open = !leaf && (0, _utils.isExpanded)(node), _classNames[prefixCls + "-indent"] = leaf, _classNames));
    var expanderProps = {
      className: classes
    };
    if (renderExpanderIcon) return renderExpanderIcon(node, expanderProps, this);
    return _react.default.createElement("span", expanderProps);
  };

  _proto.renderLoadingIcon = function renderLoadingIcon() {
    var _classNames2;

    var _this$props3 = this.props,
        parentProps = _this$props3.parentProps,
        node = _this$props3.node;
    var renderLoadingIcon = parentProps.renderLoadingIcon,
        prefixCls = parentProps.prefixCls;
    var classes = (0, _classnames.default)((_classNames2 = {}, _classNames2[prefixCls + "-icon"] = true, _classNames2[prefixCls + "-loading-icon"] = true, _classNames2));
    var loadingProps = {
      className: classes
    };
    if (renderLoadingIcon) return renderLoadingIcon(node, loadingProps, this);
    return _react.default.createElement("span", loadingProps);
  };

  _proto.renderIcon = function renderIcon() {
    var _classNames3;

    var _this$props4 = this.props,
        parentProps = _this$props4.parentProps,
        node = _this$props4.node;
    var renderIcon = parentProps.renderIcon,
        prefixCls = parentProps.prefixCls;
    var leaf = (0, _utils.isLeaf)(node);
    var classes = (0, _classnames.default)((_classNames3 = {}, _classNames3[prefixCls + "-icon"] = true, _classNames3[prefixCls + "-icon-parent"] = !leaf, _classNames3[prefixCls + "-icon-leaf"] = leaf, _classNames3[node.iconCls] = node.iconCls, _classNames3));
    var iconProps = {
      className: classes
    };
    if (renderIcon) return renderIcon(node, iconProps, this);
    return _react.default.createElement("span", iconProps);
  };

  _proto.renderCheckbox = function renderCheckbox() {
    var _classNames4;

    var _this$props5 = this.props,
        parentProps = _this$props5.parentProps,
        node = _this$props5.node;
    var renderCheckbox = parentProps.renderCheckbox,
        prefixCls = parentProps.prefixCls;
    var classes = (0, _classnames.default)((_classNames4 = {}, _classNames4[prefixCls + "-icon"] = true, _classNames4[prefixCls + "-icon-checkbox"] = true, _classNames4.checked = !!node.checked, _classNames4));
    var checkboxProps = {
      className: classes
    };
    if (renderCheckbox) return renderCheckbox(node, checkboxProps, this);
    return _react.default.createElement("span", checkboxProps);
  };

  _proto.renderLabel = function renderLabel() {
    var _this$props6 = this.props,
        parentProps = _this$props6.parentProps,
        node = _this$props6.node;
    var renderLabel = parentProps.renderLabel,
        prefixCls = parentProps.prefixCls;
    var labelProps = {
      className: prefixCls + "-label"
    };
    if (renderLabel) return renderLabel(node, labelProps, this);
    return _react.default.createElement("div", labelProps, node.label);
  };

  _proto.renderExtIcons = function renderExtIcons() {
    var _this$props7 = this.props,
        parentProps = _this$props7.parentProps,
        node = _this$props7.node;
    var renderExtIcons = parentProps.renderExtIcons,
        prefixCls = parentProps.prefixCls;
    if (renderExtIcons) return renderExtIcons(node, {}, this);
  };

  _proto.getNodeProps = function getNodeProps() {
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
      className: (0, _classnames.default)((_classNames5 = {}, _classNames5[prefixCls + "-item"] = true, _classNames5[node.cls] = node.cls, _classNames5[prefixCls + "-item-expanded"] = (0, _utils.isExpanded)(node), _classNames5)),
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
  };

  _proto.renderNode = function renderNode() {
    var _this$props9 = this.props,
        node = _this$props9.node,
        parentProps = _this$props9.parentProps;
    var showIcon = parentProps.showIcon,
        showExpanderIcon = parentProps.showExpanderIcon,
        checkable = parentProps.checkable;
    return _react.default.createElement("div", this.getNodeProps(), _react.default.createElement(_react.Fragment, null, this.renderIndentIcons(), (0, _utils.isLoading)(node) ? this.renderLoadingIcon() : showExpanderIcon ? this.renderExpanderIcon() : null, showIcon ? this.renderIcon() : null, checkable ? this.renderCheckbox() : null, this.renderLabel(), this.renderExtIcons()));
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        node = _this$props10.node,
        parentProps = _this$props10.parentProps;
    var renderNode = parentProps.renderNode;
    return renderNode ? renderNode(node, this.getNodeProps(), this) : this.renderNode();
  };

  return NodeItem;
}(_react.Component);

exports.default = NodeItem;
(0, _defineProperty2.default)(NodeItem, "defaultProps", {});
NodeItem.propTypes = process.env.NODE_ENV !== "production" ? {
  parentProps: _propTypes.default.object,
  self: _propTypes.default.object,
  node: _propTypes.default.object
} : {};