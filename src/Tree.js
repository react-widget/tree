import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TreeContext from "./TreeContext";
import Node from "./Node";
import TreeNode from "./TreeNode";
import ChildNodesWrapper from "./ChildNodesWrapper";
import { toMarked } from "./utils";

const noop = () => {};

class Tree extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const checkedKeys = nextProps.checkedKeys || prevState.checkedKeys;
        const selectedKeys = nextProps.selectedKeys || prevState.selectedKeys;
        const expandedKeys = nextProps.expandedKeys || prevState.expandedKeys;
        return {
            checkedKeys,
            selectedKeys,
            expandedKeys,
            checkedMap: toMarked(checkedKeys),
            selectedMap: toMarked(selectedKeys),
            expandedMap: toMarked(expandedKeys),
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            checkedKeys: props.defaultCheckedKeys || [],
            selectedKeys: props.defaultSelectedKeys || [],
            expandedKeys: props.defaultExpandedKeys || [],
            checkedMap: {},
            selectedMap: {},
            expandedMap: {},
        };
    }

    isLoading(node) {
        return node.loading;
    }

    isLeaf(node) {
        return node.leaf;
    }

    isExpanded(node) {
        const { expandedMap } = this.state;
        return expandedMap[node.id];
    }

    isSelected(node) {
        const { selectedMap } = this.state;
        return selectedMap[node.id];
    }

    getRootNode() {
        const { rootId, idField, pidField, leafField } = this.props;

        const node = new Node(
            {
                [idField]: rootId,
                [pidField]: null,
                [leafField]: false,
            },
            null,
            this.props
        );

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
            loading: false,
        };
    }

    getContext() {
        return {
            tree: this,
        };
    }

    render() {
        const {
            prefixCls,
            className,
            style,
            rootComponent: Component,
        } = this.props;

        let classes = classNames({
            [prefixCls]: true,
            [className]: className,
        });

        if (Fragment === Component) {
            classes = {};
        }

        return (
            <TreeContext.Provider value={this.getContext()}>
                <Component className={classes} style={style}>
                    <TreeNode
                        parentProps={this.props}
                        node={this.getRootNode()}
                        isRoot
                    />
                </Component>
            </TreeContext.Provider>
        );
    }
}

Tree.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    rootId: PropTypes.any,
    idField: PropTypes.string,
    leafField: PropTypes.string,
    pidField: PropTypes.string,
    labelField: PropTypes.string,
    loadingLabel: PropTypes.node,
    loadingComponent: PropTypes.elementType,
    loadData: PropTypes.func,
    showIcon: PropTypes.bool,
    showExpanderIcon: PropTypes.bool,
    multiple: PropTypes.bool,
    selectable: PropTypes.bool,
    unselectable: PropTypes.bool,
    checkable: PropTypes.bool,
    maxDepth: PropTypes.number,
    asyncTestDelay: PropTypes.number,
    rootComponent: PropTypes.elementType,
    childNodesWrapperComponent: PropTypes.elementType,
    nodeItemWrapperComponent: PropTypes.elementType,
    renderIndentIcons: PropTypes.func,
    renderExpanderIcon: PropTypes.func,
    renderLoadingIcon: PropTypes.func,
    renderIcon: PropTypes.func,
    renderCheckbox: PropTypes.func,
    renderLabel: PropTypes.func,
    renderExtIcons: PropTypes.func,
    renderNode: PropTypes.func,
    onNodeClick: PropTypes.func,
    onNodeDoubleClick: PropTypes.func,
    onNodeContextMenu: PropTypes.func,
    onNodeMouseDown: PropTypes.func,
    onNodeMouseUp: PropTypes.func,
    onNodeMouseEnter: PropTypes.func,
    onNodeMouseLeave: PropTypes.func,
    onNodeMouseOver: PropTypes.func,
    onNodeMouseOut: PropTypes.func,
    onNodeMouseMove: PropTypes.func,
};

Tree.defaultProps = {
    prefixCls: "nil-tree",
    className: "",
    style: {},
    rootId: null,
    idField: "id",
    leafField: "leaf",
    pidField: "pid",
    labelField: "label",
    loadingLabel: "Loading...",
    loadingComponent: "div",
    loadData: null,
    showIcon: true,
    multiple: false,
    selectable: true,
    unselectable: true,
    showExpanderIcon: true,
    checkable: false,
    maxDepth: 99, //最大层级99   Number.MAX_VALUE
    asyncTestDelay: 16,
    rootComponent: "div",
    childNodesWrapperComponent: ChildNodesWrapper,
    nodeItemWrapperComponent: Fragment,
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
    onNodeMouseMove: noop,
};

export default Tree;
