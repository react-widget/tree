
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var _TreeContext = _interopRequireDefault(require("./TreeContext"));

var NodeItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(NodeItem, _Component);

  function NodeItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleNodeClick", function (e) {
      var tree = _this.getTree();

      var treeProps = tree.props;
      var _this$props = _this.props,
          node = _this$props.node,
          data = _this$props.data;
      var prefixCls = treeProps.prefixCls,
          multiple = treeProps.multiple,
          singleExpand = treeProps.singleExpand,
          selectable = treeProps.selectable,
          unselectable = treeProps.unselectable,
          onSelect = treeProps.onSelect,
          onExpand = treeProps.onExpand,
          onNodeClick = treeProps.onNodeClick;
      var id = node.getId();
      var _tree$state = tree.state,
          selectedKeys = _tree$state.selectedKeys,
          expandedKeys = _tree$state.expandedKeys;
      var isExpanderClick = (0, _utils.closest)(e.target, "." + prefixCls + "-expander-icon");
      var shouldTriggerSelect = false;
      var newState = Object.create(null); //是否受控检测

      var isSelectControlled = "selectedKeys" in treeProps;
      var isExpandedControlled = "expandedKeys" in treeProps;
      var newSelectedKeys = selectedKeys;
      var newExpandedKeys = [].concat(expandedKeys);
      var idx = newExpandedKeys.indexOf(id);
      var isExpanded = idx !== -1;
      var sIdx = selectedKeys.indexOf(id);
      var isSelected = sIdx !== -1;

      if (!isSelected && selectable) {
        newSelectedKeys = multiple ? [].concat(selectedKeys, [id]) : [id];

        if (!isSelectControlled) {
          newState.selectedKeys = newSelectedKeys;
        }

        shouldTriggerSelect = true;
      }

      if (isSelected && unselectable) {
        newSelectedKeys = [].concat(selectedKeys);
        newSelectedKeys.splice(sIdx, 1);

        if (!isSelectControlled) {
          newState.selectedKeys = newSelectedKeys;
        }

        shouldTriggerSelect = true;
      }

      if (isExpanderClick) {
        if (isExpanded) {
          newExpandedKeys.splice(idx, 1);
        } else {
          if (singleExpand) {
            newExpandedKeys = newExpandedKeys.filter(function (id) {
              var sNode = tree.getNode(id);
              if (!sNode) return true;
              return sNode.getDepth() !== node.getDepth();
            });
          }

          newExpandedKeys.push(id);
        }

        if (!isExpandedControlled) {
          newState.expandedKeys = newExpandedKeys;
        }
      }

      if (Object.keys(newState).length) {
        tree.setState(newState);
      }

      if (shouldTriggerSelect && onSelect) {
        onSelect(newSelectedKeys, {
          event: e,
          node: data,
          selected: !isSelected
        });
      }

      if (isExpanderClick && onExpand) {
        onExpand(newExpandedKeys, {
          event: e,
          node: data,
          expanded: !isExpanded
        });
      }

      if (onNodeClick) {
        onNodeClick({
          event: e,
          node: data
        });
      }
    });
    return _this;
  }

  var _proto = NodeItem.prototype;

  _proto.getTree = function getTree() {
    return this.context.tree;
  };

  _proto.getTreeProps = function getTreeProps() {
    var tree = this.getTree();
    return tree.props;
  };

  _proto.getNode = function getNode() {
    return this.props.node;
  };

  _proto.renderLoadingNode = function renderLoadingNode() {
    var _this$getTreeProps = this.getTreeProps(),
        prefixCls = _this$getTreeProps.prefixCls,
        loadingText = _this$getTreeProps.loadingText;

    if (!loadingText) return null;
    return _react.default.createElement("div", {
      className: prefixCls + "-loading-wrapper"
    }, loadingText);
  };

  _proto.renderIndentIcons = function renderIndentIcons() {
    var _this$getTreeProps2 = this.getTreeProps(),
        prefixCls = _this$getTreeProps2.prefixCls,
        renderIndentIcons = _this$getTreeProps2.renderIndentIcons;

    var _this$props2 = this.props,
        node = _this$props2.node,
        data = _this$props2.data;
    var depth = node.getDepth() - 1;
    if (depth <= 0) return null;
    var props = {
      className: prefixCls + "-indent"
    };

    if (renderIndentIcons) {
      return renderIndentIcons({
        data: data,
        node: node,
        props: props,
        component: this
      });
    }

    var indents = (0, _utils.arrayFill)(Array(depth), 0);
    return indents.map(function (v, i) {
      return _react.default.createElement("div", (0, _extends2.default)({}, props, {
        key: i
      }));
    });
  };

  _proto.renderExpanderIcon = function renderExpanderIcon() {
    var _classNames;

    var _this$getTreeProps3 = this.getTreeProps(),
        prefixCls = _this$getTreeProps3.prefixCls,
        renderExpanderIcon = _this$getTreeProps3.renderExpanderIcon;

    var _this$props3 = this.props,
        node = _this$props3.node,
        data = _this$props3.data;
    var leaf = node.isLeaf();
    var classes = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-icon"] = true, _classNames[prefixCls + "-expander-icon"] = !leaf, _classNames.open = !leaf && node.isExpanded(), _classNames[prefixCls + "-indent"] = leaf, _classNames));
    var props = {
      className: classes
    };

    if (renderExpanderIcon) {
      return renderExpanderIcon({
        data: data,
        node: node,
        props: props,
        component: this
      });
    }

    return _react.default.createElement("div", props);
  };

  _proto.renderLoadingIcon = function renderLoadingIcon() {
    var _classNames2;

    var _this$getTreeProps4 = this.getTreeProps(),
        prefixCls = _this$getTreeProps4.prefixCls,
        renderLoadingIcon = _this$getTreeProps4.renderLoadingIcon;

    var _this$props4 = this.props,
        node = _this$props4.node,
        data = _this$props4.data;
    var classes = (0, _classnames.default)((_classNames2 = {}, _classNames2[prefixCls + "-icon"] = true, _classNames2[prefixCls + "-loading-icon"] = true, _classNames2));
    var props = {
      className: classes
    };

    if (renderLoadingIcon) {
      return renderLoadingIcon({
        data: data,
        node: node,
        props: props,
        component: this
      });
    }

    return _react.default.createElement("div", props);
  };

  _proto.renderIcon = function renderIcon() {
    var _classNames3;

    var _this$getTreeProps5 = this.getTreeProps(),
        prefixCls = _this$getTreeProps5.prefixCls,
        renderIcon = _this$getTreeProps5.renderIcon;

    var _this$props5 = this.props,
        node = _this$props5.node,
        data = _this$props5.data;
    var leaf = node.isLeaf();
    var classes = (0, _classnames.default)((_classNames3 = {}, _classNames3[prefixCls + "-icon"] = true, _classNames3[prefixCls + "-icon-parent"] = !leaf, _classNames3[prefixCls + "-icon-leaf"] = leaf, _classNames3[data.iconCls] = data.iconCls, _classNames3));
    var props = {
      className: classes
    };

    if (renderIcon) {
      return renderIcon({
        data: data,
        node: node,
        props: props,
        component: this
      });
    }

    return _react.default.createElement("div", props);
  };

  _proto.renderCheckbox = function renderCheckbox() {
    var _classNames4;

    var _this$getTreeProps6 = this.getTreeProps(),
        prefixCls = _this$getTreeProps6.prefixCls,
        renderCheckbox = _this$getTreeProps6.renderCheckbox;

    var _this$props6 = this.props,
        node = _this$props6.node,
        data = _this$props6.data;
    var classes = (0, _classnames.default)((_classNames4 = {}, _classNames4[prefixCls + "-icon"] = true, _classNames4));
    var props = {
      className: classes
    };

    if (renderCheckbox) {
      return renderCheckbox({
        data: data,
        node: node,
        props: props,
        component: this
      });
    }

    return null; // return <div {...props} />;
  };

  _proto.renderLabel = function renderLabel() {
    var _this$getTreeProps7 = this.getTreeProps(),
        prefixCls = _this$getTreeProps7.prefixCls,
        labelField = _this$getTreeProps7.labelField,
        renderLabel = _this$getTreeProps7.renderLabel;

    var _this$props7 = this.props,
        node = _this$props7.node,
        data = _this$props7.data;
    var props = {
      className: prefixCls + "-label"
    };

    if (renderLabel) {
      return renderLabel({
        data: data,
        node: node,
        props: props,
        component: this
      });
    }

    return _react.default.createElement("div", props, data[labelField]);
  };

  _proto.renderExtIcons = function renderExtIcons() {
    var _this$getTreeProps8 = this.getTreeProps(),
        renderExtIcons = _this$getTreeProps8.renderExtIcons;

    var _this$props8 = this.props,
        node = _this$props8.node,
        data = _this$props8.data;

    if (renderExtIcons) {
      return renderExtIcons({
        data: data,
        node: node,
        props: {},
        component: this
      });
    }

    return null;
  };

  _proto.getNodeProps = function getNodeProps() {
    var _classNames5;

    var tree = this.getTree();
    var _this$props9 = this.props,
        node = _this$props9.node,
        data = _this$props9.data;

    var _this$getTreeProps9 = this.getTreeProps(),
        prefixCls = _this$getTreeProps9.prefixCls,
        onNodeDoubleClick = _this$getTreeProps9.onNodeDoubleClick,
        onNodeContextMenu = _this$getTreeProps9.onNodeContextMenu,
        onNodeMouseDown = _this$getTreeProps9.onNodeMouseDown,
        onNodeMouseUp = _this$getTreeProps9.onNodeMouseUp,
        onNodeMouseEnter = _this$getTreeProps9.onNodeMouseEnter,
        onNodeMouseLeave = _this$getTreeProps9.onNodeMouseLeave,
        onNodeMouseOver = _this$getTreeProps9.onNodeMouseOver,
        onNodeMouseOut = _this$getTreeProps9.onNodeMouseOut,
        onNodeMouseMove = _this$getTreeProps9.onNodeMouseMove;

    var nodeProps = {
      className: (0, _classnames.default)((_classNames5 = {}, _classNames5[prefixCls + "-item"] = true, _classNames5[prefixCls + "-item-selected"] = node.isSelected(), _classNames5[prefixCls + "-item-expanded"] = node.isExpanded(), _classNames5[data.cls] = data.cls, _classNames5)),
      onClick: this.handleNodeClick,
      onDoubleClick: function onDoubleClick(event) {
        onNodeDoubleClick({
          event: event,
          node: node,
          data: data
        });
      },
      onContextMenu: function onContextMenu(event) {
        onNodeContextMenu({
          event: event,
          node: node,
          data: data
        });
      },
      onMouseDown: function onMouseDown(event) {
        onNodeMouseDown({
          event: event,
          node: node,
          data: data
        });
      },
      onMouseUp: function onMouseUp(event) {
        onNodeMouseUp({
          event: event,
          node: node,
          data: data
        });
      },
      onMouseEnter: function onMouseEnter(event) {
        onNodeMouseEnter({
          event: event,
          node: node,
          data: data
        });
      },
      onMouseLeave: function onMouseLeave(event) {
        onNodeMouseLeave({
          event: event,
          node: node,
          data: data
        });
      },
      onMouseOver: function onMouseOver(event) {
        onNodeMouseOver({
          event: event,
          node: node,
          data: data
        });
      },
      onMouseOut: function onMouseOut(event) {
        onNodeMouseOut({
          event: event,
          node: node,
          data: data
        });
      },
      onMouseMove: function onMouseMove(event) {
        onNodeMouseMove({
          event: event,
          node: node,
          data: data
        });
      }
    };
    return nodeProps;
  };

  _proto.renderNode = function renderNode() {
    var _this$getTreeProps10 = this.getTreeProps(),
        showIcon = _this$getTreeProps10.showIcon,
        showExpanderIcon = _this$getTreeProps10.showExpanderIcon,
        checkable = _this$getTreeProps10.checkable;

    var node = this.props.node;
    return _react.default.createElement("div", this.getNodeProps(), _react.default.createElement(_react.Fragment, null, this.renderIndentIcons(), node.isLoading() ? this.renderLoadingIcon() : // : showExpanderIcon
    // ? this.renderExpanderIcon() : null
    this.renderExpanderIcon(), showIcon ? this.renderIcon() : null, this.renderCheckbox(), this.renderLabel(), this.renderExtIcons()));
  };

  _proto.render = function render() {
    var _this$getTreeProps11 = this.getTreeProps(),
        renderNode = _this$getTreeProps11.renderNode;

    var _this$props10 = this.props,
        node = _this$props10.node,
        data = _this$props10.data;
    return renderNode ? renderNode({
      node: node,
      data: data,
      props: this.getNodeProps(),
      component: this
    }) : this.renderNode();
  };

  return NodeItem;
}(_react.Component);

(0, _defineProperty2.default)(NodeItem, "contextType", _TreeContext.default);
NodeItem.propTypes = process.env.NODE_ENV !== "production" ? {
  node: _propTypes.default.object,
  data: _propTypes.default.object
} : {};
NodeItem.defaultProps = {};
var _default = NodeItem;
exports.default = _default;