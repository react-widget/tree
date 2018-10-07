/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/Tree.js":
/*!**********************!*\
  !*** ../src/Tree.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "../node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "../node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _reactDom = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "../node_modules/classnames/index.js"));

var _TreeNode = _interopRequireDefault(__webpack_require__(/*! ./TreeNode */ "../src/TreeNode.js"));

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
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, prefixCls, true), (0, _defineProperty2.default)(_classNames, className, className), _classNames));
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
(0, _defineProperty2.default)(Tree, "propTypes", {
  loadData: _propTypes.default.func
});
(0, _defineProperty2.default)(Tree, "defaultProps", {
  prefixCls: 'nil-tree',
  className: '',
  rootId: null,
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

/***/ }),

/***/ "../src/TreeNode.js":
/*!**************************!*\
  !*** ../src/TreeNode.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "../node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "../node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "../node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "../node_modules/classnames/index.js"));

var _utils = __webpack_require__(/*! ./utils */ "../src/utils.js");

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

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Tree = _interopRequireDefault(__webpack_require__(/*! ./Tree */ "../src/Tree.js"));

var _default = _Tree.default;
exports.default = _default;

/***/ }),

/***/ "../src/style/index.scss":
/*!*******************************!*\
  !*** ../src/style/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../src/utils.js":
/*!***********************!*\
  !*** ../src/utils.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isPromiseLike = isPromiseLike;
exports.arrayFill = arrayFill;
var toString = Object.prototype.toString;

function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
}

function isPromiseLike(promise) {
  return promise && isFunction(promise.then);
}

function arrayFill(array, value) {
  var length = array == null ? 0 : array.length;

  for (var i = 0; i < length; i++) {
    array[i] = value;
  }

  return array;
}

/***/ }),

/***/ "./src/Demo.js":
/*!*********************!*\
  !*** ./src/Demo.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "../node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "../node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "../node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./src/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: null
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./src/DemoList.js":
/*!*************************!*\
  !*** ./src/DemoList.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./src/demos/demo1.js"));

var _default = [{
  label: '树形显示',
  component: _demo.default
}];
exports.default = _default;

/***/ }),

