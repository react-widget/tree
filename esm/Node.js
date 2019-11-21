
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var idx = 1;

var Node =
/*#__PURE__*/
function () {
  function Node(data, parentNode, options, state) {
    if (options === void 0) {
      options = {};
    }

    if (state === void 0) {
      state = {};
    }

    var _options = options,
        _options$rootId = _options.rootId,
        rootId = _options$rootId === void 0 ? null : _options$rootId,
        _options$idField = _options.idField,
        idField = _options$idField === void 0 ? "id" : _options$idField,
        _options$pidField = _options.pidField,
        pidField = _options$pidField === void 0 ? "pid" : _options$pidField,
        _options$leafField = _options.leafField,
        leafField = _options$leafField === void 0 ? "leaf" : _options$leafField;
    var _state = state,
        _state$selectedMap = _state.selectedMap,
        selectedMap = _state$selectedMap === void 0 ? {} : _state$selectedMap,
        _state$expandedMap = _state.expandedMap,
        expandedMap = _state$expandedMap === void 0 ? {} : _state$expandedMap;
    this.id = data[idField];
    this.pid = data[pidField];
    this.leaf = data[leafField];
    this.data = data;

    if (this.id == null && this.id !== rootId) {
      this.id = "node_" + idx++;
    }

    this.loading = false;
    this.root = !parentNode;
    this.expanded = this.root ? true : expandedMap[this.id];
    this.selected = this.root ? false : selectedMap[this.id];
    this.depth = parentNode ? parentNode.depth + 1 : 0;
  }

  var _proto = Node.prototype;

  _proto.getId = function getId() {
    return this.id;
  };

  _proto.getDepth = function getDepth() {
    return this.depth;
  };

  _proto.setDepth = function setDepth(depth) {
    this.depth = depth;
  };

  _proto.getData = function getData() {
    return this.data;
  };

  _proto.isRoot = function isRoot() {
    return this.root;
  };

  _proto.isLeaf = function isLeaf() {
    return this.leaf;
  };

  _proto.setExpanded = function setExpanded(expanded) {
    this.expanded = expanded;
  };

  _proto.isExpanded = function isExpanded() {
    return this.expanded;
  };

  _proto.setSelected = function setSelected(selected) {
    this.selected = selected;
  };

  _proto.isSelected = function isSelected() {
    return this.selected;
  };

  _proto.setLoading = function setLoading(loading) {
    this.loading = loading;
  };

  _proto.isLoading = function isLoading() {
    return this.loading;
  };

  return Node;
}();

exports.default = Node;