/***/ "./src/city.js":
/*!*********************!*\
  !*** ./src/city.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  'label': '中国',
  'value': 1,
  'children': [{
    'label': '北京市',
    'value': 2
  }, {
    'label': '福建省',
    'value': 3,
    'children': [{
      'label': '福州市',
      'value': 36
    }, {
      'label': '南平市',
      'value': 37
    }, {
      'label': '泉州市',
      'value': 38
    }, {
      'label': '莆田市',
      'value': {
        'id': 39
      }
    }, {
      'label': '厦门市',
      'value': {
        'id': 40
      }
    }, {
      'label': '宁德市',
      'value': {
        'id': 41
      }
    }, {
      'label': '漳州市',
      'value': {
        'id': 42
      }
    }, {
      'label': '三明市',
      'value': {
        'id': 43
      }
    }, {
      'label': '龙岩市',
      'value': {
        'id': 44
      }
    }]
  }, {
    'label': '广东省',
    'value': {
      'id': 4
    },
    'children': [{
      'label': '广州市',
      'value': {
        'id': 45
      }
    }, {
      'label': '深圳市',
      'value': {
        'id': 46
      }
    }, {
      'label': '肇庆市',
      'value': {
        'id': 47
      }
    }, {
      'label': '惠州市',
      'value': {
        'id': 48
      }
    }, {
      'label': '阳江市',
      'value': {
        'id': 49
      }
    }, {
      'label': '茂名市',
      'value': {
        'id': 50
      }
    }, {
      'label': '湛江市',
      'value': {
        'id': 51
      }
    }, {
      'label': '中山市',
      'value': {
        'id': 52
      }
    }, {
      'label': '珠海市',
      'value': {
        'id': 53
      }
    }, {
      'label': '江门市',
      'value': {
        'id': 54
      }
    }, {
      'label': '东莞市',
      'value': {
        'id': 55
      }
    }, {
      'label': '清远市',
      'value': {
        'id': 56
      }
    }, {
      'label': '揭阳市',
      'value': {
        'id': 57
      }
    }, {
      'label': '汕头市',
      'value': {
        'id': 58
      }
    }, {
      'label': '佛山市',
      'value': {
        'id': 59
      }
    }, {
      'label': '梅州市',
      'value': {
        'id': 60
      }
    }, {
      'label': '韶关市',
      'value': {
        'id': 61
      }
    }, {
      'label': '河源市',
      'value': {
        'id': 62
      }
    }, {
      'label': '汕尾市',
      'value': {
        'id': 63
      }
    }, {
      'label': '云浮市',
      'value': {
        'id': 64
      }
    }, {
      'label': '潮州市',
      'value': {
        'id': 65
      }
    }]
  }, {
    'label': '内蒙古自治区',
    'value': {
      'id': 5
    },
    'children': [{
      'label': '呼和浩特市',
      'value': {
        'id': 66
      }
    }, {
      'label': '赤峰市',
      'value': {
        'id': 67
      }
    }, {
      'label': '鄂尔多斯市',
      'value': {
        'id': 68
      }
    }, {
      'label': '乌兰察布市',
      'value': {
        'id': 69
      }
    }, {
      'label': '巴彦淖尔市',
      'value': {
        'id': 70
      }
    }, {
      'label': '乌海市',
      'value': {
        'id': 71
      }
    }, {
      'label': '包头市',
      'value': {
        'id': 72
      }
    }, {
      'label': '锡林郭勒盟',
      'value': {
        'id': 73
      }
    }, {
      'label': '阿拉善盟',
      'value': {
        'id': 74
      }
    }, {
      'label': '南昌市',
      'value': {
        'id': 75
      }
    }, {
      'label': '呼伦贝尔市',
      'value': {
        'id': 76
      }
    }, {
      'label': '通辽市',
      'value': {
        'id': 77
      }
    }, {
      'label': '兴安盟',
      'value': {
        'id': 372
      }
    }]
  }, {
    'label': '香港',
    'value': {
      'id': 6
    }
  }, {
    'label': '台湾',
    'value': {
      'id': 7
    }
  }, {
    'label': '贵州省',
    'value': {
      'id': 8
    },
    'children': [{
      'label': '贵阳市',
      'value': {
        'id': 78
      }
    }, {
      'label': '黔南布依族苗族自治州',
      'value': {
        'id': 79
      }
    }, {
      'label': '铜仁地区',
      'value': {
        'id': 80
      }
    }, {
      'label': '毕节地区',
      'value': {
        'id': 81
      }
    }, {
      'label': '遵义市',
      'value': {
        'id': 82
      }
    }, {
      'label': '六盘水市',
      'value': {
        'id': 83
      }
    }, {
      'label': '黔西南布依族苗族自治州',
      'value': {
        'id': 84
      }
    }, {
      'label': '黔东南苗族侗族自治州',
      'value': {
        'id': 85
      }
    }, {
      'label': '安顺市',
      'value': {
        'id': 86
      }
    }]
  }, {
    'label': '宁夏回族自治区',
    'value': {
      'id': 9
    },
    'children': [{
      'label': '银川市',
      'value': {
        'id': 87
      }
    }, {
      'label': '石嘴山市',
      'value': {
        'id': 88
      }
    }, {
      'label': '吴忠市',
      'value': {
        'id': 89
      }
    }, {
      'label': '固原市',
      'value': {
        'id': 90
      }
    }, {
      'label': '中卫市',
      'value': {
        'id': 91
      }
    }]
  }, {
    'label': '山东省',
    'value': {
      'id': 10
    },
    'children': [{
      'label': '济南市',
      'value': {
        'id': 92
      }
    }, {
      'label': '潍坊市',
      'value': {
        'id': 93
      }
    }, {
      'label': '青岛市',
      'value': {
        'id': 94
      }
    }, {
      'label': '烟台市',
      'value': {
        'id': 95
      }
    }, {
      'label': '淄博市',
      'value': {
        'id': 96
      }
    }, {
      'label': '聊城市',
      'value': {
        'id': 97
      }
    }, {
      'label': '莱芜市',
      'value': {
        'id': 98
      }
    }, {
      'label': '临沂市',
      'value': {
        'id': 99
      }
    }, {
      'label': '济宁市',
      'value': {
        'id': 100
      }
    }, {
      'label': '泰安市',
      'value': {
        'id': 101
      }
    }, {
      'label': '滨州市',
      'value': {
        'id': 102
      }
    }, {
      'label': '东营市',
      'value': {
        'id': 103
      }
    }, {
      'label': '威海市',
      'value': {
        'id': 104
      }
    }, {
      'label': '菏泽市',
      'value': {
        'id': 105
      }
    }, {
      'label': '德州市',
      'value': {
        'id': 106
      }
    }, {
      'label': '枣庄市',
      'value': {
        'id': 107
      }
    }, {
      'label': '日照市',
      'value': {
        'id': 108
      }
    }]
  }, {
    'label': '江苏省',
    'value': {
      'id': 11
    },
    'children': [{
      'label': '南京市',
      'value': {
        'id': 109
      }
    }, {
      'label': '常州市',
      'value': {
        'id': 110
      }
    }, {
      'label': '苏州市',
      'value': {
        'id': 111
      }
    }, {
      'label': '无锡市',
      'value': {
        'id': 112
      }
    }, {
      'label': '徐州市',
      'value': {
        'id': 113
      }
    }, {
      'label': '连云港市',
      'value': {
        'id': 114
      }
    }, {
      'label': '扬州市',
      'value': {
        'id': 115
      }
    }, {
      'label': '宿迁市',
      'value': {
        'id': 116
      }
    }, {
      'label': '淮安市',
      'value': {
        'id': 117
      }
    }, {
      'label': '泰州市',
      'value': {
        'id': 118
      }
    }, {
      'label': '南通市',
      'value': {
        'id': 119
      }
    }, {
      'label': '盐城市',
      'value': {
        'id': 120
      }
    }, {
      'label': '镇江市',
      'value': {
        'id': 121
      }
    }]
  }, {
    'label': '安徽省',
    'value': {
      'id': 12
    },
    'children': [{
      'label': '滁州市',
      'value': {
        'id': 122
      }
    }, {
      'label': '合肥市',
      'value': {
        'id': 123
      }
    }, {
      'label': '亳州市',
      'value': {
        'id': 124
      }
    }, {
      'label': '淮南市',
      'value': {
        'id': 125
      }
    }, {
      'label': '安庆市',
      'value': {
        'id': 126
      }
    }, {
      'label': '六安市',
      'value': {
        'id': 127
      }
    }, {
      'label': '宿州市',
      'value': {
        'id': 128
      }
    }, {
      'label': '芜湖市',
      'value': {
        'id': 129
      }
    }, {
      'label': '鞍山市',
      'value': {
        'id': 130
      }
    }, {
      'label': '宣城市',
      'value': {
        'id': 131
      }
    }, {
      'label': '黄山市',
      'value': {
        'id': 132
      }
    }, {
      'label': '池州市',
      'value': {
        'id': 133
      }
    }, {
      'label': '巢湖市',
      'value': {
        'id': 134
      }
    }, {
      'label': '淮北市',
      'value': {
        'id': 135
      }
    }, {
      'label': '铜陵市',
      'value': {
        'id': 136
      }
    }, {
      'label': '蚌埠市',
      'value': {
        'id': 137
      }
    }, {
      'label': '马鞍山市',
      'value': {
        'id': 361
      }
    }, {
      'label': '阜阳市',
      'value': {
        'id': 374
      }
    }]
  }, {
    'label': '黑龙江省',
    'value': {
      'id': 13
    },
    'children': [{
      'label': '鹤岗市',
      'value': {
        'id': 138
      }
    }, {
      'label': '哈尔滨市',
      'value': {
        'id': 139
      }
    }, {
      'label': '牡丹江市',
      'value': {
        'id': 140
      }
    }, {
      'label': '绥化市',
      'value': {
        'id': 141
      }
    }, {
      'label': '齐齐哈尔市',
      'value': {
        'id': 142
      }
    }, {
      'label': '双鸭山市',
      'value': {
        'id': 143
      }
    }, {
      'label': '鸡西市',
      'value': {
        'id': 144
      }
    }, {
      'label': '大庆市',
      'value': {
        'id': 145
      }
    }, {
      'label': '佳木斯市',
      'value': {
        'id': 146
      }
    }, {
      'label': '黑河市',
      'value': {
        'id': 147
      }
    }, {
      'label': '七台河市',
      'value': {
        'id': 148
      }
    }, {
      'label': '伊春市',
      'value': {
        'id': 149
      }
    }, {
      'label': '大兴安岭地区',
      'value': {
        'id': 150
      }
    }]
  }, {
    'label': '山西省',
    'value': {
      'id': 14
    },
    'children': [{
      'label': '太原市',
      'value': {
        'id': 151
      }
    }, {
      'label': '大同市',
      'value': {
        'id': 152
      }
    }, {
      'label': '长治市',
      'value': {
        'id': 153
      }
    }, {
      'label': '忻州市',
      'value': {
        'id': 154
      }
    }, {
      'label': '晋中市',
      'value': {
        'id': 155
      }
    }, {
      'label': '临汾市',
      'value': {
        'id': 156
      }
    }, {
      'label': '运城市',
      'value': {
        'id': 157
      }
    }, {
      'label': '晋城市',
      'value': {
        'id': 158
      }
    }, {
      'label': '朔州市',
      'value': {
        'id': 159
      }
    }, {
      'label': '阳泉市',
      'value': {
        'id': 160
      }
    }, {
      'label': '吕梁市',
      'value': {
        'id': 161
      }
    }]
  }, {
    'label': '陕西省',
    'value': {
      'id': 15
    },
    'children': [{
      'label': '咸阳市',
      'value': {
        'id': 162
      }
    }, {
      'label': '渭南市',
      'value': {
        'id': 163
      }
    }, {
      'label': '汉中市',
      'value': {
        'id': 164
      }
    }, {
      'label': '商洛市',
      'value': {
        'id': 165
      }
    }, {
      'label': '安康市',
      'value': {
        'id': 166
      }
    }, {
      'label': '榆林市',
      'value': {
        'id': 167
      }
    }, {
      'label': '宝鸡市',
      'value': {
        'id': 168
      }
    }, {
      'label': '延安市',
      'value': {
        'id': 169
      }
    }, {
      'label': '铜川市',
      'value': {
        'id': 170
      }
    }, {
      'label': '西安市',
      'value': {
        'id': 369
      }
    }]
  }, {
    'label': '广西壮族自治区',
    'value': {
      'id': 16
    },
    'children': [{
      'label': '崇左市',
      'value': {
        'id': 171
      }
    }, {
      'label': '桂林市',
      'value': {
        'id': 172
      }
    }, {
      'label': '来宾市',
      'value': {
        'id': 173
      }
    }, {
      'label': '玉林市',
      'value': {
        'id': 174
      }
    }, {
      'label': '贺州市',
      'value': {
        'id': 175
      }
    }, {
      'label': '河池市',
      'value': {
        'id': 176
      }
    }, {
      'label': '防城港市',
      'value': {
        'id': 177
      }
    }, {
      'label': '北海市',
      'value': {
        'id': 178
      }
    }, {
      'label': '百色市',
      'value': {
        'id': 179
      }
    }, {
      'label': '钦州市',
      'value': {
        'id': 180
      }
    }, {
      'label': '梧州市',
      'value': {
        'id': 359
      }
    }, {
      'label': '贵港市',
      'value': {
        'id': 363
      }
    }, {
      'label': '南宁市',
      'value': {
        'id': 366
      }
    }, {
      'label': '柳州市',
      'value': {
        'id': 367
      }
    }]
  }, {
    'label': '河南省',
    'value': {
      'id': 17
    },
    'children': [{
      'label': '郑州市',
      'value': {
        'id': 181
      }
    }, {
      'label': '洛阳市',
      'value': {
        'id': 182
      }
    }, {
      'label': '平顶山市',
      'value': {
        'id': 183
      }
    }, {
      'label': '驻马店市',
      'value': {
        'id': 184
      }
    }, {
      'label': '开封市',
      'value': {
        'id': 185
      }
    }, {
      'label': '安阳市',
      'value': {
        'id': 186
      }
    }, {
      'label': '新乡市',
      'value': {
        'id': 187
      }
    }, {
      'label': '济源市',
      'value': {
        'id': 188
      }
    }, {
      'label': '濮阳市',
      'value': {
        'id': 189
      }
    }, {
      'label': '三门峡市',
      'value': {
        'id': 190
      }
    }, {
      'label': '许昌市',
      'value': {
        'id': 191
      }
    }, {
      'label': '商丘市',
      'value': {
        'id': 192
      }
    }, {
      'label': '南阳市',
      'value': {
        'id': 193
      }
    }, {
      'label': '信阳市',
      'value': {
        'id': 194
      }
    }, {
      'label': '鹤壁市',
      'value': {
        'id': 195
      }
    }, {
      'label': '漯河市',
      'value': {
        'id': 196
      }
    }, {
      'label': '周口市',
      'value': {
        'id': 197
      }
    }, {
      'label': '焦作市',
      'value': {
        'id': 371
      }
    }]
  }, {
    'label': '重庆市',
    'value': {
      'id': 18
    }
  }, {
    'label': '云南省',
    'value': {
      'id': 19
    },
    'children': [{
      'label': '昆明市',
      'value': {
        'id': 198
      }
    }, {
      'label': '西双版纳傣族自治州',
      'value': {
        'id': 199
      }
    }, {
      'label': '文山壮族苗族自治州',
      'value': {
        'id': 200
      }
    }, {
      'label': '怒江傈僳族自治州',
      'value': {
        'id': 201
      }
    }, {
      'label': '临沧市',
      'value': {
        'id': 202
      }
    }, {
      'label': '昭通市',
      'value': {
        'id': 203
      }
    }, {
      'label': '保山市',
      'value': {
        'id': 204
      }
    }, {
      'label': '大理白族自治州',
      'value': {
        'id': 205
      }
    }, {
      'label': '玉溪市',
      'value': {
        'id': 206
      }
    }, {
      'label': '曲靖市',
      'value': {
        'id': 207
      }
    }, {
      'label': '楚雄彝族自治州',
      'value': {
        'id': 208
      }
    }, {
      'label': '德宏傣族景颇族自治州',
      'value': {
        'id': 209
      }
    }, {
      'label': '红河哈尼族彝族自治州',
      'value': {
        'id': 210
      }
    }, {
      'label': '丽江市',
      'value': {
        'id': 211
      }
    }, {
      'label': '普洱市',
      'value': {
        'id': 212
      }
    }, {
      'label': '迪庆藏族自治州',
      'value': {
        'id': 213
      }
    }, {
      'label': '楚雄彝族自治州',
      'value': {
        'id': 364
      }
    }]
  }, {
    'label': '澳门',
    'value': {
      'id': 20
    }
  }, {
    'label': '湖北省',
    'value': {
      'id': 21
    },
    'children': [{
      'label': '武汉市',
      'value': {
        'id': 214
      }
    }, {
      'label': '荆州市',
      'value': {
        'id': 215
      }
    }, {
      'label': '宜昌市',
      'value': {
        'id': 216
      }
    }, {
      'label': '襄樊市',
      'value': {
        'id': 217
      }
    }, {
      'label': '孝感市',
      'value': {
        'id': 218
      }
    }, {
      'label': '黄冈市',
      'value': {
        'id': 219
      }
    }, {
      'label': '黄石市',
      'value': {
        'id': 220
      }
    }, {
      'label': '咸宁市',
      'value': {
        'id': 221
      }
    }, {
      'label': '荆门市',
      'value': {
        'id': 222
      }
    }, {
      'label': '神农架林区',
      'value': {
        'id': 223
      }
    }, {
      'label': '鄂州市',
      'value': {
        'id': 224
      }
    }, {
      'label': '随州市',
      'value': {
        'id': 225
      }
    }, {
      'label': '恩施土家族苗族自治州',
      'value': {
        'id': 226
      }
    }, {
      'label': '十堰市',
      'value': {
        'id': 373
      }
    }]
  }, {
    'label': '西藏自治区',
    'value': {
      'id': 22
    },
    'children': [{
      'label': '拉萨市',
      'value': {
        'id': 227
      }
    }, {
      'label': '日喀则地区',
      'value': {
        'id': 228
      }
    }, {
      'label': '山南地区',
      'value': {
        'id': 229
      }
    }, {
      'label': '林芝地区',
      'value': {
        'id': 230
      }
    }, {
      'label': '昌都地区',
      'value': {
        'id': 231
      }
    }, {
      'label': '那曲地区',
      'value': {
        'id': 232
      }
    }, {
      'label': '阿里地区',
      'value': {
        'id': 233
      }
    }]
  }, {
    'label': '天津市',
    'value': {
      'id': 23
    }
  }, {
    'label': '上海市',
    'value': {
      'id': 24
    }
  }, {
    'label': '河北省',
    'value': {
      'id': 25
    },
    'children': [{
      'label': '石家庄市',
      'value': {
        'id': 234
      }
    }, {
      'label': '保定市',
      'value': {
        'id': 235
      }
    }, {
      'label': '邯郸市',
      'value': {
        'id': 236
      }
    }, {
      'label': '廊坊市',
      'value': {
        'id': 237
      }
    }, {
      'label': '唐山市',
      'value': {
        'id': 238
      }
    }, {
      'label': '衡水市',
      'value': {
        'id': 239
      }
    }, {
      'label': '南昌市',
      'value': {
        'id': 240
      }
    }, {
      'label': '秦皇岛市',
      'value': {
        'id': 241
      }
    }, {
      'label': '邢台市',
      'value': {
        'id': 242
      }
    }, {
      'label': '承德市',
      'value': {
        'id': 243
      }
    }, {
      'label': '沧州市',
      'value': {
        'id': 244
      }
    }, {
      'label': '张家口市',
      'value': {
        'id': 362
      }
    }]
  }, {
    'label': '甘肃省',
    'value': {
      'id': 26
    },
    'children': [{
      'label': '定西市',
      'value': {
        'id': 245
      }
    }, {
      'label': '天水市',
      'value': {
        'id': 246
      }
    }, {
      'label': '兰州市',
      'value': {
        'id': 247
      }
    }, {
      'label': '陇南市',
      'value': {
        'id': 248
      }
    }, {
      'label': '甘南藏族自治州',
      'value': {
        'id': 249
      }
    }, {
      'label': '临夏回族自治州',
      'value': {
        'id': 250
      }
    }, {
      'label': '白银市',
      'value': {
        'id': 251
      }
    }, {
      'label': '平凉市',
      'value': {
        'id': 252
      }
    }, {
      'label': '武威市',
      'value': {
        'id': 253
      }
    }, {
      'label': '酒泉市',
      'value': {
        'id': 254
      }
    }, {
      'label': '庆阳市',
      'value': {
        'id': 255
      }
    }, {
      'label': '张掖市',
      'value': {
        'id': 256
      }
    }, {
      'label': '嘉峪关市',
      'value': {
        'id': 375
      }
    }, {
      'label': '金昌市',
      'value': {
        'id': 376
      }
    }]
  }, {
    'label': '浙江省',
    'value': {
      'id': 27
    },
    'children': [{
      'label': '杭州市',
      'value': {
        'id': 257
      }
    }, {
      'label': '金华市',
      'value': {
        'id': 258
      }
    }, {
      'label': '丽水市',
      'value': {
        'id': 259
      }
    }, {
      'label': '温州市',
      'value': {
        'id': 260
      }
    }, {
      'label': '台州市',
      'value': {
        'id': 261
      }
    }, {
      'label': '衢州市',
      'value': {
        'id': 262
      }
    }, {
      'label': '宁波市',
      'value': {
        'id': 263
      }
    }, {
      'label': '嘉兴市',
      'value': {
        'id': 264
      }
    }, {
      'label': '绍兴市',
      'value': {
        'id': 265
      }
    }, {
      'label': '湖州市',
      'value': {
        'id': 266
      }
    }, {
      'label': '舟山市',
      'value': {
        'id': 267
      }
    }]
  }, {
    'label': '吉林省',
    'value': {
      'id': 28
    },
    'children': [{
      'label': '长春市',
      'value': {
        'id': 268
      }
    }, {
      'label': '吉林市',
      'value': {
        'id': 269
      }
    }, {
      'label': '四平市',
      'value': {
        'id': 270
      }
    }, {
      'label': '辽源市',
      'value': {
        'id': 271
      }
    }, {
      'label': '延边朝鲜族自治州',
      'value': {
        'id': 272
      }
    }, {
      'label': '通化市',
      'value': {
        'id': 273
      }
    }, {
      'label': '松原市',
      'value': {
        'id': 274
      }
    }, {
      'label': '白山市',
      'value': {
        'id': 275
      }
    }, {
      'label': '白城市',
      'value': {
        'id': 276
      }
    }]
  }, {
    'label': '辽宁省',
    'value': {
      'id': 29
    },
    'children': [{
      'label': '沈阳市',
      'value': {
        'id': 277
      }
    }, {
      'label': '大连市',
      'value': {
        'id': 278
      }
    }, {
      'label': '盘锦市',
      'value': {
        'id': 279
      }
    }, {
      'label': '鞍山市',
      'value': {
        'id': 280
      }
    }, {
      'label': '朝阳市',
      'value': {
        'id': 281
      }
    }, {
      'label': '锦州市',
      'value': {
        'id': 282
      }
    }, {
      'label': '铁岭市',
      'value': {
        'id': 283
      }
    }, {
      'label': '丹东市',
      'value': {
        'id': 284
      }
    }, {
      'label': '本溪市',
      'value': {
        'id': 285
      }
    }, {
      'label': '营口市',
      'value': {
        'id': 286
      }
    }, {
      'label': '抚顺市',
      'value': {
        'id': 287
      }
    }, {
      'label': '阜新市',
      'value': {
        'id': 288
      }
    }, {
      'label': '辽阳市',
      'value': {
        'id': 289
      }
    }, {
      'label': '葫芦岛市',
      'value': {
        'id': 290
      }
    }]
  }, {
    'label': '湖南省',
    'value': {
      'id': 30
    },
    'children': [{
      'label': '湘潭市',
      'value': {
        'id': 291
      }
    }, {
      'label': '衡阳市',
      'value': {
        'id': 292
      }
    }, {
      'label': '郴州市',
      'value': {
        'id': 293
      }
    }, {
      'label': '岳阳市',
      'value': {
        'id': 294
      }
    }, {
      'label': '邵阳市',
      'value': {
        'id': 295
      }
    }, {
      'label': '娄底市',
      'value': {
        'id': 296
      }
    }, {
      'label': '永州市',
      'value': {
        'id': 297
      }
    }, {
      'label': '常德市',
      'value': {
        'id': 298
      }
    }, {
      'label': '怀化市',
      'value': {
        'id': 299
      }
    }, {
      'label': '益阳市',
      'value': {
        'id': 300
      }
    }, {
      'label': '湘西土家族苗族自治州',
      'value': {
        'id': 301
      }
    }, {
      'label': '张家界市',
      'value': {
        'id': 302
      }
    }, {
      'label': '株洲市',
      'value': {
        'id': 360
      }
    }, {
      'label': '长沙市',
      'value': {
        'id': 377
      }
    }]
  }, {
    'label': '江西省',
    'value': {
      'id': 31
    },
    'children': [{
      'label': '南昌市',
      'value': {
        'id': 303
      }
    }, {
      'label': '九江市',
      'value': {
        'id': 304
      }
    }, {
      'label': '景德镇市',
      'value': {
        'id': 305
      }
    }, {
      'label': '萍乡市',
      'value': {
        'id': 306
      }
    }, {
      'label': '新余市',
      'value': {
        'id': 307
      }
    }, {
      'label': '宜春市',
      'value': {
        'id': 308
      }
    }, {
      'label': '吉安市',
      'value': {
        'id': 309
      }
    }, {
      'label': '鹰潭市',
      'value': {
        'id': 310
      }
    }, {
      'label': '抚州市',
      'value': {
        'id': 311
      }
    }, {
      'label': '上饶市',
      'value': {
        'id': 312
      }
    }, {
      'label': '赣州市',
      'value': {
        'id': 313
      }
    }]
  }, {
    'label': '四川省',
    'value': {
      'id': 32
    },
    'children': [{
      'label': '泸州市',
      'value': {
        'id': 315
      }
    }, {
      'label': '资阳市',
      'value': {
        'id': 316
      }
    }, {
      'label': '绵阳市',
      'value': {
        'id': 317
      }
    }, {
      'label': '遂宁市',
      'value': {
        'id': 318
      }
    }, {
      'label': '巴中市',
      'value': {
        'id': 319
      }
    }, {
      'label': '内江市',
      'value': {
        'id': 320
      }
    }, {
      'label': '南充市',
      'value': {
        'id': 321
      }
    }, {
      'label': '德阳市',
      'value': {
        'id': 322
      }
    }, {
      'label': '广元市',
      'value': {
        'id': 323
      }
    }, {
      'label': '乐山市',
      'value': {
        'id': 324
      }
    }, {
      'label': '广安市',
      'value': {
        'id': 325
      }
    }, {
      'label': '凉山彝族自治州',
      'value': {
        'id': 326
      }
    }, {
      'label': '自贡市',
      'value': {
        'id': 327
      }
    }, {
      'label': '宜宾市',
      'value': {
        'id': 328
      }
    }, {
      'label': '攀枝花市',
      'value': {
        'id': 329
      }
    }, {
      'label': '达州市',
      'value': {
        'id': 330
      }
    }, {
      'label': '雅安市',
      'value': {
        'id': 331
      }
    }, {
      'label': '甘孜藏族自治州',
      'value': {
        'id': 332
      }
    }, {
      'label': '阿坝藏族羌族自治州',
      'value': {
        'id': 333
      }
    }, {
      'label': '眉山市',
      'value': {
        'id': 368
      }
    }, {
      'label': '成都市',
      'value': {
        'id': 370
      }
    }]
  }, {
    'label': '新疆维吾尔自治区',
    'value': {
      'id': 33
    },
    'children': [{
      'label': '乌鲁木齐市',
      'value': {
        'id': 334
      }
    }, {
      'label': '克孜勒苏柯尔克孜自治州',
      'value': {
        'id': 335
      }
    }, {
      'label': '图木舒克市',
      'value': {
        'id': 336
      }
    }, {
      'label': '和田地区',
      'value': {
        'id': 337
      }
    }, {
      'label': '巴音郭楞蒙古自治州',
      'value': {
        'id': 338
      }
    }, {
      'label': '阿克苏地区',
      'value': {
        'id': 339
      }
    }, {
      'label': '博尔塔拉蒙古自治州',
      'value': {
        'id': 340
      }
    }, {
      'label': '塔城地区',
      'value': {
        'id': 341
      }
    }, {
      'label': '伊犁哈萨克自治州',
      'value': {
        'id': 342
      }
    }, {
      'label': '昌吉回族自治州',
      'value': {
        'id': 343
      }
    }, {
      'label': '哈密地区',
      'value': {
        'id': 344
      }
    }, {
      'label': '吐鲁番地区',
      'value': {
        'id': 345
      }
    }, {
      'label': '克拉玛依市',
      'value': {
        'id': 346
      }
    }, {
      'label': '阿勒泰地区',
      'value': {
        'id': 347
      }
    }, {
      'label': '喀什地区',
      'value': {
        'id': 358
      }
    }]
  }, {
    'label': '青海省',
    'value': {
      'id': 34
    },
    'children': [{
      'label': '西宁市',
      'value': {
        'id': 348
      }
    }, {
      'label': '海西蒙古族藏族自治州',
      'value': {
        'id': 349
      }
    }, {
      'label': '海东地区',
      'value': {
        'id': 350
      }
    }, {
      'label': '海北藏族自治州',
      'value': {
        'id': 351
      }
    }, {
      'label': '海南藏族自治州',
      'value': {
        'id': 352
      }
    }, {
      'label': '黄南藏族自治州',
      'value': {
        'id': 353
      }
    }, {
      'label': '果洛藏族自治州',
      'value': {
        'id': 354
      }
    }, {
      'label': '玉树藏族自治州',
      'value': {
        'id': 355
      }
    }]
  }, {
    'label': '海南省',
    'value': {
      'id': 35
    },
    'children': [{
      'label': '三亚市',
      'value': {
        'id': 356
      }
    }, {
      'label': '海口市',
      'value': {
        'id': 357
      }
    }]
  }]
}];
exports.default = _default;

/***/ }),

/***/ "./src/data.json":
/*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, default */
/***/ (function(module) {

module.exports = [{"id":1,"pid":null,"leaf":false,"depth":1,"label":"中国","value":1},{"id":2,"pid":1,"leaf":true,"depth":2,"label":"北京市","value":2},{"id":3,"pid":1,"leaf":false,"depth":2,"label":"福建省","value":3},{"id":36,"pid":3,"leaf":true,"depth":3,"label":"福州市","value":36},{"id":37,"pid":3,"leaf":true,"depth":3,"label":"南平市","value":37},{"id":38,"pid":3,"leaf":true,"depth":3,"label":"泉州市","value":38},{"id":39,"pid":3,"leaf":true,"depth":3,"label":"莆田市","value":{"id":39}},{"id":40,"pid":3,"leaf":true,"depth":3,"label":"厦门市","value":{"id":40}},{"id":41,"pid":3,"leaf":true,"depth":3,"label":"宁德市","value":{"id":41}},{"id":42,"pid":3,"leaf":true,"depth":3,"label":"漳州市","value":{"id":42}},{"id":43,"pid":3,"leaf":true,"depth":3,"label":"三明市","value":{"id":43}},{"id":44,"pid":3,"leaf":true,"depth":3,"label":"龙岩市","value":{"id":44}},{"id":4,"pid":1,"leaf":false,"depth":2,"label":"广东省","value":{"id":4}},{"id":45,"pid":4,"leaf":true,"depth":3,"label":"广州市","value":{"id":45}},{"id":46,"pid":4,"leaf":true,"depth":3,"label":"深圳市","value":{"id":46}},{"id":47,"pid":4,"leaf":true,"depth":3,"label":"肇庆市","value":{"id":47}},{"id":48,"pid":4,"leaf":true,"depth":3,"label":"惠州市","value":{"id":48}},{"id":49,"pid":4,"leaf":true,"depth":3,"label":"阳江市","value":{"id":49}},{"id":50,"pid":4,"leaf":true,"depth":3,"label":"茂名市","value":{"id":50}},{"id":51,"pid":4,"leaf":true,"depth":3,"label":"湛江市","value":{"id":51}},{"id":52,"pid":4,"leaf":true,"depth":3,"label":"中山市","value":{"id":52}},{"id":53,"pid":4,"leaf":true,"depth":3,"label":"珠海市","value":{"id":53}},{"id":54,"pid":4,"leaf":true,"depth":3,"label":"江门市","value":{"id":54}},{"id":55,"pid":4,"leaf":true,"depth":3,"label":"东莞市","value":{"id":55}},{"id":56,"pid":4,"leaf":true,"depth":3,"label":"清远市","value":{"id":56}},{"id":57,"pid":4,"leaf":true,"depth":3,"label":"揭阳市","value":{"id":57}},{"id":58,"pid":4,"leaf":true,"depth":3,"label":"汕头市","value":{"id":58}},{"id":59,"pid":4,"leaf":true,"depth":3,"label":"佛山市","value":{"id":59}},{"id":60,"pid":4,"leaf":true,"depth":3,"label":"梅州市","value":{"id":60}},{"id":61,"pid":4,"leaf":true,"depth":3,"label":"韶关市","value":{"id":61}},{"id":62,"pid":4,"leaf":true,"depth":3,"label":"河源市","value":{"id":62}},{"id":63,"pid":4,"leaf":true,"depth":3,"label":"汕尾市","value":{"id":63}},{"id":64,"pid":4,"leaf":true,"depth":3,"label":"云浮市","value":{"id":64}},{"id":65,"pid":4,"leaf":true,"depth":3,"label":"潮州市","value":{"id":65}},{"id":5,"pid":1,"leaf":false,"depth":2,"label":"内蒙古自治区","value":{"id":5}},{"id":66,"pid":5,"leaf":true,"depth":3,"label":"呼和浩特市","value":{"id":66}},{"id":67,"pid":5,"leaf":true,"depth":3,"label":"赤峰市","value":{"id":67}},{"id":68,"pid":5,"leaf":true,"depth":3,"label":"鄂尔多斯市","value":{"id":68}},{"id":69,"pid":5,"leaf":true,"depth":3,"label":"乌兰察布市","value":{"id":69}},{"id":70,"pid":5,"leaf":true,"depth":3,"label":"巴彦淖尔市","value":{"id":70}},{"id":71,"pid":5,"leaf":true,"depth":3,"label":"乌海市","value":{"id":71}},{"id":72,"pid":5,"leaf":true,"depth":3,"label":"包头市","value":{"id":72}},{"id":73,"pid":5,"leaf":true,"depth":3,"label":"锡林郭勒盟","value":{"id":73}},{"id":74,"pid":5,"leaf":true,"depth":3,"label":"阿拉善盟","value":{"id":74}},{"id":75,"pid":5,"leaf":true,"depth":3,"label":"南昌市","value":{"id":75}},{"id":76,"pid":5,"leaf":true,"depth":3,"label":"呼伦贝尔市","value":{"id":76}},{"id":77,"pid":5,"leaf":true,"depth":3,"label":"通辽市","value":{"id":77}},{"id":372,"pid":5,"leaf":true,"depth":3,"label":"兴安盟","value":{"id":372}},{"id":6,"pid":1,"leaf":true,"depth":2,"label":"香港","value":{"id":6}},{"id":7,"pid":1,"leaf":true,"depth":2,"label":"台湾","value":{"id":7}},{"id":8,"pid":1,"leaf":false,"depth":2,"label":"贵州省","value":{"id":8}},{"id":78,"pid":8,"leaf":true,"depth":3,"label":"贵阳市","value":{"id":78}},{"id":79,"pid":8,"leaf":true,"depth":3,"label":"黔南布依族苗族自治州","value":{"id":79}},{"id":80,"pid":8,"leaf":true,"depth":3,"label":"铜仁地区","value":{"id":80}},{"id":81,"pid":8,"leaf":true,"depth":3,"label":"毕节地区","value":{"id":81}},{"id":82,"pid":8,"leaf":true,"depth":3,"label":"遵义市","value":{"id":82}},{"id":83,"pid":8,"leaf":true,"depth":3,"label":"六盘水市","value":{"id":83}},{"id":84,"pid":8,"leaf":true,"depth":3,"label":"黔西南布依族苗族自治州","value":{"id":84}},{"id":85,"pid":8,"leaf":true,"depth":3,"label":"黔东南苗族侗族自治州","value":{"id":85}},{"id":86,"pid":8,"leaf":true,"depth":3,"label":"安顺市","value":{"id":86}},{"id":9,"pid":1,"leaf":false,"depth":2,"label":"宁夏回族自治区","value":{"id":9}},{"id":87,"pid":9,"leaf":true,"depth":3,"label":"银川市","value":{"id":87}},{"id":88,"pid":9,"leaf":true,"depth":3,"label":"石嘴山市","value":{"id":88}},{"id":89,"pid":9,"leaf":true,"depth":3,"label":"吴忠市","value":{"id":89}},{"id":90,"pid":9,"leaf":true,"depth":3,"label":"固原市","value":{"id":90}},{"id":91,"pid":9,"leaf":true,"depth":3,"label":"中卫市","value":{"id":91}},{"id":10,"pid":1,"leaf":false,"depth":2,"label":"山东省","value":{"id":10}},{"id":92,"pid":10,"leaf":true,"depth":3,"label":"济南市","value":{"id":92}},{"id":93,"pid":10,"leaf":true,"depth":3,"label":"潍坊市","value":{"id":93}},{"id":94,"pid":10,"leaf":true,"depth":3,"label":"青岛市","value":{"id":94}},{"id":95,"pid":10,"leaf":true,"depth":3,"label":"烟台市","value":{"id":95}},{"id":96,"pid":10,"leaf":true,"depth":3,"label":"淄博市","value":{"id":96}},{"id":97,"pid":10,"leaf":true,"depth":3,"label":"聊城市","value":{"id":97}},{"id":98,"pid":10,"leaf":true,"depth":3,"label":"莱芜市","value":{"id":98}},{"id":99,"pid":10,"leaf":true,"depth":3,"label":"临沂市","value":{"id":99}},{"id":100,"pid":10,"leaf":true,"depth":3,"label":"济宁市","value":{"id":100}},{"id":101,"pid":10,"leaf":true,"depth":3,"label":"泰安市","value":{"id":101}},{"id":102,"pid":10,"leaf":true,"depth":3,"label":"滨州市","value":{"id":102}},{"id":103,"pid":10,"leaf":true,"depth":3,"label":"东营市","value":{"id":103}},{"id":104,"pid":10,"leaf":true,"depth":3,"label":"威海市","value":{"id":104}},{"id":105,"pid":10,"leaf":true,"depth":3,"label":"菏泽市","value":{"id":105}},{"id":106,"pid":10,"leaf":true,"depth":3,"label":"德州市","value":{"id":106}},{"id":107,"pid":10,"leaf":true,"depth":3,"label":"枣庄市","value":{"id":107}},{"id":108,"pid":10,"leaf":true,"depth":3,"label":"日照市","value":{"id":108}},{"id":11,"pid":1,"leaf":false,"depth":2,"label":"江苏省","value":{"id":11}},{"id":109,"pid":11,"leaf":true,"depth":3,"label":"南京市","value":{"id":109}},{"id":110,"pid":11,"leaf":true,"depth":3,"label":"常州市","value":{"id":110}},{"id":111,"pid":11,"leaf":true,"depth":3,"label":"苏州市","value":{"id":111}},{"id":112,"pid":11,"leaf":true,"depth":3,"label":"无锡市","value":{"id":112}},{"id":113,"pid":11,"leaf":true,"depth":3,"label":"徐州市","value":{"id":113}},{"id":114,"pid":11,"leaf":true,"depth":3,"label":"连云港市","value":{"id":114}},{"id":115,"pid":11,"leaf":true,"depth":3,"label":"扬州市","value":{"id":115}},{"id":116,"pid":11,"leaf":true,"depth":3,"label":"宿迁市","value":{"id":116}},{"id":117,"pid":11,"leaf":true,"depth":3,"label":"淮安市","value":{"id":117}},{"id":118,"pid":11,"leaf":true,"depth":3,"label":"泰州市","value":{"id":118}},{"id":119,"pid":11,"leaf":true,"depth":3,"label":"南通市","value":{"id":119}},{"id":120,"pid":11,"leaf":true,"depth":3,"label":"盐城市","value":{"id":120}},{"id":121,"pid":11,"leaf":true,"depth":3,"label":"镇江市","value":{"id":121}},{"id":12,"pid":1,"leaf":false,"depth":2,"label":"安徽省","value":{"id":12}},{"id":122,"pid":12,"leaf":true,"depth":3,"label":"滁州市","value":{"id":122}},{"id":123,"pid":12,"leaf":true,"depth":3,"label":"合肥市","value":{"id":123}},{"id":124,"pid":12,"leaf":true,"depth":3,"label":"亳州市","value":{"id":124}},{"id":125,"pid":12,"leaf":true,"depth":3,"label":"淮南市","value":{"id":125}},{"id":126,"pid":12,"leaf":true,"depth":3,"label":"安庆市","value":{"id":126}},{"id":127,"pid":12,"leaf":true,"depth":3,"label":"六安市","value":{"id":127}},{"id":128,"pid":12,"leaf":true,"depth":3,"label":"宿州市","value":{"id":128}},{"id":129,"pid":12,"leaf":true,"depth":3,"label":"芜湖市","value":{"id":129}},{"id":130,"pid":12,"leaf":true,"depth":3,"label":"鞍山市","value":{"id":130}},{"id":131,"pid":12,"leaf":true,"depth":3,"label":"宣城市","value":{"id":131}},{"id":132,"pid":12,"leaf":true,"depth":3,"label":"黄山市","value":{"id":132}},{"id":133,"pid":12,"leaf":true,"depth":3,"label":"池州市","value":{"id":133}},{"id":134,"pid":12,"leaf":true,"depth":3,"label":"巢湖市","value":{"id":134}},{"id":135,"pid":12,"leaf":true,"depth":3,"label":"淮北市","value":{"id":135}},{"id":136,"pid":12,"leaf":true,"depth":3,"label":"铜陵市","value":{"id":136}},{"id":137,"pid":12,"leaf":true,"depth":3,"label":"蚌埠市","value":{"id":137}},{"id":361,"pid":12,"leaf":true,"depth":3,"label":"马鞍山市","value":{"id":361}},{"id":374,"pid":12,"leaf":true,"depth":3,"label":"阜阳市","value":{"id":374}},{"id":13,"pid":1,"leaf":false,"depth":2,"label":"黑龙江省","value":{"id":13}},{"id":138,"pid":13,"leaf":true,"depth":3,"label":"鹤岗市","value":{"id":138}},{"id":139,"pid":13,"leaf":true,"depth":3,"label":"哈尔滨市","value":{"id":139}},{"id":140,"pid":13,"leaf":true,"depth":3,"label":"牡丹江市","value":{"id":140}},{"id":141,"pid":13,"leaf":true,"depth":3,"label":"绥化市","value":{"id":141}},{"id":142,"pid":13,"leaf":true,"depth":3,"label":"齐齐哈尔市","value":{"id":142}},{"id":143,"pid":13,"leaf":true,"depth":3,"label":"双鸭山市","value":{"id":143}},{"id":144,"pid":13,"leaf":true,"depth":3,"label":"鸡西市","value":{"id":144}},{"id":145,"pid":13,"leaf":true,"depth":3,"label":"大庆市","value":{"id":145}},{"id":146,"pid":13,"leaf":true,"depth":3,"label":"佳木斯市","value":{"id":146}},{"id":147,"pid":13,"leaf":true,"depth":3,"label":"黑河市","value":{"id":147}},{"id":148,"pid":13,"leaf":true,"depth":3,"label":"七台河市","value":{"id":148}},{"id":149,"pid":13,"leaf":true,"depth":3,"label":"伊春市","value":{"id":149}},{"id":150,"pid":13,"leaf":true,"depth":3,"label":"大兴安岭地区","value":{"id":150}},{"id":14,"pid":1,"leaf":false,"depth":2,"label":"山西省","value":{"id":14}},{"id":151,"pid":14,"leaf":true,"depth":3,"label":"太原市","value":{"id":151}},{"id":152,"pid":14,"leaf":true,"depth":3,"label":"大同市","value":{"id":152}},{"id":153,"pid":14,"leaf":true,"depth":3,"label":"长治市","value":{"id":153}},{"id":154,"pid":14,"leaf":true,"depth":3,"label":"忻州市","value":{"id":154}},{"id":155,"pid":14,"leaf":true,"depth":3,"label":"晋中市","value":{"id":155}},{"id":156,"pid":14,"leaf":true,"depth":3,"label":"临汾市","value":{"id":156}},{"id":157,"pid":14,"leaf":true,"depth":3,"label":"运城市","value":{"id":157}},{"id":158,"pid":14,"leaf":true,"depth":3,"label":"晋城市","value":{"id":158}},{"id":159,"pid":14,"leaf":true,"depth":3,"label":"朔州市","value":{"id":159}},{"id":160,"pid":14,"leaf":true,"depth":3,"label":"阳泉市","value":{"id":160}},{"id":161,"pid":14,"leaf":true,"depth":3,"label":"吕梁市","value":{"id":161}},{"id":15,"pid":1,"leaf":false,"depth":2,"label":"陕西省","value":{"id":15}},{"id":162,"pid":15,"leaf":true,"depth":3,"label":"咸阳市","value":{"id":162}},{"id":163,"pid":15,"leaf":true,"depth":3,"label":"渭南市","value":{"id":163}},{"id":164,"pid":15,"leaf":true,"depth":3,"label":"汉中市","value":{"id":164}},{"id":165,"pid":15,"leaf":true,"depth":3,"label":"商洛市","value":{"id":165}},{"id":166,"pid":15,"leaf":true,"depth":3,"label":"安康市","value":{"id":166}},{"id":167,"pid":15,"leaf":true,"depth":3,"label":"榆林市","value":{"id":167}},{"id":168,"pid":15,"leaf":true,"depth":3,"label":"宝鸡市","value":{"id":168}},{"id":169,"pid":15,"leaf":true,"depth":3,"label":"延安市","value":{"id":169}},{"id":170,"pid":15,"leaf":true,"depth":3,"label":"铜川市","value":{"id":170}},{"id":369,"pid":15,"leaf":true,"depth":3,"label":"西安市","value":{"id":369}},{"id":16,"pid":1,"leaf":false,"depth":2,"label":"广西壮族自治区","value":{"id":16}},{"id":171,"pid":16,"leaf":true,"depth":3,"label":"崇左市","value":{"id":171}},{"id":172,"pid":16,"leaf":true,"depth":3,"label":"桂林市","value":{"id":172}},{"id":173,"pid":16,"leaf":true,"depth":3,"label":"来宾市","value":{"id":173}},{"id":174,"pid":16,"leaf":true,"depth":3,"label":"玉林市","value":{"id":174}},{"id":175,"pid":16,"leaf":true,"depth":3,"label":"贺州市","value":{"id":175}},{"id":176,"pid":16,"leaf":true,"depth":3,"label":"河池市","value":{"id":176}},{"id":177,"pid":16,"leaf":true,"depth":3,"label":"防城港市","value":{"id":177}},{"id":178,"pid":16,"leaf":true,"depth":3,"label":"北海市","value":{"id":178}},{"id":179,"pid":16,"leaf":true,"depth":3,"label":"百色市","value":{"id":179}},{"id":180,"pid":16,"leaf":true,"depth":3,"label":"钦州市","value":{"id":180}},{"id":359,"pid":16,"leaf":true,"depth":3,"label":"梧州市","value":{"id":359}},{"id":363,"pid":16,"leaf":true,"depth":3,"label":"贵港市","value":{"id":363}},{"id":366,"pid":16,"leaf":true,"depth":3,"label":"南宁市","value":{"id":366}},{"id":367,"pid":16,"leaf":true,"depth":3,"label":"柳州市","value":{"id":367}},{"id":17,"pid":1,"leaf":false,"depth":2,"label":"河南省","value":{"id":17}},{"id":181,"pid":17,"leaf":true,"depth":3,"label":"郑州市","value":{"id":181}},{"id":182,"pid":17,"leaf":true,"depth":3,"label":"洛阳市","value":{"id":182}},{"id":183,"pid":17,"leaf":true,"depth":3,"label":"平顶山市","value":{"id":183}},{"id":184,"pid":17,"leaf":true,"depth":3,"label":"驻马店市","value":{"id":184}},{"id":185,"pid":17,"leaf":true,"depth":3,"label":"开封市","value":{"id":185}},{"id":186,"pid":17,"leaf":true,"depth":3,"label":"安阳市","value":{"id":186}},{"id":187,"pid":17,"leaf":true,"depth":3,"label":"新乡市","value":{"id":187}},{"id":188,"pid":17,"leaf":true,"depth":3,"label":"济源市","value":{"id":188}},{"id":189,"pid":17,"leaf":true,"depth":3,"label":"濮阳市","value":{"id":189}},{"id":190,"pid":17,"leaf":true,"depth":3,"label":"三门峡市","value":{"id":190}},{"id":191,"pid":17,"leaf":true,"depth":3,"label":"许昌市","value":{"id":191}},{"id":192,"pid":17,"leaf":true,"depth":3,"label":"商丘市","value":{"id":192}},{"id":193,"pid":17,"leaf":true,"depth":3,"label":"南阳市","value":{"id":193}},{"id":194,"pid":17,"leaf":true,"depth":3,"label":"信阳市","value":{"id":194}},{"id":195,"pid":17,"leaf":true,"depth":3,"label":"鹤壁市","value":{"id":195}},{"id":196,"pid":17,"leaf":true,"depth":3,"label":"漯河市","value":{"id":196}},{"id":197,"pid":17,"leaf":true,"depth":3,"label":"周口市","value":{"id":197}},{"id":371,"pid":17,"leaf":true,"depth":3,"label":"焦作市","value":{"id":371}},{"id":18,"pid":1,"leaf":true,"depth":2,"label":"重庆市","value":{"id":18}},{"id":19,"pid":1,"leaf":false,"depth":2,"label":"云南省","value":{"id":19}},{"id":198,"pid":19,"leaf":true,"depth":3,"label":"昆明市","value":{"id":198}},{"id":199,"pid":19,"leaf":true,"depth":3,"label":"西双版纳傣族自治州","value":{"id":199}},{"id":200,"pid":19,"leaf":true,"depth":3,"label":"文山壮族苗族自治州","value":{"id":200}},{"id":201,"pid":19,"leaf":true,"depth":3,"label":"怒江傈僳族自治州","value":{"id":201}},{"id":202,"pid":19,"leaf":true,"depth":3,"label":"临沧市","value":{"id":202}},{"id":203,"pid":19,"leaf":true,"depth":3,"label":"昭通市","value":{"id":203}},{"id":204,"pid":19,"leaf":true,"depth":3,"label":"保山市","value":{"id":204}},{"id":205,"pid":19,"leaf":true,"depth":3,"label":"大理白族自治州","value":{"id":205}},{"id":206,"pid":19,"leaf":true,"depth":3,"label":"玉溪市","value":{"id":206}},{"id":207,"pid":19,"leaf":true,"depth":3,"label":"曲靖市","value":{"id":207}},{"id":208,"pid":19,"leaf":true,"depth":3,"label":"楚雄彝族自治州","value":{"id":208}},{"id":209,"pid":19,"leaf":true,"depth":3,"label":"德宏傣族景颇族自治州","value":{"id":209}},{"id":210,"pid":19,"leaf":true,"depth":3,"label":"红河哈尼族彝族自治州","value":{"id":210}},{"id":211,"pid":19,"leaf":true,"depth":3,"label":"丽江市","value":{"id":211}},{"id":212,"pid":19,"leaf":true,"depth":3,"label":"普洱市","value":{"id":212}},{"id":213,"pid":19,"leaf":true,"depth":3,"label":"迪庆藏族自治州","value":{"id":213}},{"id":364,"pid":19,"leaf":true,"depth":3,"label":"楚雄彝族自治州","value":{"id":364}},{"id":20,"pid":1,"leaf":true,"depth":2,"label":"澳门","value":{"id":20}},{"id":21,"pid":1,"leaf":false,"depth":2,"label":"湖北省","value":{"id":21}},{"id":214,"pid":21,"leaf":true,"depth":3,"label":"武汉市","value":{"id":214}},{"id":215,"pid":21,"leaf":true,"depth":3,"label":"荆州市","value":{"id":215}},{"id":216,"pid":21,"leaf":true,"depth":3,"label":"宜昌市","value":{"id":216}},{"id":217,"pid":21,"leaf":true,"depth":3,"label":"襄樊市","value":{"id":217}},{"id":218,"pid":21,"leaf":true,"depth":3,"label":"孝感市","value":{"id":218}},{"id":219,"pid":21,"leaf":true,"depth":3,"label":"黄冈市","value":{"id":219}},{"id":220,"pid":21,"leaf":true,"depth":3,"label":"黄石市","value":{"id":220}},{"id":221,"pid":21,"leaf":true,"depth":3,"label":"咸宁市","value":{"id":221}},{"id":222,"pid":21,"leaf":true,"depth":3,"label":"荆门市","value":{"id":222}},{"id":223,"pid":21,"leaf":true,"depth":3,"label":"神农架林区","value":{"id":223}},{"id":224,"pid":21,"leaf":true,"depth":3,"label":"鄂州市","value":{"id":224}},{"id":225,"pid":21,"leaf":true,"depth":3,"label":"随州市","value":{"id":225}},{"id":226,"pid":21,"leaf":true,"depth":3,"label":"恩施土家族苗族自治州","value":{"id":226}},{"id":373,"pid":21,"leaf":true,"depth":3,"label":"十堰市","value":{"id":373}},{"id":22,"pid":1,"leaf":false,"depth":2,"label":"西藏自治区","value":{"id":22}},{"id":227,"pid":22,"leaf":true,"depth":3,"label":"拉萨市","value":{"id":227}},{"id":228,"pid":22,"leaf":true,"depth":3,"label":"日喀则地区","value":{"id":228}},{"id":229,"pid":22,"leaf":true,"depth":3,"label":"山南地区","value":{"id":229}},{"id":230,"pid":22,"leaf":true,"depth":3,"label":"林芝地区","value":{"id":230}},{"id":231,"pid":22,"leaf":true,"depth":3,"label":"昌都地区","value":{"id":231}},{"id":232,"pid":22,"leaf":true,"depth":3,"label":"那曲地区","value":{"id":232}},{"id":233,"pid":22,"leaf":true,"depth":3,"label":"阿里地区","value":{"id":233}},{"id":23,"pid":1,"leaf":true,"depth":2,"label":"天津市","value":{"id":23}},{"id":24,"pid":1,"leaf":true,"depth":2,"label":"上海市","value":{"id":24}},{"id":25,"pid":1,"leaf":false,"depth":2,"label":"河北省","value":{"id":25}},{"id":234,"pid":25,"leaf":true,"depth":3,"label":"石家庄市","value":{"id":234}},{"id":235,"pid":25,"leaf":true,"depth":3,"label":"保定市","value":{"id":235}},{"id":236,"pid":25,"leaf":true,"depth":3,"label":"邯郸市","value":{"id":236}},{"id":237,"pid":25,"leaf":true,"depth":3,"label":"廊坊市","value":{"id":237}},{"id":238,"pid":25,"leaf":true,"depth":3,"label":"唐山市","value":{"id":238}},{"id":239,"pid":25,"leaf":true,"depth":3,"label":"衡水市","value":{"id":239}},{"id":240,"pid":25,"leaf":true,"depth":3,"label":"南昌市","value":{"id":240}},{"id":241,"pid":25,"leaf":true,"depth":3,"label":"秦皇岛市","value":{"id":241}},{"id":242,"pid":25,"leaf":true,"depth":3,"label":"邢台市","value":{"id":242}},{"id":243,"pid":25,"leaf":true,"depth":3,"label":"承德市","value":{"id":243}},{"id":244,"pid":25,"leaf":true,"depth":3,"label":"沧州市","value":{"id":244}},{"id":362,"pid":25,"leaf":true,"depth":3,"label":"张家口市","value":{"id":362}},{"id":26,"pid":1,"leaf":false,"depth":2,"label":"甘肃省","value":{"id":26}},{"id":245,"pid":26,"leaf":true,"depth":3,"label":"定西市","value":{"id":245}},{"id":246,"pid":26,"leaf":true,"depth":3,"label":"天水市","value":{"id":246}},{"id":247,"pid":26,"leaf":true,"depth":3,"label":"兰州市","value":{"id":247}},{"id":248,"pid":26,"leaf":true,"depth":3,"label":"陇南市","value":{"id":248}},{"id":249,"pid":26,"leaf":true,"depth":3,"label":"甘南藏族自治州","value":{"id":249}},{"id":250,"pid":26,"leaf":true,"depth":3,"label":"临夏回族自治州","value":{"id":250}},{"id":251,"pid":26,"leaf":true,"depth":3,"label":"白银市","value":{"id":251}},{"id":252,"pid":26,"leaf":true,"depth":3,"label":"平凉市","value":{"id":252}},{"id":253,"pid":26,"leaf":true,"depth":3,"label":"武威市","value":{"id":253}},{"id":254,"pid":26,"leaf":true,"depth":3,"label":"酒泉市","value":{"id":254}},{"id":255,"pid":26,"leaf":true,"depth":3,"label":"庆阳市","value":{"id":255}},{"id":256,"pid":26,"leaf":true,"depth":3,"label":"张掖市","value":{"id":256}},{"id":375,"pid":26,"leaf":true,"depth":3,"label":"嘉峪关市","value":{"id":375}},{"id":376,"pid":26,"leaf":true,"depth":3,"label":"金昌市","value":{"id":376}},{"id":27,"pid":1,"leaf":false,"depth":2,"label":"浙江省","value":{"id":27}},{"id":257,"pid":27,"leaf":true,"depth":3,"label":"杭州市","value":{"id":257}},{"id":258,"pid":27,"leaf":true,"depth":3,"label":"金华市","value":{"id":258}},{"id":259,"pid":27,"leaf":true,"depth":3,"label":"丽水市","value":{"id":259}},{"id":260,"pid":27,"leaf":true,"depth":3,"label":"温州市","value":{"id":260}},{"id":261,"pid":27,"leaf":true,"depth":3,"label":"台州市","value":{"id":261}},{"id":262,"pid":27,"leaf":true,"depth":3,"label":"衢州市","value":{"id":262}},{"id":263,"pid":27,"leaf":true,"depth":3,"label":"宁波市","value":{"id":263}},{"id":264,"pid":27,"leaf":true,"depth":3,"label":"嘉兴市","value":{"id":264}},{"id":265,"pid":27,"leaf":true,"depth":3,"label":"绍兴市","value":{"id":265}},{"id":266,"pid":27,"leaf":true,"depth":3,"label":"湖州市","value":{"id":266}},{"id":267,"pid":27,"leaf":true,"depth":3,"label":"舟山市","value":{"id":267}},{"id":28,"pid":1,"leaf":false,"depth":2,"label":"吉林省","value":{"id":28}},{"id":268,"pid":28,"leaf":true,"depth":3,"label":"长春市","value":{"id":268}},{"id":269,"pid":28,"leaf":true,"depth":3,"label":"吉林市","value":{"id":269}},{"id":270,"pid":28,"leaf":true,"depth":3,"label":"四平市","value":{"id":270}},{"id":271,"pid":28,"leaf":true,"depth":3,"label":"辽源市","value":{"id":271}},{"id":272,"pid":28,"leaf":true,"depth":3,"label":"延边朝鲜族自治州","value":{"id":272}},{"id":273,"pid":28,"leaf":true,"depth":3,"label":"通化市","value":{"id":273}},{"id":274,"pid":28,"leaf":true,"depth":3,"label":"松原市","value":{"id":274}},{"id":275,"pid":28,"leaf":true,"depth":3,"label":"白山市","value":{"id":275}},{"id":276,"pid":28,"leaf":true,"depth":3,"label":"白城市","value":{"id":276}},{"id":29,"pid":1,"leaf":false,"depth":2,"label":"辽宁省","value":{"id":29}},{"id":277,"pid":29,"leaf":true,"depth":3,"label":"沈阳市","value":{"id":277}},{"id":278,"pid":29,"leaf":true,"depth":3,"label":"大连市","value":{"id":278}},{"id":279,"pid":29,"leaf":true,"depth":3,"label":"盘锦市","value":{"id":279}},{"id":280,"pid":29,"leaf":true,"depth":3,"label":"鞍山市","value":{"id":280}},{"id":281,"pid":29,"leaf":true,"depth":3,"label":"朝阳市","value":{"id":281}},{"id":282,"pid":29,"leaf":true,"depth":3,"label":"锦州市","value":{"id":282}},{"id":283,"pid":29,"leaf":true,"depth":3,"label":"铁岭市","value":{"id":283}},{"id":284,"pid":29,"leaf":true,"depth":3,"label":"丹东市","value":{"id":284}},{"id":285,"pid":29,"leaf":true,"depth":3,"label":"本溪市","value":{"id":285}},{"id":286,"pid":29,"leaf":true,"depth":3,"label":"营口市","value":{"id":286}},{"id":287,"pid":29,"leaf":true,"depth":3,"label":"抚顺市","value":{"id":287}},{"id":288,"pid":29,"leaf":true,"depth":3,"label":"阜新市","value":{"id":288}},{"id":289,"pid":29,"leaf":true,"depth":3,"label":"辽阳市","value":{"id":289}},{"id":290,"pid":29,"leaf":true,"depth":3,"label":"葫芦岛市","value":{"id":290}},{"id":30,"pid":1,"leaf":false,"depth":2,"label":"湖南省","value":{"id":30}},{"id":291,"pid":30,"leaf":true,"depth":3,"label":"湘潭市","value":{"id":291}},{"id":292,"pid":30,"leaf":true,"depth":3,"label":"衡阳市","value":{"id":292}},{"id":293,"pid":30,"leaf":true,"depth":3,"label":"郴州市","value":{"id":293}},{"id":294,"pid":30,"leaf":true,"depth":3,"label":"岳阳市","value":{"id":294}},{"id":295,"pid":30,"leaf":true,"depth":3,"label":"邵阳市","value":{"id":295}},{"id":296,"pid":30,"leaf":true,"depth":3,"label":"娄底市","value":{"id":296}},{"id":297,"pid":30,"leaf":true,"depth":3,"label":"永州市","value":{"id":297}},{"id":298,"pid":30,"leaf":true,"depth":3,"label":"常德市","value":{"id":298}},{"id":299,"pid":30,"leaf":true,"depth":3,"label":"怀化市","value":{"id":299}},{"id":300,"pid":30,"leaf":true,"depth":3,"label":"益阳市","value":{"id":300}},{"id":301,"pid":30,"leaf":true,"depth":3,"label":"湘西土家族苗族自治州","value":{"id":301}},{"id":302,"pid":30,"leaf":true,"depth":3,"label":"张家界市","value":{"id":302}},{"id":360,"pid":30,"leaf":true,"depth":3,"label":"株洲市","value":{"id":360}},{"id":377,"pid":30,"leaf":true,"depth":3,"label":"长沙市","value":{"id":377}},{"id":31,"pid":1,"leaf":false,"depth":2,"label":"江西省","value":{"id":31}},{"id":303,"pid":31,"leaf":true,"depth":3,"label":"南昌市","value":{"id":303}},{"id":304,"pid":31,"leaf":true,"depth":3,"label":"九江市","value":{"id":304}},{"id":305,"pid":31,"leaf":true,"depth":3,"label":"景德镇市","value":{"id":305}},{"id":306,"pid":31,"leaf":true,"depth":3,"label":"萍乡市","value":{"id":306}},{"id":307,"pid":31,"leaf":true,"depth":3,"label":"新余市","value":{"id":307}},{"id":308,"pid":31,"leaf":true,"depth":3,"label":"宜春市","value":{"id":308}},{"id":309,"pid":31,"leaf":true,"depth":3,"label":"吉安市","value":{"id":309}},{"id":310,"pid":31,"leaf":true,"depth":3,"label":"鹰潭市","value":{"id":310}},{"id":311,"pid":31,"leaf":true,"depth":3,"label":"抚州市","value":{"id":311}},{"id":312,"pid":31,"leaf":true,"depth":3,"label":"上饶市","value":{"id":312}},{"id":313,"pid":31,"leaf":true,"depth":3,"label":"赣州市","value":{"id":313}},{"id":32,"pid":1,"leaf":false,"depth":2,"label":"四川省","value":{"id":32}},{"id":315,"pid":32,"leaf":true,"depth":3,"label":"泸州市","value":{"id":315}},{"id":316,"pid":32,"leaf":true,"depth":3,"label":"资阳市","value":{"id":316}},{"id":317,"pid":32,"leaf":true,"depth":3,"label":"绵阳市","value":{"id":317}},{"id":318,"pid":32,"leaf":true,"depth":3,"label":"遂宁市","value":{"id":318}},{"id":319,"pid":32,"leaf":true,"depth":3,"label":"巴中市","value":{"id":319}},{"id":320,"pid":32,"leaf":true,"depth":3,"label":"内江市","value":{"id":320}},{"id":321,"pid":32,"leaf":true,"depth":3,"label":"南充市","value":{"id":321}},{"id":322,"pid":32,"leaf":true,"depth":3,"label":"德阳市","value":{"id":322}},{"id":323,"pid":32,"leaf":true,"depth":3,"label":"广元市","value":{"id":323}},{"id":324,"pid":32,"leaf":true,"depth":3,"label":"乐山市","value":{"id":324}},{"id":325,"pid":32,"leaf":true,"depth":3,"label":"广安市","value":{"id":325}},{"id":326,"pid":32,"leaf":true,"depth":3,"label":"凉山彝族自治州","value":{"id":326}},{"id":327,"pid":32,"leaf":true,"depth":3,"label":"自贡市","value":{"id":327}},{"id":328,"pid":32,"leaf":true,"depth":3,"label":"宜宾市","value":{"id":328}},{"id":329,"pid":32,"leaf":true,"depth":3,"label":"攀枝花市","value":{"id":329}},{"id":330,"pid":32,"leaf":true,"depth":3,"label":"达州市","value":{"id":330}},{"id":331,"pid":32,"leaf":true,"depth":3,"label":"雅安市","value":{"id":331}},{"id":332,"pid":32,"leaf":true,"depth":3,"label":"甘孜藏族自治州","value":{"id":332}},{"id":333,"pid":32,"leaf":true,"depth":3,"label":"阿坝藏族羌族自治州","value":{"id":333}},{"id":368,"pid":32,"leaf":true,"depth":3,"label":"眉山市","value":{"id":368}},{"id":370,"pid":32,"leaf":true,"depth":3,"label":"成都市","value":{"id":370}},{"id":33,"pid":1,"leaf":false,"depth":2,"label":"新疆维吾尔自治区","value":{"id":33}},{"id":334,"pid":33,"leaf":true,"depth":3,"label":"乌鲁木齐市","value":{"id":334}},{"id":335,"pid":33,"leaf":true,"depth":3,"label":"克孜勒苏柯尔克孜自治州","value":{"id":335}},{"id":336,"pid":33,"leaf":true,"depth":3,"label":"图木舒克市","value":{"id":336}},{"id":337,"pid":33,"leaf":true,"depth":3,"label":"和田地区","value":{"id":337}},{"id":338,"pid":33,"leaf":true,"depth":3,"label":"巴音郭楞蒙古自治州","value":{"id":338}},{"id":339,"pid":33,"leaf":true,"depth":3,"label":"阿克苏地区","value":{"id":339}},{"id":340,"pid":33,"leaf":true,"depth":3,"label":"博尔塔拉蒙古自治州","value":{"id":340}},{"id":341,"pid":33,"leaf":true,"depth":3,"label":"塔城地区","value":{"id":341}},{"id":342,"pid":33,"leaf":true,"depth":3,"label":"伊犁哈萨克自治州","value":{"id":342}},{"id":343,"pid":33,"leaf":true,"depth":3,"label":"昌吉回族自治州","value":{"id":343}},{"id":344,"pid":33,"leaf":true,"depth":3,"label":"哈密地区","value":{"id":344}},{"id":345,"pid":33,"leaf":true,"depth":3,"label":"吐鲁番地区","value":{"id":345}},{"id":346,"pid":33,"leaf":true,"depth":3,"label":"克拉玛依市","value":{"id":346}},{"id":347,"pid":33,"leaf":true,"depth":3,"label":"阿勒泰地区","value":{"id":347}},{"id":358,"pid":33,"leaf":true,"depth":3,"label":"喀什地区","value":{"id":358}},{"id":34,"pid":1,"leaf":false,"depth":2,"label":"青海省","value":{"id":34}},{"id":348,"pid":34,"leaf":true,"depth":3,"label":"西宁市","value":{"id":348}},{"id":349,"pid":34,"leaf":true,"depth":3,"label":"海西蒙古族藏族自治州","value":{"id":349}},{"id":350,"pid":34,"leaf":true,"depth":3,"label":"海东地区","value":{"id":350}},{"id":351,"pid":34,"leaf":true,"depth":3,"label":"海北藏族自治州","value":{"id":351}},{"id":352,"pid":34,"leaf":true,"depth":3,"label":"海南藏族自治州","value":{"id":352}},{"id":353,"pid":34,"leaf":true,"depth":3,"label":"黄南藏族自治州","value":{"id":353}},{"id":354,"pid":34,"leaf":true,"depth":3,"label":"果洛藏族自治州","value":{"id":354}},{"id":355,"pid":34,"leaf":true,"depth":3,"label":"玉树藏族自治州","value":{"id":355}},{"id":35,"pid":1,"leaf":false,"depth":2,"label":"海南省","value":{"id":35}},{"id":356,"pid":35,"leaf":true,"depth":3,"label":"三亚市","value":{"id":356}},{"id":357,"pid":35,"leaf":true,"depth":3,"label":"海口市","value":{"id":357}}];

/***/ }),

/***/ "./src/demos/demo1.js":
/*!****************************!*\
  !*** ./src/demos/demo1.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "../node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "../node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "../node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _xtreeStore = _interopRequireDefault(__webpack_require__(/*! xtree-store */ "../node_modules/xtree-store/index.js"));

var _nilTree = _interopRequireDefault(__webpack_require__(/*! nil-tree */ "../src/index.js"));

var _data = _interopRequireDefault(__webpack_require__(/*! ../data.json */ "./src/data.json"));

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DEMO);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DEMO).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "loadData", function (node) {
      var store = _this.store;
      return store.getChildren(node.id);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleExpand", function () {});
    _this.store = new _xtreeStore.default(_data.default, {
      simpleData: true
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_nilTree.default, {
        onNodeDoubleClick: this.toggleExpand,
        loadData: this.loadData,
        showIcon: true
      });
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "../node_modules/@babel/runtime-corejs2/core-js/promise.js"));

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/map */ "../node_modules/@babel/runtime-corejs2/core-js/map.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js"));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ "./src/store.js"));

__webpack_require__(/*! ./style/index.scss */ "./src/style/index.scss");

__webpack_require__(/*! ../../src/style/index.scss */ "../src/style/index.scss");

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "../src/index.js"));

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./src/Demo.js"));

var TreeStore = new _map.default();

function loadData(pNode) {
  //cache
  if (TreeStore.has(pNode.id)) {
    return TreeStore.get(pNode.id);
  } //模拟请求


  return new _promise.default(function (resolve) {
    setTimeout(function () {
      var nodes = [];

      if (pNode.root) {
        nodes = _store.default.getChildren();
      } else {
        nodes = _store.default.getChildren(pNode.id);
      }

      nodes = nodes.map(function (id) {
        var node = _store.default.getNode(id);

        return {
          id: node.label,
          label: node.label,
          leaf: _store.default.isLeaf(id)
        };
      });
      nodes.sort(function (a, b) {
        var av = a.leaf ? 1 : 2;
        var bv = b.leaf ? 1 : 2;
        return av - bv;
      });
      TreeStore.set(pNode.id, nodes);
      resolve(nodes);
    }, 300);
  });
} //双击展开


function toggleExpand(node, e, target) {
  target.toggleExpand();
}

function STree(props) {
  return _react.default.createElement(_src.default, {
    onNodeDoubleClick: toggleExpand,
    loadData: loadData,
    showIcon: true
  });
}

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "../node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _simpleTreeStore = _interopRequireDefault(__webpack_require__(/*! simple-tree-store */ "../node_modules/simple-tree-store/index.js"));

var _city = _interopRequireDefault(__webpack_require__(/*! ./city */ "./src/city.js"));

var _default = new _simpleTreeStore.default(_city.default, {
  idField: 'label'
});

exports.default = _default;

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!*********************************************************************************!*\
  !*** multi ../node_modules/make-webpack-config/lib/polyfills.js ./src/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\nil-components\tree\node_modules\make-webpack-config\lib\polyfills.js */"../node_modules/make-webpack-config/lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-projects\nil-components\tree\examples\src\index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=app.4fea14c3.js.map